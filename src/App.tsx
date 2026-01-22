import { NavigationContainer } from '@react-navigation/native';
import BottomNavDrawler from "./navigation/BottomNavDrawler";
import { StatusBar } from 'react-native';

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar barStyle="light-content" />
            <BottomNavDrawler/>
        </NavigationContainer>
    );
}
