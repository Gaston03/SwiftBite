import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "@/hooks/use-theme";
import { UserRole } from "@/models/enums";
import { SignUpData } from "@/services/auth-service";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";
import { useAddress } from "@/hooks/use-address";
import { useCustomer } from "@/hooks/use-customer";

export default function RegisterScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: "customer" | "deliverer" }>();
  const { currentTheme } = useTheme();
  const { colors, fonts, sizes } = currentTheme;
  const { signUp, isLoading, error, clearError, completeOnboarding } =
    useAuth();
  const { createAddress } = useAddress();
  const { customer } = useCustomer();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (error) {
      Alert.alert("Registration Error", error.message, [
        { text: "OK", onPress: () => clearError() },
      ]);
    }
  }, [clearError, error]);

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Email and password cannot be empty.");
      return;
    }
    if (!role) {
      console.error("Role is missing.");
      return;
    }
    try {
      const signUpData: SignUpData = {
        email,
        password,
        role: role === "customer" ? UserRole.CUSTOMER : UserRole.DELIVERER,
      };
      const user = await signUp(signUpData);
      if (role === "customer" && user) {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission denied",
            "Permission to access location was denied"
          );
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        let reverseGeocode = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (reverseGeocode.length > 0) {
          const { city, postalCode, street, region } = reverseGeocode[0];
          await createAddress({
            city: city || "Unknown",
            area: street || "Unknown",
            zipCode: postalCode || "Unknown",
            instructions: "",
            latitude,
            longitude,
            customerId: user.id,
          });
        }
      }
      await completeOnboarding();
    } catch (error) {
      console.log("error: ", error);
      Alert.alert("Registration Error", error as string, [
        { text: "OK", onPress: () => clearError() },
      ]);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      gap: sizes.padding,
      padding: sizes.padding,
    },
    title: {
      ...fonts.h1,
      color: colors.text,
      textAlign: "center",
      marginBottom: sizes.padding * 2,
    },
    input: {
      marginBottom: sizes.padding,
    },
    button: {
      marginTop: sizes.padding,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: sizes.padding,
    },
    link: {
      ...fonts.body3,
      color: colors.primary,
      marginLeft: sizes.padding / 2,
    },
  });

  return (
    <Screen>
      <View style={styles.container}>
        <Typography style={styles.title}>
          Create Your {role === "customer" ? "Customer" : "Deliverer"} Account
        </Typography>
        <Input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          style={styles.button}
          title="Sign Up"
          onPress={handleRegister}
          loading={isLoading}
        />
        <View style={styles.footer}>
          <Typography>Already have an account?</Typography>
          <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
            <Typography style={styles.link}>Sign In</Typography>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}
