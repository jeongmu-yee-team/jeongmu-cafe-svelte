export default function queryFunction<T>(api: string) {
  async function getFetch(apiUri: string = api) {
    const response = await fetch(apiUri, {
      method: 'GET',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = (await response.json()) as T;
    return data;
  }

  async function postFetch(formData: object, apiUri: string = api) {
    const response = await fetch(apiUri, {
      method: 'POST',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = (await response.json()) as T;
    return data;
  }

  async function putFetch(formData: object, apiUri: string = api) {
    const response = await fetch(apiUri, {
      method: 'PUT',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = (await response.json()) as T;
    return data;
  }

  async function patchFetch(formData?: object, apiUri: string = api) {
    const response = await fetch(apiUri, {
      method: 'PATCH',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = (await response.json()) as T;
    return data;
  }

  async function deleteFetch(formData?: object, apiUri: string = api) {
    const response = await fetch(apiUri, {
      method: 'DELETE',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = (await response.json()) as T;
    return data;
  }

  return { getFetch, postFetch, putFetch, patchFetch, deleteFetch };
}
