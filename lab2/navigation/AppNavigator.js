import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

import { useTheme } from '../context/ThemeContext';

import ShopScreen from '../screens/ShopScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ChatsScreen from '../screens/ChatsScreen';
import SecurityScreen from '../screens/SecurityScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    const { colors } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    const iconSize = focused ? size + 2 : size;

                    if (route.name === 'Магазин') iconName = 'cart';
                    else if (route.name === 'Спільнота') iconName = 'people';
                    else if (route.name === 'Чати') iconName = 'chatbubbles';
                    else if (route.name === 'Безпека') iconName = 'shield-sharp';
                    else if (route.name === 'Профіль') iconName = 'person';

                    return <Ionicons name={iconName} size={iconSize} color={color} />;
                },
                tabBarActiveTintColor: colors.tabBarActiveTint,
                tabBarInactiveTintColor: colors.tabBarInactiveTint,
                tabBarStyle: {
                    backgroundColor: colors.tabBarBackground,
                    borderTopWidth: 0,
                    height: 60,
                    paddingBottom: 5,
                    paddingTop: 5,
                },
                tabBarLabelStyle: styles.tabBarLabel,
                headerShown: true,
                headerStyle: {
                    backgroundColor: colors.card,
                },
                headerTitleStyle: {
                    color: colors.text,
                },
            })}
        >
            <Tab.Screen name="Магазин" component={ShopScreen} options={{ title: 'Магазин' }} />
            <Tab.Screen name="Спільнота" component={CommunityScreen} options={{ title: 'Спільнота' }} />
            <Tab.Screen name="Чати" component={ChatsScreen} options={{ title: 'Чати' }} />
            <Tab.Screen name="Безпека" component={SecurityScreen} options={{ title: 'Безпека' }} />
            <Tab.Screen name="Профіль" component={ProfileScreen} options={{ title: 'Профіль' }} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBarLabel: {
        fontSize: 10,
    },
});

export default AppNavigator;