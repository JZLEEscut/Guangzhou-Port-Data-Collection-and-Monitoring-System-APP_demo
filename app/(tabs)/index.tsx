import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, FlatList } from 'react-native';
import { ScreenBackground } from '@/components/ScreenBackground';
import { GlassCard } from '@/components/GlassCard';
import { Colors } from '@/constants/Colors';
import { KPIs, ChartData, Ships } from '@/utils/mockData';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function RealtimeScreen() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const renderKPI = (item: typeof KPIs[0], index: number) => (
    <GlassCard key={index} style={styles.kpiCard}>
      <View style={styles.kpiHeader}>
        <Text style={styles.kpiTitle}>{item.title}</Text>
        {item.status === 'success' && <Ionicons name="caret-up" color={Colors.success} size={14} />}
        {item.status === 'warning' && <Ionicons name="caret-down" color={Colors.warning} size={14} />}
        {item.status === 'normal' && <Ionicons name="remove" color={Colors.textSecondary} size={14} />}
      </View>
      <Text style={styles.kpiValue}>
        {item.value}<Text style={styles.kpiUnit}>{item.unit}</Text>
      </Text>
      <Text style={[styles.kpiTrend, { color: item.status === 'success' ? Colors.success : item.status === 'warning' ? Colors.warning : Colors.textSecondary }]}>
        {item.trend}
      </Text>
    </GlassCard>
  );

  return (
    <ScreenBackground>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>广州港数据采集监控中心</Text>
          <Text style={styles.subText}>生产调度实时大屏</Text>
        </View>
        <Text style={styles.timeText}>
          {time.toLocaleTimeString('zh-CN', { hour12: false })}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* KPI Grid */}
        <View style={styles.kpiGrid}>
          {KPIs.map(renderKPI)}
        </View>

        {/* Chart */}
        <GlassCard style={styles.chartCard}>
          <Text style={styles.sectionTitle}>24小时吞吐量趋势 (TEU)</Text>
          <LineChart
            data={ChartData}
            width={width - 64} // padding adjustment
            height={220}
            chartConfig={{
              backgroundColor: 'transparent',
              backgroundGradientFrom: 'transparent',
              backgroundGradientTo: 'transparent',
              decimalPlaces: 0,
              color: (opacity = 1) => Colors.primary,
              labelColor: (opacity = 1) => Colors.textSecondary,
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: Colors.secondary
              },
              style: {
                borderRadius: 16
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </GlassCard>

        {/* Ship List */}
        <GlassCard style={styles.listCard}>
          <Text style={styles.sectionTitle}>近期入港船舶</Text>
          {Ships.map((ship) => (
            <View key={ship.id} style={styles.listItem}>
              <View style={styles.shipIcon}>
                <Ionicons name="boat" size={20} color={Colors.text} />
              </View>
              <View style={styles.shipInfo}>
                <Text style={styles.shipName}>{ship.name}</Text>
                <Text style={styles.shipCountry}>{ship.country}</Text>
              </View>
              <View style={[styles.statusBadge,
              ship.status === 'Inbound' ? { backgroundColor: 'rgba(0, 210, 255, 0.2)' } :
                ship.status === 'Docked' ? { backgroundColor: 'rgba(74, 222, 128, 0.2)' } :
                  { backgroundColor: 'rgba(148, 163, 184, 0.2)' }
              ]}>
                <Text style={[styles.statusText,
                ship.status === 'Inbound' ? { color: Colors.info } :
                  ship.status === 'Docked' ? { color: Colors.success } :
                    { color: Colors.textSecondary }
                ]}>{ship.status}</Text>
              </View>
            </View>
          ))}
        </GlassCard>

        <View style={{ height: 80 }} />
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  timeText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
    fontVariant: ['tabular-nums'],
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  kpiCard: {
    width: '48%', // roughly half
    marginBottom: 16,
    padding: 12,
  },
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  kpiTitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  kpiUnit: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  kpiTrend: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  chartCard: {
    marginBottom: 16,
    alignItems: 'center', // Center Chart
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  listCard: {
    marginBottom: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  shipIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  shipInfo: {
    flex: 1,
  },
  shipName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
  },
  shipCountry: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});
