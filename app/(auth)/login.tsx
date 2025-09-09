import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/use-theme";
import { Screen } from "@/components/shared/screen";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Typography } from "@/components/shared/typography";

export default function LoginScreen() {
  const router = useRouter();
  const { currentTheme } = useTheme();
  const { colors, fonts, sizes } = currentTheme;
  const { signInWithEmailAndPassword, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword({ email, password });
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
        <Typography style={styles.title}>Welcome Back!</Typography>
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
          title="Sign In"
          onPress={handleLogin}
          disabled={isLoading}
        />
        <View style={styles.footer}>
          <Typography>Don't have an account?</Typography>
          <TouchableOpacity onPress={() => router.push("/(auth)/select-role")}>
            <Typography style={styles.link}>Sign Up</Typography>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}
