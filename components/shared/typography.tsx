import { Text, StyleSheet, TextProps } from 'react-native';

type TypographyProps = TextProps & {
  variant?: 'title' | 'subtitle' | 'body' | 'caption';
};

export function Typography({ variant = 'body', style, ...props }: TypographyProps) {
  return <Text style={[styles[variant], style]} {...props} />;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 12,
    color: '#666',
  },
});
