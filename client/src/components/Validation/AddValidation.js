

export const validate = (asset) => {
  const errors = {};
  const {
    name,
    resource_type,
    model,
    serial_number,
    specifications,
    lab_name,
    location,
    availability,
    resource_condition,
    is_portable,
    img_url,
    last_maintenance_date,
    maintenance_interval,
  } = asset;
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  

  if (name.trim() === "") {
    errors.name = "Name is required";
  }
  if (resource_type.trim() === "") {
    errors.resource_type = "Resource type is required";
  }
  if (model.trim() === "") {
    errors.model = "Model is required";
  }
  if (serial_number.trim() === "") {
    errors.serial_number = "Serial number is required";
  }
  if (specifications.trim() === "") {
    errors.specifications = "Specifications is required";
  }
  if (lab_name.trim() === "") {
    errors.lab_name = "Lab name is required";
  }
  if (location.trim() === "") {
    errors.location = "Location is required";
  }
  if (availability.trim() === "") {
    errors.availability = "Availability is required";
  }
  if (resource_condition.trim() === "") {
    errors.resource_condition = "Condition is required";
  }
  if (is_portable.trim() === "") {
    errors.is_portable = "Is portable is required";
  }
 if (img_url.trim() !== "") {
    
    if (!urlRegex.test(img_url)) {
      errors.img_url = "Invalid URL";
    }
 }
  if (last_maintenance_date.trim() === "") {
    errors.last_maintenance_date = "Last maintenance date is required";
  }
  if (maintenance_interval.trim() === "") {
    errors.maintenance_interval = "Maintenance interval is required";
  }
  return Object.keys(errors).length === 0 ? null : errors;
};

export const validateProperty = ({ name, value }) => {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  if (name === "name") {
    if (value.trim() === "") return "Username is required";
  } else if (name === "resource_type") {
    if (value.trim() === "") return "Resource type is required";
  } else if (name === "model") {
    if (value.trim() === "") return "Model is required";
  } else if (name === "serial_number") {
    if (value.trim() === "") return "Serial number is required";
  } else if (name === "specifications") {
    if (value.trim() === "") return "Specifications is required";
  } else if (name === "lab_name") {
    if (value.trim() === "") return "Lab name is required";
  } else if (name === "location") {
    if (value.trim() === "") return "Location is required";
  } else if (name === "availability") {
    if (value.trim() === "") return "Availability is required";
  } else if (name === "resource_condition") {
    if (value.trim() === "") return "Condition is required";
  } else if (name === "is_portable") {
    if (value.trim() === "") return "Is portable is required";
   }
    else if (name === "img_url") {
      if (value.trim() !== "") {
        if (!urlRegex.test(value)) {
          return "Invalid URL";
        }
      }
    }
    
    else if (name === "last_maintenance_date") {
     if (value.trim() === "") return "Last maintenance date is required";
   } else if (name === "maintenance_interval") {
     if (value.trim() === "") return "Maintenance interval is required";
   } else return null;
};


