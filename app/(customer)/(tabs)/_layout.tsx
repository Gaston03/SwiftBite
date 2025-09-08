import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CartTabIcon } from '@/components/customer/cart-tab-icon';

export default function CustomerTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF6347',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, focused, size }) => (
            <CartTabIcon color={color} focused={focused} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
