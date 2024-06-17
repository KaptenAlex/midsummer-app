import { ReactNode } from 'react';
import SubmitSnapsVote from '../../components/SubmitSnapsVote';
import { useFetchSnapsRatings } from '../../hooks/useFetchSnapsRatings';

const SnapsResults = () => {
  const snapsRatings = useFetchSnapsRatings();

  return (
    <div>
      <SubmitSnapsVote />
      <h2 className="my-2 text-4xl">Ratings</h2>
      <table className="w-full text-sm text-black bg-white border border-collapse shadow-sm border-slate-400 dark:border-slate-500 dark:bg-slate-800 dark:text-white">
        <thead>
          <tr>
            <THCell>Snaps</THCell>
            <THCell>Smell</THCell>
            <THCell>Taste</THCell>
            <THCell># of votes</THCell>
          </tr>
        </thead>
        <tbody>
          {snapsRatings.map((rating, i) => (
            <tr key={i}>
              <TDCell>{rating.snaps}</TDCell>
              <TDCell>{rating.smell}</TDCell>
              <TDCell>{rating.taste}</TDCell>
              <TDCell>{rating.votes}</TDCell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TDCell = ({ children }: { children: ReactNode }) => {
  return (
    <td className="px-2 py-1 text-lg text-center capitalize border border-slate-600">
      {children}
    </td>
  );
};

const THCell = ({ children }: { children: ReactNode }) => {
  return <th className="px-6 text-xl border border-slate-600">{children}</th>;
};

export default SnapsResults;
