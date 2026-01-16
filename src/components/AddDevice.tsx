import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import { HomeStackParamList } from '../navigation/HomeStack';
import {StackNavigationProp} from "@react-navigation/stack";

type AddDeviceNavigationProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;

export default function AddDevice() {
    const navigation = useNavigation<AddDeviceNavigationProp>();

    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AddModal')}>
            <View style={styles.iconContainer}>
                <Ionicons name="add-outline" size={40} color="#666" />
            </View>
            <Text style={styles.text}>Add device</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '30%',
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: '#444',
        borderStyle: 'dashed',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1.66%',
        backgroundColor: '#2a2e3b',
    },
    iconContainer: {
        marginBottom: 8,
    },
    text: {
        color: '#888',
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
        paddingHorizontal: 2,
    },
});
