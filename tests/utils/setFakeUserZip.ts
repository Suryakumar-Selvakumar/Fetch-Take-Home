import createFetchResponse from "./createFetchResponse";

const setFakeUserZip = (okInput: boolean) =>
  Promise.resolve(
    createFetchResponse(
      {
        features: [
          {
            properties: {
              postcode: "00000",
            },
          },
        ],
      },
      okInput
    )
  );

export default setFakeUserZip;
