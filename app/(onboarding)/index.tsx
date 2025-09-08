import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { COLORS, SIZES, FONTS } from '@/constants/theme';
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';

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
  return (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );
};

const Paginator = ({ data, scrollX }) => {
  return (
    <View style={styles.paginatorContainer}>
      {data.map((_, i) => {
        const style = useAnimatedStyle(() => {
          const inputRange = [(i - 1) * SIZES.width, i * SIZES.width, (i + 1) * SIZES.width];
          const dotWidth = interpolate(scrollX.value, inputRange, [10, 20, 10], Extrapolate.CLAMP);
          const opacity = interpolate(scrollX.value, inputRange, [0.3, 1, 0.3], Extrapolate.CLAMP);
          return {
            width: dotWidth,
            opacity,
          };
        });
        return <Animated.View style={[styles.dot, style]} key={i.toString()} />;
      })}
    </View>
  );
};

const NextButton = ({ scrollTo, isLastSlide }) => {
    const router = useRouter();
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

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
  },
  slide: {
    width: SIZES.width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.padding * 2,
  },
  image: {
    width: SIZES.width * 0.7,
    height: SIZES.width * 0.7,
    resizeMode: 'contain',
  },
  title: {
    ...FONTS.h1,
    color: COLORS.white,
    textAlign: 'center',
    marginTop: SIZES.padding2,
  },
  subtitle: {
    ...FONTS.body3,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: SIZES.padding,
    maxWidth: '70%',
  },
  paginatorContainer: {
      flexDirection: 'row',
      height: 64,
      justifyContent: 'center',
      alignItems: 'center',
  },
  dot: {
      height: 10,
      borderRadius: 5,
      backgroundColor: COLORS.primary,
      marginHorizontal: 8,
  },
  button: {
      backgroundColor: COLORS.primary,
      padding: SIZES.padding,
      borderRadius: SIZES.radius,
      width: '80%',
      alignItems: 'center',
      marginBottom: 30,
  },
  buttonText: {
      ...FONTS.h4,
      color: COLORS.black,
      fontWeight: 'bold'
  }
});
