import { useCallback, useEffect, useState } from 'react';
import useHandleSubmit from '../hooks/useHandleSubmit';
import { Drunkard } from '../types/Drunkard';

const DrunkScoreboard = () => {
  const tableName = import.meta.env.VITE_DRUNKARD_TABLE_NAME ?? '';
  const [drunkards, setDrunkards] = useState<Drunkard[]>([]);

  const handleSubmit = useHandleSubmit({
    formName: 'drunkard',
    url: `https://2neu4a2vkbyhfoprh3s6uv5suq0nydpm.lambda-url.eu-north-1.on.aws/?TableName=${tableName}`,
    method: 'PUT',
    noRedirect: true
  });

  const persons = [
    'Jesper',
    'Ludvig',
    'Alexander',
    'Tobias',
    'Axel',
    'Max',
    'Victor K',
    'Victor M',
    'Theo',
    'Jennica',
    'Josefine',
    'Otto',
    'Oscar',
    'Athena',
    'Nasha',
    'Rupert',
    'Kayan',
    'Tara', // Might not come, might have to remove later
    'Julius',
    'Wilma',
    'Merit'
  ].sort();

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
      // TODO: Error message in UI
      console.error('Something went wrong while fetching snaps ratings');
    }
  }, [tableName]);

  useEffect(() => {
    async function test() {
      await fetchDrunkards();
    }
    test();
  }, [fetchDrunkards]);

  return (
    <div>
      <h1 className="text-2xl">
        Cast your vote on who will become the drunkard of Midsummer!
      </h1>
      <p className="bold">Results will be unlocked on midnight of Midsummer</p>
      <form
        id="drunkard"
        className="flex flex-col gap-4 mt-2"
        onSubmit={async (e) => {
          await handleSubmit(e);
          await fetchDrunkards();
        }}
      >
        <fieldset>
          <legend>Person</legend>
          <select
            required
            name="person"
            className="w-full p-2 text-lg text-black rounded-md bg-slate-400"
          >
            <option value=""></option>
            {persons.map((person) => (
              <option
                className="capitalize"
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
          className="self-end px-4 py-0.5 cursor-pointer text-black bg-white border border-black rounded-lg shadow-lg w-fit disabled:bg-black disabled:text-white"
        />
      </form>
      <ul>
        {drunkards.map((drunkard) => (
          <li key={drunkard.person} className="capitalize">
            {drunkard.person}: {drunkard.votes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrunkScoreboard;
