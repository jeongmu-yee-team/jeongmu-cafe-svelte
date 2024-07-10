interface IResponseJsonData {
  jsonData?: object;
  jsonDataKey?: string;
  message?: string;
  status?: number;
}

/**
 * @deprecated
 */
export default function responseJson({ jsonData, jsonDataKey, message, status }: IResponseJsonData): Response {
  const response_status: number = status ? status : 200;
  let response = Object.assign({ status: response_status }, { message: message ? message : 'success' });
  if (jsonDataKey) {
    response = Object.assign({ [jsonDataKey]: jsonData });
  }

  return new Response(JSON.stringify(response), { status: response_status });
}
