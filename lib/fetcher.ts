export async function fetcher<T = 'any'>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new FetcherError(res.status, res.statusText, res.url);
  }

  return res.json();
}

export class FetcherError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public url: string
  ) {
    super(`${status} ${statusText}: ${url}`);
    this.status = status;
    this.statusText = statusText;
    this.url = url;
  }

  get name(): string {
    return 'FetcherError';
  }
}
