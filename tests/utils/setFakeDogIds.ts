import createFetchResponse from "./createFetchResponse";

const setFakeDogIds = (url?: string) => {
  if (url?.includes("zipCodes")) {
    return Promise.resolve(
      createFetchResponse({
        resultIds: ["z1"],
        total: 1,
        next: "next",
        prev: "prev",
      })
    );
  }

  if (url?.includes("name")) {
    return Promise.resolve(
      createFetchResponse({
        resultIds: ["n1", "n2"],
        total: 2,
        next: "next",
        prev: "prev",
      })
    );
  }

  if (url?.includes("desc")) {
    return Promise.resolve(
      createFetchResponse({
        resultIds: ["d1", "d2"],
        total: 2,
        next: "next",
        prev: "prev",
      })
    );
  }

  return Promise.resolve(
    createFetchResponse({
      resultIds: ["1", "2"],
      total: 2,
      next: "next",
      prev: "prev",
    })
  );
};

export default setFakeDogIds;
