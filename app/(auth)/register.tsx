import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTheme } from "@/hooks/use-theme";
import { Screen } from "@/components/shared/screen";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Typography } from "@/components/shared/typography";

export default function RegisterScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: "customer" | "deliverer" }>();
  const { currentTheme } = useTheme();
  const { colors, fonts, sizes } = currentTheme;
  const { signUp, completeOnboarding, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!role) {
      // This should not happen in the normal flow
      console.error("Role is missing.");
      return;
    }
    try {
      await signUp({ email, password, options: { data: { name, role } } });
      await completeOnboarding();
      // The root redirector should handle navigation to the home screen.
      // But we can give it a push just in case.
      if (role === "customer") {
        router.replace("/(customer)/home");
      } else {
        router.replace("/(deliverer)/home");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
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
      ...fonts.body,
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
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
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
