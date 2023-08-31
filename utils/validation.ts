import { ValidationType } from "../enums";

export const validateRequired = (value: string) => {
  if (!value || value.trim() === "") {
    return `El campo es obligatorio.`;
  } else {
    return "";
  }
};

export const validateEmail = (email: string) => {
  if (!/\S+@\S+\.\S+/.test(email)) {
    return `Ingresa un correo electrónico válido.`;
  } else {
    return "";
  }
};

export const validateUsername = (username: string) => {
  if (!/^[a-zA-Z0-9_-]{3,16}$/.test(username)) {
    return `El nombre de usuario debe contener entre 3 y 16 caracteres alfanuméricos.`;
  } else {
    return "";
  }
};

export const validateOnlyLetters = (value: string) => {
  if (!/^(?:[a-zA-Z]+\s{0,2})*[a-zA-Z]+$/.test(value)) {
    return `El campo sólo debe contener letras, sin espacios en blanco al principio o final.`;
  } else {
    return "";
  }
};

export const validatePhone = (phone: string) => {
  if (!/^[0-9]{10}$/.test(phone)) {
    return `Ingresa un número de teléfono válido (10 dígitos numéricos).`;
  } else {
    return "";
  }
};

export const validatePassword = (password: string) => {
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()-_=+[\]{}|;:'",.<>/?\\ ]*$/.test(password)) {
    return `La contraseña debe tener al menos 8 caracteres, al menos una letra mayúscula y un número`;
  } else {
    return "";
  }
};

export const validateOnlyNumbers = (value: string) => {
  if (!/^\d+$/.test(value)) {
    return `El campo debe contener solo números.`;
  } else {
    return "";
  }
};

export const validatePasswordMatch = (password: string, confirmPassword: string) => {
  if (password !== confirmPassword) {
    return `Las contraseñas no coinciden.`;
  } else {
    return "";
  }
};


export const validateField = (
  value: string,
  validationType: ValidationType,
  confirmPassword?: string
): string => {
  switch (validationType) {
    case ValidationType.Required:
      return validateRequired(value);
    case ValidationType.Email:
      return validateEmail(value);
    case ValidationType.Username:
      return validateUsername(value);
    case ValidationType.OnlyLetters:
      return validateOnlyLetters(value);
    case ValidationType.Phone:
      return validatePhone(value);
    case ValidationType.Password:
      return validatePassword(value);
    case ValidationType.PasswordMatch:
      if (confirmPassword) {
        return validatePasswordMatch(value, confirmPassword);
      } else {
        return "";
      }
    default:
      return "";
  }
};
