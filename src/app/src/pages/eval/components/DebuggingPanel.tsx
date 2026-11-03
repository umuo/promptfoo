import { Alert, AlertContent, AlertDescription } from '@app/components/ui/alert';
import { useTranslation } from '@app/i18n';
import { AlertCircle } from 'lucide-react';
import { ErrorBoundary } from 'react-error-boundary';
import TraceView, { type Trace } from '../../../components/traces/TraceView';

interface DebuggingPanelProps {
  evaluationId?: string;
  testCaseId?: string;
  testIndex?: number;
  promptIndex?: number;
  traces?: Trace[];
}

export function DebuggingPanel({
  evaluationId,
  testCaseId,
  testIndex,
  promptIndex,
  traces = [],
}: DebuggingPanelProps) {
  const { isZh } = useTranslation();

  return (
    <div>
      {evaluationId && (
        <div className="mb-4">
          <h4 className="mb-2 font-medium" aria-label="Trace Timeline">
            {isZh ? '追踪时间线' : 'Trace Timeline'}
          </h4>
          <ErrorBoundary
            fallback={
              <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertContent>
                  <AlertDescription>
                    {isZh ? '加载追踪数据失败' : 'Error loading traces'}
                  </AlertDescription>
                </AlertContent>
              </Alert>
            }
          >
            <TraceView
              evaluationId={evaluationId}
              testCaseId={testCaseId}
              testIndex={testIndex}
              promptIndex={promptIndex}
              traces={traces}
            />
          </ErrorBoundary>
        </div>
      )}
    </div>
  );
}
