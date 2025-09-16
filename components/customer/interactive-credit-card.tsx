import { useTheme } from "@/hooks/use-theme";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Typography } from "../shared/typography";

interface InteractiveCreditCardProps {
  number?: string;
  name?: string;
  expiry?: string;
  cvc?: string;
  type?: string;
}

export function InteractiveCreditCard({
  number,
  name,
  expiry,
  cvc,
  type,
}: InteractiveCreditCardProps) {
  const { currentTheme } = useTheme();
  const { colors, sizes } = currentTheme;

  const styles = StyleSheet.create({
    card: {
      width: "100%",
      height: 200,
      borderRadius: sizes.borderRadius,
      padding: sizes.padding,
      justifyContent: "space-between",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    label: {
      color: colors.white,
      fontSize: sizes.font,
      textTransform: "uppercase",
    },
    value: {
      color: colors.white,
      fontSize: sizes.h3,
    },
  });

  return (
    <ImageBackground
      source={require("@/assets/images/card-front.png")}
      style={styles.card}
      imageStyle={{ borderRadius: sizes.borderRadius }}
    >
      <View style={styles.row}>
        <Typography style={styles.label}>Card Number</Typography>
        <Typography style={styles.label}>{type}</Typography>
      </View>
      <Typography style={styles.value}>{number || "**** **** **** ****"}</Typography>
      <View style={styles.row}>
        <View>
          <Typography style={styles.label}>Card Holder</Typography>
          <Typography style={styles.value}>{name || "Your Name"}</Typography>
        </View>
        <View>
          <Typography style={styles.label}>Expires</Typography>
          <Typography style={styles.value}>{expiry || "MM/YY"}</Typography>
        </View>
      </View>
    </ImageBackground>
  );
}
