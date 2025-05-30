import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import GameScreen from './screens/GameScreen';
import TasksScreen from './screens/TasksScreen';

import { GameProvider } from './context/GameContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GameProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Game">
            <Stack.Screen
              name="Game"
              component={GameScreen}
              options={{ title: 'Clicker Game' }}
            />
            <Stack.Screen
              name="Tasks"
              component={TasksScreen}
              options={{ title: 'Tasks' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GameProvider>
    </GestureHandlerRootView>
  );
}