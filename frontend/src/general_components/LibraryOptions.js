import { StateOptions } from "./StateOptions";

const LibraryEndpointName = "libraries";

const LibraryExactFilters = [
  {
    label: "State Filter",
    field: "state",
    options: StateOptions,
  },
  {
    label: "City Filter",
    field: "city",
    api: "cities",
  },
  {
    label: "Zip Code Filter",
    field: "zipcode",
    api: "zipcodes",
  },
];

const LibraryRangeFilters = [
  {
    label: "Rating",
    field: "rating",
    min: 1,
    max: 5,
    step: 1,
    marks: [
      {
        label: "1",
        value: 1,
      },
      {
        label: "2",
        value: 2,
      },
      {
        label: "3",
        value: 3,
      },
      {
        label: "4",
        value: 4,
      },
      {
        label: "5",
        value: 5,
      },
    ],
  },
];

export { LibraryEndpointName, LibraryExactFilters, LibraryRangeFilters };