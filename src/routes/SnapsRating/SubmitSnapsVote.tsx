import { useState } from 'react';
import CommonLink from '../../components/CommonLink';
import useHandleSubmit from '../../hooks/useHandleSubmit';

const SubmitSnapsVote = () => {
  /**
   * TODO: Fetch from Db what snaps there are.
   * TODO: Submit the form and reroute the user back to the results page if the submit goes well.
   * otherwise display error and stay on this route
   */

  const handleSubmit = useHandleSubmit({ formName: 'snapsForm', url: 'asas' });
  const [smell, setSmell] = useState('1');
  const [taste, setTaste] = useState('1');

  return (
    <div>
      <h1>Rate the snaps!</h1>
      <CommonLink text="See the results" to=".." />
      <form
        id="snapsForm"
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <fieldset>
          <legend>Title</legend>
          <select required className="w-full" name="snaps">
            <option value=""></option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
        </fieldset>
        <fieldset>
          <legend>Smell</legend>
          <input
            min={1}
            max={10}
            onChange={(e) => setSmell(e.target.value)}
            value={smell}
            required
            name="smell"
            type="range"
            className="w-full"
          />
          <p>{smell}</p>
        </fieldset>
        <fieldset>
          <legend>Taste</legend>
          <input
            min={1}
            max={10}
            onChange={(e) => setTaste(e.target.value)}
            value={taste}
            required
            name="taste"
            type="range"
            className="w-full"
          />
          <p>{taste}</p>
        </fieldset>
        <input
          type="submit"
          value="Submit vote"
          className="self-end px-4 py-0.5 text-black bg-white border border-black rounded-lg shadow-lg w-fit"
        />
      </form>
    </div>
  );
};

export default SubmitSnapsVote;
