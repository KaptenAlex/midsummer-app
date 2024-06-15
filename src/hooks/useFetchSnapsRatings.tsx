import { useEffect, useState } from 'react';
import { SnapsRatingResponse } from '../types/SnapsRatings';

export const useFetchSnapsRatings = () => {
  const [snapsRatings, setSnapsRatings] = useState<SnapsRatingResponse[]>([]);

  useEffect(() => {
    async function fetchSnapsRatings() {
      const tableName = import.meta.env.VITE_SNAPSRATING_TABLE_NAME ?? '';
      const url = `https://xmvp7o6kgi4m2q5q7ac6h3k5ka0nqumq.lambda-url.eu-north-1.on.aws?TableName=${tableName}`;
      const res = await fetch(url, { method: 'GET' });

      if (res.ok) {
        const data = await res.json();
        if (data?.Items && data.Items.length > 0) {
          const ratings: SnapsRatingResponse[] = data?.Items;
          setSnapsRatings(ratings);
        }
      } else {
        // TODO: Error message in UI
        console.error('Something went wrong while fetching snaps ratings');
      }
    }
    fetchSnapsRatings();
  }, []);

  return snapsRatings;
};
