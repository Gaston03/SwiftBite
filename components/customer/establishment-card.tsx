import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Establishment } from '@/models/establishment';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';

type EstablishmentCardProps = {
  establishment: Establishment;
  onPress: () => void;
};

export function EstablishmentCard({ establishment, onPress }: EstablishmentCardProps) {
  const { currentTheme } = useTheme();
  const { colors, fonts, sizes } = currentTheme;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.tertiary,
      borderRadius: sizes.radius * 2,
      marginBottom: sizes.padding,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: 150,
    },
    infoContainer: {
      padding: sizes.padding,
    },
    name: {
      ...fonts.h3,
      color: colors.text,
      marginBottom: sizes.base,
    },
    detailsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rating: {
      ...fonts.body4,
      color: colors.text,
      marginLeft: sizes.base / 2,
    },
    dot: {
      marginHorizontal: sizes.base,
      fontSize: 14,
      color: colors.gray,
    },
    deliveryTime: {
      ...fonts.body4,
      color: colors.gray,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: establishment.imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{establishment.name}</Text>
        <View style={styles.detailsContainer}>
          <Ionicons name="star" size={16} color={colors.primary} />
          <Text style={styles.rating}>{establishment.rate}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.deliveryTime}>{establishment.deliveryTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
