import { InteractiveCreditCard } from "@/components/customer/interactive-credit-card";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { useCustomer } from "@/hooks/use-customer";
import { usePaymentMethod } from "@/hooks/use-payment-method";
import { useTheme } from "@/hooks/use-theme";
import { PaymentMethodType } from "@/models/enums";
import { CreatePaymentMethodData } from "@/services/payment-method-service";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { LiteCreditCardInput } from "react-native-credit-card-input";

export default function AddPaymentMethodScreen() {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: PaymentMethodType }>();
  const { currentTheme } = useTheme();
  const { sizes } = currentTheme;
  const { customer } = useCustomer();
  const { loading, createPaymentMethod } = usePaymentMethod();
  const [cardData, setCardData] = useState<any>(null);
  const [mobileMoneyData, setMobileMoneyData] = useState({
    phoneNumber: "",
    provider: "",
  });

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
    if (!customer) return;

    let newPaymentMethod: CreatePaymentMethodData;

    if (type === PaymentMethodType.CREDIT_CARD) {
      if (!cardData?.valid) return;
      const { values } = cardData;
      const [expMonth, expYear] = values.expiry.split("/");
      newPaymentMethod = {
        customerId: customer.id,
        type: PaymentMethodType.CREDIT_CARD,
        last4: values.number.slice(-4),
        brand: values.type,
        expMonth: parseInt(expMonth),
        expYear: parseInt(expYear),
        isDefault: false,
      };
    } else {
      if (!mobileMoneyData.phoneNumber) return;
      newPaymentMethod = {
        customerId: customer.id,
        type: PaymentMethodType.MOBILE_MONEY,
        phoneNumber: mobileMoneyData.phoneNumber,
        provider: mobileMoneyData.provider,
        isDefault: false,
      };
    }

    await createPaymentMethod(newPaymentMethod);
    router.back();
  };

  const renderCreditCardForm = () => (
    <>
      <InteractiveCreditCard
        name={cardData?.values.name}
        number={cardData?.values.number}
        expiry={cardData?.values.expiry}
        cvc={cardData?.values.cvc}
        type={cardData?.values.type}
      />
      <LiteCreditCardInput onChange={(data) => setCardData(data)} />
      <View style={styles.buttonContainer}>
        <Button
          title="Add Payment Method"
          onPress={handleAddPaymentMethod}
          variant="primary"
          loading={loading}
          disabled={!cardData?.valid}
        />
      </View>
    </>
  );

  const renderMobileMoneyForm = () => (
    <>
      <Input
        placeholder="Phone Number"
        value={mobileMoneyData.phoneNumber}
        onChangeText={(phoneNumber) =>
          setMobileMoneyData({ ...mobileMoneyData, phoneNumber })
        }
        keyboardType="phone-pad"
      />
      <Input
        placeholder="Provider (optional)"
        value={mobileMoneyData.provider}
        onChangeText={(provider) =>
          setMobileMoneyData({ ...mobileMoneyData, provider })
        }
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Add Payment Method"
          onPress={handleAddPaymentMethod}
          variant="primary"
          loading={loading}
          disabled={!mobileMoneyData.phoneNumber}
        />
      </View>
    </>
  );

  return (
    <Screen>
      <View style={styles.form}>
        <Typography variant="h2">Add a new payment method</Typography>
        {type === PaymentMethodType.CREDIT_CARD
          ? renderCreditCardForm()
          : renderMobileMoneyForm()}
      </View>
    </Screen>
  );
}
