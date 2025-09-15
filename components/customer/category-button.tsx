import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

type CategoryButtonProps = {
  name: string;
  image: string;
  onPress: () => void;
};

export function CategoryButton({ name, image, onPress }: CategoryButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 8,
    width: 100,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
