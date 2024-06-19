import { Outlet } from 'react-router-dom';

const Snapsvisor = () => {
  return (
    <div className="flex flex-col h-full text-black">
      <Outlet />
    </div>
  );
};

export default Snapsvisor;
