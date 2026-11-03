import { en } from './en';
import { zhCN } from './zh-CN';

import type { SupportedLanguage } from '../types';

export const translations: Record<SupportedLanguage, typeof en> = {
  en,
  'zh-CN': zhCN,
};

export { en, zhCN };
