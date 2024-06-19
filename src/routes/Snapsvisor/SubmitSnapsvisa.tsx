import { useState } from 'react';
import CommonLink from '../../components/CommonLink';
import useHandleSubmit from '../../hooks/useHandleSubmit';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '../../components/Snackbar';

const SubmitSnapsvisa = () => {
  const tableName = import.meta.env.VITE_SNAPSVISOR_TABLE_NAME ?? '';
  const url = `https://ct46vi4u27mqybegdkh2dtxrre0amrcm.lambda-url.eu-north-1.on.aws?TableName=${tableName}`;

  const navigate = useNavigate();

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [snackBarText, setSnackBarText] = useState("");

  const handleSubmit = useHandleSubmit({
    formName: 'snapsvisa',
    url,
    method: 'POST'
  });

  return (
    <div className='relative flex flex-col justify-center h-full'>
      {showSnackbar && (
        <Snackbar success={isSuccess} text={snackBarText} />
      )}
      <div className="mb-4">
        <h1 className="text-3xl text-blue-900">Submit a snapsvisa</h1>
        <p className="text-blue-900 text-md">
          Just copy the title and the lyrics of a snapsvisa into the form and
          submit so others can see it!
        </p>
      </div>
      <div className="mb-4">
        <CommonLink text="Back to snapsvisor" to=".." />
      </div>
      <form
        id="snapsvisa"
        className="flex flex-col gap-4"
        onSubmit={async (e) => {
          const res = await handleSubmit(e);
          setShowSnackbar(true);
          if (res) {
            setSnackBarText("Success!")
            setIsSuccess(true);
            setTimeout(() => {
              navigate('/snaps-visor');
            }, 2500);
          } else {
            setIsSuccess(false);
            setSnackBarText("Something went wrong :(")
          }
        }}
      >
        <fieldset>
          <legend className='mb-1 text-2xl text-blue-900'>Title</legend>
          <input
            minLength={2}
            required
            name="title"
            type="text"
            className="w-full p-2 text-lg text-yellow-500 bg-blue-900"
          />
        </fieldset>
        <fieldset>
          <legend className='mb-1 text-2xl text-blue-900'>Melody</legend>
          <input
            minLength={2}
            required
            name="melody"
            type="text"
            className="w-full p-2 text-lg text-yellow-500 bg-blue-900"
          />
        </fieldset>
        <fieldset>
          <legend className='mb-1 text-2xl text-blue-900'>Lyrics</legend>
          <textarea
            minLength={2}
            required
            name="lyrics"
            className="w-full p-2 text-lg text-yellow-500 bg-blue-900"
          ></textarea>
        </fieldset>
        <input
          type="submit"
          value="Submit snapsvisa"
          className="p-4 btn-primary"
        />
      </form>
    </div>
  );
};

export default SubmitSnapsvisa;
