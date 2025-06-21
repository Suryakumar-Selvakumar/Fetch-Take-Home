import createFetchResponse from "./createFetchResponse";

const handleFakeLogout = () => Promise.resolve(createFetchResponse([]));

export default handleFakeLogout;
