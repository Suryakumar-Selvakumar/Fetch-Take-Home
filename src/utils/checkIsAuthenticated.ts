async function checkIsAuthenticated(): Promise<boolean> {
  try {
    const res: Response = await fetch(
      "https://frontend-take-home-service.fetch.com/dogs/breeds",
      {
        credentials: "include",
      }
    );

    return res.ok;
  } catch {
    return false;
  }
}

export default checkIsAuthenticated;
