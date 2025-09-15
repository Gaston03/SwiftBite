import { View, Text, StyleSheet } from 'react-native';
import { Checkbox } from 'expo-checkbox';
import { useTheme } from '@/hooks/use-theme';

type ToppingRowProps = {
  name: string;
  price: number;
  isSelected: boolean;
  onValueChange: (isSelected: boolean) => void;
};

export function ToppingRow({ name, price, isSelected, onValueChange }: ToppingRowProps) {
  const { currentTheme } = useTheme();
  const { colors, fonts, sizes } = currentTheme;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: sizes.padding,
      borderBottomWidth: 1,
      borderBottomColor: colors.tertiary,
    },
    checkbox: {
      marginRight: sizes.padding,
    },
    name: {
      ...fonts.body3,
      color: colors.text,
      flex: 1,
    },
    price: {
      ...fonts.body3,
      color: colors.gray,
    },
  });

  return (
    <View style={styles.container}>
      <Checkbox
        style={styles.checkbox}
        value={isSelected}
        onValueChange={onValueChange}
        color={isSelected ? colors.primary : undefined}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>+${price.toFixed(2)}</Text>
    </View>
  );
}
