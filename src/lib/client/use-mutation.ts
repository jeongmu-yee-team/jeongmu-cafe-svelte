type MethodType = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface IFetchState<T> {
  data?: T;
  isLoading?: boolean;
  error?: Error;
}
type MutationReturnType<T> = {
  mutation: (formData: object, method?: MethodType, apiURL?: string) => void;
  clear: () => void;
  data?: T;
  isLoading?: boolean;
  error?: Error;
};

export default function requestData<T = object>(key: string): MutationReturnType<T> {
  const state: IFetchState<T> = { data: undefined, isLoading: false, error: undefined };

  function mutation(formData: object, method: MethodType = 'POST', endpoint = key) {
    fetch(endpoint, {
      method,
      mode: 'same-origin',
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

  return { mutation, clear, ...state };
}
