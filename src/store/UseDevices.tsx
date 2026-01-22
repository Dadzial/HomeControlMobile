import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Device {
    id: number;
    name: string;
    room: string;
    command?: string;
    color?: string;
}

type DeviceState = {
    devices: Device[];
    addDevice: (device: Device) => void;
    removeDevice: (id: number) => void;
    setDevices: (devices: Device[]) => void;
};

export const useDevices = create<DeviceState>()(
    persist(
        (set) => ({
            devices: [],
            addDevice: (device) =>
                set((state) => ({ devices: [...state.devices, device] })),
            removeDevice: (id) =>
                set((state) => ({
                    devices: state.devices.filter((d) => d.id !== id),
                })),
            setDevices: (devices) => set({ devices }),
        }),
        {
            name: 'devices-storage',
            storage: {
                getItem: async (name: string) => {
                    const value = await AsyncStorage.getItem(name);
                    return value ? JSON.parse(value) : null;
                },
                setItem: async (name: string, value: any) => {
                    await AsyncStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: async (name: string) => {
                    await AsyncStorage.removeItem(name);
                },
            },
        }
    )
);