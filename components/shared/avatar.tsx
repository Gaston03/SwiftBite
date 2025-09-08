import { Image, StyleSheet, ImageProps } from 'react-native';

export function Avatar(props: ImageProps) {
  return <Image style={styles.avatar} {...props} />;
}

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
