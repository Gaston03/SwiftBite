import { Button } from "@/components/shared/button";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { useUser } from "@/hooks/use-user";
import { useTheme } from "@/hooks/use-theme";
import { CreatePaymentMethodData } from "@/services/payment-method-service";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { CreditCardInput } from "react-native-credit-card-input-plus-cr";

export default function AddPaymentMethodScreen() {
  const router = useRouter();
  const { currentTheme } = useTheme();
  const { sizes } = currentTheme;
  const { createPaymentMethod, loading, customer } = useUser();
  const [cardData, setCardData] = useState<any>(null);

  const styles = StyleSheet.create({
    form: {
      flex: 1,
      padding: sizes.padding,
      gap: sizes.padding,
    },
    buttonContainer: {
      flex: 1,
      justifyContent: "flex-end",
    },
  });

  const handleAddPaymentMethod = async () => {
    if (!customer || !cardData?.valid) return;

    const { values } = cardData;
    const [expMonth, expYear] = values.expiry.split("/");

    const newPaymentMethod: CreatePaymentMethodData = {
      customerId: customer.id,
      last4: values.number.slice(-4),
      brand: values.type,
      expMonth: parseInt(expMonth),
      expYear: parseInt(expYear),
    };

    await createPaymentMethod(newPaymentMethod);
    router.back();
  };

  return (
    <Screen>
      <View style={styles.form}>
        <Typography variant="h2">Add a new payment method</Typography>
        <CreditCardInput onChange={(data) => setCardData(data)} />
        <View style={styles.buttonContainer}>
          <Button
            title="Add Payment Method"
            onPress={handleAddPaymentMethod}
            variant="primary"
            loading={loading}
            disabled={!cardData?.valid}
          />
        </View>
      </View>
    </Screen>
  );
}
