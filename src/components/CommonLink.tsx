import { Link } from 'react-router-dom';

const CommonLink = ({ to, text }: { to: string; text: string }) => {
  return (
    <Link to={to} className="px-4 py-1 text-center btn-primary">
      {text}
    </Link>
  );
};

export default CommonLink;
