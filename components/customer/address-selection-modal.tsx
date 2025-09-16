import { Modal, View, StyleSheet, FlatList, Pressable } from "react-native";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { useTheme } from "@/hooks/use-theme";
import { Address } from "@/models/address";
import { Card } from "../shared/card";

interface AddressSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (address: Address) => void;
  onAddAddress: () => void;
  addresses: Address[];
}

export function AddressSelectionModal({
  visible,
  onClose,
  onSelect,
  onAddAddress,
  addresses,
}: AddressSelectionModalProps) {
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
    addressContainer: {
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
            Select Address
          </Typography>
          <FlatList
            data={addresses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable onPress={() => onSelect(item)}>
                <Card style={styles.addressContainer}>
                  <Typography>
                    {item.area}, {item.city}
                  </Typography>
                </Card>
              </Pressable>
            )}
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Add New Address"
              variant="secondary"
              onPress={onAddAddress}
            />
            <Button title="Close" onPress={onClose} variant="ghost" />
          </View>
        </View>
      </View>
    </Modal>
  );
}
