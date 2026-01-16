import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddModal from '../modals/AddModal';

const Stack = createStackNavigator();

export type HomeStackParamList = {
    HomeScreen: undefined;
    AddModal: undefined;
};

export default function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AddModal"
                component={AddModal}
                options={{
                    presentation: 'modal',
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}
