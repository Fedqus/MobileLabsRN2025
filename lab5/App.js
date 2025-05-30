import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import FilesScreen from './screens/FilesScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Головна') {
              iconName = focused ? 'home' : 'home-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Файли') {
              iconName = 'folder';
              return <MaterialIcons name={iconName} size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#f8f8f8',
          },
          headerTitleAlign: 'center',
        })}
      >
        <Tab.Screen
          name="Головна"
          component={HomeScreen}
          options={{
            title: 'Головна'
          }}
        />
        <Tab.Screen
          name="Файли"
          component={FilesScreen}
          options={{
            title: 'Файли'
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}