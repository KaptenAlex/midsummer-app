import useHandleSubmit from '../hooks/useHandleSubmit';

const DrunkScoreboard = () => {
  const handleSubmit = useHandleSubmit({ formName: 'drunkard', url: 'asas' });

  const persons = [
    'Jesper',
    'Ludvig',
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

  return (
    <div>
      <h1 className="text-2xl">
        Cast your vote on who will become the drunkard of Midsummer!
      </h1>
      <p className="bold">Results will be unlocked on midnight of Midsummer</p>
      <form
        id="drunkard"
        className="flex flex-col gap-4 mt-2"
        onSubmit={handleSubmit}
      >
        <fieldset>
          <legend>Person</legend>
          <select required name="person" className="w-full p-2 text-lg text-black rounded-md bg-slate-400">
            {persons.map((person) => (
              <option className='' key={person} value={person.toLowerCase()}>
                {person}
              </option>
            ))}
          </select>
        </fieldset>
        <input
          type="submit"
          value="Submit drunkard"
          className="self-end px-4 py-0.5 text-black bg-white border border-black rounded-lg shadow-lg w-fit"
        />
      </form>
    </div>
  );
};

export default DrunkScoreboard;
