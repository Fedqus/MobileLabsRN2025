import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';


import ShopScreen from '../screens/ShopScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ChatsScreen from '../screens/ChatsScreen';
import SecurityScreen from '../screens/SecurityScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          const iconSize = focused ? size + 4 : size;

          if (route.name === 'Магазин') {
            iconName = 'cart';
          } else if (route.name === 'Спільнота') {
            iconName = 'people';
          } else if (route.name === 'Чати') {
            iconName = 'chatbubbles';
          } else if (route.name === 'Безпека') {
            iconName = 'shield-sharp';
          } else if (route.name === 'Профіль') {
            iconName = 'person';
          }
          return <Ionicons name={iconName} size={iconSize} color={color} />;
        },
        tabBarActiveTintColor: '#5dade2',
        tabBarInactiveTintColor: '#aeb6bf',
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Магазин" component={ShopScreen} />
      <Tab.Screen name="Спільнота" component={CommunityScreen} />
      <Tab.Screen name="Чати" component={ChatsScreen} />
      <Tab.Screen name="Безпека" component={SecurityScreen} />
      <Tab.Screen name="Профіль" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#2c3e50',
    borderTopWidth: 0,
    height: 60,
    paddingBottom: 5,
    paddingTop: 5,
  },
  tabBarLabelStyle: {
    fontSize: 10,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f6',
  },
});

export default AppNavigator;