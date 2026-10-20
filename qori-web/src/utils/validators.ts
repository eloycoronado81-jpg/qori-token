// ============================================
// VALIDADORES - QORI EXCHANGE
// ============================================

export interface ValidationResult {
  valid: boolean;
  message: string;
}

/**
 * Valida un correo electrónico
 */
export function validateEmail(email: string): ValidationResult {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.trim()) {
    return {
      valid: false,
      message: "El correo electrónico es obligatorio.",
    };
  }

  if (!regex.test(email)) {
    return {
      valid: false,
      message: "Ingrese un correo electrónico válido.",
    };
  }

  return {
    valid: true,
    message: "",
  };
}

/**
 * Valida la contraseña
 */
export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return {
      valid: false,
      message: "La contraseña es obligatoria.",
    };
  }

  if (password.length < 8) {
    return {
      valid: false,
      message: "La contraseña debe tener al menos 8 caracteres.",
    };
  }

  return {
    valid: true,
    message: "",
  };
}

/**
 * Confirma que las contraseñas sean iguales
 */
export function validateConfirmPassword(
  password: string,
  confirmPassword: string
): ValidationResult {
  if (!confirmPassword) {
    return {
      valid: false,
      message: "Debe confirmar la contraseña.",
    };
  }

  if (password !== confirmPassword) {
    return {
      valid: false,
      message: "Las contraseñas no coinciden.",
    };
  }

  return {
    valid: true,
    message: "",
  };
}

/**
 * Valida un nombre
 */
export function validateName(name: string): ValidationResult {
  if (!name.trim()) {
    return {
      valid: false,
      message: "Este campo es obligatorio.",
    };
  }

  if (name.trim().length < 2) {
    return {
      valid: false,
      message: "Debe contener al menos 2 caracteres.",
    };
  }

  return {
    valid: true,
    message: "",
  };
}