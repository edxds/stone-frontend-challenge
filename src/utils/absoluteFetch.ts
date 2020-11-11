export async function absFetch<JSON = any>(info: RequestInfo, init?: RequestInit) {
  const baseUrl = 'https://stone-api.edxds.com';
  if (typeof info === 'string') {
    const res = await fetch(`${baseUrl}${info}`, init);
    return res.json();
  }

  const newInput: Request = { ...info, url: `${baseUrl}${info.url}` };
  const res = await fetch(newInput, init);
  return (await res.json()) as JSON;
}
