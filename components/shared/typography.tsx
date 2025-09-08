import { Text, StyleSheet, TextProps } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

type TypographyProps = TextProps & {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'body3' | 'body4';
};

export function Typography({ variant = 'body3', style, ...props }: TypographyProps) {
  const { currentTheme } = useTheme();
  const { colors, fonts } = currentTheme;

  const styles = StyleSheet.create({
    h1: { ...fonts.h1, color: colors.text },
    h2: { ...fonts.h2, color: colors.text },
    h3: { ...fonts.h3, color: colors.text },
    h4: { ...fonts.h4, color: colors.text },
    body1: { ...fonts.body1, color: colors.text },
    body2: { ...fonts.body2, color: colors.text },
    body3: { ...fonts.body3, color: colors.gray },
    body4: { ...fonts.body4, color: colors.gray },
  });

  return <Text style={[styles[variant], style]} {...props} />;
}
