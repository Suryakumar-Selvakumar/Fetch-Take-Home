import createFetchResponse from "./createFetchResponse";

const setFakeDogIds = (url?: string) => {
  if (url?.includes("ageMin")) {
    return Promise.resolve(
      createFetchResponse({
        resultIds: ["am1", "am2"],
        total: 2,
        next: "next",
        prev: "prev",
      })
    );
  }

  if (url?.includes("ageMax")) {
    return Promise.resolve(
      createFetchResponse({
        resultIds: ["am3", "am4"],
        total: 2,
        next: "next",
        prev: "prev",
      })
    );
  }

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

  if (url?.includes("from=9")) {
    return Promise.resolve(
      createFetchResponse({
        resultIds: ["11", "12"],
        total: 18,
        prev: "/dogs/search?size=9&sort=breed%3Aasc&from=0",
      })
    );
  }

  return Promise.resolve(
    createFetchResponse({
      resultIds: ["1", "2"],
      total: 18,
      next: "/dogs/search?size=9&sort=breed%3Aasc&from=9",
    })
  );
};

export default setFakeDogIds;
