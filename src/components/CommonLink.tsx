import { Link } from 'react-router-dom';

const CommonLink = ({ to, text }: { to: string; text: string }) => {
  return (
    <Link to={to} className="text-xl text-blue-200">
      {text}
    </Link>
  );
};

export default CommonLink;
