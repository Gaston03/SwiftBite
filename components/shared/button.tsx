import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

type ButtonProps = TouchableOpacityProps & {
  title: string;
  variant?: 'primary' | 'secondary';
};

export function Button({ title, variant = 'primary', style, ...props }: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, styles[variant], style]} {...props}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: '#FF6347',
  },
  secondary: {
    backgroundColor: '#666',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
