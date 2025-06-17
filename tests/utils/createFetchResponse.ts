function createFetchResponse(
  data,
  okInput: boolean = true
): {
  ok: boolean;
  json: () => Promise<unknown>;
} {
  console.log(okInput);
  return { ok: okInput, json: () => new Promise((resolve) => resolve(data)) };
}

export default createFetchResponse;
