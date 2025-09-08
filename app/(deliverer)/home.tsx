import { View, Text, StyleSheet } from 'react-native';

export default function DelivererHomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deliverer Home</Text>
      <Text>Welcome, Deliverer! Your tasks will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
