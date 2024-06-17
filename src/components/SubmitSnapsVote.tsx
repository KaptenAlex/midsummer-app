import { useCallback, useState } from 'react';
import { useFetchSnapsRatings } from '../hooks/useFetchSnapsRatings';
import { useNavigate } from 'react-router-dom';

const SubmitSnapsVote = () => {
  const tableName = import.meta.env.VITE_SNAPSRATING_TABLE_NAME ?? '';
  const [isPending, setIsPending] = useState(false);
  const snapsRatings = useFetchSnapsRatings();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsPending(true);
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
          // TODO: Error message in UI
          console.log('Submitted');
          navigate(0)

        } else {
          // TODO: Error message in UI
          console.error('Something went wrong while submitting data');
        }
        setIsPending(false);
      }
    },
    [navigate, tableName]
  );

  const [smell, setSmell] = useState('1');
  const [taste, setTaste] = useState('1');

  return (
    <div>
      <h1 className="my-2 text-4xl">Rate the snaps!</h1>
      <form
        id="snapsForm"
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <fieldset>
          <legend className="text-2xl">Snaps</legend>
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
          <legend className="mb-2 text-2xl">Smell</legend>
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
          <legend className="mb-2 text-2xl">Taste</legend>
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
          disabled={isPending}
          type="submit"
          value={isPending ? 'Submitting' : 'Submit vote'}
          className="self-end px-4 py-0.5 cursor-pointer text-black bg-white border border-black rounded-lg shadow-lg w-fit disabled:bg-black disabled:text-white"
        />
      </form>
    </div>
  );
};

export default SubmitSnapsVote;
