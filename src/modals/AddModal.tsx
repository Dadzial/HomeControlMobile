import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDevices, Device } from '../store/UseDevices'

const COLORS_ROW_1 = ['#1565b6', '#f44336', '#4caf50', '#ff9800', '#9c27b0', '#03a9f4', '#ffeb3b'];
const COLORS_ROW_2 = ['#e91e63', '#00bcd4', '#8bc34a', '#ffc107', '#607d8b', '#795548', '#ffffff'];

export default function AddModal() {
    const navigation = useNavigation();
    const addDevice = useDevices(state => state.addDevice);

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [command, setCommand] = useState('');
    const [color, setColor] = useState(COLORS_ROW_1[0]);

    const saveDevice = () => {
        if (!name || !room) {
            Alert.alert('Error', 'Device name and room are required');
            return;
        }

        const newDevice: Device = { id: Date.now(), name, room, command, color };
        addDevice(newDevice);
        navigation.goBack();
    };

    const renderColorRow = (colors: string[]) => (
        <View style={styles.colorRow}>
            {colors.map((c) => (
                <TouchableOpacity
                    key={c}
                    style={[
                        styles.colorBox,
                        { backgroundColor: c, borderColor: '#fff', borderWidth: color === c ? 2 : 0 }
                    ]}
                    onPress={() => setColor(c)}
                />
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Add Device</Text>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Device Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Name"
                    placeholderTextColor="#666"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Room</Text>
                <TextInput
                    style={styles.input}
                    value={room}
                    onChangeText={setRoom}
                    placeholder="Room"
                    placeholderTextColor="#666"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Command (optional)</Text>
                <TextInput
                    style={styles.input}
                    value={command}
                    onChangeText={setCommand}
                    placeholder="Command"
                    placeholderTextColor="#666"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Choose Color</Text>
                {renderColorRow(COLORS_ROW_1)}
                <View style={{ height: 8 }} />
                {renderColorRow(COLORS_ROW_2)}
            </View>

            <View style={{ flex: 1, minHeight: 10 }} />

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.button, styles.acceptButton]}
                    onPress={saveDevice}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.7}
                >
                    <Text style={[styles.buttonText, { color: '#ffffff' }]}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1d26',
        paddingHorizontal: 25,
        paddingTop: 40,
        paddingBottom: 20,
    },
    headerTitle: {
        color: '#1565b6',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    formGroup: {
        marginBottom: 12,
    },
    label: {
        color: '#8e94a4',
        marginBottom: 5,
        fontWeight: '600',
        fontSize: 12,
        textTransform: 'uppercase',
    },
    input: {
        backgroundColor: '#232632',
        borderWidth: 1,
        borderColor: '#3a3f4e',
        borderRadius: 12,
        padding: 12,
        color: '#fff',
        fontSize: 15,
    },
    colorRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    colorBox: {
        width: 34,
        height: 34,
        borderRadius: 8,
    },
    footer: {
        gap: 10,
    },
    button: {
        width: '100%',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    acceptButton: {
        backgroundColor: '#1565b6',
    },
    cancelButton: {
        backgroundColor: '#d32f2f',
        borderWidth: 1,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});