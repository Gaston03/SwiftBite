import { useTheme } from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type ProfileRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
};

export function ProfileRow({ icon, label, onPress }: ProfileRowProps) {
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
    icon: {
      marginRight: sizes.padding,
    },
    label: {
      ...fonts.body3,
      color: colors.text,
      flex: 1,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name={icon} size={24} color={colors.text} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
      <Ionicons name="chevron-forward" size={24} color={colors.gray} />
    </TouchableOpacity>
  );
}
