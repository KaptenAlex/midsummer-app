import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  return (
    <footer className="absolute bottom-0 grid items-center justify-between w-full grid-cols-4">
      <FooterLink text="Home" isActive={location.pathname === '/'} to="/" />
      <FooterLink
        text="Snaps songs"
        isActive={location.pathname.includes('/snaps-visor')}
        to="snaps-visor"
      />
      <FooterLink
        text="Rate the snaps"
        isActive={location.pathname.includes('/snaps-rating')}
        to="snaps-rating"
      />
      <FooterLink
        text="Drunkard vote"
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
      className={`flex justify-center w-full h-full p-4 text-center align-middle border-white align-center border-right
      ${isActive ? 'bg-gray-300 text-black' : 'text-white bg-black'}`}
      to={to}
    >
      {text}
    </Link>
  );
});

export default Footer;
