import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeStack from "./HomeStack";
import ConnectionScreen from "../screens/ConnectionScreen";

const Tab = createBottomTabNavigator();
type IconName = React.ComponentProps<typeof Ionicons>['name'];

export default function BottomNavDrawler() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerTitle: () => (
                    <View style={{ alignItems: 'center' }}>
                        <Ionicons name="home-sharp" size={35} color="#1565b6" style={{ marginBottom: -5 }} />
                        <Text style={{ color: '#1565b6', fontWeight: '800', fontSize: 21 }}>
                            HomeControl
                        </Text>
                    </View>
                ),
                headerTitleAlign: 'center',
                headerBackground: () => (
                    <View style={{
                        flex: 1,
                        backgroundColor: '#232632',
                        borderBottomColor: 'rgba(255,255,255,0.2)',
                        borderBottomWidth: 1,
                    }} />
                ),
                headerStyle: {
                    backgroundColor: '#232632',
                },
                tabBarStyle: {
                    backgroundColor: '#232632',
                    borderTopColor: '#ffffff',
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: IconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'apps' : 'apps-outline';
                    } else if (route.name === 'Connections') {
                        iconName = focused ? 'hardware-chip' : 'hardware-chip-outline';
                    } else {
                        iconName = 'help-circle';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#1565b6',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Connections" component={ConnectionScreen} />

        </Tab.Navigator>
    );
}
