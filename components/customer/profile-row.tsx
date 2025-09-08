import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ProfileRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
};

export function ProfileRow({ icon, label, onPress }: ProfileRowProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name={icon} size={24} color="#333" style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
      <Ionicons name="chevron-forward" size={24} color="#ccc" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  icon: {
    marginRight: 16,
  },
  label: {
    flex: 1,
    fontSize: 16,
  },
});
