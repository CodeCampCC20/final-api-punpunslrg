import * as Yup from "yup";

export default function validatorMiddleware(schema) {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = error.inner.reduce((acc, cur) => {
          if (cur.path) {
            acc[cur.path] = cur.message;
          }
          return acc;
        }, {});
        return next({
          code: 400,
          message: validationErrors,
        });
      }
      next(error);
    }
  };
}
