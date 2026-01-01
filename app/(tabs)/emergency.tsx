import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { ScreenBackground } from '@/components/ScreenBackground';
import { GlassCard } from '@/components/GlassCard';
import { Colors } from '@/constants/Colors';
import { Alerts } from '@/utils/mockData';
import { Ionicons } from '@expo/vector-icons';

export default function EmergencyScreen() {
    const renderAlert = ({ item }: { item: typeof Alerts[0] }) => (
        <View style={styles.alertItem}>
            <View style={[styles.alertLevelBar,
            {
                backgroundColor: item.level === 'danger' ? Colors.danger :
                    item.level === 'warning' ? Colors.warning : Colors.info
            }
            ]} />
            <View style={styles.alertContent}>
                <View style={styles.alertHeader}>
                    <Text style={[styles.alertLevelText, { color: item.level === 'danger' ? Colors.danger : Colors.textSecondary }]}>
                        {item.level.toUpperCase()}
                    </Text>
                    <Text style={styles.alertTime}>{item.time}</Text>
                </View>
                <Text style={styles.alertMessage}>{item.message}</Text>
            </View>
        </View>
    );

    return (
        <ScreenBackground>
            <View style={styles.header}>
                <Text style={styles.screenTitle}>应急指挥中心 Emergency</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Resource Stats */}
                <Text style={styles.sectionTitle}>应急资源状态</Text>
                <GlassCard style={styles.resourceCard}>
                    <View style={styles.resourceRow}>
                        <View style={styles.resourceLabelRow}>
                            <Text style={styles.resourceLabel}>消防车队 (Fire Engines)</Text>
                            <Text style={styles.resourceVal}>12/15</Text>
                        </View>
                        <View style={styles.progressBarBg}>
                            <View style={[styles.progressBarFill, { width: '80%', backgroundColor: Colors.danger }]} />
                        </View>
                    </View>
                    <View style={styles.resourceRow}>
                        <View style={styles.resourceLabelRow}>
                            <Text style={styles.resourceLabel}>医疗急救 (Medical Units)</Text>
                            <Text style={styles.resourceVal}>5/8</Text>
                        </View>
                        <View style={styles.progressBarBg}>
                            <View style={[styles.progressBarFill, { width: '62%', backgroundColor: Colors.success }]} />
                        </View>
                    </View>
                    <View style={styles.resourceRow}>
                        <View style={styles.resourceLabelRow}>
                            <Text style={styles.resourceLabel}>应急人员 (Personnel)</Text>
                            <Text style={styles.resourceVal}>85/100</Text>
                        </View>
                        <View style={styles.progressBarBg}>
                            <View style={[styles.progressBarFill, { width: '85%', backgroundColor: Colors.primary }]} />
                        </View>
                    </View>
                </GlassCard>

                {/* Alert Feed */}
                <View style={styles.feedHeader}>
                    <Ionicons name="notifications" size={20} color={Colors.warning} />
                    <Text style={styles.sectionTitle}>实时告警流 Alert Feed</Text>
                </View>

                <GlassCard style={styles.feedCard}>
                    <FlatList
                        data={Alerts}
                        renderItem={renderAlert}
                        keyExtractor={item => item.id}
                        scrollEnabled={false} // since it's inside ScrollView
                    />
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
        color: Colors.danger,
        letterSpacing: 1
    },
    scrollContent: {
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 12,
    },
    resourceCard: {
        marginBottom: 24,
        padding: 20,
    },
    resourceRow: {
        marginBottom: 16,
    },
    resourceLabelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    resourceLabel: {
        color: Colors.textSecondary,
        fontSize: 12,
    },
    resourceVal: {
        color: Colors.text,
        fontWeight: 'bold',
        fontSize: 12,
    },
    progressBarBg: {
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 3,
    },
    feedHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8
    },
    feedCard: {
        padding: 0, // List items have padding
        marginBottom: 20
    },
    alertItem: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    alertLevelBar: {
        width: 4,
        borderRadius: 2,
        marginRight: 12,
    },
    alertContent: {
        flex: 1,
    },
    alertHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    alertLevelText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    alertTime: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
    alertMessage: {
        fontSize: 14,
        color: Colors.text,
    },
});
