import { Pressable, StyleSheet, Text, PressableProps } from 'react-native';
import { COLORS, SIZES, FONTS } from '@/constants/theme';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

type ButtonProps = PressableProps & {
  title: string;
  variant?: 'primary' | 'secondary';
};

export function Button({ title, variant = 'primary', style, ...props }: ButtonProps) {
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

const styles = StyleSheet.create({
    button: {
      paddingVertical: SIZES.padding,
      paddingHorizontal: SIZES.padding * 2,
      borderRadius: SIZES.radius,
      alignItems: 'center',
    },
    primary: {
      backgroundColor: COLORS.primary,
    },
    secondary: {
      backgroundColor: COLORS.tertiary,
    },
    text: {
      ...FONTS.h4,
    },
    primaryText: {
      color: COLORS.black,
    },
    secondaryText: {
      color: COLORS.white,
    },
  });
