import { useEffect, useState } from 'react';
import {
  SnapsRatingResponse,
  SnapsRatingTransformedData
} from '../types/SnapsRatings';

export const useFetchSnapsRatings = () => {
  const [snapsRatings, setSnapsRatings] = useState<
    SnapsRatingTransformedData[]
  >([]);

  useEffect(() => {
    async function fetchSnapsRatings() {
      const tableName = import.meta.env.VITE_SNAPSRATING_TABLE_NAME ?? '';
      const url = `https://xmvp7o6kgi4m2q5q7ac6h3k5ka0nqumq.lambda-url.eu-north-1.on.aws?TableName=${tableName}`;
      const res = await fetch(url, { method: 'GET' });

      const data = await res.json();

      if (res.ok && data?.Items && data.Items.length > 0) {
        const ratings: SnapsRatingResponse[] = data?.Items;
        const newData: SnapsRatingTransformedData[] = [];
        console.log(snapsRatings, 'snapsRatings');
        ratings.forEach((snaps) => {
          const votes = snaps.ratings.length;
          if (snaps.ratings.length > 0) {
            const smell =
              snaps.ratings.reduce((acc, curr) => acc + curr.smell, 0) ?? 0;
            const taste =
              snaps.ratings.reduce((acc, curr) => acc + curr.taste, 0) ?? 0;

            newData.push({
              snaps: snaps.snaps,
              smell: smell / votes,
              taste: taste / votes,
              votes: votes
            });
          } else {
            newData.push({
              snaps: snaps.snaps,
              smell: 0,
              taste: 0,
              votes: 0
            });
          }
          setSnapsRatings(newData);
        });
      } else {
        // TODO: Error message in UI
        console.error('Something went wrong while fetching snaps ratings');
      }
    }
    fetchSnapsRatings();
  }, []);

  return snapsRatings;
};
