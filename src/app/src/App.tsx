import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { TooltipProvider } from './components/ui/tooltip';
import { ToastProvider } from './contexts/ToastContext';
import { I18nProvider } from './i18n';
import { createAppRoutes } from './routes';

const router = createBrowserRouter(createAppRoutes(), {
  basename: import.meta.env.VITE_PUBLIC_BASENAME || '',
});
const queryClient = new QueryClient();

function App() {
  return (
    <I18nProvider>
      <TooltipProvider delayDuration={300} skipDelayDuration={0}>
        <ToastProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </ToastProvider>
      </TooltipProvider>
    </I18nProvider>
  );
}

export default App;
