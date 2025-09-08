import { View, Text, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';

type ToppingRowProps = {
  name: string;
  price: number;
  isSelected: boolean;
  onValueChange: (isSelected: boolean) => void;
};

export function ToppingRow({ name, price, isSelected, onValueChange }: ToppingRowProps) {
  return (
    <View style={styles.container}>
      <Checkbox
        style={styles.checkbox}
        value={isSelected}
        onValueChange={onValueChange}
        color={isSelected ? '#FF6347' : undefined}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>+${price.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  checkbox: {
    marginRight: 12,
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
  },
});
