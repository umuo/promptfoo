import { useEffect, useMemo, useRef, useState } from 'react';

import { DataTable } from '@app/components/data-table';
import { PageContainer } from '@app/components/layout/PageContainer';
import { PageHeader } from '@app/components/layout/PageHeader';
import { Card } from '@app/components/ui/card';
import { EVAL_ROUTES } from '@app/constants/routes';
import { useTranslation } from '@app/i18n';
import { formatDataGridDate } from '@app/utils/date';
import { Link, useSearchParams } from 'react-router';
import DatasetDialog from './DatasetDialog';
import type { TestCase, TestCasesWithMetadata } from '@promptfoo/types';
import type { ColumnDef } from '@tanstack/react-table';

interface DatasetsProps {
  data: (TestCasesWithMetadata & { recentEvalDate: string })[];
  isLoading: boolean;
  error: string | null;
}

type DatasetRow = TestCasesWithMetadata & { recentEvalDate: string };

const getVariables = (testCases: DatasetRow['testCases']) => {
  if (!Array.isArray(testCases) || typeof testCases[0] === 'string') {
    return '';
  }
  const allVarsKeys = (testCases as TestCase[]).flatMap((testCase) =>
    Object.keys(testCase.vars || {}),
  );
  const uniqueVarsKeys = Array.from(new Set(allVarsKeys));
  return uniqueVarsKeys.length > 0 ? uniqueVarsKeys.join(', ') : 'None';
};

export default function Datasets({ data, isLoading, error }: DatasetsProps) {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [dialogState, setDialogState] = useState<{ open: boolean; selectedIndex: number }>({
    open: false,
    selectedIndex: 0,
  });
  const hasShownPopup = useRef(false);

  const handleClickOpen = (index: number) => {
    setDialogState({ open: true, selectedIndex: index });
  };

  const handleClose = () => {
    setDialogState((prev) => ({ ...prev, open: false }));
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  useEffect(() => {
    if (hasShownPopup.current) {
      return;
    }

    const testCaseId = searchParams.get('id');
    if (testCaseId) {
      const index = data.findIndex((testCase) => testCase.id.startsWith(testCaseId));
      if (index !== -1) {
        handleClickOpen(index);
        hasShownPopup.current = true;
      }
    }
  }, [data, searchParams]);

  const columns: ColumnDef<DatasetRow>[] = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: t('datasets.headerId'),
        cell: ({ getValue }) => (
          <span className="font-mono text-sm">{getValue<string>().slice(0, 6)}</span>
        ),
        size: 100,
      },
      {
        accessorKey: 'testCases',
        header: t('datasets.headerTestCases'),
        cell: ({ getValue }) => {
          const testCases = getValue<TestCase[]>();
          return <span className="text-sm">{Array.isArray(testCases) ? testCases.length : 0}</span>;
        },
        size: 120,
      },
      {
        id: 'variables',
        header: t('datasets.headerVariables'),
        accessorFn: (row) => getVariables(row.testCases),
        cell: ({ getValue }) => (
          <span className="text-sm text-muted-foreground">{getValue<string>()}</span>
        ),
        size: 250,
      },
      {
        accessorKey: 'count',
        header: t('datasets.headerTotalEvals'),
        cell: ({ getValue }) => (
          <span className="font-mono tabular-nums">{getValue<number>() || 0}</span>
        ),
        size: 120,
        meta: { align: 'right' },
      },
      {
        id: 'numPrompts',
        header: t('datasets.headerTotalPrompts'),
        accessorFn: (row) => row.prompts?.length || 0,
        cell: ({ getValue }) => (
          <span className="font-mono tabular-nums">{getValue<number>()}</span>
        ),
        size: 140,
        meta: { align: 'right' },
      },
      {
        accessorKey: 'recentEvalDate',
        header: t('datasets.headerLatestEvalDate'),
        cell: ({ getValue }) => {
          const value = getValue<string | null>();
          if (!value) {
            return <span className="text-sm text-muted-foreground">{t('common.unknown')}</span>;
          }
          return <span className="text-sm">{formatDataGridDate(value)}</span>;
        },
        size: 180,
      },
      {
        accessorKey: 'recentEvalId',
        header: t('datasets.headerLatestEvalId'),
        cell: ({ getValue }) => {
          const value = getValue<string | null>();
          if (!value) {
            return null;
          }
          return (
            <Link
              to={EVAL_ROUTES.DETAIL(value)}
              title={value}
              className="block truncate font-mono text-sm text-primary hover:underline"
            >
              {value}
            </Link>
          );
        },
        size: 150,
      },
    ],
    [t],
  );

  const handleRowClick = (dataset: DatasetRow) => {
    const index = data.findIndex((d) => d.id === dataset.id);
    if (index !== -1) {
      handleClickOpen(index);
    }
  };

  return (
    <PageContainer className="fixed top-[calc(var(--nav-height)_+_var(--update-banner-height,0px))] left-0 right-0 bottom-0 flex flex-col overflow-hidden min-h-0">
      <PageHeader>
        <div className="container max-w-7xl mx-auto p-6">
          <h1 className="text-2xl font-bold tracking-tight">{t('datasets.title')}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t('datasets.subtitle')}</p>
        </div>
      </PageHeader>
      <div className="flex-1 min-h-0 flex flex-col p-6">
        <div className="container max-w-7xl mx-auto flex-1 min-h-0 flex flex-col">
          <Card className="bg-white dark:bg-zinc-900 p-4 flex-1 min-h-0 flex flex-col">
            <DataTable
              columns={columns}
              data={data}
              isLoading={isLoading}
              error={error}
              onRowClick={handleRowClick}
              emptyMessage={t('datasets.emptyMessage')}
              initialSorting={[{ id: 'recentEvalDate', desc: true }]}
              globalFilterLabel={t('datasets.searchDatasets')}
            />
          </Card>
        </div>
      </div>
      {dialogState.open &&
        dialogState.selectedIndex < data.length &&
        data[dialogState.selectedIndex] && (
          <DatasetDialog
            openDialog={dialogState.open}
            handleClose={handleClose}
            testCase={data[dialogState.selectedIndex]}
          />
        )}
    </PageContainer>
  );
}
