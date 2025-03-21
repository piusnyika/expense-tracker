// new updated
import React from 'react';
import {
    Dimensions,
    Platform,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenWrapperProps } from '@/types';
import { colors } from '@/constants/theme';

const { height, width } = Dimensions.get('window');

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
    return (
        <SafeAreaView
            style={[
                styles.container,
                style, // Merge any custom styles passed via props
            ]}
        >
            {/* Translucent StatusBar for a fullscreen look */}
            <StatusBar 
                barStyle="light-content" 
                translucent 
                backgroundColor="transparent" 
            />
            
            {/* App content goes here */}
            <View style={styles.innerView}>
                {children}
            </View>
        </SafeAreaView>
    );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ensures the component covers the entire screen
        backgroundColor: colors.neutral900, // Background color
    },
    innerView: {
        flex: 1, // Inner view should also take up the full height
    },
});
