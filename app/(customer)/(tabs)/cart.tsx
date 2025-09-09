import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { Stack } from "expo-router";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { useCart } from "@/contexts/cart-context";
import { CartItemRow } from "@/components/customer/cart-item-row";
import { Button } from "@/components/shared/button";
import { useTheme } from "@/hooks/use-theme";
import { useHeaderHeight } from "@react-navigation/elements";
import { useAuth } from "@/hooks/use-auth";
import { Card } from "@/components/shared/card";
import { PaymentMethodType } from "@/models/enums";
import { useEffect, useState } from "react";
import { Address } from "@/models/address";
import { AddressSelectionModal } from "@/components/customer/address-selection-modal";
import { Customer } from "@/models/customer";
import { PaymentMethod } from "@/models/payment-method";
import { PaymentMethodSelectionModal } from "@/components/customer/payment-method-selection-modal";
import { useEstablishment } from "@/hooks/use-establishment";

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
        const establishment = await getEstablishmentById(establishmentId);
        if (establishment) {
          setDeliveryFee(establishment.deliveryFee);
        }
      } else {
        setDeliveryFee(0);
      }
    }
    fetchDeliveryFee();
  }, [items, getEstablishmentById]);

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
    list: {
      paddingTop: headerHeight,
      paddingBottom: 320, // Space for the footer
    },
    section: {
      marginTop: sizes.padding,
      paddingHorizontal: sizes.padding,
    },
    sectionTitle: {
      marginBottom: sizes.base,
    },
    footer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: sizes.padding,
      backgroundColor: colors.background,
      borderTopWidth: 1,
      borderTopColor: colors.tertiary,
    },
    totalContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: sizes.padding,
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
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: sizes.base,
    },
  });

  return (
    <Screen>
      <Stack.Screen options={{ title: "My Cart" }} />
      {items.length > 0 ? (
        <>
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
          <FlatList
            data={items}
            renderItem={({ item }) => <CartItemRow item={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            ListHeaderComponent={
              <>
                <View style={styles.section}>
                  <Typography variant="h3" style={styles.sectionTitle}>
                    Delivery Address
                  </Typography>
                  <Card>
                    <View style={styles.row}>
                      <Typography>
                        {selectedAddress?.area}, {selectedAddress?.city}
                      </Typography>
                      <Pressable onPress={() => setAddressModalVisible(true)}>
                        <Typography style={{ color: colors.primary }}>
                          Change
                        </Typography>
                      </Pressable>
                    </View>
                  </Card>
                </View>
                <View style={styles.section}>
                  <Typography variant="h3" style={styles.sectionTitle}>
                    Payment Method
                  </Typography>
                  <Card>
                    <View style={styles.row}>
                      <Typography>
                        {selectedPaymentMethod?.type}
                        {selectedPaymentMethod?.type ===
                          PaymentMethodType.CREDIT_CARD &&
                          ` **** ${selectedPaymentMethod?.cardLast4Digits}`}
                      </Typography>
                      <Pressable
                        onPress={() => setPaymentMethodModalVisible(true)}
                      >
                        <Typography style={{ color: colors.primary }}>
                          Change
                        </Typography>
                      </Pressable>
                    </View>
                  </Card>
                </View>
              </>
            }
          />
          <View style={styles.footer}>
            <View>
              <View style={styles.row}>
                <Typography>Delivery Fee</Typography>
                <Typography>${deliveryFee.toFixed(2)}</Typography>
              </View>
              <View style={styles.row}>
                <Typography>Service Fee</Typography>
                <Typography>${serviceFee.toFixed(2)}</Typography>
              </View>
              <View style={styles.row}>
                <Typography>Items Total</Typography>
                <Typography>${total.toFixed(2)}</Typography>
              </View>
            </View>
            <View style={styles.totalContainer}>
              <Typography variant="h3">Total</Typography>
              <Typography variant="h2">
                ${(total + deliveryFee + serviceFee).toFixed(2)}
              </Typography>
            </View>
            <Button title="Proceed to Checkout" />
          </View>
        </>
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
