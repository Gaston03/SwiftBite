import { ScrollView, StyleSheet, View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/theme';

interface ScreenProps extends ViewProps {
  scrollable?: boolean;
  backgroundColor?: string;
}

export function Screen({
  scrollable = false,
  children,
  style,
  backgroundColor = COLORS.secondary,
  ...props
}: ScreenProps) {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      {scrollable ? (
        <ScrollView contentContainerStyle={styles.container} style={style} {...props}>
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.container, style]} {...props}>
          {children}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
});
