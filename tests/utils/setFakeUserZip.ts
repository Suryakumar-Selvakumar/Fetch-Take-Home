import createFetchResponse from "./createFetchResponse";

const setFakeUserZip = (okInput: boolean) =>
  createFetchResponse(
    {
      features: [
        {
          properties: {
            postcode: "0",
          },
        },
      ],
    },
    okInput
  );

export default setFakeUserZip;
