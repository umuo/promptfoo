import { useState } from 'react';

import { Button } from '@app/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@app/components/ui/dialog';
import { useTelemetry } from '@app/hooks/useTelemetry';
import { useTranslation } from '@app/i18n';
import { useNavigate } from 'react-router';
import { EXAMPLE_CONFIG, useRedTeamConfig } from '../hooks/useRedTeamConfig';

export default function LoadExampleButton() {
  const { t } = useTranslation();
  const { setFullConfig } = useRedTeamConfig();
  const { recordEvent } = useTelemetry();
  const navigate = useNavigate();

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleClick = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmation = () => {
    recordEvent('feature_used', { feature: 'redteam_config_example' });
    setFullConfig(EXAMPLE_CONFIG);
    setConfirmDialogOpen(false);
    // Reload the page to persist the new config into the form fields:
    navigate(0);
  };

  return (
    <>
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('targetSetup.loadExampleTitle')}</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">{t('targetSetup.loadExampleDesc')}</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleConfirmation}>{t('targetSetup.loadExampleButton')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button variant="default" size="sm" onClick={handleClick} className="whitespace-nowrap">
        {t('targetSetup.loadExampleButton')}
      </Button>
    </>
  );
}
