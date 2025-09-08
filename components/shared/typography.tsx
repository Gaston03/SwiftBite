import { Text, StyleSheet, TextProps } from 'react-native';
import { FONTS, COLORS } from '@/constants/theme';

type TypographyProps = TextProps & {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'body3' | 'body4';
};

export function Typography({ variant = 'body3', style, ...props }: TypographyProps) {
  return <Text style={[styles[variant], style]} {...props} />;
}

const styles = StyleSheet.create({
  h1: { ...FONTS.h1, color: COLORS.white },
  h2: { ...FONTS.h2, color: COLORS.white },
  h3: { ...FONTS.h3, color: COLORS.white },
  h4: { ...FONTS.h4, color: COLORS.white },
  body1: { ...FONTS.body1, color: COLORS.lightGray },
  body2: { ...FONTS.body2, color: COLORS.lightGray },
  body3: { ...FONTS.body3, color: COLORS.lightGray },
  body4: { ...FONTS.body4, color: COLORS.gray },
});
