import { useCallback, useEffect, useRef, useState } from 'react';

import { Alert, AlertContent, AlertDescription } from '@app/components/ui/alert';
import { useTelemetry } from '@app/hooks/useTelemetry';
import { useTranslation } from '@app/i18n';
import { isPlainObject } from '@app/utils/isPlainObject';
import { AlertTriangle, Info } from 'lucide-react';
import { DEFAULT_HTTP_TARGET, useRedTeamConfig } from '../../hooks/useRedTeamConfig';
import { useRedTeamTargetConfigValidation } from '../../hooks/useRedTeamTargetConfigValidation';
import PageWrapper from '../PageWrapper';
import Prompts from '../Prompts';
import ProviderConfigEditor from './ProviderConfigEditor';
import { getProviderDocumentationUrl, hasSpecificDocumentation } from './providerDocumentationMap';

import type { ProviderOptions } from '../../types';

interface TargetConfigurationProps {
  onNext: () => void;
  onBack: () => void;
}

const requiresPrompt = (target: ProviderOptions) => {
  return !(
    target.id === 'a2a' ||
    target.id.startsWith('a2a:') ||
    ['http', 'websocket', 'browser'].includes(target.id)
  );
};

export default function TargetConfiguration({ onNext, onBack }: TargetConfigurationProps) {
  const { t } = useTranslation();
  const { config, updateConfig, providerType } = useRedTeamConfig();
  const { targetConfigError } = useRedTeamTargetConfigValidation();
  const selectedTarget: ProviderOptions = config.target || DEFAULT_HTTP_TARGET;
  const [providerError, setProviderError] = useState<string | null>(null);
  const promptRequired = requiresPrompt(selectedTarget);
  const [validationErrors, setValidationErrors] = useState<string | null>(null);
  const [shouldValidate, setShouldValidate] = useState<boolean>(false);

  const validateRef = useRef<(() => boolean) | null>(null);
  const { recordEvent } = useTelemetry();

  const handleValidationRequest = useCallback((validator: () => boolean) => {
    validateRef.current = validator;
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  useEffect(() => {
    recordEvent('webui_page_view', { page: 'redteam_config_target_configuration' });
  }, []);

  const handleProviderChange = (provider: ProviderOptions) => {
    updateConfig('target', provider);
    recordEvent('feature_used', {
      feature: 'redteam_config_target_configured',
      target: provider.id,
    });
  };

  // Handle errors from child components
  const handleError = (error: string | null) => {
    setValidationErrors(error);
    setProviderError(error);
  };

  const isProviderValid = () => {
    return (
      selectedTarget.label &&
      !providerError &&
      !targetConfigError &&
      isPlainObject(selectedTarget.config)
    );
  };

  const getNextButtonTooltip = () => {
    if (!selectedTarget.label) {
      return t('targetConfiguration.enterTargetLabel');
    }
    if (providerError) {
      return providerError;
    }
    if (targetConfigError) {
      return targetConfigError;
    }
    if (!isPlainObject(selectedTarget.config)) {
      return t('targetConfiguration.configMustBeJson');
    }
    if (validationErrors) {
      return validationErrors;
    }
    return undefined;
  };

  const handleNext = () => {
    // Enable validation when button is clicked
    setShouldValidate(true);

    // Call the validation function
    const isValid = validateRef.current?.() ?? false;

    // Only proceed if there are no errors
    if (isValid && !validationErrors) {
      onNext();
    }
  };

  return (
    <PageWrapper
      title={t('targetConfiguration.title', {
        label: selectedTarget.label || t('targetConfiguration.unnamedTarget'),
      })}
      description={t('targetConfiguration.description')}
      onNext={handleNext}
      onBack={onBack}
      nextDisabled={!isProviderValid()}
      warningMessage={isProviderValid() ? undefined : getNextButtonTooltip()}
    >
      <div className="flex flex-col gap-6">
        {/* Validation Error Display */}
        {validationErrors && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertContent>
              <AlertDescription>
                <p className="text-sm">{t('targetConfiguration.fixIssuesBeforeContinuing')}</p>
                <p className="mt-2 text-sm font-medium">{validationErrors}</p>
              </AlertDescription>
            </AlertContent>
          </Alert>
        )}

        {/* Documentation Alert for specific providers */}
        {hasSpecificDocumentation(providerType) && (
          <Alert variant="info">
            <Info className="size-4" />
            <AlertContent>
              <AlertDescription>
                {t('targetConfiguration.needHelpConfiguring', {
                  label: selectedTarget.label || selectedTarget.id,
                })}{' '}
                <a
                  href={getProviderDocumentationUrl(providerType)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {t('targetConfiguration.viewDocumentation')}
                </a>{' '}
                {t('targetConfiguration.forDetailedInstructions')}
              </AlertDescription>
            </AlertContent>
          </Alert>
        )}

        {/* Provider Configuration Section */}
        <ProviderConfigEditor
          provider={selectedTarget}
          setProvider={handleProviderChange}
          extensions={config.extensions}
          onExtensionsChange={(extensions) => updateConfig('extensions', extensions)}
          setError={handleError}
          validateAll={shouldValidate}
          onValidate={() => {
            // Validation errors will be displayed through the handleError function
          }}
          onValidationRequest={handleValidationRequest}
          providerType={providerType}
        />

        {promptRequired && <Prompts />}
      </div>
    </PageWrapper>
  );
}
