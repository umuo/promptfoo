import { useEffect, useState } from 'react';

import { usePageMeta } from '@app/hooks/usePageMeta';
import { useTranslation } from '@app/i18n';
import { callApi } from '@app/utils/api';
import ErrorBoundary from '../../components/ErrorBoundary';
import Prompts from './Prompts';
import type { ServerPromptWithMetadata } from '@promptfoo/types';

interface PromptsPageProps {
  showDatasetColumn?: boolean;
}

function PromptsPageContent({ showDatasetColumn = true }: PromptsPageProps) {
  const [prompts, setPrompts] = useState<ServerPromptWithMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrompts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await callApi('/prompts');
        const data = await response.json();
        if (data?.data) {
          setPrompts(data.data);
        }
      } catch (error) {
        setError('Failed to load prompts. Please try again.');
        console.error('Failed to fetch prompts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrompts();
  }, []);

  return (
    <Prompts
      data={prompts}
      isLoading={isLoading}
      error={error}
      showDatasetColumn={showDatasetColumn}
    />
  );
}

export default function PromptsPage({ showDatasetColumn = true }: PromptsPageProps) {
  const { t } = useTranslation();
  usePageMeta({ title: t('prompts.title'), description: t('prompts.subtitle') });
  return (
    <ErrorBoundary name="Prompts Page">
      <PromptsPageContent showDatasetColumn={showDatasetColumn} />
    </ErrorBoundary>
  );
}
