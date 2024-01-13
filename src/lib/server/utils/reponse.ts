interface IResponseJsonData {
  jsonData: object;
  jsonDataKey: string;
  message?: string;
  status?: number;
}

export default function responseJson({ jsonData, jsonDataKey, message, status }: IResponseJsonData): Response {
  const response_status: number = status ? status : 200;
  const response = Object.assign(
    { status: response_status },
    { message: message ? message : 'success' },
    { [jsonDataKey]: jsonData },
  );

  return new Response(JSON.stringify(response), { status: response_status });
}
