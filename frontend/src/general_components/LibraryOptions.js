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

export { LibraryEndpointName, LibraryExactFilters };