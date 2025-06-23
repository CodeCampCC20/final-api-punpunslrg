export function createError(code, msg) {
  const error = new Error(msg);
  error.code = code;
  throw error;
}
