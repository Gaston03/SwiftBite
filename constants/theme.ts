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

const FONT_FAMILLY = 'SpaceMono-Regular'

export const FONTS = {
  largeTitle: { fontFamily: FONT_FAMILLY, fontSize: SIZES.largeTitle, lineHeight: 55 },
  h1: { fontFamily: FONT_FAMILLY, fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: FONT_FAMILLY, fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: FONT_FAMILLY, fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: FONT_FAMILLY, fontSize: SIZES.h4, lineHeight: 22 },
  body1: { fontFamily: FONT_FAMILLY, fontSize: SIZES.body1, lineHeight: 36 },
  body2: { fontFamily: FONT_FAMILLY, fontSize: SIZES.body2, lineHeight: 30 },
  body3: { fontFamily: FONT_FAMILLY, fontSize: SIZES.body3, lineHeight: 22 },
  body4: { fontFamily: FONT_FAMILLY, fontSize: SIZES.body4, lineHeight: 22 },
};

const darkColors = {
  primary: '#ff7e5f', // Deep Orange
  secondary: '#463a41',
  tertiary: '#392f35',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#9E9E9E',
  lightGray: '#F5F5F5',
  background: '#2a2024',
  text: '#FFFFFF',
};

const lightColors = {
  primary: '#ff7e5f',
  secondary: '#ffedea',
  tertiary: '#fff0eb',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#616161',
  lightGray: '#E0E0E0',
  background: '#fff9f5',
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
