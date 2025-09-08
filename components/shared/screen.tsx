import { View, StyleSheet, ScrollView, ViewProps } from 'react-native';

interface ScreenProps extends ViewProps {
  scrollable?: boolean;
}

export function Screen({ scrollable = false, children, style, ...props }: ScreenProps) {
  if (scrollable) {
    return (
      <ScrollView contentContainerStyle={[styles.container, style]} {...props}>
        {children}
      </ScrollView>
    );
  }

  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
});
