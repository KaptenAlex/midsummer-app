import { Outlet } from 'react-router-dom';

const Snapsvisor = () => {
  return (
    <div className="flex flex-col justify-center text-black">
      <Outlet />
    </div>
  );
};

export default Snapsvisor;
