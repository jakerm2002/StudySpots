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

const UniversityRangeFilters = [
  {
    label: "Undergrad Population",
    field: "enrollment_ugr_12m",
    min: 1_000,
    max: 80_000,
    nonlinear: true,
    compactNumbers: true,
    marks: [
      {
        label: "<1K",
        value: 1_000,
      },
      {
        label: "4K",
        value: 4_000,
      },
      {
        label: "10K",
        value: 10_000,
      },
      {
        label: "20K",
        value: 20_000,
      },
      {
        label: "40K",
        value: 40_000,
      },
      {
        label: ">80K",
        value: 80_000,
      },
    ],
  },
  {
    label: "Average SAT",
    field: "sat_average",
    min: 800,
    max: 1600,
    step: 1,
    marks: [
      {
        label: "<800",
        value: 800,
      },
      {
        label: "1200",
        value: 1200,
      },
      {
        label: "1600",
        value: 1600,
      },
    ],
  },
  {
    label: "In-State Tuition",
    field: "instate_tuition",
    min: 5_000,
    max: 60_000,
    nonlinear: true,
    compactNumbers: true,
    marks: [
      {
        label: "<5K",
        value: 5_000,
      },
      {
        label: "10K",
        value: 10_000,
      },
      {
        label: "20K",
        value: 20_000,
      },
      {
        label: "30K",
        value: 30_000,
      },
      {
        label: "40K",
        value: 40_000,
      },
      {
        label: "50K",
        value: 50_000,
      },
      {
        label: ">60K",
        value: 60_000,
      },
    ],
  },
  {
    label: "Out-of-State Tuition",
    field: "outstate_tuition",
    min: 10_000,
    max: 60_000,
    step: 1,
    compactNumbers: true,
    marks: [
      {
        label: "<10K",
        value: 10_000,
      },
      {
        label: "20K",
        value: 20_000,
      },
      {
        label: "30K",
        value: 30_000,
      },
      {
        label: "40K",
        value: 40_000,
      },
      {
        label: "50K",
        value: 50_000,
      },
      {
        label: ">60K",
        value: 60_000,
      },
    ],
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
    label: "SAT Average",
    db_label: "sat_average",
  },
  {
    label: "Acceptance Rate",
    db_label: "acceptance_rate",
  }
];

const UniversityDropdown = 
  {
    label: "University",
    name: "name",
    api: "locations"
  }
;

export { UniversityEndpointName, UniversityExactFilters, UniversityRangeFilters, UniversitySortOptions, UniversityDropdown };