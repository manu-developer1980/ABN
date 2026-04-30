import { Route, Routes } from 'react-router-dom';
import { PageShell } from '../components/layout/PageShell';
import { AboutAbnPage } from '../pages/AboutAbnPage';
import { CalculatorPage } from '../pages/CalculatorPage';
import { HomePage } from '../pages/HomePage';
import { SourcesPage } from '../pages/SourcesPage';

export function AppRouter() {
  return (
    <PageShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/que-es-abn" element={<AboutAbnPage />} />
        <Route path="/calculadora" element={<CalculatorPage />} />
        <Route path="/fuentes" element={<SourcesPage />} />
      </Routes>
    </PageShell>
  );
}
