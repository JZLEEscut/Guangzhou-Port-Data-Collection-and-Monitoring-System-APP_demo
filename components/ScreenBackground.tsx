import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export function ScreenBackground({ children, noSafeArea = false }: { children: React.ReactNode, noSafeArea?: boolean }) {
    return (
        <LinearGradient
            colors={[Colors.background, Colors.secondaryBackground]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <StatusBar style="light" />
            {noSafeArea ? (
                <View style={styles.content}>{children}</View>
            ) : (
                <SafeAreaView style={styles.content}>
                    {children}
                </SafeAreaView>
            )}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
});
