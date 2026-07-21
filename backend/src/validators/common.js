export function required(value, field) {
  if (value === undefined || value === null || value === "") {
    return `${field} is required`;
  }
  return null;
}

export function isEmail(value, field) {
  if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return `${field} is not a valid email`;
  }
  return null;
}

export function isPhone(value, field) {
  if (value && !/^\+?[\d\s\-\(\)]{7,20}$/.test(value)) {
    return `${field} is not a valid phone number`;
  }
  return null;
}

export function maxLength(max) {
  return (value, field) => {
    if (value && value.length > max) {
      return `${field} must be at most ${max} characters`;
    }
    return null;
  };
}

export function minLength(min) {
  return (value, field) => {
    if (value && value.length < min) {
      return `${field} must be at least ${min} characters`;
    }
    return null;
  };
}

export function isIn(allowed) {
  return (value, field) => {
    if (value && !allowed.includes(value)) {
      return `${field} must be one of: ${allowed.join(", ")}`;
    }
    return null;
  };
}

export function isNumeric(value, field) {
  if (value !== undefined && value !== null && (typeof value !== "number" || isNaN(value))) {
    return `${field} must be a number`;
  }
  return null;
}

export function matches(pattern, message) {
  return (value, field) => {
    if (value && !pattern.test(value)) {
      return message || `${field} format is invalid`;
    }
    return null;
  };
}

export function isBoolean(value, field) {
  if (value !== undefined && value !== null && typeof value !== "boolean") {
    return `${field} must be a boolean`;
  }
  return null;
}

export function isArray(value, field) {
  if (value !== undefined && value !== null && !Array.isArray(value)) {
    return `${field} must be an array`;
  }
  return null;
}

export function isArrayOfStrings(value, field) {
  if (value !== undefined && value !== null) {
    if (!Array.isArray(value)) return `${field} must be an array`;
    if (!value.every((item) => typeof item === "string")) {
      return `${field} must be an array of strings`;
    }
  }
  return null;
}

function isLocalizedTextValue(v) {
  if (typeof v === "string") return true;
  if (typeof v === "object" && v !== null && typeof v.en === "string") return true;
  return false;
}

export function isLocalizedText(value, field) {
  if (value !== undefined && value !== null && !isLocalizedTextValue(value)) {
    return `${field} must be a string or a localized object { en: "text", ... }`;
  }
  return null;
}

export function isArrayOfLocalizedText(value, field) {
  if (value !== undefined && value !== null) {
    if (!Array.isArray(value)) return `${field} must be an array`;
    if (!value.every(isLocalizedTextValue)) {
      return `${field} must be an array of strings or localized objects { en: "text", ... }`;
    }
  }
  return null;
}
