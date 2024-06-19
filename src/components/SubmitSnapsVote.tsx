import { useCallback, useEffect, useState } from 'react';
import { useFetchSnapsRatings } from '../hooks/useFetchSnapsRatings';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from './Snackbar';

const SubmitSnapsVote = () => {
  const tableName = import.meta.env.VITE_SNAPSRATING_TABLE_NAME ?? '';

  const snapsRatings = useFetchSnapsRatings();
  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(false);
  const [isInvalid, setIsInvalid] = useState(true);
  const [showSnackbar, setSnackbar] = useState(false);

  const [snaps, setSnaps] = useState('');
  const [smell, setSmell] = useState('0');
  const [taste, setTaste] = useState('0');
  const [submitText, setSubmitText] = useState('Submit form');


  const validateForm = useCallback(
    () => {
      if (!parseInt(smell) || !parseInt(taste)) {
        setIsInvalid(true)
        setSubmitText(!parseInt(smell) ? 'Must vote on smell' : 'Must vote on taste')
        return false;
      }
      if (!snaps) {
        setSubmitText('Must select a snaps')
        setIsInvalid(true)
        return false;
      }
      setIsInvalid(false)
      return true;
    }, [smell, snaps, taste]
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      const body = {
        smell,
        taste,
        snaps
      };

      setIsPending(true);
      const res = await fetch(
        `https://xmvp7o6kgi4m2q5q7ac6h3k5ka0nqumq.lambda-url.eu-north-1.on.aws?TableName=${tableName}`,
        {
          method: 'PUT',
          body: JSON.stringify(body)
        }
      );

      if (res.ok) {
        setSnackbar(true);
        setTimeout(() => {
          navigate(0)
        }, 2500);
      } else {
        setSnackbar(true);
      }
      setIsPending(false);
    },
    [navigate, smell, snaps, tableName, taste, validateForm]
  );

  useEffect(() => {
    validateForm();
  }, [snaps, smell, taste, validateForm])

  useEffect(() => {
    setSubmitText(isPending ? 'Submitting' : isInvalid ? 'Must fill form' : 'Submit vote')
  }, [isPending, isInvalid])

  return (
    <div className='relative'>
      {showSnackbar && (
        <Snackbar success={!isInvalid} text={isInvalid ? "Something went wrong while submitting data" : "Success"} />
      )}
      <h1 className="my-2 text-4xl text-blue-900">Rate the snaps!</h1>
      <form
        id="snapsForm"
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <fieldset>
          <legend className="mb-2 text-3xl text-blue-900">Snaps</legend>
          <select
            required
            disabled={!snapsRatings || snapsRatings.length == 0}
            className="w-full p-3 text-yellow-500 capitalize bg-blue-900 rounded-lg focus-visible:ring-blue-900"
            name="snaps"
            value={snaps}
            onChange={(e) => {
              setSnaps(e.target.value)
              validateForm();
            }}
          >
            <option value="bg-blue-900 text-yellow-500 capitalize">Select a snaps...</option>
            {snapsRatings.map((rating) => (
              <option
                className="text-yellow-500 capitalize bg-blue-900"
                key={rating.snaps}
                value={rating.snaps}
              >
                {rating.snaps}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset>
          <legend className="mb-2 text-3xl text-blue-900">Smell</legend>
          <input
            min={0}
            max={10}
            onChange={(e) => {
              setSmell(e.target.value);
              validateForm();
            }}
            value={smell}
            required
            name="smell"
            type="range"
            className="w-full"
          />
          <p>{smell}</p>
        </fieldset>
        <fieldset>
          <legend className="mb-2 text-3xl text-blue-900">Taste</legend>
          <input
            min={0}
            max={10}
            onChange={(e) => {
              setTaste(e.target.value);
              validateForm();
            }}
            value={taste}
            required
            name="taste"
            type="range"
            className="w-full"
          />
          <p>{taste}</p>
        </fieldset>
        <input
          disabled={isPending || isInvalid}
          type="submit"
          value={submitText}
          className={"py-2 btn-primary disabled:bg-gray-600"}
        />
      </form>
    </div>
  );
};

export default SubmitSnapsVote;
