import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, Easing } from 'react-native-reanimated';
import { useTheme } from '@/hooks/use-theme';

const logo = require('@/assets/images/logo.png');

export function SplashScreen() {
  const { currentTheme } = useTheme();
  const { colors } = currentTheme;
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  React.useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.1, {
        duration: 1200,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, [scale]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: 150,
      height: 150,
      resizeMode: 'contain',
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, animatedStyle]}>
        <Image source={logo} style={styles.logo} />
      </Animated.View>
    </View>
  );
}
