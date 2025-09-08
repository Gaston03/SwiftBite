import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Establishment } from '@/models/establishment';
import { Ionicons } from '@expo/vector-icons';

type EstablishmentCardProps = {
  establishment: Establishment;
  onPress: () => void;
};

export function EstablishmentCard({ establishment, onPress }: EstablishmentCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: establishment.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{establishment.name}</Text>
        <View style={styles.detailsContainer}>
          <Ionicons name="star" size={16} color="#FFC107" />
          <Text style={styles.rating}>{establishment.rate}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.deliveryTime}>{establishment.delivery_time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
  },
  dot: {
    marginHorizontal: 6,
    fontSize: 14,
    color: '#666',
  },
  deliveryTime: {
    fontSize: 14,
    color: '#666',
  },
});
