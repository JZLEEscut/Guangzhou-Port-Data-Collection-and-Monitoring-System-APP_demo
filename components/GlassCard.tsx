import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/Colors';

interface GlassCardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    intensity?: number;
}

export function GlassCard({ children, style, intensity = 20 }: GlassCardProps) {
    return (
        <View style={[styles.container, style]}>
            <BlurView intensity={intensity} tint="dark" style={StyleSheet.absoluteFill} />
            <LinearGradient
                colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.0)']}
                style={StyleSheet.absoluteFill}
            />
            <View style={styles.border} />
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: 'rgba(15, 23, 42, 0.6)', // Fallback / Base tint
        borderWidth: 1,
        borderColor: 'transparent', // Handled by inner border view for gradient border simulation if needed, or simple color
        // Simple white border as requested
        // "Fine white border"
    },
    border: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.glassBorder,
        zIndex: 1,
        pointerEvents: 'none',
    },
    content: {
        padding: 16,
        zIndex: 2,
    },
});
