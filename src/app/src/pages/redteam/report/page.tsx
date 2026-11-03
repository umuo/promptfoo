import { useEffect } from 'react';

import { Spinner } from '@app/components/ui/spinner';
import { usePageMeta } from '@app/hooks/usePageMeta';
import { useTranslation } from '@app/i18n';
import { useUserStore } from '@app/stores/userStore';
import { useNavigate, useSearchParams } from 'react-router';
import Report from './components/Report';
import ReportIndex from './components/ReportIndex';

export default function ReportPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { email, isLoading, fetchEmail } = useUserStore();
  const evalId = searchParams.get('evalId');
  usePageMeta({
    title: t('redteamReport.title'),
    description: t('redteamReport.description'),
  });

  useEffect(() => {
    fetchEmail();
  }, [fetchEmail]);

  useEffect(() => {
    if (!isLoading && !email) {
      navigate(`/login?type=report&redirect=${window.location.pathname}${window.location.search}`);
    }
  }, [isLoading, email, navigate]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center h-36">
        <Spinner className="size-6" />
        <span className="text-sm text-muted-foreground">{t('redteamReport.waitingForData')}</span>
      </div>
    );
  }

  if (!email) {
    // This will prevent a flash of content before redirect
    return null;
  }

  return evalId ? <Report /> : <ReportIndex />;
}
