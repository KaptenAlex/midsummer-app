import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="relative">
      <main className="flex items-center justify-center w-screen h-screen max-w-lg m-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
