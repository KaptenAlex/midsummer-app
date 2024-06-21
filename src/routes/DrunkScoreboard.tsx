import { useCallback, useEffect, useState } from 'react';
import useHandleSubmit from '../hooks/useHandleSubmit';
import { Drunkard } from '../types/Drunkard';
import { Snackbar } from '../components/Snackbar';
import { useNavigate } from 'react-router-dom';

const DrunkScoreboard = () => {
  const tableName = import.meta.env.VITE_DRUNKARD_TABLE_NAME ?? '';
  const persons = [
    'Jesper',
    'Ludvig',
    'Alexander',
    'Axel',
    'Max',
    'Victor K',
    'Victor M',
    'Theo',
    'Jennica',
    'Josefine',
    'Otto',
    'Athena',
    'Nasha',
    'Rupert',
    'Kayan',
    'Tara',
    'Julius',
    'Wilma',
    'Merit'
  ].sort();

  const [drunkards, setDrunkards] = useState<Drunkard[]>([]);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [snackBarText, setSnackBarText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = useHandleSubmit({
    formName: 'drunkard',
    url: `https://2neu4a2vkbyhfoprh3s6uv5suq0nydpm.lambda-url.eu-north-1.on.aws/?TableName=${tableName}`,
    method: 'PUT',
  });

  const fetchDrunkards = useCallback(async () => {
    const url = `https://2neu4a2vkbyhfoprh3s6uv5suq0nydpm.lambda-url.eu-north-1.on.aws/?TableName=${tableName}`;
    const res = await fetch(url, { method: 'GET' });

    if (res.ok) {
      const data = await res.json();
      if (data?.Items && data.Items.length > 0) {
        const persons: Drunkard[] = data?.Items;
        const filterPersons = persons
          .filter((person) => person.votes > 0)
          .sort((a, b) => b.votes - a.votes);
        setDrunkards(filterPersons);
      }
    } else {
      setShowSnackbar(true)
      setTimeout(() => {
        setShowSnackbar(false);
      }, 2500);
      setIsSuccess(false);
      setSnackBarText("Something went wrong while fetching drunkards :(")
      setShowSnackbar(true);
    }
  }, [tableName]);

  useEffect(() => {
    // Create Date objects
    const now = new Date().getTime();
    const target = new Date('2024-06-21T20:00').getTime();

    // Compare dates
    if (now > target) {
      setShowResults(true);
    } else if (now < target) {
      setShowResults(false)
    } else {
      setShowResults(true);
    }

    async function fetchResults() {
      if (showResults) {
        await fetchDrunkards();
      }
    }
    fetchResults();
  }, [fetchDrunkards, showResults]);


  return (
    <div className='relative h-full'>
      {showSnackbar && (
        <Snackbar success={isSuccess} text={snackBarText} />
      )}
      <div className='flex flex-col h-full py-6 gap-y-2'>
        <h1 className="text-3xl text-blue-900">
          Cast your vote on who will become the drunkard of Midsummer!
        </h1>
        <form
          id="drunkard"
          className="flex flex-col gap-4 mt-2"
          onSubmit={async (e) => {
            const res = await handleSubmit(e)
            setShowSnackbar(true);
            if (res) {
              setSnackBarText("Success!")
              setIsSuccess(true);
              setTimeout(() => {
                navigate(0);
              }, 2500);
            } else {
              setIsSuccess(false);
              setSnackBarText("Something went wrong :(")
            }
            await fetchDrunkards();
          }}
        >
          <fieldset>
            <legend className='mb-2 text-2xl text-blue-900'>Person</legend>
            <select
              required
              name="person"
              className="w-full p-2 text-lg text-yellow-500 bg-blue-900 rounded-md"
            >
              <option value="">Select a person...</option>
              {persons.map((person) => (
                <option
                  className="text-yellow-500 capitalize bg-blue-900"
                  key={person}
                  value={person.toLowerCase()}
                >
                  {person}
                </option>
              ))}
            </select>
          </fieldset>
          <input
            type="submit"
            value="Submit drunkard"
            className="p-2 btn-primary"
          />
        </form>
        {showResults ? (
          <ul>
            {drunkards.map((drunkard) => (
              <li key={drunkard.person} className="overflow-y-auto text-2xl text-yellow-500 capitalize">
                {drunkard.person}: {drunkard.votes}
              </li>
            ))}
          </ul>
        ) : (
          <>
            <p className="text-2xl text-blue-900 underline">Note:</p>
            <p className="text-lg text-blue-900">Results will be unlocked 8 AM of Midsummer's eve</p>
          </>
        )}
      </div>
    </div>
  );
};

export default DrunkScoreboard;
