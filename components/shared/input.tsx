import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { COLORS, SIZES, FONTS } from '@/constants/theme';

export function Input(props: TextInputProps) {
  return (
    <TextInput
      style={[styles.input, props.style]}
      placeholderTextColor={COLORS.gray}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.tertiary,
    color: COLORS.white,
    borderWidth: 0,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 1.5,
    ...FONTS.body3,
  },
});
