import createFetchResponse from "./createFetchResponse";

const handleFakeLogin = () => Promise.resolve(createFetchResponse(""));

export default handleFakeLogin;
