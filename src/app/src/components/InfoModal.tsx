import { Button } from '@app/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@app/components/ui/dialog';
import { useTranslation } from '@app/i18n';
import { cn } from '@app/lib/utils';
import { BookOpen, Bug, Calendar, ExternalLink, GitBranch, MessageCircle } from 'lucide-react';

export default function InfoModal<T extends { open: boolean; onClose: () => void }>({
  open,
  onClose,
}: T) {
  const { t } = useTranslation();

  const links = [
    {
      icon: <BookOpen className="size-4" />,
      text: t('infoModal.documentation'),
      href: 'https://www.promptfoo.dev/docs/intro',
    },
    {
      icon: <GitBranch className="size-4" />,
      text: t('infoModal.github'),
      href: 'https://github.com/promptfoo/promptfoo',
    },
    {
      icon: <Bug className="size-4" />,
      text: t('infoModal.issue'),
      href: 'https://github.com/promptfoo/promptfoo/issues',
    },
    {
      icon: <MessageCircle className="size-4" />,
      text: t('infoModal.discord'),
      href: 'https://discord.gg/gHPS9jjfbs',
    },
    {
      icon: <Calendar className="size-4" />,
      text: t('infoModal.meeting'),
      href: 'https://cal.com/team/promptfoo/intro2',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{t('infoModal.title')}</DialogTitle>
          <a
            href="https://github.com/promptfoo/promptfoo/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('infoModal.version', { version: import.meta.env.VITE_PROMPTFOO_VERSION || '' })}
          </a>
        </DialogHeader>
        <DialogDescription>{t('infoModal.description')}</DialogDescription>
        <div className="flex flex-col gap-3 mt-2">
          {links.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center gap-2 text-sm text-foreground',
                'hover:text-primary transition-colors',
              )}
            >
              {item.icon}
              <span>{item.text}</span>
              <ExternalLink className="size-3 opacity-50 ml-auto" />
            </a>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t('common.close')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
