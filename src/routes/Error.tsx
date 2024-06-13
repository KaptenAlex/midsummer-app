import { Link, useRouteError } from 'react-router-dom';

type ErrorType = {
  statusText?: string;
  message?: string;
}

export default function Error() {
  const error = useRouteError();
  const { statusText, message } = error as ErrorType;

  return (
    <div
      className="flex flex-col justify-center w-screen h-screen text-center text-black align-middle gap-y-2"
      id="error-page"
    >
      <h1 className="text-4xl underline">Oops!</h1>
      <p className="text-xl">Sorry, an unexpected error has occurred.</p>
      <p className="text-xl">
        <i>{statusText || message}</i>
      </p>
      <Link to="/">⬅ Home</Link>
    </div>
  );
}
