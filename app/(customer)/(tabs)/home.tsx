import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Screen } from '@/components/shared/screen';
import { Typography } from '@/components/shared/typography';
import { Input } from '@/components/shared/input';
import { MOCK_CATEGORIES } from '@/constants/mock-data';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS } from '@/constants/theme';
import { Avatar } from '@/components/shared/avatar';
import { Image } from 'expo-image';
import Animated, { useAnimatedStyle, withDelay, withTiming } from 'react-native-reanimated';

const CategoryCard = ({ item, onPress, index }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withDelay(index * 100, withTiming(1)),
      transform: [{ translateY: withDelay(index * 100, withTiming(0, { duration: 500 })) }],
    };
  });

  return (
    <Animated.View style={[{ opacity: 0, transform: [{ translateY: 50 }] }, animatedStyle]}>
      <TouchableOpacity style={styles.categoryCard} onPress={onPress}>
        <Image source={{ uri: item.image }} style={styles.categoryImage} />
        <Text style={styles.categoryName}>{item.name}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function CustomerHomeScreen() {
  const router = useRouter();

  const handleCategoryPress = (type: string) => {
    router.push(`/(customer)/establishments/${type}`);
  };

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <View>
          <Typography variant="subtitle" style={{ color: COLORS.gray }}>
            Delivering to
          </Typography>
          <View style={styles.locationContainer}>
            <Typography variant="title" style={styles.locationText}>
              123 Ocean Drive
            </Typography>
            <Ionicons name="chevron-down" size={24} color={COLORS.primary} />
          </View>
        </View>
        <Avatar source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }} />
      </View>

      <Input
        placeholder="What are you looking for?"
        placeholderTextColor={COLORS.gray}
        style={styles.searchBar}
      />

      <Typography variant="title" style={styles.sectionTitle}>
        Categories
      </Typography>

      <FlatList
        data={MOCK_CATEGORIES}
        renderItem={({ item, index }) => (
          <CategoryCard item={item} onPress={() => handleCategoryPress(item.type)} index={index} />
        )}
        keyExtractor={(item) => item.type}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    ...FONTS.h3,
    color: COLORS.white,
    marginRight: SIZES.base,
  },
  searchBar: {
    backgroundColor: COLORS.tertiary,
    color: COLORS.white,
    borderWidth: 0,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 1.5,
    marginBottom: SIZES.padding2,
    ...FONTS.body3,
  },
  sectionTitle: {
    ...FONTS.h2,
    color: COLORS.white,
    marginBottom: SIZES.padding,
  },
  gridContainer: {
    paddingBottom: SIZES.padding,
  },
  categoryCard: {
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.radius,
    padding: SIZES.padding / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.padding,
    width: 120,
    height: 120,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: SIZES.base,
  },
  categoryName: {
    ...FONTS.body4,
    color: COLORS.white,
    textAlign: 'center',
  },
});
