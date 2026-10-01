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
// Stub pages for future phases
import TarotPage from '@/pages/TarotPage';
import LunePage from '@/pages/LunePage';
import CompatibilitePage from '@/pages/CompatibilitePage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/horoscope" element={<HoroscopePage />} />
        <Route path="/horoscope/:slug" element={<HoroscopeSignPage />} />
        <Route path="/signes-du-zodiaque" element={<ZodiacPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/tarot" element={<TarotPage />} />
        <Route path="/lune" element={<LunePage />} />
        <Route path="/compatibilite" element={<CompatibilitePage />} />
        <Route path="/connexion" element={<LoginPage />} />
        <Route path="/inscription" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
