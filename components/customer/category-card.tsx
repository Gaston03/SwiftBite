import { useTheme } from "@/hooks/use-theme";
import { EstablishmentType } from "@/models/enums";
import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";

interface CategoryCardProps {
  item: {
    name: string;
    image: string;
    type: EstablishmentType;
};
  onPress: () => void;
  index: number;
}

const CategoryCard = ({ item, onPress, index }: CategoryCardProps) => {
  const { currentTheme } = useTheme();
  const { colors, fonts, sizes } = currentTheme;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withDelay(index * 100, withTiming(1)),
      transform: [
        {
          translateY: withDelay(index * 100, withTiming(0, { duration: 500 })),
        },
      ],
    };
  });

  const styles = StyleSheet.create({
    categoryCard: {
      backgroundColor: colors.secondary,
      borderRadius: sizes.radius,
      padding: sizes.padding / 2,
      alignItems: "center",
      justifyContent: "center",
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
      color: colors.secondaryText,
      textAlign: "center",
    },
  });

  return (
    <Animated.View
      style={[{ opacity: 0, transform: [{ translateY: 50 }] }, animatedStyle]}
    >
      <TouchableOpacity style={styles.categoryCard} onPress={onPress}>
        <Image source={{ uri: item.image }} style={styles.categoryImage} />
        <Text style={styles.categoryName}>{item.name}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CategoryCard