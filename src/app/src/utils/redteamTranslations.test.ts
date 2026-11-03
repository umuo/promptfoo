import { describe, expect, it } from 'vitest';
import { getPluginDisplayName, getStrategyDisplayName } from './redteamTranslations';

describe('redteamTranslations', () => {
  describe('getPluginDisplayName', () => {
    it('returns English display name by default', () => {
      expect(getPluginDisplayName('bfla')).toBe('Function-Level Authorization Bypass');
      expect(getPluginDisplayName('harmful:cybercrime')).toBe('Cybercrime');
      expect(getPluginDisplayName('sql-injection')).toBe('SQL Injection');
    });

    it('returns Chinese display name when isZh is true', () => {
      expect(getPluginDisplayName('bfla', true)).toBe('功能级权限绕过 (BFLA)');
      expect(getPluginDisplayName('harmful:cybercrime', true)).toBe('网络犯罪与网络黑产');
      expect(getPluginDisplayName('sql-injection', true)).toBe('SQL 注入');
    });

    it('resolves metric names to Chinese translations via categoryAliasesReverse', () => {
      expect(getPluginDisplayName('BFLAEnforcement', true)).toBe('功能级权限绕过 (BFLA)');
      expect(getPluginDisplayName('AsciiSmuggling', true)).toBe('ASCII 隐写走私');
      expect(getPluginDisplayName('PoliticalStatement', true)).toBe('政治言论偏向');
      expect(getPluginDisplayName('Hallucination', true)).toBe('事实幻觉与虚假信息');
      expect(getPluginDisplayName('Cybercrime', true)).toBe('网络犯罪与网络黑产');
      expect(getPluginDisplayName('Requests containing profanity', true)).toBe('粗俗不雅言论');
    });

    it('returns fallback for unknown plugin keys', () => {
      expect(getPluginDisplayName('unknown-plugin', true)).toBe('unknown-plugin');
      expect(getPluginDisplayName('unknown-plugin', false)).toBe('unknown-plugin');
    });
  });

  describe('getStrategyDisplayName', () => {
    it('returns English display name by default', () => {
      expect(getStrategyDisplayName('jailbreak:composite')).toBe('Multi-Vector Safety Bypass');
      expect(getStrategyDisplayName('crescendo')).toBe('Multi-Turn Crescendo');
      expect(getStrategyDisplayName('basic')).toBe('Baseline Testing');
    });

    it('returns Chinese display name when isZh is true', () => {
      expect(getStrategyDisplayName('jailbreak:composite', true)).toBe('复合多向量越狱');
      expect(getStrategyDisplayName('crescendo', true)).toBe('多轮渐进式诱导 (Crescendo)');
      expect(getStrategyDisplayName('basic', true)).toBe('基线测试 (无策略)');
    });

    it('returns fallback for unknown strategy keys', () => {
      expect(getStrategyDisplayName('unknown-strategy', true)).toBe('unknown-strategy');
      expect(getStrategyDisplayName('unknown-strategy', false)).toBe('unknown-strategy');
    });
  });
});
