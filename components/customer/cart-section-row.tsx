import { View, StyleSheet, Pressable } from "react-native";
import { Typography } from "@/components/shared/typography";
import { useTheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";

interface CartSectionRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  content: string;
  onPress?: () => void;
}

export function CartSectionRow({
  icon,
  title,
  content,
  onPress,
}: CartSectionRowProps) {
  const { currentTheme } = useTheme();
  const { colors, sizes } = currentTheme;

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: sizes.padding,
    },
    iconContainer: {
      marginRight: sizes.padding,
    },
    infoContainer: {
      flex: 1,
    },
    title: {
      textTransform: "uppercase",
      color: colors.gray,
    },
  });

  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={24} color={colors.gray} />
        </View>
        <View style={styles.infoContainer}>
          <Typography style={styles.title}>{title}</Typography>
          <Typography>{content}</Typography>
        </View>
        {onPress && (
          <Ionicons name="chevron-forward" size={24} color={colors.gray} />
        )}
      </View>
    </Pressable>
  );
}
