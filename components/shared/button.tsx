import { useTheme } from "@/hooks/use-theme";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type ButtonProps = PressableProps & {
  title: string;
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
  loading?: boolean;
};

export function Button({
  title,
  variant = "primary",
  fullWidth = false,
  loading = false,
  style,
  ...props
}: ButtonProps) {
  const { currentTheme } = useTheme();
  const { colors, sizes, fonts } = currentTheme;
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const styles = StyleSheet.create({
    button: {
      paddingVertical: sizes.padding,
      paddingHorizontal: sizes.padding * 2,
      borderRadius: sizes.radius,
      alignItems: "center",
      width: fullWidth ? "100%" : "auto",
    },
    primary: {
      backgroundColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.secondary,
    },
    ghost: {
      backgroundColor: colors.gray,
    },
    text: {
      ...fonts.h4,
    },
    primaryText: {
      color: colors.primaryText,
    },
    secondaryText: {
      color: colors.secondaryText,
    },
    ghostText: {
      color: colors.text,
    },
  });

  const textVariantStyle = {
    primary: styles.primaryText,
    secondary: styles.secondaryText,
    ghost: styles.ghostText,
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        style={(state) => [
          styles.button,
          styles[variant],
          typeof style === "function" ? style(state) : style,
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <ActivityIndicator color={colors.primaryText} />
        ) : (
          <Text style={[styles.text, textVariantStyle[variant]]}>{title}</Text>
        )}
      </Pressable>
    </Animated.View>
  );
}
