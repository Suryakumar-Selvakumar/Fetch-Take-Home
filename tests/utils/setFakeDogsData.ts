import createFetchResponse from "./createFetchResponse";

export const setFakeDogs = (body?: string[]) => {
  // Search case
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

  // Sort By case
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

  // Order By case
  if (body?.includes("d1")) {
    return Promise.resolve(
      createFetchResponse([
        {
          id: "d1",
          img: "img-5",
          name: "Name 5",
          age: 10,
          zip_code: "5",
          breed: "Basenji",
        },
        {
          id: "d2",
          img: "img-6",
          name: "Name 6",
          age: 11,
          zip_code: "6",
          breed: "Airedale",
        },
      ])
    );
  }

  // Age Min case
  if (body?.includes("am1")) {
    return Promise.resolve(
      createFetchResponse([
        {
          id: "am1",
          img: "img-7",
          name: "Name 7",
          age: 10,
          zip_code: "7",
          breed: "Breed 7",
        },
        {
          id: "am2",
          img: "img-8",
          name: "Name 8",
          age: 11,
          zip_code: "8",
          breed: "Breed 8",
        },
      ])
    );
  }

  // Age Max case
  if (body?.includes("am3")) {
    return Promise.resolve(
      createFetchResponse([
        {
          id: "am3",
          img: "img-9",
          name: "Name 9",
          age: 10,
          zip_code: "9",
          breed: "Breed 9",
        },
        {
          id: "am4",
          img: "img-10",
          name: "Name 10",
          age: 11,
          zip_code: "10",
          breed: "Breed 10",
        },
      ])
    );
  }

  // Favorites pagination case
  if (body?.length === 9 && body.includes("10")) {
    return Promise.resolve(
      createFetchResponse([
        {
          id: "2",
          img: "img-2",
          name: "Name 2",
          age: 10,
          zip_code: "2",
          breed: "Breed 2",
        },
        {
          id: "3",
          img: "img-3",
          name: "Name 3",
          age: 10,
          zip_code: "3",
          breed: "Breed 3",
        },
        {
          id: "4",
          img: "img-4",
          name: "Name 4",
          age: 10,
          zip_code: "4",
          breed: "Breed 4",
        },
        {
          id: "5",
          img: "img-5",
          name: "Name 5",
          age: 10,
          zip_code: "5",
          breed: "Breed 5",
        },
        {
          id: "6",
          img: "img-6",
          name: "Name 6",
          age: 10,
          zip_code: "6",
          breed: "Breed 6",
        },
        {
          id: "7",
          img: "img-7",
          name: "Name 7",
          age: 10,
          zip_code: "7",
          breed: "Breed 7",
        },
        {
          id: "8",
          img: "img-8",
          name: "Name 8",
          age: 10,
          zip_code: "8",
          breed: "Breed 8",
        },
        {
          id: "9",
          img: "img-9",
          name: "Name 9",
          age: 10,
          zip_code: "9",
          breed: "Breed 9",
        },
        {
          id: "10",
          img: "img-10",
          name: "Name 10",
          age: 10,
          zip_code: "10",
          breed: "Breed 10",
        },
      ])
    );
  }

  // Pagination next case
  if (body?.includes("11")) {
    return Promise.resolve(
      createFetchResponse([
        {
          id: "11",
          img: "img-11",
          name: "Name 11",
          age: 10,
          zip_code: "11",
          breed: "Breed 11",
        },
        {
          id: "12",
          img: "img-12",
          name: "Name 12",
          age: 11,
          zip_code: "12",
          breed: "Breed 12",
        },
      ])
    );
  }

  // Favorites case
  if (body?.length === 1 && body.includes("1")) {
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
      ])
    );
  }

  // default case
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
  // Search case
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

  // Sort By case
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

  // Order By case
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

  // Age Min case
  if (body?.includes("7")) {
    return Promise.resolve(
      createFetchResponse([
        {
          zip_code: "7",
          city: "City 7",
          state: "State 7",
        },
        {
          zip_code: "8",
          city: "City 8",
          state: "State 8",
        },
      ])
    );
  }

  // Age Max case
  if (body?.includes("9")) {
    return Promise.resolve(
      createFetchResponse([
        {
          zip_code: "9",
          city: "City 9",
          state: "State 9",
        },
        {
          zip_code: "10",
          city: "City 10",
          state: "State 10",
        },
      ])
    );
  }

  // Favorites case
  if (body?.length === 1 && body?.includes("1")) {
    return Promise.resolve(
      createFetchResponse([
        {
          zip_code: "1",
          city: "City 1",
          state: "State 1",
        },
      ])
    );
  }

  // Favorites pagination case
  if (body?.length === 9 && body?.includes("10")) {
    return Promise.resolve(
      createFetchResponse([
        {
          zip_code: "2",
          city: "City 2",
          state: "State 2",
        },
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
        {
          zip_code: "7",
          city: "City 7",
          state: "State 7",
        },
        {
          zip_code: "8",
          city: "City 8",
          state: "State 8",
        },
        {
          zip_code: "9",
          city: "City 9",
          state: "State 9",
        },
        {
          zip_code: "10",
          city: "City 10",
          state: "State 10",
        },
      ])
    );
  }

  // Pagination next case
  if (body?.includes("11")) {
    return Promise.resolve(
      createFetchResponse([
        {
          zip_code: "11",
          city: "City 11",
          state: "State 11",
        },
        {
          zip_code: "12",
          city: "City 12",
          state: "State 12",
        },
      ])
    );
  }

  // default case
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
