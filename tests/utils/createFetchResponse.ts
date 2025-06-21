function createFetchResponse(data, okInput: boolean = true): Response {
  return new Response(JSON.stringify(data), {
    status: okInput ? 200 : 500,
    headers: { "Content-Type": "application/json" },
  });
}

export default createFetchResponse;
