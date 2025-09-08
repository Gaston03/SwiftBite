import { Pressable, StyleSheet, Text, PressableProps } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

type ButtonProps = PressableProps & {
  title: string;
  variant?: 'primary' | 'secondary';
};

export function Button({ title, variant = 'primary', style, ...props }: ButtonProps) {
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
      alignItems: 'center',
    },
    primary: {
      backgroundColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.tertiary,
    },
    text: {
      ...fonts.h4,
    },
    primaryText: {
      color: colors.black,
    },
    secondaryText: {
      color: colors.white,
    },
  });

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        style={[styles.button, styles[variant], style]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        {...props}>
        <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
}
