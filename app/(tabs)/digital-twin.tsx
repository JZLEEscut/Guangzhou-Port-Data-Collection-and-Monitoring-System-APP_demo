import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { ScreenBackground } from '@/components/ScreenBackground';
import { GlassCard } from '@/components/GlassCard';
import { Colors } from '@/constants/Colors';
import { ResizeMode, Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const VIDEO_HEIGHT = 250;

export default function DigitalTwinScreen() {
    const video = useRef<Video>(null);
    const [status, setStatus] = useState({});
    const [devices, setDevices] = useState([
        { id: 'QC-01', name: 'Quayside Crane #1', status: 'online' },
        { id: 'QC-02', name: 'Quayside Crane #2', status: 'online' },
        { id: 'QC-03', name: 'Quayside Crane #3', status: 'offline' },
        { id: 'RTG-05', name: 'Gantry Crane #5', status: 'online' },
        { id: 'RTG-06', name: 'Gantry Crane #6', status: 'online' },
        { id: 'AGV-12', name: 'Auto Guided Vehicle #12', status: 'maintenance' },
    ]);

    return (
        <ScreenBackground>
            <View style={styles.header}>
                <Text style={styles.screenTitle}>数字孪生港口 Digital Twin</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* 3D View / Video Area */}
                <View style={styles.videoContainer}>
                    <Video
                        ref={video}
                        style={styles.video}
                        // 使用 require 引用本地视频文件
                        // 请确保将您的视频文件命名为 video.mp4 并放入 assets 目录中
                        source={require('../../assets/video.mp4')}
                        useNativeControls={false}
                        resizeMode={ResizeMode.COVER}
                        isLooping
                        shouldPlay
                        isMuted={true}
                        onError={(e) => console.log('Video Error:', e)}
                    />

                    {/* Overlays */}
                    <View style={[styles.overlayItem, { top: 20, left: 20 }]}>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>Berth Occupancy: 8/10</Text>
                        </View>
                    </View>
                    <View style={[styles.overlayItem, { bottom: 20, right: 20 }]}>
                        <View style={[styles.badge, { backgroundColor: 'rgba(0,0,0,0.7)' }]}>
                            <Text style={styles.badgeText}>Wind: 12km/h NW</Text>
                        </View>
                    </View>
                </View>

                {/* Controls */}
                <View style={styles.controlsRow}>
                    <TouchableOpacity style={styles.controlBtn}>
                        <Ionicons name="refresh" size={20} color={Colors.text} />
                        <Text style={styles.controlText}>重置视角</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controlBtn}>
                        <Ionicons name="rainy" size={20} color={Colors.text} />
                        <Text style={styles.controlText}>天气模拟</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controlBtn}>
                        <Ionicons name="layers" size={20} color={Colors.text} />
                        <Text style={styles.controlText}>堆场视图</Text>
                    </TouchableOpacity>
                </View>

                {/* Device Status List */}
                <Text style={styles.sectionHeader}>设备实时状态</Text>
                <GlassCard style={styles.deviceList}>
                    {devices.map((dev, idx) => (
                        <View key={idx} style={styles.deviceRow}>
                            <View style={styles.deviceInfo}>
                                <Ionicons name={dev.name.includes('Vehicle') ? 'car' : 'construct'} size={18} color={Colors.textSecondary} />
                                <Text style={styles.deviceName}>{dev.name}</Text>
                            </View>
                            <View style={styles.statusContainer}>
                                <View style={[styles.statusDot,
                                {
                                    backgroundColor: dev.status === 'online' ? Colors.success :
                                        dev.status === 'offline' ? Colors.danger : Colors.warning
                                }
                                ]} />
                                <Text style={styles.statusLabel}>
                                    {dev.status === 'online' ? '运行中' : dev.status === 'offline' ? '离线' : '维护中'}
                                </Text>
                            </View>
                        </View>
                    ))}
                </GlassCard>

                <View style={{ height: 100 }} />
            </ScrollView>
        </ScreenBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        padding: 20,
        alignItems: 'center',
    },
    screenTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.text,
        letterSpacing: 1
    },
    scrollContent: {
        paddingHorizontal: 16,
    },
    videoContainer: {
        height: VIDEO_HEIGHT,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#000',
        position: 'relative',
        borderWidth: 1,
        borderColor: Colors.glassBorder,
        marginBottom: 20,
    },
    video: {
        width: '100%',
        height: '100%',
        opacity: 0.8, // Make it look a bit digital/darker
    },
    overlayItem: {
        position: 'absolute',
    },
    badge: {
        backgroundColor: 'rgba(0, 210, 255, 0.3)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(0, 210, 255, 0.5)',
        backdropFilter: 'blur(10px)', // Web only, but good for intent
    },
    badgeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12
    },
    controlsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 24,
    },
    controlBtn: {
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        minWidth: 80,
    },
    controlText: {
        color: Colors.text,
        marginTop: 8,
        fontSize: 12,
    },
    sectionHeader: {
        fontSize: 16,
        color: Colors.text,
        marginBottom: 12,
        fontWeight: 'bold',
        paddingLeft: 4
    },
    deviceList: {
        paddingVertical: 8
    },
    deviceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    deviceInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    deviceName: {
        color: Colors.text,
        fontSize: 14,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    statusLabel: {
        color: Colors.textSecondary,
        fontSize: 12
    }
});
