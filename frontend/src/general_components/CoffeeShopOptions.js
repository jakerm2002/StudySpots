import { StateOptions } from "./StateOptions";

const CoffeeShopEndpointName = "coffeeshops";

const CoffeeShopExactFilters = [
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

export { CoffeeShopEndpointName, CoffeeShopExactFilters };