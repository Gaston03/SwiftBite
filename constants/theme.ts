import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#FFD700', // A vibrant yellow, similar to Glovo
  secondary: '#212121', // A dark color for backgrounds
  tertiary: '#424242', // A slightly lighter dark color for cards and surfaces
  white: '#FFFFFF',
  black: '#000000',
  gray: '#9E9E9E',
  lightGray: '#F5F5F5',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  padding2: 36,

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

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
