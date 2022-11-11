import { StateOptions } from "./StateOptions";

const UniversityEndpointName = "universities";

const UniversityExactFilters = [
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

// to store options for frontend dropdown sort menu
const UniversitySortOptions = [
    {
      label: "Name",
      db_label: "name",
    },
    {
      label: "Undergraduate Population",
      db_label: "enrollment_ugr_12m",
    },
    {
      label: "In-State Tuition",
      db_label: "instate_tuition",
    },
    {
      label: "Out-Of-State Tuition",
      db_label: "outstate_tuition",
    },
    {
      label: "SAT Median Math",
      db_label: "sat_median_math",
    },
    {
      label: "SAT Median Reading",
      db_label: "sat_median_reading",
    },
    {
      label: "Acceptance Rate",
      db_label: "acceptance_rate",
    }
  ];
  

export { UniversityEndpointName, UniversityExactFilters, UniversitySortOptions };