import { Button } from "@/components/shared/button";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { usePaymentMethod } from "@/hooks/use-payment-method";
import { useTheme } from "@/hooks/use-theme";
import { PaymentMethod } from "@/models/payment-method";
import { FlashList } from "@shopify/flash-list";
import { StyleSheet, View } from "react-native";

export default function PaymentMethodsScreen() {
  const { currentTheme } = useTheme();
  const { colors, sizes } = currentTheme;
  const { paymentMethods, loading } = usePaymentMethod();

  const styles = StyleSheet.create({
    list: {
      flex: 1,
      padding: sizes.padding,
    },
    buttonContainer: {
      padding: sizes.padding,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: sizes.padding,
      borderBottomWidth: 1,
      borderBottomColor: colors.card,
    },
  });

  const renderItem = ({ item }: { item: PaymentMethod }) => (
    <View style={styles.row}>
      <Typography>
        **** **** **** {item.last4} - {item.brand}
      </Typography>
      <Typography>{item.isDefault && "(Default)"}</Typography>
    </View>
  );

  return (
    <Screen>
      <FlashList
        data={paymentMethods}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        estimatedItemSize={50}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<Typography variant="h2">Payment Methods</Typography>}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Add New Card"
          onPress={() => {}}
          variant="primary"
          loading={loading}
        />
      </View>
    </Screen>
  );
}
