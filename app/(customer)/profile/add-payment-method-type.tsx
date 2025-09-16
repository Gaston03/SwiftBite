import { Button } from "@/components/shared/button";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { useTheme } from "@/hooks/use-theme";
import { PaymentMethodType } from "@/models/enums";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function AddPaymentMethodTypeScreen() {
  const router = useRouter();
  const { currentTheme } = useTheme();
  const { sizes } = currentTheme;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: sizes.padding,
      gap: sizes.padding,
    },
  });

  const handleSelectType = (type: PaymentMethodType) => {
    router.push({
      pathname: "/(customer)/profile/add-payment-method",
      params: { type },
    });
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Typography variant="h2">Select a payment method type</Typography>
        <Button
          title="Credit Card"
          onPress={() => handleSelectType(PaymentMethodType.CREDIT_CARD)}
          variant="primary"
        />
        <Button
          title="Mobile Money"
          onPress={() => handleSelectType(PaymentMethodType.MOBILE_MONEY)}
          variant="primary"
        />
      </View>
    </Screen>
  );
}
