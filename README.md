# 广州港数据采集监控系统 Demo (Android App)

## 项目简介

这是一个基于 React Native (Expo) 开发的港口数据监控系统演示应用。采用“深色科技风 (Dark Tech Dashboard)”设计，展示了广州港的实时监控、数字孪生、绿色港口及应急指挥四大核心功能模块。

## 核心功能

*   **实时监控 (Realtime)**: 核心 KPI 指标、24小时吞吐量趋势图、近期入港船舶列表。

*   **数字孪生 (Digital Twin)**: 模拟港口 3D 视频流、实时设备状态监测、环境数据叠加。

*   **绿色港口 (Green Port)**: 碳中和进度监测、节能减排措施管理。

*   **应急指挥 (Emergency)**: 实时告警信息流、应急资源（消防、医疗等）状态统计。

## 技术栈

*   **框架**: Expo (SDK 52), React Native

*   **语言**: TypeScript

*   **路由**: Expo Router (Bottom Tabs)

*   **UI 组件**: `expo-linear-gradient` (渐变), `expo-blur` (毛玻璃), `react-native-chart-kit` (图表)

*   **图标**: Ionicons (@expo/vector-icons)

## 快速开始

### 1. 环境准备

确保您的开发环境已安装 Node.js。

### 2. 安装依赖

进入项目目录并安装依赖：

```bash
cd GuangzhouPortApp
npm install
```

### 3.  运行项目

启动开发服务器：

```bash
npx expo start
```

*   按 `a` 在 Android 模拟器运行。

*   或者在 Android 手机上安装 **Expo Go** 应用，扫描终端显示的二维码进行预览。注意，必须手机与电脑在同一网络下。

## 目录结构

*   `app/(tabs)`: 页面主要逻辑 (首页 `index`, 数字孪生 `digital-twin`, 绿色港口 `green-port`, 应急指挥 `emergency`)

*   `components`: 核心 UI 组件 (`GlassCard`, `ScreenBackground`)

*   `constants`: 样式常量 (`Colors.ts`)

*   `utils`: 模拟数据 (`mockData.ts`)

*   `assets`: 静态资源 (图片, 视频)

***

