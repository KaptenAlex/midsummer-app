import { useNavigate } from 'react-router-dom';

/**
 * A hook that iterates through the given form,
 * Puts together a body object and sends it to given url and awaits response.
 * If response is OK, then send user back to previous page, otherwise stay on page and display a error
 */
const useHandleSubmit = ({
  formName,
  url
}: {
  formName: string;
  url: string;
}) => {
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('yolo', e);
    const form = document.querySelector(`#${formName}`) as HTMLFormElement;
    if (form) {
      const formData = new FormData(form);
      let body = {};
      for (const input of formData) {
        console.log(input[0], input[1])
        body = { ...body, [input[0]]: input[1] };
      }
      console.log(body);
      console.log(url)
      navigate('..');
      /* TODO: Create endpoint with lambda or something that takes this request
            stores it in a db and then reroutes the user to the snaps visa page
            also check if the submit is successful, if it isn't stay on this page
            if it succeeds, reroute tot snapsvisa page.
          */
    }
  }

  return handleSubmit;
};

export default useHandleSubmit;
