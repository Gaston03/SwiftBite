import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useTheme } from '@/hooks/use-theme';
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';
import { Screen } from '@/components/shared/screen';

const onboardingSlides = [
  {
    id: '1',
    image: require('@/assets/images/onboarding-1.png'),
    title: 'Welcome to SwiftBite!',
    subtitle: 'Browse thousands of restaurants and stores near you.',
  },
  {
    id: '2',
    image: require('@/assets/images/onboarding-2.png'),
    title: 'Easy and Secure Ordering',
    subtitle: 'Order your favorite food with just a few taps.',
  },
  {
    id: '3',
    image: require('@/assets/images/onboarding-3.png'),
    title: 'Blazing Fast Delivery',
    subtitle: 'Get your food delivered to your doorstep in minutes.',
  },
];

const Slide = ({ item }) => {
  const { currentTheme } = useTheme();
  const { colors, fonts, sizes } = currentTheme;

  const styles = StyleSheet.create({
    slide: {
      width: sizes.width,
      alignItems: 'center',
      justifyContent: 'center',
      padding: sizes.padding * 2,
    },
    image: {
      width: sizes.width * 0.7,
      height: sizes.width * 0.7,
      resizeMode: 'contain',
    },
    title: {
      ...fonts.h1,
      color: colors.text,
      textAlign: 'center',
      marginTop: sizes.padding2,
    },
    subtitle: {
      ...fonts.body3,
      color: colors.gray,
      textAlign: 'center',
      marginTop: sizes.padding,
      maxWidth: '70%',
    },
  });

  return (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );
};

const Paginator = ({ data, scrollX }) => {
  const styles = StyleSheet.create({
    paginatorContainer: {
      flexDirection: 'row',
      height: 64,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.paginatorContainer}>
      {data.map((_, i) => (
        <Dot key={i.toString()} index={i} scrollX={scrollX} />
      ))}
    </View>
  );
};

const Dot = ({ index, scrollX }) => {
  const { currentTheme } = useTheme();
  const { colors, sizes } = currentTheme;

  const styles = StyleSheet.create({
    dot: {
      height: 10,
      borderRadius: 5,
      backgroundColor: colors.primary,
      marginHorizontal: 8,
    },
  });

  const style = useAnimatedStyle(() => {
    const inputRange = [(index - 1) * sizes.width, index * sizes.width, (index + 1) * sizes.width];
    const dotWidth = interpolate(scrollX.value, inputRange, [10, 20, 10], Extrapolate.CLAMP);
    const opacity = interpolate(scrollX.value, inputRange, [0.3, 1, 0.3], Extrapolate.CLAMP);
    return {
      width: dotWidth,
      opacity,
    };
  });

  return <Animated.View style={[styles.dot, style]} />;
};

const NextButton = ({ scrollTo, isLastSlide }) => {
    const router = useRouter();
    const { currentTheme } = useTheme();
    const { colors, fonts, sizes } = currentTheme;

    const styles = StyleSheet.create({
        button: {
            backgroundColor: colors.primary,
            padding: sizes.padding,
            borderRadius: sizes.radius,
            width: '80%',
            alignItems: 'center',
            marginBottom: 30,
        },
        buttonText: {
            ...fonts.h4,
            color: colors.black,
            fontWeight: 'bold'
        }
    });

    const onPress = () => {
        if (isLastSlide) {
            router.push('/(auth)/select-role');
        } else {
            scrollTo();
        }
    }
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{isLastSlide ? "Get Started" : "Next"}</Text>
    </TouchableOpacity>
  );
};

export default function OnboardingScreen() {
  const { currentTheme } = useTheme();
  const { colors } = currentTheme;
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
      if (currentIndex < onboardingSlides.length - 1) {
          slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
      }
  }

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <Screen style={styles.container}>
      <View style={{ flex: 3 }}>
        <Animated.FlatList
          data={onboardingSlides}
          renderItem={({ item }) => <Slide item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator data={onboardingSlides} scrollX={scrollX} />
      <NextButton scrollTo={scrollTo} isLastSlide={currentIndex === onboardingSlides.length - 1} />
    </Screen>
  );
}
