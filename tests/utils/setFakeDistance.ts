import createFetchResponse from "./createFetchResponse";

const setFakeDistance = (url: string) => {
  if (url?.includes("90210")) {
    return Promise.resolve(
      createFetchResponse({
        results: {
          "90210": 10,
        },
      })
    );
  }

  return Promise.resolve(
    createFetchResponse({
      results: {
        "1": 50,
      },
    })
  );
};

export default setFakeDistance;
