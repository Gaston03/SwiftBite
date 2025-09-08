import { ProfileRow } from "@/components/customer/profile-row";
import { Button } from "@/components/shared/button";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { MOCK_USER } from "@/constants/mock-data";
import { Stack, useRouter } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <Screen>
      <Stack.Screen options={{ title: "My Profile" }} />
      <View style={styles.header}>
        <Image source={{ uri: MOCK_USER.avatar }} style={styles.avatar} />
        <Typography variant="title" style={styles.name}>
          {MOCK_USER.firstName} {MOCK_USER.lastName}
        </Typography>
        <Typography style={styles.email}>{MOCK_USER.email}</Typography>
      </View>

      <View style={styles.menu}>
        <ProfileRow icon="list" label="My Orders" onPress={() => {}} />
        <ProfileRow icon="card-outline" label="Payment Methods" onPress={() => {}} />
        <ProfileRow icon="person-outline" label="My Details" onPress={() => {}} />
        <ProfileRow icon="help-circle-outline" label="Help Center" onPress={() => {}} />
        <ProfileRow icon="settings-outline" label="Settings" onPress={() => {}} />
      </View>

      <Button
        title="Switch to Deliverer"
        onPress={() => router.push('/(deliverer)/home')}
        variant="secondary"
        style={styles.switchButton}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    marginBottom: 4,
  },
  email: {
    color: '#666',
  },
  menu: {
    flex: 1,
  },
  switchButton: {
    marginTop: 24,
  },
});
