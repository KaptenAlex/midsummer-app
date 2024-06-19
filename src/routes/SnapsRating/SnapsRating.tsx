import { Outlet } from 'react-router-dom';

const SnapsRating = () => {
  return (
    <div className="flex flex-col justify-center h-full text-black">
      <Outlet />
    </div>
  );
};

export default SnapsRating;
