import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CartIcon } from '@/components/customer/cart-icon';

export default function CustomerLayout() {
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
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={24} />
          ),
          headerRight: () => <CartIcon />,
        }}
      />
      {/* The following screens are part of the customer flow but won't have a tab button */}
      <Tabs.Screen name="establishments/[type]" options={{ headerShown: false }} />
      <Tabs.Screen name="establishment/[id]" options={{ headerShown: false }} />
      <Tabs.Screen name="product/[id]" options={{ headerShown: false }} />
      <Tabs.Screen name="cart" options={{ headerShown: false, presentation: 'modal' }} />
    </Tabs>
  );
}
