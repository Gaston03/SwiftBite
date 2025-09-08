import { ScrollView, StyleSheet, View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';

interface ScreenProps extends ViewProps {
  scrollable?: boolean;
}

export function Screen({ scrollable = false, children, style, ...props }: ScreenProps) {
  const { currentTheme } = useTheme();
  const { colors } = currentTheme;

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      padding: 16,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
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
