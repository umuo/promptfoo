import { Button } from '@app/components/ui/button';
import { useTranslation } from '@app/i18n';
import { StrategyItem } from './StrategyItem';

import type { StrategyCardData } from './types';

interface AgenticStrategiesGroupProps {
  singleTurnStrategies: StrategyCardData[];
  multiTurnStrategies: StrategyCardData[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onConfigClick: (id: string) => void;
  onSelectNone: (strategyIds: string[]) => void;
  isStrategyDisabled: (strategyId: string) => boolean;
  isRemoteGenerationDisabled: boolean;
  isStrategyAuthGated?: (strategyId: string) => boolean;
  isStrategyConfigured?: (strategyId: string) => boolean;
}

export function AgenticStrategiesGroup({
  singleTurnStrategies,
  multiTurnStrategies,
  selectedIds,
  onToggle,
  onConfigClick,
  onSelectNone,
  isStrategyDisabled,
  isRemoteGenerationDisabled,
  isStrategyAuthGated,
  isStrategyConfigured,
}: AgenticStrategiesGroupProps) {
  const { t } = useTranslation();

  // Calculate selected strategies across both subsections
  const allAgenticStrategies = [
    ...singleTurnStrategies.map((s) => s.id),
    ...multiTurnStrategies.map((s) => s.id),
  ];
  const selectedAgenticStrategies = allAgenticStrategies.filter((id) => selectedIds.includes(id));

  const handleResetAll = () => {
    if (onSelectNone) {
      onSelectNone(selectedAgenticStrategies);
    }
  };

  return (
    <div className="mb-8">
      {/* Parent header */}
      <div className="mb-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold">{t('redteamStrategies.agenticTitle')}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{t('redteamStrategies.agenticDesc')}</p>
        </div>
        {(singleTurnStrategies.length > 0 || multiTurnStrategies.length > 0) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetAll}
            disabled={selectedAgenticStrategies.length === 0}
            className="px-0 font-normal hover:bg-transparent"
          >
            {t('redteamStrategies.resetAll')}
          </Button>
        )}
      </div>

      {/* Container with subtle border/background */}
      <div className="rounded-lg border border-border bg-background/50 p-4">
        {/* Single-turn only subsection */}
        {singleTurnStrategies.length > 0 && (
          <div className="mb-6">
            <h4 className="mb-2 font-semibold">{t('redteamStrategies.singleTurnOnly')}</h4>
            <p className="mb-4 text-sm text-muted-foreground">
              {t('redteamStrategies.singleTurnOnlyDesc')}
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {singleTurnStrategies.map((strategy) => (
                <StrategyItem
                  key={strategy.id}
                  strategy={strategy}
                  isSelected={selectedIds.includes(strategy.id)}
                  onToggle={onToggle}
                  onConfigClick={onConfigClick}
                  isDisabled={isStrategyDisabled(strategy.id)}
                  isRemoteGenerationDisabled={isRemoteGenerationDisabled}
                  isAuthGated={isStrategyAuthGated ? isStrategyAuthGated(strategy.id) : false}
                  isConfigured={isStrategyConfigured ? isStrategyConfigured(strategy.id) : true}
                />
              ))}
            </div>
          </div>
        )}

        {/* Single and multi-turn subsection */}
        {multiTurnStrategies.length > 0 && (
          <div>
            <h4 className="mb-2 font-semibold">{t('redteamStrategies.singleAndMultiTurn')}</h4>
            <p className="mb-4 text-sm text-muted-foreground">
              {t('redteamStrategies.singleAndMultiTurnDesc')}
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {multiTurnStrategies.map((strategy) => (
                <StrategyItem
                  key={strategy.id}
                  strategy={strategy}
                  isSelected={selectedIds.includes(strategy.id)}
                  onToggle={onToggle}
                  onConfigClick={onConfigClick}
                  isDisabled={isStrategyDisabled(strategy.id)}
                  isRemoteGenerationDisabled={isRemoteGenerationDisabled}
                  isAuthGated={isStrategyAuthGated ? isStrategyAuthGated(strategy.id) : false}
                  isConfigured={isStrategyConfigured ? isStrategyConfigured(strategy.id) : true}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
