import * as yup from "yup";

export const validationRegister = () => {
  return yup.object().shape({
    firstName: yup.string().required("Field tidak boleh kosong"),
    lastName: yup.string().required("Field tidak boleh kosong"),
    email: yup
      .string()
      .email()
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Invalid Email"),
    password: yup
      .string()
      .required("Password tidak boleh kosong")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password Harus Berisi kombinasi Angka Besar,kecil dan simbol"
      ),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password not match"),
  });
};

export const validationLogin = () => {
  return yup.object().shape({
    email: yup
      .string()
      .email()
      .required("Field tidak boleh kosong")
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Invalid Email"),
    password: yup
      .string()
      .required("Password tidak boleh kosong")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password Harus Berisi kombinasi Angka Besar,kecil dan simbol"
      ),
  });
};

export const validationOrganizers = () => {
  return yup.object().shape({
    organizerName: yup.string().required("Field tidak boleh kosong"),
    imageLocation: yup.string().required("Field tidak boleh kosong"),
  });
};

export const validationSportsEvents = () => {
  return yup.object().shape({
    eventType: yup.string().required("Field tidak boleh kosong"),
    eventName: yup.string().required("Field tidak boleh kosong"),
    organizerId: yup
      .object()
      .shape({
        value: yup.number(),
        label: yup.string(),
      })
      .required(),
  });
};

export const validationUser = () => {
  return yup.object().shape({
    firstName: yup.string().required("Field tidak boleh kosong"),
    lastName: yup.string().required("Field tidak boleh kosong"),
    email: yup
      .string()
      .email()
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Invalid Email"),
    oldPassword: yup.string(),
    newPassword: yup.string().nullable(),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Password not match")
      .nullable(),
  });
};
