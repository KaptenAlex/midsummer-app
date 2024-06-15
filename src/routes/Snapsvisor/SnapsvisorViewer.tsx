import { useEffect, useReducer, useState } from 'react';
import CommonLink from '../../components/CommonLink';
import { DataResponseSnapsvisor, Snapsvisor } from '../../types/Snapsvisor';

function reducer(
  state: { page: number; pages: number },
  action: { type: 'next' | 'previous' }
) {
  switch (action.type) {
    case 'next':
      return {
        page: state.page + 1 > state.pages ? state.page : state.page + 1,
        pages: state.pages
      };
    case 'previous':
      return {
        page: state.page - 1 < 0 ? state.page : state.page - 1,
        pages: state.pages
      };
    default:
      throw Error('Unknown action.');
  }
}

const SnapsvisorViewer = () => {
  const [snapsvisor, setSnapsvisor] = useState<Snapsvisor[]>([]);

  const [state, dispatch] = useReducer(reducer, { page: 0, pages: 0 });

  useEffect(() => {
    async function fetchSnapsvisor() {
      const tableName = import.meta.env.VITE_SNAPSVISOR_TABLE_NAME ?? '';
      const url = `https://ct46vi4u27mqybegdkh2dtxrre0amrcm.lambda-url.eu-north-1.on.aws?TableName=${tableName}`;
      const res = await fetch(url, { method: 'GET' });
      const transformedData: Snapsvisor[] = [];

      if (res.ok) {
        const data = await res.json();
        if (data?.Items && data.Items.length > 0) {
          const songs: DataResponseSnapsvisor[] = data?.Items;

          songs.forEach((song) => {
            const lyrics = song?.lyrics ?? '';
            if (lyrics.includes('\n')) {
              transformedData.push({ ...song, lyrics: lyrics.split('\n') });
            }
          });
        }

        if (transformedData.length > 0) {
          setSnapsvisor(transformedData);
          state.pages = transformedData?.length - 1 ?? 0;
        }
      } else {
        // TODO: Error message in UI
        console.error('Something went wrong while fetching snapsvisor');
      }
    }
    fetchSnapsvisor();
  }, []);

  if (snapsvisor.length > 0) {
    return (
      <>
        <div className="flex flex-col max-w-lg text-center gap-y-4">
          <CommonLink text="Submit a snapsvisa" to="submit" />
          {/* Snapsvisa namn */}
          <h1 className="text-4xl">Title: {snapsvisor[state.page]?.title}</h1>
          <h2 className="text-3xl">Melody: {snapsvisor[state.page]?.melody}</h2>
          {/* Snapsvisa */}
          <h3 className="text-2xl">Lyrics: </h3>
          <div>
            <Lyrics lyrics={snapsvisor[state.page]?.lyrics} />
          </div>
        </div>
        {/* Navigator */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            disabled={state.page === 0}
            onClick={() => {
              dispatch({ type: 'previous' });
            }}
            className="px-4 py-2 text-black bg-white rounded-md shadow-lg disabled:bg-gray-600 disabled:"
          >
            {'<'}
          </button>
          <p className="text-4xl text-center">{state.page + 1}</p>
          <button
            disabled={snapsvisor?.length - 1 <= state.page}
            onClick={() => dispatch({ type: 'next' })}
            className="px-4 py-2 text-black bg-white rounded-md shadow-lg disabled:bg-gray-600 disabled:"
          >
            {'>'}
          </button>
        </div>
      </>
    );
  }
  return null;
};

const Lyrics = ({ lyrics }: { lyrics: string | string[] }) => {
  if (!lyrics) {
    return null;
  }

  if (typeof lyrics === 'string') {
    return <p className="text-xl text-slate-50">{lyrics}</p>;
  } else {
    const containsRefräng = lyrics.findIndex((lyric) =>
      lyric.toLowerCase().includes('refräng')
    );

    return (
      <>
        {lyrics.map((lyric, i) => {
          return (
            <p
              key={i}
              className={`${
                containsRefräng !== -1 && i >= containsRefräng
                  ? 'text-orange-400 text-2xl'
                  : 'text-xl text-white'
              } ${i == containsRefräng && 'mt-4 underline'}`}
            >
              {lyric}
            </p>
          );
        })}
        <br />
      </>
    );
  }
};

export default SnapsvisorViewer;
