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

export default function RegisterScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: "customer" | "deliverer" }>();
  const { currentTheme } = useTheme();
  const { colors, fonts, sizes } = currentTheme;
  const { signUp, isLoading, error, clearError, completeOnboarding } =
    useAuth();
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
    if (!role) {
      // This should not happen in the normal flow
      console.error("Role is missing.");
      return;
    }
    try {
      const signUpData: SignUpData = {
        email,
        password,
        role: role === "customer" ? UserRole.CUSTOMER : UserRole.DELIVERER,
      };
      await signUp(signUpData);
      await completeOnboarding();
      // The root redirector should handle navigation to the home screen.
      // But we can give it a push just in case.
      // if (role === "customer") {
      //   router.replace("/(customer)/(tabs)/home");
      // } else {
      //   router.replace("/(deliverer)/home");
      // }
    } catch (error) {
      console.log('error: ', error)
      Alert.alert("Registration Error", error as string, [
        { text: "OK", onPress: () => clearError() },
      ]);
      // The error is caught and set in the AuthContext, so we don't need to do anything here.
      // The useEffect hook will handle displaying the alert.
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
          disabled={isLoading}
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
