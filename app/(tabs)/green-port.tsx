import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { ScreenBackground } from '@/components/ScreenBackground';
import { GlassCard } from '@/components/GlassCard';
import { Colors } from '@/constants/Colors';
import { CarbonStats } from '@/utils/mockData';
import { ProgressChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function GreenPortScreen() {
    const data = {
        labels: ["Target"], // optional
        data: [CarbonStats.current / 100]
    };

    const chartConfig = {
        backgroundGradientFrom: "transparent",
        backgroundGradientTo: "transparent",
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(74, 222, 128, ${opacity})`, // Green #4ade80
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    return (
        <ScreenBackground>
            <View style={styles.header}>
                <Text style={styles.screenTitle}>绿色智慧港口 Report</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Main Dashboard */}
                <GlassCard style={styles.mainCard}>
                    <Text style={styles.cardTitle}>本月碳中和进度</Text>
                    <View style={styles.chartContainer}>
                        <ProgressChart
                            data={data}
                            width={width - 64}
                            height={180}
                            strokeWidth={16}
                            radius={60}
                            chartConfig={chartConfig}
                            hideLegend={true}
                        />
                        <View style={styles.centerLabel}>
                            <Text style={styles.percentageText}>{CarbonStats.current}%</Text>
                            <Text style={styles.percentageLabel}>达标率</Text>
                        </View>
                    </View>

                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>排放总量</Text>
                            <Text style={styles.statValue}>{CarbonStats.monthTotal}</Text>
                        </View>
                        <View style={[styles.vertLine]} />
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>减排目标</Text>
                            <Text style={styles.statValue}>{CarbonStats.target}</Text>
                        </View>
                    </View>
                </GlassCard>

                {/* ECO Measures */}
                <Text style={styles.sectionTitle}>节能减排措施</Text>
                <View style={styles.grid}>
                    {CarbonStats.measures.map((item, index) => (
                        <GlassCard key={index} style={styles.measureCard}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="leaf" size={24} color={Colors.success} />
                            </View>
                            <Text style={styles.measureTitle}>{item.title}</Text>
                            <Text style={styles.savingText}>预计减排: {item.saving}</Text>
                            <View style={[styles.statusTag,
                            item.status === 'Active' ? { backgroundColor: 'rgba(74, 222, 128, 0.2)' } :
                                { backgroundColor: 'rgba(251, 191, 36, 0.2)' }
                            ]}>
                                <Text style={[styles.statusText,
                                item.status === 'Active' ? { color: Colors.success } : { color: Colors.warning }
                                ]}>{item.status}</Text>
                            </View>
                        </GlassCard>
                    ))}
                </View>

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
        color: Colors.success, // Green theme header
        letterSpacing: 0.5
    },
    scrollContent: {
        paddingHorizontal: 16,
    },
    mainCard: {
        marginBottom: 24,
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 16,
        color: Colors.textSecondary,
        marginBottom: 0,
        alignSelf: 'flex-start'
    },
    chartContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        height: 180,
    },
    centerLabel: {
        position: 'absolute',
        alignItems: 'center',
    },
    percentageText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.success,
    },
    percentageLabel: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
    statsRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        paddingTop: 16
    },
    statItem: {
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.text,
        marginTop: 4
    },
    vertLine: {
        width: 1,
        height: '80%',
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 16
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    measureCard: {
        width: '48%',
        marginBottom: 16,
        padding: 16,
        alignItems: 'center',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(74, 222, 128, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12
    },
    measureTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 4,
        textAlign: 'center'
    },
    savingText: {
        fontSize: 10,
        color: Colors.textSecondary,
        marginBottom: 12
    },
    statusTag: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    statusText: {
        fontSize: 10,
        fontWeight: 'bold'
    }
});
