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

  // NAME
  if (!values.name?.trim()) {
    errors.name = "Name is required";
  } else if (values.name.length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

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

  // ADDRESS
  if (!values.address?.trim()) {
    errors.address = "Address is required";
  } else if (values.address.length < 5) {
    errors.address = "Address must be at least 5 characters";
  }

  // PHONE
  if (!values.phone?.trim()) {
    errors.phone = "Phone is required";
  } else if (!/^[0-9+\-\s()]{7,15}$/.test(values.phone)) {
    errors.phone = "Enter a valid phone number";
  }

  return errors;
};