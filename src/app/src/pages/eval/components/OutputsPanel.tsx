import React from 'react';

import { useTranslation } from '@app/i18n';
import Citations from './Citations';

import type { Citation } from './Citations';

interface CodeDisplayProps {
  content: string;
  title: string;
  maxHeight?: string | number;
  onCopy: () => void;
  copied: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  showCopyButton?: boolean;
}

type CodeDisplayComponent = React.FC<CodeDisplayProps>;

interface OutputsPanelProps {
  output?: string;
  replayOutput?: string | null;
  providerPrompt?: string;
  redteamFinalPrompt?: string;
  copiedFields: Record<string, boolean>;
  hoveredElement: string | null;
  onCopy: (key: string, content: string) => void;
  onMouseEnter: (element: string) => void;
  onMouseLeave: () => void;
  CodeDisplay: CodeDisplayComponent;
  citations?: Citation | Citation[];
}

export function OutputsPanel({
  output,
  replayOutput,
  providerPrompt,
  redteamFinalPrompt,
  copiedFields,
  hoveredElement,
  onCopy,
  onMouseEnter,
  onMouseLeave,
  CodeDisplay,
  citations,
}: OutputsPanelProps) {
  const { isZh } = useTranslation();
  // Use providerPrompt if available, fall back to redteamFinalPrompt for backward compat
  const actualPrompt = providerPrompt || redteamFinalPrompt;
  const promptTitle = providerPrompt
    ? isZh
      ? '实际发送的提示词'
      : 'Actual Prompt Sent'
    : isZh
      ? '修改后的用户输入 (红队测试)'
      : 'Modified User Input (Red Team)';
  const promptKey = providerPrompt ? 'providerPrompt' : 'redteamFinalPrompt';

  return (
    <div>
      {actualPrompt && (
        <CodeDisplay
          content={actualPrompt}
          title={promptTitle}
          onCopy={() => onCopy(promptKey, actualPrompt)}
          copied={copiedFields[promptKey] || false}
          onMouseEnter={() => onMouseEnter(promptKey)}
          onMouseLeave={onMouseLeave}
          showCopyButton={hoveredElement === promptKey || copiedFields[promptKey]}
        />
      )}
      {replayOutput && (
        <CodeDisplay
          content={replayOutput}
          title={isZh ? '重试运行输出' : 'Replay Output'}
          onCopy={() => onCopy('replayOutput', replayOutput)}
          copied={copiedFields['replayOutput'] || false}
          onMouseEnter={() => onMouseEnter('replayOutput')}
          onMouseLeave={onMouseLeave}
          showCopyButton={hoveredElement === 'replayOutput' || copiedFields['replayOutput']}
        />
      )}
      {output && (
        <CodeDisplay
          content={output}
          title={isZh ? '原始输出' : 'Original Output'}
          onCopy={() => onCopy('output', output)}
          copied={copiedFields['output'] || false}
          onMouseEnter={() => onMouseEnter('output')}
          onMouseLeave={onMouseLeave}
          showCopyButton={hoveredElement === 'output' || copiedFields['output']}
        />
      )}
      {citations && <Citations citations={citations} />}
    </div>
  );
}
