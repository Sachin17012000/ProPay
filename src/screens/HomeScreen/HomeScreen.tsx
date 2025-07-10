import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';
const HomeScreen: React.FC = () => {
    console.log('homeapp launched');
    
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
        </View>
    );
};

export default HomeScreen;
