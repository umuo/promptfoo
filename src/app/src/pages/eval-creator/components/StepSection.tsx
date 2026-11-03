import { useId } from 'react';

import { useTranslation } from '@app/i18n';

interface StepSectionProps {
  stepNumber: number;
  title: string;
  description: string;
  isComplete: boolean;
  isRequired?: boolean;
  count?: number;
  guidance?: React.ReactNode;
  children: React.ReactNode;
}

export function StepSection({
  stepNumber,
  title,
  description,
  isComplete,
  isRequired = false,
  count,
  guidance,
  children,
}: StepSectionProps) {
  const { isZh } = useTranslation();
  const titleId = useId();

  return (
    <section aria-labelledby={titleId} className="flex flex-col gap-4 lg:gap-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>{isZh ? `步骤 ${stepNumber}` : `Step ${stepNumber}`}</span>
          <span aria-hidden="true">/</span>
          <span>{isRequired ? (isZh ? '必填' : 'Required') : isZh ? '可选' : 'Optional'}</span>
          {isComplete && (
            <>
              <span aria-hidden="true">/</span>
              <span>
                {count === undefined
                  ? isZh
                    ? '已配置'
                    : 'Configured'
                  : isZh
                    ? `已配置 ${count} 个`
                    : `${count} configured`}
              </span>
            </>
          )}
        </div>
        <h2 id={titleId} className="mb-2 text-2xl font-bold">
          {title}
        </h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {/* Content */}
      <div className="min-w-0">{children}</div>

      {/* Guidance */}
      {guidance && <div>{guidance}</div>}
    </section>
  );
}
