import React from 'react';

import { Button } from '@app/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@app/components/ui/dialog';
import { Separator } from '@app/components/ui/separator';
import { useTranslation } from '@app/i18n';
import { RotateCcw, Settings } from 'lucide-react';
import SettingsPanel from './components/SettingsPanel';
import { useSettingsState } from './hooks/useSettingsState';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  resultsTableZoom: number;
  onResultsTableZoomChange: (zoom: number) => void;
}

const TableSettingsModal = ({
  open,
  onClose,
  resultsTableZoom,
  onResultsTableZoomChange,
}: SettingsModalProps) => {
  const { t } = useTranslation();
  const { resetToDefaults } = useSettingsState();

  const handleClose = () => {
    onClose();
  };

  const handleResetToDefaults = () => {
    resetToDefaults();
    onResultsTableZoomChange(1);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="flex max-h-[90vh] max-w-[680px] flex-col overflow-hidden p-0">
        <DialogHeader className="p-5 pb-3 border-b border-border/10">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <Settings className="size-5 text-primary" />
            {t('evalHeader.tableSettings')}
          </DialogTitle>
        </DialogHeader>

        <div className="min-h-0 overflow-y-auto p-0">
          <SettingsPanel
            resultsTableZoom={resultsTableZoom}
            onResultsTableZoomChange={onResultsTableZoomChange}
          />
        </div>

        <Separator className="opacity-60" />

        <DialogFooter className="shrink-0 justify-between px-5 py-3">
          <Button
            onClick={handleResetToDefaults}
            variant="ghost"
            size="sm"
            aria-label={t('common.resetToDefaults')}
            title={t('common.resetToDefaults')}
          >
            <RotateCcw className="size-4 mr-2" />
            {t('common.resetToDefaults')}
          </Button>
          <Button onClick={handleClose}>{t('common.done')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(TableSettingsModal);
