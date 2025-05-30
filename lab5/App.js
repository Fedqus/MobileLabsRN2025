import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import FilesScreen from './screens/FilesScreen';
import FileManagerScreen from './screens/FileManagerScreen';
import FileViewerScreen from './screens/FileViewerScreen';

const Tab = createBottomTabNavigator();
const FilesStack = createNativeStackNavigator();

function FilesStackNavigator() {
  return (
    <FilesStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <FilesStack.Screen
        name="FilesMain"
        component={FilesScreen}
        options={{ title: 'Файли' }}
      />
      <FilesStack.Screen
        name="FileManager"
        component={FileManagerScreen}
      />
      <FilesStack.Screen
        name="FileViewer"
        component={FileViewerScreen}
      />
    </FilesStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Головна') {
              return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />;
            } else if (route.name === 'Файли') {
              return <MaterialIcons name='folder' size={size} color={color} />;
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
        />
        <Tab.Screen
          name="Файли"
          component={FilesStackNavigator}
          options={{
            title: 'Файли',
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}