import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  borderRadius: 12,
  padding: 16,
  padding2: 24,
  padding3: 32,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: { fontFamily: 'SpaceMono-Regular', fontSize: SIZES.largeTitle, lineHeight: 55 },
  h1: { fontFamily: 'SpaceMono-Regular', fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: 'SpaceMono-Regular', fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: 'SpaceMono-Regular', fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: 'SpaceMono-Regular', fontSize: SIZES.h4, lineHeight: 22 },
  body1: { fontFamily: 'SpaceMono-Regular', fontSize: SIZES.body1, lineHeight: 36 },
  body2: { fontFamily: 'SpaceMono-Regular', fontSize: SIZES.body2, lineHeight: 30 },
  body3: { fontFamily: 'SpaceMono-Regular', fontSize: SIZES.body3, lineHeight: 22 },
  body4: { fontFamily: 'SpaceMono-Regular', fontSize: SIZES.body4, lineHeight: 22 },
};

const darkColors = {
  primary: '#FF5722', // Deep Orange
  secondary: '#212121',
  tertiary: '#424242',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#9E9E9E',
  lightGray: '#F5F5F5',
  background: '#121212',
  text: '#FFFFFF',
};

const lightColors = {
  primary: '#FF5722',
  secondary: '#FFFFFF',
  tertiary: '#F5F5F5',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#616161',
  lightGray: '#E0E0E0',
  background: '#FFFFFF',
  text: '#000000',
};

export const darkTheme = {
  colors: darkColors,
  sizes: SIZES,
  fonts: FONTS,
};

export const lightTheme = {
  colors: lightColors,
  sizes: SIZES,
  fonts: FONTS,
};
