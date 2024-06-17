import { useNavigate } from 'react-router-dom';

/**
 * A hook that iterates through the given form,
 * Puts together a body object and sends it to given url and awaits response.
 * If response is OK, then send user back to previous page, otherwise stay on page and display a error
 */
const useHandleSubmit = ({
  formName,
  url,
  method,
  noRedirect
}: {
  formName: string;
  url: string;
  method: 'POST' | 'PUT';
  noRedirect?: boolean;
}) => {
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = document.querySelector(`#${formName}`) as HTMLFormElement;
    if (form) {
      const formData = new FormData(form);
      let body = {};
      for (const input of formData) {
        body = { ...body, [input[0]]: input[1] };
      }

      const res = await fetch(url, {
        method,
        body: JSON.stringify(body)
      });

      if (res.ok && !noRedirect) {
        navigate('..');
        // TODO: Success message in UI
        console.log('Submitted');
      }
      if (!res.ok) {
        // TODO: Error message in UI
        console.error('Something went wrong while submitting data');
      }
    }
  }

  return handleSubmit;
};

export default useHandleSubmit;
