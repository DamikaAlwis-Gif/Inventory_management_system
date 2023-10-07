import * as yup from "yup";

export const validationAdd = yup.object().shape({
  name: yup
    .string()
    .matches(/[a-z A-Z]+[0-9]*/, "Name must start with a letter")
    .required("Name is required"),
  resource_type: yup
    .string()
    .matches(/[a-z A-Z]+[0-9]*/, "Name must start with a letter")
    .required("Resource type is required"),
  model: yup
    .string()
    .matches(/[a-z A-Z 0-9]*[a-z A-Z]+[a-z A-Z 0-9 _ -]*/, "Field must contain at least one letter")
    .required("Model is required"),
  serial_number:
    yup.string()
    .matches(/[a-z A-Z 0-9]*[a-z A-Z]+[a-z A-Z 0-9 _ -]*/, "Field must contain at least one letter")
    .required("Model is required"),
  specifications,
  lab_name,
  location,
  availability,
  resource_condition,
  is_portable,
  img_url,
  last_maintenance_date,
  maintenance_interval,
});