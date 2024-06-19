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
  // const [showDrunkards, setShowDrunkards] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
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
    async function test() {
      await fetchDrunkards();
    }
    test();
  }, [fetchDrunkards]);

  // useEffect(() => {
  //   // Create Date objects
  //   const d1 = new Date('2023-06-19');
  //   const d2 = new Date('2023-06-19');

  //   // Format dates in Swedish locale
  //   const swedishFormatter = new Intl.DateTimeFormat('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit' });

  //   const formattedDate1 = swedishFormatter.format(d1);
  //   const formattedDate2 = swedishFormatter.format(d2);

  //   console.log(`Date 1 (formatted): ${formattedDate1}`);
  //   console.log(`Date 2 (formatted): ${formattedDate2}`);

  //   // Compare dates
  //   if (d1 > d2) {
  //     console.log("Date 1 is after Date 2");
  //   } else if (d1 < d2) {
  //     console.log("Date 1 is before Date 2");
  //   } else {
  //     console.log("Date 1 is the same as Date 2");
  //   }
  // }, [])


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
              <option value=""></option>
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
        <p className="text-2xl text-blue-900 underline">Note:</p>
        <p className="text-lg text-blue-900">Results will be unlocked on 10 AM of Midsummer's eve</p>
        <ul className='overflow-y-auto max-h-96'>
          {drunkards.map((drunkard) => (
            <li key={drunkard.person} className="text-4xl text-yellow-500 capitalize">
              {drunkard.person}: {drunkard.votes}
            </li>
          ))}
        </ul>
        {/* {showDrunkards ? (
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
            <p className="text-lg text-blue-900">Results will be unlocked on 10 AM of Midsummer's eve</p>
          </>
        )} */}
      </div>
    </div>
  );
};

export default DrunkScoreboard;
