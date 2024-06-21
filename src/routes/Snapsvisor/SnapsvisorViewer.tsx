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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [state, dispatch] = useReducer(reducer, { page: 0, pages: 0 });

  useEffect(() => {
    async function fetchSnapsvisor() {
      setIsLoading(true);
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
          state.pages = transformedData?.length - 1;
        }
        setIsLoading(false);
      } else {
        // TODO: Error message in UI
        setIsLoading(false);
        console.error('Something went wrong while fetching snapsvisor');
      }
    }
    fetchSnapsvisor();
  }, []);

  if (snapsvisor.length == 0) {
    return null;
  }

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (snapsvisor.length > 0) {
    return (
      <div className="relative h-dvh">
        {/* Snapsvisa */}
        <div className="flex flex-col max-w-lg text-center">
          <h1 className="mt-2 text-3xl text-blue-900">
            {snapsvisor[state.page]?.title}
          </h1>
          <h2 className="text-2xl text-blue-900">
            Melody: {snapsvisor[state.page]?.melody}
          </h2>
          <div className="pt-4 max-h-[550px] lg:max-h-full overflow-y-scroll lg:overflow-y-hidden">
            <Lyrics lyrics={snapsvisor[state.page]?.lyrics} />
          </div>
        </div>
        {/* Navigator */}
        <div className="absolute w-full bottom-20">
          <div className="flex justify-center w-full gap-4 mb-6">
            <button
              disabled={!state.page}
              onClick={() => {
                dispatch({ type: 'previous' });
              }}
              className="px-4 py-2 text-lg text-yellow-500 bg-blue-900 border-2 border-yellow-500 rounded-md shadow-lg disabled:bg-gray-600"
            >
              {'<'}
            </button>
            <p className="text-4xl text-center text-yellow-500 w-11">
              {state.page + 1}
            </p>
            <button
              disabled={snapsvisor?.length - 1 <= state.page}
              onClick={() => dispatch({ type: 'next' })}
              className="px-4 py-2 text-lg text-yellow-500 bg-blue-900 border-2 border-yellow-500 rounded-md shadow-lg disabled:bg-gray-600"
            >
              {'>'}
            </button>
          </div>
          <div className="flex justify-center w-full">
            <CommonLink text="Submit a snapsvisa" to="submit" />
          </div>
        </div>
      </div>
    );
  }
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
      /*
      ${
        containsRefräng !== -1 && i >= containsRefräng
          ? 'text-orange-400 '
          : 'text-white'
      }
      */
      <div className='overflow-y-scroll max-h-[350px]'>
        {lyrics.map((lyric, i) => {
          return (
            <p
              key={i}
              className={`text-xl text-black  ${
                i == containsRefräng && 'mt-4 underline'
              }`}
            >
              {lyric}
            </p>
          );
        })}
        <br />
      </div>
    );
  }
};

export default SnapsvisorViewer;
