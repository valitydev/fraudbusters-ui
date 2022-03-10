import type AppConfig from '../../assets/appConfig.json';
import { getBaseClass } from './get-base-class';

export type Config = typeof AppConfig;
export const BASE_CONFIG = getBaseClass<Config>();
