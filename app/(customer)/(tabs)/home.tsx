import { EstablishmentCard } from "@/components/customer/establishment-card";
import { Input } from "@/components/shared/input";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import {
  MOCK_CATEGORIES,
  MOCK_POPULAR_ESTABLISHMENTS,
} from "@/constants/mock-data";
import { useTheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const CategoryCard = ({ item, onPress, index }) => {
  const { currentTheme } = useTheme();
  const { colors, fonts, sizes } = currentTheme;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withDelay(index * 100, withTiming(1)),
      transform: [
        {
          translateY: withDelay(index * 100, withTiming(0, { duration: 500 })),
        },
      ],
    };
  });

  const styles = StyleSheet.create({
    categoryCard: {
      backgroundColor: colors.tertiary,
      borderRadius: sizes.radius,
      padding: sizes.padding / 2,
      alignItems: "center",
      justifyContent: "center",
      marginRight: sizes.padding,
      width: 120,
      height: 120,
    },
    categoryImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginBottom: sizes.base,
    },
    categoryName: {
      ...fonts.body4,
      color: colors.text,
      textAlign: "center",
    },
  });

  return (
    <Animated.View
      style={[{ opacity: 0, transform: [{ translateY: 50 }] }, animatedStyle]}
    >
      <TouchableOpacity style={styles.categoryCard} onPress={onPress}>
        <Image source={{ uri: item.image }} style={styles.categoryImage} />
        <Text style={styles.categoryName}>{item.name}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function CustomerHomeScreen() {
  const router = useRouter();
  const { theme, currentTheme, toggleTheme } = useTheme();
  const { colors, fonts, sizes } = currentTheme;

  const handleCategoryPress = (type: string) => {
    router.push(`/(customer)/establishments/${type}`);
  };

  const handleEstablishmentPress = (id: string) => {
    router.push(`/(customer)/establishment/${id}`);
  };

  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: sizes.padding,
    },
    locationContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    locationText: {
      ...fonts.h3,
      color: colors.text,
      marginRight: sizes.base,
    },
    searchBar: {
      marginBottom: sizes.padding2,
    },
    sectionTitle: {
      ...fonts.h2,
      color: colors.text,
      marginBottom: sizes.padding,
    },
    listContainer: {
      paddingBottom: sizes.padding,
    },
    themeToggleIcon: {
      ...fonts.h1,
      color: colors.text
    },
  });

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <View>
          <Typography variant="body3" style={{ color: colors.gray }}>
            Delivering to
          </Typography>
          <View style={styles.locationContainer}>
            <Typography variant="h3" style={styles.locationText}>
              123 Ocean Drive
            </Typography>
            <Ionicons name="chevron-down" size={24} color={colors.primary} />
          </View>
        </View>
        <Ionicons
          name={theme === "dark" ? "sunny" : "moon"}
          style={styles.themeToggleIcon}
          onPress={toggleTheme}
        />
      </View>

      <Input placeholder="What are you looking for?" style={styles.searchBar} />

      <Typography variant="h2" style={styles.sectionTitle}>
        Categories
      </Typography>

      <FlatList
        data={MOCK_CATEGORIES}
        renderItem={({ item, index }) => (
          <CategoryCard
            item={item}
            onPress={() => handleCategoryPress(item.type)}
            index={index}
          />
        )}
        keyExtractor={(item) => item.type}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      <Typography variant="h2" style={styles.sectionTitle}>
        Popular
      </Typography>

      <FlatList
        data={MOCK_POPULAR_ESTABLISHMENTS}
        renderItem={({ item }) => (
          <EstablishmentCard
            establishment={item}
            onPress={() => handleEstablishmentPress(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false} // To avoid nested scrollviews warning
      />
    </Screen>
  );
}
