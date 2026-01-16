import {View, Text, StyleSheet} from 'react-native';

export default function ConnectionScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.test}>Connection</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#232632',
        justifyContent: 'center',
        alignItems: 'center',
    },
    test:{
        color: 'white',
    }
});
