import { View, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

export function Card({ style, ...props }: ViewProps) {
  const { currentTheme } = useTheme();
  const { colors, sizes } = currentTheme;

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.tertiary,
      borderRadius: sizes.radius,
      padding: sizes.padding,
      borderWidth: 1,
      borderColor: colors.gray,
    },
  });

  return <View style={[styles.card, style]} {...props} />;
}
