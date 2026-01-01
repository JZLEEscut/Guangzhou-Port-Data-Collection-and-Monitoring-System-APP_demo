export const KPIs = [
    { title: '今日吞吐量', value: '142.5k', unit: 'TEU', trend: '+12%', status: 'success' },
    { title: '在港船舶', value: '48', unit: '艘', trend: '+3', status: 'normal' },
    { title: '作业效率', value: '32.4', unit: 'Move/h', trend: '-2%', status: 'warning' },
    { title: '设备在线率', value: '99.8%', unit: '', trend: 'Stable', status: 'success' },
];

export const Ships = [
    { id: '1', name: 'COSCO SHIPPING', country: 'CN', status: 'Inbound', docking: 'N24' },
    { id: '2', name: 'EVER GIVEN', country: 'PA', status: 'Docked', docking: 'S08' },
    { id: '3', name: 'MAERSK SEALAND', country: 'DK', status: 'Departing', docking: 'E12' },
    { id: '4', name: 'CMA CGM', country: 'FR', status: 'Waiting', docking: '-' },
    { id: '5', name: 'MSC IRIS', country: 'CH', status: 'Inbound', docking: 'N25' },
];

export const ChartData = {
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(0, 210, 255, ${opacity})`, // Cyan
            strokeWidth: 2
        }
    ],
    legend: ["TEU Throughput"]
};

export const Alerts = [
    { id: '1', time: '10:42', level: 'danger', message: 'Typhoon Signal No.3 Hoisted' },
    { id: '2', time: '09:15', level: 'warning', message: 'Crane #4 High Wind Alarm' },
    { id: '3', time: '08:30', level: 'info', message: 'System Maintenance Scheduled' },
    { id: '4', time: '07:12', level: 'success', message: 'Shift A Operations Completed' },
    { id: '5', time: '06:00', level: 'info', message: 'Daily Data Sync Finished' },
];

export const CarbonStats = {
    current: 85, // % to target
    monthTotal: '1,240T',
    target: '1,500T',
    measures: [
        { title: 'Shore Power', status: 'Active', saving: '120T' },
        { title: 'E-Trucks', status: 'Active', saving: '45T' },
        { title: 'Solar Grid', status: 'Maintenance', saving: '0T' },
    ]
};
