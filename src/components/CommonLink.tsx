import { Link } from 'react-router-dom';

const CommonLink = ({ to, text }: { to: string; text: string }) => {
  return (
    <Link to={to} className="px-4 py-1 text-lg text-yellow-500 bg-blue-900 border-2 border-yellow-500 rounded-lg text-nowrap">
      {text}
    </Link>
  );
};

export default CommonLink;
