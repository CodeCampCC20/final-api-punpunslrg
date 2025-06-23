export function createError(code, msg, field) {
  const error = new Error(msg);
  error.code = code;

  throw error;
}
