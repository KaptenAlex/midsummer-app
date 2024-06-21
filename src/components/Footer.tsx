import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  return (
    <footer className="fixed bottom-0 grid items-center justify-between w-full grid-cols-4">
      <FooterLink text="🏡" isActive={location.pathname === '/'} to="/" />
      <FooterLink
        text="🥃🎶"
        isActive={location.pathname.includes('/snaps-visor')}
        to="snaps-visor"
      />
      <FooterLink
        text="🥃👩‍💼"
        isActive={location.pathname.includes('/snaps-rating')}
        to="snaps-rating"
      />
      <FooterLink
        text="🥃🥴"
        isActive={location.pathname === '/drunk-scoreboard'}
        to="drunk-scoreboard"
      />
    </footer>
  );
};

const FooterLink = memo(function FooterLink({
  text,
  to,
  isActive
}: {
  text: string;
  to: string;
  isActive: boolean;
}) {
  return (
    <Link
      className={`flex justify-center w-full h-full p-4 text-center border-white border-right items-center
      ${isActive ? 'bg-yellow-500 ' : 'bg-blue-900'}`}
      to={to}
    >
      {text}
    </Link>
  );
});

export default Footer;
