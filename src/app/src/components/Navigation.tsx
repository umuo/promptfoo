import { useState } from 'react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@app/components/ui/navigation-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@app/components/ui/tooltip';
import { IS_RUNNING_LOCALLY } from '@app/constants';
import { EVAL_ROUTES, MODEL_AUDIT_ROUTES, REDTEAM_ROUTES, ROUTES } from '@app/constants/routes';
import { useTranslation } from '@app/i18n';
import { cn } from '@app/lib/utils';
import { Info, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import ApiSettingsModal from './ApiSettingsModal';
import InfoModal from './InfoModal';
import LanguageSelector from './LanguageSelector';
import Logo from './Logo';
import ThemeSelector from './ThemeSelector';

const LEGACY_MODEL_AUDIT_HISTORY_ROUTE = `${MODEL_AUDIT_ROUTES.ROOT}/history`;

function isModelAuditResultPath(pathname: string) {
  return (
    pathname === MODEL_AUDIT_ROUTES.ROOT ||
    (pathname.startsWith(`${MODEL_AUDIT_ROUTES.ROOT}/`) &&
      !pathname.startsWith(MODEL_AUDIT_ROUTES.SETUP) &&
      !pathname.startsWith(LEGACY_MODEL_AUDIT_HISTORY_ROUTE))
  );
}

interface NavLinkProps {
  href: string;
  label: string;
}

function NavLink({ href, label }: NavLinkProps) {
  const location = useLocation();

  // Special handling for Model Audit to activate on both /model-audit and /model-audit/:id
  let isActive: boolean;
  if (href === MODEL_AUDIT_ROUTES.ROOT) {
    isActive = isModelAuditResultPath(location.pathname);
  } else {
    isActive = location.pathname.startsWith(href);
  }

  return (
    <Link
      to={href}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'inline-flex h-11 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors sm:h-8',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        isActive
          ? 'bg-primary/10 text-foreground hover:bg-primary/15 focus-visible:bg-primary/15'
          : 'text-foreground hover:bg-accent focus-visible:bg-accent',
      )}
    >
      {label}
    </Link>
  );
}

interface MenuItem {
  href: string;
  label: string;
  description: string;
}

interface NavDropdownProps {
  label: string;
  compactLabel?: string;
  items: MenuItem[];
  isActiveCheck: (pathname: string) => boolean;
  className?: string;
}

function NavDropdown({ label, compactLabel, items, isActiveCheck, className }: NavDropdownProps) {
  const location = useLocation();
  const isActive = isActiveCheck(location.pathname);

  return (
    <NavigationMenuItem className={className}>
      <NavigationMenuTrigger
        aria-label={label}
        className={cn(
          'h-11 bg-transparent px-3 text-sm font-medium sm:h-8',
          'data-[state=open]:bg-accent',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          isActive
            ? 'bg-primary/10 text-foreground hover:bg-primary/15 focus-visible:bg-primary/15'
            : 'text-foreground hover:bg-accent focus-visible:bg-accent',
        )}
      >
        {compactLabel ? (
          <>
            <span className="hidden min-[390px]:inline">{label}</span>
            <span className="min-[390px]:hidden">{compactLabel}</span>
          </>
        ) : (
          label
        )}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="w-[300px] p-1.5">
          {items.map((item, index) => (
            <li key={item.href}>
              <NavigationMenuLink asChild>
                <Link
                  to={item.href}
                  className={cn(
                    'block select-none rounded-lg px-3 py-2.5 outline-none transition-colors no-underline',
                    'hover:bg-accent hover:no-underline',
                    'focus:bg-accent',
                    index !== items.length - 1 && 'mb-0.5',
                  )}
                >
                  <div className="text-sm font-medium text-foreground">{item.label}</div>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

export default function Navigation() {
  const { t } = useTranslation();
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [showApiSettingsModal, setShowApiSettingsModal] = useState<boolean>(false);

  const handleModalToggle = () => setShowInfoModal((prevState) => !prevState);
  const handleApiSettingsModalToggle = () => setShowApiSettingsModal((prevState) => !prevState);

  const createMenuItems: MenuItem[] = [
    {
      href: ROUTES.SETUP,
      label: t('nav.eval'),
      description: t('nav.evalDescription'),
    },
    {
      href: REDTEAM_ROUTES.SETUP,
      label: t('nav.redTeam'),
      description: t('nav.redTeamDescription'),
    },
    {
      href: MODEL_AUDIT_ROUTES.SETUP,
      label: t('nav.modelAudit'),
      description: t('nav.modelAuditDescription'),
    },
  ];

  const resultsMenuItems: MenuItem[] = [
    {
      href: EVAL_ROUTES.ROOT,
      label: t('nav.latestEval'),
      description: t('nav.latestEvalDescription'),
    },
    {
      href: EVAL_ROUTES.LIST,
      label: t('nav.allEvals'),
      description: t('nav.allEvalsDescription'),
    },
    {
      href: REDTEAM_ROUTES.REPORTS,
      label: t('nav.redTeamReports'),
      description: t('nav.redTeamReportsDescription'),
    },
    {
      href: ROUTES.MEDIA,
      label: t('nav.mediaLibrary'),
      description: t('nav.mediaLibraryDescription'),
    },
  ];

  const browseMenuItems: MenuItem[] = [
    {
      href: MODEL_AUDIT_ROUTES.ROOT,
      label: t('nav.modelAudit'),
      description: t('nav.modelAuditReviewDescription'),
    },
    {
      href: ROUTES.PROMPTS,
      label: t('nav.prompts'),
      description: t('nav.promptsDescription'),
    },
    {
      href: ROUTES.DATASETS,
      label: t('nav.datasets'),
      description: t('nav.datasetsDescription'),
    },
    {
      href: ROUTES.HISTORY,
      label: t('nav.history'),
      description: t('nav.historyDescription'),
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-(--z-appbar) w-full border-b border-border bg-card">
        <div className="flex h-14 min-w-0 items-center justify-between gap-2 px-3 sm:px-4">
          {/* Left section: Logo and Navigation */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-6">
            <Logo />
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavDropdown
                  label={t('nav.new')}
                  items={createMenuItems}
                  isActiveCheck={(pathname) =>
                    [ROUTES.SETUP, REDTEAM_ROUTES.SETUP, MODEL_AUDIT_ROUTES.SETUP].some((route) =>
                      pathname.startsWith(route),
                    )
                  }
                />
                <NavDropdown
                  label={t('nav.viewResults')}
                  compactLabel={t('nav.results')}
                  items={resultsMenuItems}
                  isActiveCheck={(pathname) =>
                    [EVAL_ROUTES.ROOT, EVAL_ROUTES.LIST, REDTEAM_ROUTES.REPORTS, ROUTES.MEDIA].some(
                      (route) => pathname.startsWith(route),
                    )
                  }
                />
                <NavDropdown
                  label={t('nav.browse')}
                  items={browseMenuItems}
                  className="hidden md:block lg:hidden"
                  isActiveCheck={(pathname) =>
                    [ROUTES.PROMPTS, ROUTES.DATASETS, ROUTES.HISTORY].some((route) =>
                      pathname.startsWith(route),
                    ) || isModelAuditResultPath(pathname)
                  }
                />
              </NavigationMenuList>
            </NavigationMenu>
            <nav className="hidden items-center gap-1 lg:flex">
              <NavLink href={MODEL_AUDIT_ROUTES.ROOT} label={t('nav.modelAudit')} />
              <NavLink href={ROUTES.PROMPTS} label={t('nav.prompts')} />
              <NavLink href={ROUTES.DATASETS} label={t('nav.datasets')} />
              <NavLink href={ROUTES.HISTORY} label={t('nav.history')} />
            </nav>
          </div>

          {/* Right section: Actions */}
          <div className="flex shrink-0 items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={handleModalToggle}
                  className="inline-flex size-11 items-center justify-center rounded-md text-foreground/60 transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:size-9"
                >
                  <Info className="size-5" />
                  <span className="sr-only">{t('nav.information')}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">{t('nav.information')}</TooltipContent>
            </Tooltip>

            {IS_RUNNING_LOCALLY && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={handleApiSettingsModalToggle}
                    className="inline-flex size-11 items-center justify-center rounded-md text-foreground/60 transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:size-9"
                  >
                    <Settings className="size-5" />
                    <span className="sr-only">{t('nav.apiAndSharingSettings')}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">{t('nav.apiAndSharingSettings')}</TooltipContent>
              </Tooltip>
            )}

            <LanguageSelector />
            <ThemeSelector />
          </div>
        </div>
      </header>
      <InfoModal open={showInfoModal} onClose={handleModalToggle} />
      <ApiSettingsModal open={showApiSettingsModal} onClose={handleApiSettingsModalToggle} />
    </>
  );
}
