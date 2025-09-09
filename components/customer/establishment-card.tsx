import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Establishment } from "@/models/establishment";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/use-theme";
import { EstablishmentStatus } from "@/models/enums";

type EstablishmentCardProps = {
  establishment: Establishment;
  onPress: () => void;
};

export function EstablishmentCard({
  establishment,
  onPress,
}: EstablishmentCardProps) {
  const { currentTheme } = useTheme();
  const { colors, fonts, sizes } = currentTheme;

  const getStatusStyle = (status: EstablishmentStatus) => {
    switch (status) {
      case EstablishmentStatus.OPEN:
        return {
          backgroundColor: "#4CAF50",
          color: colors.white,
        };
      case EstablishmentStatus.CLOSED:
        return {
          backgroundColor: "#F44336",
          color: colors.white,
        };
      case EstablishmentStatus.TEMPORARILY_UNAVAILABLE:
        return {
          backgroundColor: "#FFC107",
          color: colors.black,
        };
      default:
        return {
          backgroundColor: colors.gray,
          color: colors.white,
        };
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.tertiary,
      borderRadius: sizes.radius * 2,
      marginBottom: sizes.padding,
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: 150,
    },
    infoContainer: {
      padding: sizes.padding,
    },
    name: {
      ...fonts.h3,
      color: colors.text,
      marginBottom: sizes.base,
    },
    detailsContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: sizes.base,
    },
    rating: {
      ...fonts.body4,
      color: colors.text,
      marginLeft: sizes.base / 2,
    },
    dot: {
      marginHorizontal: sizes.base,
      fontSize: 14,
      color: colors.gray,
    },
    deliveryTime: {
      ...fonts.body4,
      color: colors.gray,
    },
    statusContainer: {
      paddingVertical: sizes.base / 2,
      paddingHorizontal: sizes.base,
      borderRadius: sizes.radius,
      alignSelf: "flex-start",
      marginBottom: sizes.base,
    },
    statusText: {
      ...fonts.body4,
    },
  });

  const statusStyle = getStatusStyle(establishment.status);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: establishment.imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{establishment.name}</Text>
        <View
          style={[
            styles.statusContainer,
            { backgroundColor: statusStyle.backgroundColor },
          ]}
        >
          <Text style={[styles.statusText, { color: statusStyle.color }]}>
            {establishment.status.replace(/_/g, " ")}
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <Ionicons name="star" size={16} color={colors.primary} />
          <Text style={styles.rating}>{establishment.rate}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.deliveryTime}>{establishment.deliveryTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
