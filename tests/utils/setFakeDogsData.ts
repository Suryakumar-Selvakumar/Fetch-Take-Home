import createFetchResponse from "./createFetchResponse";

export const setFakeDogs = () =>
  Promise.resolve(
    createFetchResponse([
      {
        id: "1",
        img: "img-1",
        name: "Dog 1",
        age: 10,
        zip_code: "1",
        breed: "Breed 1",
      },
      {
        id: "2",
        img: "img-2",
        name: "Dog 2",
        age: 11,
        zip_code: "2",
        breed: "Breed 2",
      },
    ])
  );

export const setFakeLocations = () =>
  Promise.resolve(
    createFetchResponse([
      {
        zip_code: "1",
        city: "City 1",
        state: "State 1",
      },
      {
        zip_code: "2",
        city: "City 2",
        state: "State 2",
      },
    ])
  );
