import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Layout from './Layout.tsx';
import RaceIndex from './pages/RaceIndex.tsx';
import Modal from './components/Modal.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<ErrorMessage />}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<RaceIndex />} />
              <Route path="/races/new" element={<RaceIndex />} />
              <Route path="/races/:raceId?" element={<RaceIndex />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);

export function ErrorMessage() {
  return (
    <Modal>Something went wrong. Is the REST API running?</Modal>
  );
}
