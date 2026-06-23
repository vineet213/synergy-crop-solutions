export function validateRequest(schema) {
  return (req, res, next) => {
    const errors = [];

    for (const [field, rules] of Object.entries(schema)) {
      const value = req.body[field];

      for (const rule of rules) {
        const error = rule(value, field);
        if (error) {
          errors.push({ field, message: error });
          break;
        }
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    next();
  };
}
