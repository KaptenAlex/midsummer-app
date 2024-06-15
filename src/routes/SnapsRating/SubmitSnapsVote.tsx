import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonLink from '../../components/CommonLink';
import { useFetchSnapsRatings } from '../../hooks/useFetchSnapsRatings';

const SubmitSnapsVote = () => {
  const navigate = useNavigate();

  /**
   * TODO: Fetch from Db what snaps there are.
   * TODO: Submit the form and reroute the user back to the results page if the submit goes well.
   * otherwise display error and stay on this route
   */

  const snapsRatings = useFetchSnapsRatings();
  const tableName = import.meta.env.VITE_SNAPSRATING_TABLE_NAME ?? '';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = document.querySelector('#snapsForm') as HTMLFormElement;
    if (form) {
      const formData = new FormData(form);
      let body = {};
      for (const input of formData) {
        body = { ...body, [input[0]]: input[1] };
      }

      const res = await fetch(
        `https://xmvp7o6kgi4m2q5q7ac6h3k5ka0nqumq.lambda-url.eu-north-1.on.aws?TableName=${tableName}`,
        {
          method: 'PUT',
          body: JSON.stringify(body)
        }
      );

      if (res.ok) {
        navigate('..');
      } else {
        // TODO: Error message in UI
        console.error('Something went wrong while submitting data');
      }
    }
  }

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
          <legend>Snaps</legend>
          <select
            required
            disabled={!snapsRatings || snapsRatings.length == 0}
            className="w-full capitalize"
            name="snaps"
          >
            {snapsRatings.map((rating) => (
              <option
                className="capitalize"
                key={rating.snaps}
                value={rating.snaps}
              >
                {rating.snaps}
              </option>
            ))}
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
          className="self-end px-4 py-0.5 cursor-pointer text-black bg-white border border-black rounded-lg shadow-lg w-fit disabled:bg-black disabled:text-white"
        />
      </form>
    </div>
  );
};

export default SubmitSnapsVote;
