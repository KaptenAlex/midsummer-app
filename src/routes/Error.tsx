import { Link, useRouteError } from 'react-router-dom';

export default function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      className="flex flex-col justify-center w-screen h-screen text-center text-black align-middle gap-y-2"
      id="error-page"
    >
      <h1 className="text-4xl underline">Oops!</h1>
      <p className='text-xl'>Sorry, an unexpected error has occurred.</p>
      <p className='text-xl'>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/">⬅ Home</Link>
    </div>
  );
}
