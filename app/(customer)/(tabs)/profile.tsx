import { ProfileRow } from "@/components/customer/profile-row";
import { Button } from "@/components/shared/button";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { MOCK_USER } from "@/constants/mock-data";
import { useTheme } from "@/hooks/use-theme";
import { Stack, useRouter } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const { currentTheme, toggleTheme, theme } = useTheme();
  const { colors, fonts, sizes } = currentTheme;

  const styles = StyleSheet.create({
    header: {
      alignItems: 'center',
      marginBottom: sizes.padding2,
      paddingTop: sizes.padding,
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
    content: {
      flex: 1,
      paddingHorizontal: sizes.padding,
    },
    menu: {
      flex: 1,
    },
    switchButton: {
      marginTop: sizes.padding2,
      marginBottom: sizes.padding,
    },
  });

  return (
    <Screen withPadding={false}>
      <Stack.Screen options={{ title: "My Profile" }} />
      <View style={styles.header}>
        <Image source={{ uri: MOCK_USER.avatar }} style={styles.avatar} />
        <Typography variant="h2" style={styles.name}>
          {MOCK_USER.firstName} {MOCK_USER.lastName}
        </Typography>
        <Typography style={styles.email}>{MOCK_USER.email}</Typography>
      </View>

      <View style={styles.content}>
        <View style={styles.menu}>
          <ProfileRow icon="list" label="My Orders" onPress={() => {}} />
          <ProfileRow icon="card-outline" label="Payment Methods" onPress={() => {}} />
          <ProfileRow icon="person-outline" label="My Details" onPress={() => {}} />
          <ProfileRow icon="help-circle-outline" label="Help Center" onPress={() => {}} />
          <ProfileRow icon="settings-outline" label="Settings" onPress={() => {}} />
          <ProfileRow
            icon="contrast-outline"
            label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            onPress={toggleTheme}
          />
        </View>

        <Button
          title="Switch to Deliverer"
          onPress={() => router.push('/(deliverer)/home')}
          variant="secondary"
          style={styles.switchButton}
        />
      </View>
    </Screen>
  );
}
