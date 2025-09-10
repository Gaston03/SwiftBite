import { AddressSelectionModal } from "@/components/customer/address-selection-modal";
import { CartItemRow } from "@/components/customer/cart-item-row";
import { CartSectionRow } from "@/components/customer/cart-section-row";
import { PaymentMethodSelectionModal } from "@/components/customer/payment-method-selection-modal";
import { Button } from "@/components/shared/button";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/hooks/use-auth";
import { useEstablishment } from "@/hooks/use-establishment";
import { useTheme } from "@/hooks/use-theme";
import { Address } from "@/models/address";
import { Customer } from "@/models/customer";
import { PaymentMethodType } from "@/models/enums";
import { PaymentMethod } from "@/models/payment-method";
import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

// Mock Data
const mockAddresses: Address[] = [
  {
    id: "1",
    area: "123 Main St",
    city: "New York",
    zipCode: "10001",
    latitude: 40.7128,
    longitude: -74.006,
  },
  {
    id: "2",
    area: "456 Market St",
    city: "San Francisco",
    zipCode: "94102",
    latitude: 37.7749,
    longitude: -122.4194,
  },
];

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "1",
    type: PaymentMethodType.CASH,
    ownerId: "1",
    createdAt: new Date(),
  },
  {
    id: "2",
    type: PaymentMethodType.CREDIT_CARD,
    cardLast4Digits: "1234",
    ownerId: "1",
    createdAt: new Date(),
  },
];

export default function CartScreen() {
  const { items, total } = useCart();
  const { currentTheme } = useTheme();
  const { userProfile } = useAuth();
  const { getEstablishmentById } = useEstablishment();
  const { colors, sizes } = currentTheme;
  const headerHeight = useHeaderHeight();
  const [deliveryFee, setDeliveryFee] = useState(0);
  const serviceFee = 1.5;

  useEffect(() => {
    async function fetchDeliveryFee() {
      if (items.length > 0) {
        const establishmentId = items[0].product.establishmentId;
        const establishment = await getEstablishmentById(establishmentId)
        if (establishment) {
          setDeliveryFee(establishment.deliveryFee);
        }
      } else {
        setDeliveryFee(0);
      }
    }
    fetchDeliveryFee();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const [isAddressModalVisible, setAddressModalVisible] = useState(false);
  const [
    isPaymentMethodModalVisible,
    setPaymentMethodModalVisible,
  ] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | undefined>(
    (userProfile as Customer)?.address
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    PaymentMethod | undefined
  >((userProfile as Customer)?.paymentMethods?.[0]);

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
    setAddressModalVisible(false);
  };

  const handleSelectPaymentMethod = (paymentMethod: PaymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
    setPaymentMethodModalVisible(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: headerHeight,
    },
    scrollViewContent: {
      paddingBottom: 120, // Space for the footer
    },
    section: {
      paddingHorizontal: sizes.padding,
      paddingVertical: sizes.padding / 2,
      borderBottomWidth: 1,
      borderBottomColor: colors.tertiary,
    },
    sectionTitle: {
      textTransform: "uppercase",
      color: colors.gray,
      marginBottom: sizes.padding,
    },
    footer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: sizes.padding,
      backgroundColor: colors.background,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: sizes.padding,
    },
    emptySubtitle: {
      marginTop: sizes.base,
      color: colors.gray,
      textAlign: "center",
    },
    allergiesContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    allergiesText: {
      marginLeft: sizes.base,
      color: colors.primary,
    },
    summaryRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: sizes.base,
    },
  });

  return (
    <Screen>
      <Stack.Screen options={{ title: "My Cart" }} />
      {items.length > 0 ? (
        <View style={styles.container}>
          <AddressSelectionModal
            visible={isAddressModalVisible}
            onClose={() => setAddressModalVisible(false)}
            addresses={mockAddresses}
            onSelect={handleSelectAddress}
          />
          <PaymentMethodSelectionModal
            visible={isPaymentMethodModalVisible}
            onClose={() => setPaymentMethodModalVisible(false)}
            paymentMethods={mockPaymentMethods}
            onSelect={handleSelectPaymentMethod}
          />
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.section}>
              <Typography variant="h3" style={styles.sectionTitle}>
                Order Summary
              </Typography>
              {items.map((item) => (
                <CartItemRow item={item} key={item.id} />
              ))}
            </View>

            <View style={styles.section}>
              <View style={styles.allergiesContainer}>
                <Ionicons
                  name="alert-circle-outline"
                  size={24}
                  color={colors.primary}
                />
                <Typography style={styles.allergiesText}>
                  Add allergies
                </Typography>
              </View>
            </View>

            <View style={styles.section}>
              <CartSectionRow
                icon="flag-outline"
                title="Delivery Address"
                content={`${selectedAddress?.area}, ${selectedAddress?.city}`}
                onPress={() => setAddressModalVisible(true)}
              />
            </View>

            <View style={styles.section}>
              <CartSectionRow
                icon="time-outline"
                title="Delivery Time"
                content="As soon as possible (25-35 min)"
              />
            </View>

            <View style={styles.section}>
              <CartSectionRow
                icon="card-outline"
                title="Payment Method"
                content={
                  selectedPaymentMethod?.type === PaymentMethodType.CREDIT_CARD
                    ? `Credit Card **** ${selectedPaymentMethod?.cardLast4Digits}`
                    : "Cash"
                }
                onPress={() => setPaymentMethodModalVisible(true)}
              />
            </View>

            <View style={styles.section}>
              <View style={styles.summaryRow}>
                <Typography>Delivery Fee</Typography>
                <Typography>${deliveryFee.toFixed(2)}</Typography>
              </View>
              <View style={styles.summaryRow}>
                <Typography>Service Fee</Typography>
                <Typography>${serviceFee.toFixed(2)}</Typography>
              </View>
              <View style={styles.summaryRow}>
                <Typography>Items Total</Typography>
                <Typography>${total.toFixed(2)}</Typography>
              </View>
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <Button
              title={`Confirm Purchase - ${(
                total +
                deliveryFee +
                serviceFee
              ).toFixed(2)}`}
              variant="ghost"
              fullWidth
            />
          </View>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Typography variant="h2">Your cart is empty</Typography>
          <Typography style={styles.emptySubtitle}>
            Add items from your favorite establishments to get started.
          </Typography>
        </View>
      )}
    </Screen>
  );
}
