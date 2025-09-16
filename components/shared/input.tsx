import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { useTheme } from "@/hooks/use-theme";

type InputProps = TextInputProps & {
  textarea?: boolean;
};

export function Input({ textarea, ...props }: InputProps) {
  const { currentTheme } = useTheme();
  const { colors, sizes, fonts } = currentTheme;

  const styles = StyleSheet.create({
    input: {
      backgroundColor: colors.tertiary,
      color: colors.text,
      borderRadius: sizes.radius,
      paddingHorizontal: sizes.padding,
      paddingVertical: sizes.padding / 1.5,
      ...fonts.body3,
    },
  });

  return (
    <TextInput
      style={[styles.input, props.style]}
      placeholderTextColor={colors.gray}
      multiline={textarea}
      numberOfLines={!textarea ? 1 : 5}
      textAlignVertical='top'
      {...props}
    />
  );
}
