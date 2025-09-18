import { ScrollView, StyleSheet, View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/use-theme";

interface ScreenProps extends ViewProps {
  scrollable?: boolean;
  withPadding?: boolean;
}

export function Screen({
  scrollable = false,
  withPadding = true,
  children,
  style,
  ...props
}: ScreenProps) {
  const { currentTheme } = useTheme();
  const { colors } = currentTheme;
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
    container: {
      flex: 1,
    },
    contentContainer: {
      padding: withPadding ? 16 : 0,
    },
  });

  return (
    <View style={styles.root}>
      {scrollable ? (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          {...props}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.container, styles.contentContainer, style]} {...props}>
          {children}
        </View>
      )}
    </View>
  );
}
