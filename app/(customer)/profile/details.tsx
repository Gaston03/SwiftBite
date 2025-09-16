import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { useCustomer } from "@/hooks/use-customer";
import { useTheme } from "@/hooks/use-theme";
import { Customer } from "@/models/customer";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function MyDetailsScreen() {
  const { currentTheme } = useTheme();
  const { sizes } = currentTheme;
  const { customer, loading, updateCustomer } = useCustomer();
  const [form, setForm] = useState<Partial<Customer>>({
    firstName: customer?.firstName,
    lastName: customer?.lastName,
    email: customer?.email,
    phoneNumber: customer?.phoneNumber,
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

  const handleUpdate = async () => {
    if (!customer) return;
    await updateCustomer(customer.id, form);
  };

  return (
    <Screen>
      <View style={styles.form}>
        <Typography variant="h2">My Details</Typography>
        <Input
          placeholder="First Name"
          value={form.firstName}
          onChangeText={(firstName) => setForm({ ...form, firstName })}
        />
        <Input
          placeholder="Last Name"
          value={form.lastName}
          onChangeText={(lastName) => setForm({ ...form, lastName })}
        />
        <Input
          placeholder="Email"
          value={form.email}
          onChangeText={(email) => setForm({ ...form, email })}
          disabled
        />
        <Input
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChangeText={(phoneNumber) => setForm({ ...form, phoneNumber })}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Save Changes"
            onPress={handleUpdate}
            variant="primary"
            loading={loading}
          />
        </View>
      </View>
    </Screen>
  );
}
