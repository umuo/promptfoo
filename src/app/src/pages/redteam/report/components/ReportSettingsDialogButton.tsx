import React from 'react';

import { Button } from '@app/components/ui/button';
import { Checkbox } from '@app/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@app/components/ui/dialog';
import { Label } from '@app/components/ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '@app/components/ui/tooltip';
import { useTranslation } from '@app/i18n';
import { Settings } from 'lucide-react';
import { useReportStore } from './store';

const ReportSettingsDialogButton = () => {
  const { t } = useTranslation();
  const {
    showUntestedPlugins,
    setShowUntestedPlugins,
    pluginPassRateThreshold,
    setPluginPassRateThreshold,
  } = useReportStore();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle NaN and out-of-range values for display
  const displayThreshold = (() => {
    if (Number.isNaN(pluginPassRateThreshold)) {
      return 'NaN';
    }
    const clampedThreshold = Math.min(1, Math.max(0, pluginPassRateThreshold || 0));
    return (clampedThreshold * 100).toFixed(0);
  })();

  const sliderValue = Number.isNaN(pluginPassRateThreshold)
    ? 0
    : Math.min(1, Math.max(0, pluginPassRateThreshold || 0));

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleOpen}
            aria-label="settings"
            className="text-muted-foreground hover:text-foreground"
          >
            <Settings className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t('redteamReport.reportSettings')}</TooltipContent>
      </Tooltip>

      <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('redteamReport.reportSettings')}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="show-untested"
                checked={showUntestedPlugins}
                onCheckedChange={(checked) => setShowUntestedPlugins(checked === true)}
              />
              <Label htmlFor="show-untested" inline className="cursor-pointer">
                {t('redteamReport.showUntestedPlugins')}
              </Label>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="plugin-pass-rate">
                  {t('redteamReport.passRateThresholdLabel')}
                </Label>
                <span className="text-sm font-medium text-muted-foreground">
                  {displayThreshold}%
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {t('redteamReport.passRateThresholdDesc')}
              </p>
              <input
                id="plugin-pass-rate"
                type="range"
                value={sliderValue}
                onChange={(e) => setPluginPassRateThreshold(Number.parseFloat(e.target.value))}
                min={0}
                max={1}
                step={0.05}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleClose}>{t('common.close')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReportSettingsDialogButton;
