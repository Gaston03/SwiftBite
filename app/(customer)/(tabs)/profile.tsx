import { ProfileRow } from "@/components/customer/profile-row";
import { Button } from "@/components/shared/button";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { MOCK_USER } from "@/constants/mock-data";
import { useTheme } from "@/hooks/use-theme";
import { Stack, useRouter } from "expo-router";
import { Image, StyleSheet, View, ScrollView } from "react-native";
import { useHeaderHeight } from '@react-navigation/elements';

export default function ProfileScreen() {
  const router = useRouter();
  const { currentTheme } = useTheme();
  const { colors, fonts, sizes } = currentTheme;
  const headerHeight = useHeaderHeight();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      alignItems: 'center',
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
      padding: sizes.padding,
    },
  });

  return (
    <Screen withPadding={false}>
      <Stack.Screen options={{ title: "My Profile" }} />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingTop: headerHeight }}>
          <View style={styles.header}>
            <Image source={{ uri: MOCK_USER.avatar }} style={styles.avatar} />
            <Typography variant="h2" style={styles.name}>
              {MOCK_USER.firstName} {MOCK_USER.lastName}
            </Typography>
            <Typography style={styles.email}>{MOCK_USER.email}</Typography>
          </View>

          <View style={styles.menu}>
            <ProfileRow icon="list" label="My Orders" onPress={() => router.navigate('/(customer)/(tabs)/cart')} />
            <ProfileRow icon="card-outline" label="Payment Methods" onPress={() => {}} />
            <ProfileRow icon="person-outline" label="My Details" onPress={() => {}} />
            <ProfileRow icon="help-circle-outline" label="Help Center" onPress={() => {}} />
            <ProfileRow icon="settings-outline" label="Settings" onPress={() => {}} />
            {/* <ProfileRow
              icon="contrast-outline"
              label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              onPress={toggleTheme}
            /> */}
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            title="Switch to Deliverer"
            onPress={() => router.push('/(deliverer)/home')}
            variant="primary"
          />
        </View>
      </View>
    </Screen>
  );
}
