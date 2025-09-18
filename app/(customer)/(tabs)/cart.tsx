import { AddressSelectionModal } from "@/components/customer/address-selection-modal";
import { CartItemRow } from "@/components/customer/cart-item-row";
import { CartSectionRow } from "@/components/customer/cart-section-row";
import { PaymentMethodSelectionModal } from "@/components/customer/payment-method-selection-modal";
import { Button } from "@/components/shared/button";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { CartItem, useCart } from "@/contexts/cart-context";
import { useAddress } from "@/hooks/use-address";
import { useAuth } from "@/hooks/use-auth";
import { useCustomer } from "@/hooks/use-customer";
import { useEstablishment } from "@/hooks/use-establishment";
import { useOrder } from "@/hooks/use-order";
import { usePaymentMethod } from "@/hooks/use-payment-method";
import { useTheme } from "@/hooks/use-theme";
import { Address } from "@/models/address";
import { Customer } from "@/models/customer";
import { OrderStatus, PaymentMethodType } from "@/models/enums";
import { PaymentMethod } from "@/models/payment-method";
import {
  CreateOrderData,
  CreateOrderProductLineData,
} from "@/services/order-service";
import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SectionList, StyleSheet, View } from "react-native";

export default function CartScreen() {
  const { items, total, clearCart } = useCart();
  const { currentTheme } = useTheme();
  const { userProfile } = useAuth();
  const { addresses } = useAddress();
  const { paymentMethods } = usePaymentMethod()
  const { customer } = useCustomer();
  const { getEstablishmentById } = useEstablishment();
  const { placeOrder, loading } = useOrder();
  const { colors, sizes } = currentTheme;
  const headerHeight = useHeaderHeight();
  const [deliveryFee, setDeliveryFee] = useState(0);
  const serviceFee = 1.5;
  const router = useRouter();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const [isAddressModalVisible, setAddressModalVisible] = useState(false);
  const [isPaymentMethodModalVisible, setPaymentMethodModalVisible] =
    useState(false);
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

  const handlePurchase = async () => {
    if (!customer || !selectedAddress) return;

    const productLines: CreateOrderProductLineData[] = items.map((item) => {
      const selectedToppingIds = Object.keys(item.selectedToppings).filter(
        (toppingId) => item.selectedToppings[toppingId]
      );

      return {
        productId: item.product.id,
        quantity: item.quantity,
        unitPrice: item.price,
        selectedToppings: selectedToppingIds,
      };
    });

    const orderData: CreateOrderData = {
      customerId: customer.id,
      establishmentId: items[0].product.establishmentId,
      deliveryFee,
      totalPrice: total + deliveryFee + serviceFee,
      deliveringAddressId: selectedAddress.id,
      productLines,
    };

    const newOrder = await placeOrder(orderData);
    if (newOrder) {
      clearCart();
      router.push(`/(customer)/order/${newOrder.id}`);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    list: {
      paddingTop: headerHeight,
      paddingHorizontal: sizes.padding,
    },
    listContent: {
      paddingBottom: 120, // Space for the footer
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
      borderTopWidth: 1,
      borderTopColor: colors.tertiary,
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
      paddingVertical: sizes.base,
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

  const sections = [
    {
      title: "Order Summary",
      data: items,
      renderItem: ({ item }: { item: CartItem }) => <CartItemRow item={item} />,
    },
    {
      title: "Delivery Details",
      data: [
        {
          icon: "flag-outline",
          title: "Delivery Address",
          content: `${selectedAddress?.area}, ${selectedAddress?.city}`,
          onPress: () => setAddressModalVisible(true),
        },
        {
          icon: "time-outline",
          title: "Delivery Time",
          content: "As soon as possible (25-35 min)",
        },
        {
          icon: "card-outline",
          title: "Payment Method",
          content:
            selectedPaymentMethod?.type === PaymentMethodType.CREDIT_CARD
              ? `Credit Card **** ${selectedPaymentMethod?.last4}`
              : `Mobile money ${selectedPaymentMethod?.phoneNumber}`,
          onPress: () => setPaymentMethodModalVisible(true),
        },
      ],
      renderItem: ({ item }: { item: any }) => <CartSectionRow {...item} />,
    },
    {
      title: "Costs",
      data: [
        {
          label: "Delivery Fee",
          value: deliveryFee,
        },
        {
          label: "Service Fee",
          value: serviceFee,
        },
        {
          label: "Items Total",
          value: total,
        },
      ],
      renderItem: ({ item }: { item: any }) => (
        <View style={styles.summaryRow}>
          <Typography>{item.label}</Typography>
          <Typography>${item.value.toFixed(2)}</Typography>
        </View>
      ),
    },
  ];

  return (
    <Screen>
      <Stack.Screen options={{ title: "My Cart" }} />
      {items.length > 0 ? (
        <View style={styles.container}>
          <AddressSelectionModal
            visible={isAddressModalVisible}
            onClose={() => setAddressModalVisible(false)}
            addresses={addresses}
            onSelect={handleSelectAddress}
            onAddAddress={() => router.push("/(customer)/address/add")}
          />
          <PaymentMethodSelectionModal
            visible={isPaymentMethodModalVisible}
            onClose={() => setPaymentMethodModalVisible(false)}
            paymentMethods={paymentMethods}
            onSelect={handleSelectPaymentMethod}
          />
          <SectionList
            sections={sections}
            style={styles.list}
            contentContainerStyle={styles.listContent}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item, section }) => {
              if (section.renderItem) {
                return section.renderItem({ item });
              }
              return null;
            }}
            renderSectionHeader={({ section: { title } }) => (
              <Typography variant="h3" style={styles.sectionTitle}>
                {title}
              </Typography>
            )}
            ListFooterComponent={() => (
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
            )}
          />
          <View style={styles.footer}>
            <Button
              title={`Confirm Purchase - ${(
                total +
                deliveryFee +
                serviceFee
              ).toFixed(2)}`}
              variant="primary"
              fullWidth
              onPress={handlePurchase}
              loading={loading}
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
