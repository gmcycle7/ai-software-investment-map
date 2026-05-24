import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Categories from './pages/Categories';
import CategoryDetail from './pages/CategoryDetail';
import Companies from './pages/Companies';
import CompanyDetail from './pages/CompanyDetail';
import KpiDashboard from './pages/KpiDashboard';
import Taiwan from './pages/Taiwan';
import InvestmentLogic from './pages/InvestmentLogic';
import Methodology from './pages/Methodology';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id" element={<CategoryDetail />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:id" element={<CompanyDetail />} />
        <Route path="/kpi" element={<KpiDashboard />} />
        <Route path="/taiwan" element={<Taiwan />} />
        <Route path="/investment-logic" element={<InvestmentLogic />} />
        <Route path="/methodology" element={<Methodology />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
