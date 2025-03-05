
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.1f7b27b9fbff49e783036ceb2e7b98cf',
  appName: 'emergency-pipe-pal',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'https://1f7b27b9-fbff-49e7-8303-6ceb2e7b98cf.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always',
    scheme: 'emergency-pipe-pal',
    limitsNavigationsToAppBoundDomains: true
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  }
};

export default config;
