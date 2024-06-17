import { ReactNode, useCallback, useEffect, useState } from 'react';
import SubmitSnapsVote from '../../components/SubmitSnapsVote';
import { useFetchSnapsRatings } from '../../hooks/useFetchSnapsRatings';
import { SnapsRatingTransformedData } from '../../types/SnapsRatings';

const SnapsResults = () => {
  const snapsRatings = useFetchSnapsRatings();
  const [data, setData] = useState<SnapsRatingTransformedData[]>([]);
  const fetchSnapsRatings = useCallback(async () => {
    const newData: SnapsRatingTransformedData[] = [];
    snapsRatings.forEach((rating) => {
      // let smell: number, taste: number;
      const votes = rating.ratings.length;
      if (rating.ratings.length > 0) {
        const smell =
          rating.ratings.reduce((acc, curr) => acc + curr.smell, 0) ?? 0;
        const taste =
          rating.ratings.reduce((acc, curr) => acc + curr.taste, 0) ?? 0;

        newData.push({
          snaps: rating.snaps,
          smell: smell / votes,
          taste: taste / votes,
          votes: votes
        });
      } else {
        newData.push({
          snaps: rating.snaps,
          smell: 0,
          taste: 0,
          votes: 0
        });
      }
      setData(newData);
    });
  }, [snapsRatings]);

  useEffect(() => {
    async () => await fetchSnapsRatings();
  }, [fetchSnapsRatings]);

  return (
    <div>
      <SubmitSnapsVote fetchData={fetchSnapsRatings} />
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
          {data.map((rating, i) => {
            return (
              <tr key={i}>
                <TDCell>{rating.snaps}</TDCell>
                <TDCell>{rating.smell}</TDCell>
                <TDCell>{rating.taste}</TDCell>
                <TDCell>{rating.votes}</TDCell>
              </tr>
            );
          })}
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
