import logo from '@app/assets/logo.svg';
import { Button } from '@app/components/ui/button';
import { Card } from '@app/components/ui/card';
import { useTranslation } from '@app/i18n';
import { BarChart2, ExternalLink, Shield } from 'lucide-react';
import { useNavigate } from 'react-router';

const EmptyState = () => {
  const navigate = useNavigate();
  const { t, isZh } = useTranslation();

  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <Card className="p-8 text-center max-w-[500px] shadow-lg">
        <div className="flex flex-row gap-2 items-center justify-center mb-4">
          <img src={logo} alt="Promptfoo logo" style={{ width: 48, height: 48 }} />
          <h2 className="text-xl font-semibold">{t('emptyState.welcome')}</h2>
        </div>
        <p className="text-muted-foreground mb-6">{t('emptyState.subtitle')}</p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={() => navigate('/setup')}>
            <BarChart2 className="size-5 mr-2" />
            {t('emptyState.createEval')}
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate('/redteam/setup')}>
            <Shield className="size-5 mr-2" />
            {t('emptyState.createRedTeam')}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-6">
          {isZh ? (
            <>
              或者在命令行运行 <code className="bg-muted px-1 rounded">promptfoo init</code>
            </>
          ) : (
            <>
              Or run <code className="bg-muted px-1 rounded">promptfoo init</code> from the command
              line
            </>
          )}
        </p>
        <div className="mt-4">
          <a
            href="https://www.promptfoo.dev/docs/getting-started/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            {t('emptyState.viewDocumentation')}
            <ExternalLink className="size-4" />
          </a>
        </div>
      </Card>
    </div>
  );
};

export default EmptyState;
