import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

interface Device {
    id: number;
    name: string;
    room: string;
    command?: string;
    color?: string;
}

const COLORS = ['#1565b6', '#f44336', '#4caf50', '#ff9800', '#9c27b0', '#03a9f4'];

export default function AddModal() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [command, setCommand] = useState('');
    const [color, setColor] = useState(COLORS[0]);

    const saveDevice = async () => {
        if (!name || !room) {
            Alert.alert('Error', 'Device name and room are required');
            return;
        }

        const stored = await AsyncStorage.getItem('devices');
        const devices: Device[] = stored ? JSON.parse(stored) : [];
        const newDevice: Device = {
            id: Date.now(),
            name,
            room,
            command,
            color,
        };

        await AsyncStorage.setItem('devices', JSON.stringify([...devices, newDevice]));
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Device Name</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter device name"
                placeholderTextColor="#aaa"
            />

            <Text style={styles.label}>Room</Text>
            <TextInput
                style={styles.input}
                value={room}
                onChangeText={setRoom}
                placeholder="Enter room name"
                placeholderTextColor="#aaa"
            />

            <Text style={styles.label}>Command (optional)</Text>
            <TextInput
                style={styles.input}
                value={command}
                onChangeText={setCommand}
                placeholder="Enter command"
                placeholderTextColor="#aaa"
            />

            <Text style={styles.label}>Choose Color</Text>
            <View style={styles.colorRow}>
                {COLORS.map((c) => (
                    <TouchableOpacity
                        key={c}
                        style={[styles.colorBox, { backgroundColor: c, borderWidth: color === c ? 3 : 0 }]}
                        onPress={() => setColor(c)}
                    />
                ))}
            </View>

            <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={saveDevice}>
                <Text style={styles.buttonText}>Add Device</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#232632',
        padding: 20,
        justifyContent: 'center',
    },
    label: {
        color: '#fff',
        marginBottom: 5,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: '#444',
        borderRadius: 10,
        padding: 10,
        color: '#fff',
        marginBottom: 15,
    },
    colorRow: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    colorBox: {
        width: 40,
        height: 40,
        borderRadius: 8,
        marginRight: 10,
    },
    button: {
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '800',
    },
});
