function normalizeQueryArrayIndices(encodedUrl: string): string {
  const decodedUrl = decodeURIComponent(encodedUrl);
  const [base, query] = decodedUrl.split("?");
  const params = new URLSearchParams(query);
  const newParams = new URLSearchParams();

  for (const [key, value] of params.entries()) {
    const normalizedKey = key.replace(/\[\d+\]$/, "");
    newParams.append(normalizedKey, value);
  }

  return `${base}?${newParams.toString()}`;
}

export default normalizeQueryArrayIndices;
