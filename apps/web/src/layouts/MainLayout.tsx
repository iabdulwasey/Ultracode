import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      <main className="pt-14 p-6 animate-slide-up">
        <Outlet />
      </main>
    </div>
  );
}