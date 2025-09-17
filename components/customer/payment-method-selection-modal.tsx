import { Modal, View, StyleSheet, FlatList, Pressable } from "react-native";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { useTheme } from "@/hooks/use-theme";
import { PaymentMethod } from "@/models/payment-method";
import { Card } from "../shared/card";
import { PaymentMethodType } from "@/models/enums";
import { useRouter } from "expo-router";

interface PaymentMethodSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (paymentMethod: PaymentMethod) => void;
  paymentMethods: PaymentMethod[];
}

export function PaymentMethodSelectionModal({
  visible,
  onClose,
  onSelect,
  paymentMethods,
}: PaymentMethodSelectionModalProps) {
  const router = useRouter()
  const { currentTheme } = useTheme();
  const { colors, sizes } = currentTheme;

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: "90%",
      gap: sizes.padding2,
      backgroundColor: colors.background,
      borderRadius: sizes.borderRadius,
      padding: sizes.padding,
    },
    title: {
      textAlign: "center",
    },
    paymentMethodContainer: {
      marginBottom: sizes.padding / 2,
    },
    buttonContainer: {
      gap: sizes.padding / 2,
    },
  });

  const formatPaymentMethodType = (type: PaymentMethodType) => {
    switch (type) {
      case PaymentMethodType.CASH:
        return "Cash"
      case PaymentMethodType.CREDIT_CARD:
        return "Credit card"
      case PaymentMethodType.MOBILE_MONEY:
        return "Mobile money (OM, MoMo)"
      case PaymentMethodType.PAYCARD:
        return "Paycard"
      default:
        break;
    }
  }

  return (
    <Modal visible={visible} transparent onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Typography variant="h2" style={styles.title}>
            Select Payment Method
          </Typography>
          <FlatList
            data={paymentMethods}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable onPress={() => onSelect(item)}>
                <Card style={styles.paymentMethodContainer}>
                  <Typography>{formatPaymentMethodType(item.type)}</Typography>
                </Card>
              </Pressable>
            )}
          />
          <View style={styles.buttonContainer}>
            <Button title="Add new method" onPress={() => {
              router.navigate("/(customer)/profile/add-payment-method-type")
              onClose()
            }} variant="secondary" />
            <Button title="Close" onPress={onClose} variant="ghost" />
          </View>
        </View>
      </View>
    </Modal>
  );
}
