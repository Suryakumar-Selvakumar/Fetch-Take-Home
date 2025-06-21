import createFetchResponse from "./createFetchResponse";

const setFakeDogIds = () =>
  Promise.resolve(
    createFetchResponse({
      resultIds: ["1", "2"],
      total: 2,
      next: "next",
      prev: "prev",
    })
  );

export default setFakeDogIds;
