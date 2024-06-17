import CommonLink from '../../components/CommonLink';
import useHandleSubmit from '../../hooks/useHandleSubmit';

const SubmitSnapsvisa = () => {
  const tableName = import.meta.env.VITE_SNAPSVISOR_TABLE_NAME ?? '';
  const url = `https://ct46vi4u27mqybegdkh2dtxrre0amrcm.lambda-url.eu-north-1.on.aws?TableName=${tableName}`;

  const handleSubmit = useHandleSubmit({
    formName: 'snapsvisa',
    url,
    method: 'POST'
  });

  return (
    <>
      <div className="mb-4">
        <h1 className="text-3xl">Submit a snapsvisa</h1>
        <p className="text-md">
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
        onSubmit={handleSubmit}
      >
        <fieldset>
          <legend>Title</legend>
          <input
            minLength={2}
            required
            name="title"
            type="text"
            className="w-full"
          />
        </fieldset>
        <fieldset>
          <legend>Melody</legend>
          <input
            minLength={2}
            required
            name="melody"
            type="text"
            className="w-full"
          />
        </fieldset>
        <fieldset>
          <legend>Lyrics</legend>
          <textarea
            minLength={2}
            required
            name="lyrics"
            className="w-full"
          ></textarea>
        </fieldset>
        <input
          type="submit"
          value="Submit snapsvisa"
          className="self-end px-4 py-0.5 cursor-pointer text-black bg-white border border-black rounded-lg shadow-lg w-fit disabled:bg-black disabled:text-white"
        />
      </form>
    </>
  );
};

export default SubmitSnapsvisa;
