import { ILoginErrors, IRegisterErrors } from "@/types";
import { ILoginProps, IRegisterProps } from "@/types/propTypes";


export const validateLoginForm = (values: ILoginProps): ILoginErrors => {
  const errors: ILoginErrors = {};

  // EMAIL
  if (!values.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address";
  }

  // PASSWORD
  if (!values.password?.trim()) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};



export const validateRegisterForm = (
  values: IRegisterProps
): IRegisterErrors => {
  const errors: IRegisterErrors = {};

  if (!values.name?.trim()) {
    errors.name = "Name is required";
  }

  if (!values.email?.trim()) {
    errors.email = "Email is required";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
  ) {
    errors.email = "Enter a valid email address";
  }

  if (!values.password?.trim()) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password =
      "Password must be at least 8 characters";
  }

  if (!values.confirmPassword?.trim()) {
    errors.confirmPassword =
      "Password confirmation is required";
  } else if (
    values.password !== values.confirmPassword
  ) {
    errors.confirmPassword =
      "Passwords do not match";
  }

  if (!values.address?.trim()) {
    errors.address = "Address is required";
  }

  if (!values.phone?.trim()) {
    errors.phone = "Phone is required";
  }

  if (!values.country?.trim()) {
    errors.country = "Country is required";
  }

  if (!values.city?.trim()) {
    errors.city = "City is required";
  }

  if (!values.birthdate?.trim()) {
    errors.birthdate = "Birthdate is required";
  } else if (
    !/^\d{2}\/\d{2}\/\d{4}$/.test(values.birthdate)
  ) {
    errors.birthdate =
      "Birthdate must be dd/mm/yyyy";
  }

  return errors;
};