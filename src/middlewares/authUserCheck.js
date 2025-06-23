import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";
import prisma from "../config/prisma.js";

export async function authUserCheck(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer")) {
      createError(401, "Token invalid, authorization denied");
    }

    const token = header.split(" ")[1];

    const payload = jwt.verify(token, process.env.USER_SECRET, {
      algorithms: ["HS256"],
    });

    if (!payload) {
      createError(401, "Token invalid, authorization denied");
    }
    const result = await prisma.user.findFirst({
      where: { id: payload.id },
      omit: {
        password: true,
      },
    });

    req.user = result;
    next();
  } catch (error) {
    next(error);
  }
}
