function createFetchResponse(
  data,
  okInput: boolean = true
): {
  ok: boolean;
  json: () => Promise<unknown>;
} {
  return { ok: okInput, json: () => new Promise((resolve) => resolve(data)) };
}

export default createFetchResponse;
