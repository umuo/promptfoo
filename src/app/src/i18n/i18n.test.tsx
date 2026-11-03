import { act, cleanup, render, renderHook, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import LanguageSelector from '../components/LanguageSelector';
import { TooltipProvider } from '../components/ui/tooltip';
import { I18nProvider } from './I18nContext';
import { useTranslation } from './useTranslation';

describe('i18n context & useTranslation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  it('provides translations and defaults to en or detected lang', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper: I18nProvider });
    expect(result.current.language).toBeDefined();
    expect(result.current.availableLanguages).toHaveLength(2);
  });

  it('translates keys properly and switches between languages', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper: I18nProvider });

    act(() => {
      result.current.setLanguage('en');
    });

    expect(result.current.language).toBe('en');
    expect(result.current.isEn).toBe(true);
    expect(result.current.isZh).toBe(false);
    expect(result.current.t('nav.eval')).toBe('Eval');
    expect(result.current.t('nav.new')).toBe('New');

    act(() => {
      result.current.setLanguage('zh-CN');
    });

    expect(result.current.language).toBe('zh-CN');
    expect(result.current.isZh).toBe(true);
    expect(result.current.isEn).toBe(false);
    expect(result.current.t('nav.eval')).toBe('评估');
    expect(result.current.t('nav.new')).toBe('新建');
    expect(result.current.t('redteamReport.title')).toBe('红队漏洞评估报告');
    expect(result.current.t('redteamReport.pageTitleDefault')).toBe('风险评估报告');
    expect(result.current.t('redteamReport.severityCritical')).toBe('严重');
    expect(result.current.t('redteamReport.vulnerabilitiesAndMitigations')).toBe('漏洞与缓解建议');
  });

  it('supports interpolation parameters', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper: I18nProvider });

    act(() => {
      result.current.setLanguage('zh-CN');
    });

    expect(result.current.t('language.currentLanguage', { lang: '中文' })).toBe('当前语言：中文');
  });

  it('falls back to en or fallback text when key is not found', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper: I18nProvider });

    expect(result.current.t('nonexistent.key', undefined, 'Fallback Text')).toBe('Fallback Text');
    expect(result.current.t('nonexistent.key')).toBe('nonexistent.key');
  });

  it('persists selected language in localStorage', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper: I18nProvider });

    act(() => {
      result.current.setLanguage('zh-CN');
    });

    expect(localStorage.getItem('promptfoo_language')).toBe('zh-CN');
  });
});

describe('LanguageSelector component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  it('renders language selector button', () => {
    render(
      <I18nProvider>
        <TooltipProvider>
          <LanguageSelector />
        </TooltipProvider>
      </I18nProvider>,
    );

    const button = screen.getByRole('button', { name: /switch language|切换语言/i });
    expect(button).toBeInTheDocument();
  });
});
