(globalThis as any).__biyahe_sdk__ = {};

export * from './db';
export * from './locations';
export * from './trips';
export * from './driver';

interface IInitialSdkParameters {
  environment: 'development' | 'staging' | 'production';
  platform?: 'android' | 'ios' | 'web';
}

export function initializeSdk(options: IInitialSdkParameters) {
  if (options.environment === 'development') {
    let host = 'http://localhost';
    if (options.platform === 'android') host = 'http://10.0.2.2';

    (globalThis as any).__biyahe_sdk__.api = `${host}:8090`;
    (globalThis as any).__biyahe_sdk__.socket = `${host}:3000`;
  }
}
