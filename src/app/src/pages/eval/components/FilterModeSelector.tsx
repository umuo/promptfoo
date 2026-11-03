import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@app/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@app/components/ui/tooltip';
import { useTranslation } from '@app/i18n';
import { cn } from '@app/lib/utils';
import type { EvalResultsFilterMode } from '@promptfoo/types';

interface FilterModeSelectorProps {
  filterMode: EvalResultsFilterMode;
  onChange: (value: EvalResultsFilterMode) => void;
  showDifferentOption?: boolean;
}

export const FilterModeSelector = ({
  filterMode,
  onChange,
  showDifferentOption = true,
}: FilterModeSelectorProps) => {
  const { t } = useTranslation();

  const baseOptions: { value: EvalResultsFilterMode; label: string; tooltip: string }[] = [
    { value: 'all', label: t('filterMode.all'), tooltip: t('filterMode.allTooltip') },
    {
      value: 'failures',
      label: t('filterMode.failures'),
      tooltip: t('filterMode.failuresTooltip'),
    },
    { value: 'passes', label: t('filterMode.passes'), tooltip: t('filterMode.passesTooltip') },
    { value: 'errors', label: t('filterMode.errors'), tooltip: t('filterMode.errorsTooltip') },
    {
      value: 'different',
      label: t('filterMode.different'),
      tooltip: t('filterMode.differentTooltip'),
    },
    {
      value: 'highlights',
      label: t('filterMode.highlights'),
      tooltip: t('filterMode.highlightsTooltip'),
    },
    {
      value: 'user-rated',
      label: t('filterMode.userRated'),
      tooltip: t('filterMode.userRatedTooltip'),
    },
  ];

  const toggleLabels: Record<EvalResultsFilterMode, string> = {
    all: t('filterMode.toggleAll'),
    failures: t('filterMode.toggleFailures'),
    passes: t('filterMode.togglePasses'),
    errors: t('filterMode.toggleErrors'),
    different: t('filterMode.toggleDifferent'),
    highlights: t('filterMode.toggleHighlights'),
    'user-rated': t('filterMode.toggleUserRated'),
  };

  const options = showDifferentOption
    ? baseOptions
    : baseOptions.filter((o) => o.value !== 'different');

  return (
    <>
      {/* Mobile: dropdown */}
      <div className="md:hidden">
        <Select value={filterMode} onValueChange={onChange}>
          <SelectTrigger aria-label="Filter results" className="w-[140px] h-8 text-xs">
            <SelectValue placeholder={t('filterMode.all')} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop: toggle chips */}
      <div className="hidden md:flex items-center gap-0.5 rounded-lg bg-muted/60 p-1">
        {options.map((option) => (
          <Tooltip key={option.value} disableHoverableContent>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => onChange(option.value)}
                aria-pressed={filterMode === option.value}
                className={cn(
                  'px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  filterMode === option.value
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-card/60 hover:text-foreground',
                )}
              >
                {toggleLabels[option.value]}
              </button>
            </TooltipTrigger>
            <TooltipContent>{option.tooltip}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </>
  );
};
