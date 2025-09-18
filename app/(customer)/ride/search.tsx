import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { useTheme } from "@/hooks/use-theme";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";

interface LocationInfo {
  latitude: number;
  longitude: number;
  description: string;
}

const MOCK_PLACES: LocationInfo[] = [
  {
    latitude: 37.78825,
    longitude: -122.4324,
    description: "San Francisco, CA, USA",
  },
  {
    latitude: 34.052235,
    longitude: -118.243683,
    description: "Los Angeles, CA, USA",
  },
  {
    latitude: 40.712776,
    longitude: -74.005974,
    description: "New York, NY, USA",
  },
];

export default function RideSearchScreen() {
  const { currentTheme } = useTheme();
  const { colors, sizes } = currentTheme;
  const router = useRouter();
  const [origin, setOrigin] = useState<LocationInfo | null>(null);
  const [destination, setDestination] = useState<LocationInfo | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<LocationInfo[]>([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const [address] = await Location.reverseGeocodeAsync(location.coords);
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        description: address
          ? `${address.street}, ${address.city}`
          : "Current Location",
      });
    })();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = MOCK_PLACES.filter((place) =>
        place.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: sizes.padding,
    },
    input: {
      marginBottom: sizes.base,
    },
    suggestionItem: {
      padding: sizes.padding,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
  });

  const handleDone = () => {
    if (origin && destination) {
      router.push({
        pathname: "/(customer)/ride/details",
        params: {
          originLatitude: origin.latitude,
          originLongitude: origin.longitude,
          originDescription: origin.description,
          destinationLatitude: destination.latitude,
          destinationLongitude: destination.longitude,
          destinationDescription: destination.description,
        },
      });
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Typography variant="h1" style={{ marginBottom: sizes.padding }}>
          Where are you going?
        </Typography>
        <Input
          placeholder="From"
          style={styles.input}
          value={origin ? origin.description : "Loading..."}
          editable={false}
        />
        <Input
          placeholder="To"
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.description}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => {
                setDestination(item);
                setSearchQuery(item.description);
                setSuggestions([]);
              }}
            >
              <Typography>{item.description}</Typography>
            </TouchableOpacity>
          )}
        />
        <Button
          title="Done"
          onPress={handleDone}
          disabled={!origin || !destination}
        />
        {errorMsg && <Typography>{errorMsg}</Typography>}
      </View>
    </Screen>
  );
}
