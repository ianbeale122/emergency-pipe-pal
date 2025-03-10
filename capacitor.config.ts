
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.1f7b27b9fbff49e783036ceb2e7b98cf',
  appName: 'emergency-pipe-pal',
  webDir: 'dist',
  server: {
    url: 'https://1f7b27b9-fbff-49e7-8303-6ceb2e7b98cf.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always',
  },
};

export default config;
