import { useReducer } from 'react';
import CommonLink from '../../components/CommonLink';

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
  // useMemo this
  const snapsVisor = [
    { title: 'Snaps 1', lyrics: 'lorem' },
    {
      title: 'Snaps 2',
      lyrics:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita iure, debitis modi omnis odit commodi tempore numquam harum laudantium praesentium nemo fugit nam! Eaque facere officia suscipit asperiores, eius dolorum?'
    },
    { title: 'Snaps 3', lyrics: 'asbdnaosdb asjnd ja sdjka skjasdkjas' },
    { title: 'Snaps 4', lyrics: 'This is a text' }
  ];

  const [state, dispatch] = useReducer(reducer, {
    page: 0,
    pages: snapsVisor?.length - 1
  });

  return (
    <>
      <div className="flex flex-col max-w-lg text-center h-96 gap-y-4">
        <CommonLink text="Submit a snapsvisa" to="submit" />
        {/* Snapsvisa namn */}
        <h1 className="text-4xl">{snapsVisor[state.page]?.title}</h1>
        {/* Snapsvisa */}
        <p className="text-xl">{snapsVisor[state.page]?.lyrics}</p>
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
          disabled={snapsVisor?.length - 1 <= state.page}
          onClick={() => dispatch({ type: 'next' })}
          className="px-4 py-2 text-black bg-white rounded-md shadow-lg disabled:bg-gray-600 disabled:"
        >
          {'>'}
        </button>
      </div>
    </>
  );
};

export default SnapsvisorViewer;
