import { Outlet } from 'react-router-dom';

const SnapsRating = () => {
  return (
    <div className="flex flex-col h-full py-2 text-black">
      <Outlet />
    </div>
  );
};

export default SnapsRating;
