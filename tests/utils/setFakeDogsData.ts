import createFetchResponse from "./createFetchResponse";

export const setFakeDogs = (body?: string[]) => {
  if (body?.includes("z1")) {
    return Promise.resolve(
      createFetchResponse([
        {
          id: "z1",
          img: "img-1",
          name: "Dog 1",
          age: 10,
          zip_code: "90210",
          breed: "Breed 1",
        },
      ])
    );
  }

  if (body?.includes("n1")) {
    return Promise.resolve(
      createFetchResponse([
        {
          id: "n1",
          img: "img-3",
          name: "Andy",
          age: 10,
          zip_code: "3",
          breed: "Breed 3",
        },
        {
          id: "n2",
          img: "img-4",
          name: "Barbie",
          age: 11,
          zip_code: "4",
          breed: "Breed 4",
        },
      ])
    );
  }

  if (body?.includes("d1")) {
    return Promise.resolve(
      createFetchResponse([
        {
          id: "d1",
          img: "img-5",
          name: "Name 5",
          age: 10,
          zip_code: "5",
          breed: "Airedale",
        },
        {
          id: "d2",
          img: "img-6",
          name: "Name 6",
          age: 11,
          zip_code: "6",
          breed: "Basenji",
        },
      ])
    );
  }

  return Promise.resolve(
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
};

export const setFakeLocations = (body: string[] | null) => {
  if (body?.includes("90210")) {
    return Promise.resolve(
      createFetchResponse([
        {
          zip_code: "90210",
          city: "City 1",
          state: "State 1",
        },
      ])
    );
  }

  if (body?.includes("3")) {
    return Promise.resolve(
      createFetchResponse([
        {
          zip_code: "3",
          city: "City 3",
          state: "State 3",
        },
        {
          zip_code: "4",
          city: "City 4",
          state: "State 4",
        },
      ])
    );
  }

  if (body?.includes("5")) {
    return Promise.resolve(
      createFetchResponse([
        {
          zip_code: "5",
          city: "City 5",
          state: "State 5",
        },
        {
          zip_code: "6",
          city: "City 6",
          state: "State 6",
        },
      ])
    );
  }

  return Promise.resolve(
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
};
