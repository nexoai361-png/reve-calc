import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.calculator.app',
  appName: 'Calculator',
  webDir: '.',
  server: {
    androidScheme: 'https'
  },
  bundledWebRuntime: false,
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: false
  }
};

export default config;