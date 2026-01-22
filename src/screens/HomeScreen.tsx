import React from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddDevice from '../components/AddDevice';
import { Ionicons } from '@expo/vector-icons';
import { useDevices } from '../store/UseDevices'

export default function HomeScreen() {
    const { devices, removeDevice } = useDevices();

    return (
        <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.grid}>
                    <AddDevice />

                    {devices.map((device) => (
                        <View key={device.id} style={[styles.tile, { backgroundColor: device.color || '#2a2e3b' }]}>
                            <TouchableOpacity style={styles.delete} onPress={() => removeDevice(device.id)}>
                                <Ionicons name="trash" size={18} color="#fff" />
                            </TouchableOpacity>
                            <Text style={styles.tileName}>{device.name}</Text>
                            <Text style={styles.tileRoom}>{device.room}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#232632' },
    scrollContainer: { flexGrow: 1, padding: 10},
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' },
    tile: {
        width: '30%',
        aspectRatio: 1,
        borderRadius: 15,
        margin: '1.66%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    delete: {
        position: 'absolute',
        top: 5,
        right: 5,
        padding: 4,
    },
    tileName: { color: '#fff', fontWeight: '600' },
    tileRoom: { color: '#f8f5f5', fontSize: 12 },
});
