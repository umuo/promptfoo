import { useI18nContext } from './I18nContext';

export function useTranslation() {
  const { t, language, setLanguage, isZh, isEn, availableLanguages } = useI18nContext();

  return {
    t,
    language,
    setLanguage,
    isZh,
    isEn,
    availableLanguages,
  };
}
