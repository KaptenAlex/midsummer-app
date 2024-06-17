import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="relative">
      <main className="flex items-center justify-center h-screen max-w-lg px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
