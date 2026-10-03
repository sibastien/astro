import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';
import HoroscopePage from '@/pages/HoroscopePage';
import HoroscopeSignPage from '@/pages/HoroscopeSignPage';
import ZodiacPage from '@/pages/ZodiacPage';
import ArticlesPage from '@/pages/ArticlesPage';
import ArticlePage from '@/pages/ArticlePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import NotFoundPage from '@/pages/NotFoundPage';
import TarotPage from '@/pages/TarotPage';
import LunePage from '@/pages/LunePage';
import CompatibilitePage from '@/pages/CompatibilitePage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Core Guided / Personalized Platform */}
        <Route path="/" element={<HomePage />} />
        <Route path="/today" element={<HomePage defaultFocus="today" />} />
        <Route path="/love" element={<HomePage defaultFocus="love" />} />
        <Route path="/career" element={<HomePage defaultFocus="career" />} />
        <Route path="/personality" element={<HomePage defaultFocus="personality" />} />
        <Route path="/birth-chart" element={<HomePage defaultFocus="birth-chart" />} />
        <Route path="/forecast" element={<HomePage defaultFocus="forecast" />} />

        {/* Encyclopedic & Secondary Modules */}
        <Route path="/horoscope" element={<HoroscopePage />} />
        <Route path="/horoscope/:slug" element={<HoroscopeSignPage />} />
        <Route path="/signes-du-zodiaque" element={<ZodiacPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/tarot" element={<TarotPage />} />
        <Route path="/lune" element={<LunePage />} />
        <Route path="/compatibilite" element={<CompatibilitePage />} />
        
        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboardPage />} />
        
        {/* Auth */}
        <Route path="/connexion" element={<LoginPage />} />
        <Route path="/inscription" element={<RegisterPage />} />
        
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
