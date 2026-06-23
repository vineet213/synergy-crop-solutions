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
