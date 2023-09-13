
export const validate = ({ user_name, password }) => {
  const erros = {};

  if (user_name.trim() === "") {
    erros.user_name = "Username is required";
  }
  if (password.trim() === "") {
    erros.password = "Password is required";
  }
  return Object.keys(erros).length === 0 ? null : erros;
};

export const validateProperty = ({ name, value }) => {
  if (name === "user_name") {
    if (value.trim() === "") return "Username is required";
  }
  if (name === "password") {
    if (value.trim() === "") return "Password is required";
  }
};