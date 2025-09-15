import { ProfileRow } from "@/components/customer/profile-row";
import { Button } from "@/components/shared/button";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { useAuth } from "@/hooks/use-auth";
import { useCustomer } from "@/hooks/use-customer";
import { useTheme } from "@/hooks/use-theme";
import { useHeaderHeight } from "@react-navigation/elements";
import { Stack, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const { currentTheme } = useTheme();
  const { colors, fonts, sizes } = currentTheme;
  const headerHeight = useHeaderHeight();
  const { loading, customer } = useCustomer();
  const { signOut } = useAuth();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      alignItems: "center",
      paddingTop: sizes.padding,
      paddingHorizontal: sizes.padding,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: sizes.padding,
    },
    name: {
      ...fonts.h2,
      color: colors.text,
      marginBottom: sizes.base,
    },
    email: {
      ...fonts.body3,
      color: colors.gray,
    },
    menu: {
      paddingHorizontal: sizes.padding,
      marginTop: sizes.padding2,
    },
    buttonContainer: {
      flex: 1,
      gap: sizes.padding / 2,
      padding: sizes.padding,
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  const handleSignOut = async () => await signOut();

  if (loading) {
    return (
      <Screen style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </Screen>
    );
  }

  if (!customer) {
    return (
      <Screen style={styles.center}>
        <Typography>Could not load profile.</Typography>
      </Screen>
    );
  }

  return (
    <Screen withPadding={false}>
      <Stack.Screen options={{ title: "My Profile" }} />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingTop: headerHeight }}>
          <View style={styles.header}>
            <Image
              source={{
                uri: "https://placehold.co/100x100/9C27B0/FFFFFF/png?text=AV",
              }}
              style={styles.avatar}
            />
            <Typography variant="h2" style={styles.name}>
              {customer.firstName} {customer.lastName}
            </Typography>
            <Typography style={styles.email}>{customer.email}</Typography>
          </View>

          <View style={styles.menu}>
            <ProfileRow
              icon="list"
              label="My Orders"
              onPress={() => router.navigate("/(customer)/(tabs)/cart")}
            />
            <ProfileRow
              icon="card-outline"
              label="Payment Methods"
              onPress={() => router.push("/(customer)/profile/payment-methods")}
            />
            <ProfileRow
              icon="person-outline"
              label="My Details"
              onPress={() => router.push("/(customer)/profile/details")}
            />
            <ProfileRow
              icon="help-circle-outline"
              label="Help Center"
              onPress={() => {}}
            />
            <ProfileRow
              icon="settings-outline"
              label="Settings"
              onPress={() => {}}
            />
            {/* <ProfileRow
              icon="contrast-outline"
              label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              onPress={toggleTheme}
            /> */}
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button title="Logout" onPress={handleSignOut} variant="primary" />
          <Button
            title="Switch to Deliverer"
            onPress={() => router.push("/(deliverer)/home")}
            variant="secondary"
          />
        </View>
      </View>
    </Screen>
  );
}
