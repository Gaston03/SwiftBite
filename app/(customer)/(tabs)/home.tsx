import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Screen } from '@/components/shared/screen';
import { Typography } from '@/components/shared/typography';
import { Input } from '@/components/shared/input';
import { MOCK_CATEGORIES } from '@/constants/mock-data';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';
import { Avatar } from '@/components/shared/avatar';
import { Image } from 'expo-image';
import Animated, { useAnimatedStyle, withDelay, withTiming } from 'react-native-reanimated';

const CategoryCard = ({ item, onPress, index }) => {
  const { currentTheme } = useTheme();
  const { colors, fonts, sizes } = currentTheme;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withDelay(index * 100, withTiming(1)),
      transform: [{ translateY: withDelay(index * 100, withTiming(0, { duration: 500 })) }],
    };
  });

  const styles = StyleSheet.create({
    categoryCard: {
      backgroundColor: colors.tertiary,
      borderRadius: sizes.radius,
      padding: sizes.padding / 2,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: sizes.padding,
      width: 120,
      height: 120,
    },
    categoryImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginBottom: sizes.base,
    },
    categoryName: {
      ...fonts.body4,
      color: colors.text,
      textAlign: 'center',
    },
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
  const { currentTheme } = useTheme();
  const { colors, fonts, sizes } = currentTheme;

  const handleCategoryPress = (type: string) => {
    router.push(`/(customer)/establishments/${type}`);
  };

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: sizes.padding,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    locationText: {
      ...fonts.h3,
      color: colors.text,
      marginRight: sizes.base,
    },
    searchBar: {
      marginBottom: sizes.padding2,
    },
    sectionTitle: {
      ...fonts.h2,
      color: colors.text,
      marginBottom: sizes.padding,
    },
    gridContainer: {
      paddingBottom: sizes.padding,
    },
  });

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <View>
          <Typography variant="body3" style={{ color: colors.gray }}>
            Delivering to
          </Typography>
          <View style={styles.locationContainer}>
            <Typography variant="h3" style={styles.locationText}>
              123 Ocean Drive
            </Typography>
            <Ionicons name="chevron-down" size={24} color={colors.primary} />
          </View>
        </View>
        <Avatar source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }} />
      </View>

      <Input
        placeholder="What are you looking for?"
        style={styles.searchBar}
      />

      <Typography variant="h2" style={styles.sectionTitle}>
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
