import { Modal, View, StyleSheet, FlatList, Pressable } from "react-native";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { useTheme } from "@/hooks/use-theme";
import { PaymentMethod } from "@/models/payment-method";
import { Card } from "../shared/card";

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
      backgroundColor: colors.background,
      borderRadius: sizes.borderRadius,
      padding: sizes.padding,
    },
    title: {
      marginBottom: sizes.padding,
      textAlign: "center",
    },
    paymentMethodContainer: {
      marginBottom: sizes.base,
    },
    buttonContainer: {
      marginTop: sizes.padding,
    },
  });

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
                  <Typography>{item.type}</Typography>
                </Card>
              </Pressable>
            )}
          />
          <View style={styles.buttonContainer}>
            <Button title="Close" onPress={onClose} variant="ghost" />
          </View>
        </View>
      </View>
    </Modal>
  );
}
