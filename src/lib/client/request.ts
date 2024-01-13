type MethodType = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface IRequestState<T> {
  data?: T;
  isLoading?: boolean;
  error?: Error;
}
type RequestReturnType<T> = [
  (formData: object, method?: MethodType, apiURL?: string) => void,
  () => void,
  IRequestState<T>,
];

export default function requestData<T = object>(url: string): RequestReturnType<T> {
  const state: IRequestState<T> = { data: undefined, isLoading: false, error: undefined };

  function sendRequest(formData: object, method: MethodType = 'POST', apiURL = url) {
    fetch(apiURL, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json().catch(() => null))
      .then((data) => {
        state.data = data;
        state.isLoading = false;
      })
      .catch((error) => {
        state.error = error;
        state.isLoading = false;
      });
  }

  function clear() {
    state.data = undefined;
    state.isLoading = false;
    state.error = undefined;
  }

  return [sendRequest, clear, state];
}
