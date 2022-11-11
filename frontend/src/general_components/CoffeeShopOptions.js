import { StateOptions } from "./StateOptions";

const CoffeeShopExactFilters = [
  {
    label: "State Filter",
    field: "stateFilter",
    options: StateOptions,
  },
  {
    label: "City Filter",
    field: "cityFilter",
    api: "cities",
    api_field_name: "city"
  },
  {
    label: "Zip Code Filter",
    field: "zipcodeFilter",
    api: "zipcodes",
    api_field_name: "zipcode"
  },
];

// // to store options for frontend dropdown sort menu
// const UniversitySortOptions = [
//     {
//       label: "Name",
//       db_label: "name",
//     },
//     {
//       label: "Undergraduate Population",
//       db_label: "enrollment_ugr_12m",
//     },
//     {
//       label: "In-State Tuition",
//       db_label: "instate_tuition",
//     },
//     {
//       label: "Out-Of-State Tuition",
//       db_label: "outstate_tuition",
//     },
//     {
//       label: "SAT Median Math",
//       db_label: "sat_median_math",
//     },
//     {
//       label: "SAT Median Reading",
//       db_label: "sat_median_reading",
//     },
//     {
//       label: "Acceptance Rate",
//       db_label: "acceptance_rate",
//     }
//   ];
  

export { CoffeeShopExactFilters };