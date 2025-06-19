import createFetchResponse from "./createFetchResponse";

const setFakeDogIds = () =>
  createFetchResponse({
    resultIds: ["1", "2"],
    total: 2,
    next: "next",
    prev: "prev",
  });

export default setFakeDogIds;
