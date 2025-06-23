import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function doctorRegister(req, res, next) {
  try {
    const { username, password, specialization } = req.body;

    const user = await prisma.doctor.findFirst({
      where: {
        username,
      },
    });

    if (user) {
      createError(400, "Username is already exist");
    }

    const hash = await bcrypt.hash(password, 10);

    const result = await prisma.doctor.create({
      data: {
        username,
        password: hash,
        specialization,
      },
      omit: {
        password: true,
      },
    });

    res.json({ message: "Register Success !", result });
  } catch (error) {
    next(error);
  }
}

export async function doctorLogin(req, res, next) {
  try {
    const { username, password } = req.body;

    const user = await prisma.doctor.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      createError(400, "Username or Password is not valid");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      createError(400, "Username or Password is not valid");
    }

    const payload = {
      id: user.id,
      username: user.username,
      specialization: user.specialization,
    };
    const token = await jwt.sign(payload, process.env.DOC_SECRET, {
      expiresIn: "7d",
    });

    res.json({ message: "Login Success !", accessToken: token, payload });
  } catch (error) {
    next(error);
  }
}

export async function doctorUpdate(req, res, next) {
  try {
    const { id } = req.user;
    const { username, password } = req.body;

    const isUsernameExist = await prisma.doctor.findFirst({
      where: {
        username,
      },
    });

    if (isUsernameExist) {
      createError(400, "Username is already exist");
    }

    const hash = await bcrypt.hash(password, 10);

    const updated = await prisma.user.update({
      where: { id },
      data: {
        username,
        password: hash,
      },
      omit: {
        password: true,
      },
    });
    res.send({ message: "Update Success", updated });
  } catch (error) {
    next(error);
  }
}

export async function createNote(req, res, next) {
  try {
    const { userId, note } = req.body;

    const isUserExist = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },
    });

    if (!isUserExist) {
      createError(400, "User does not exist");
    }

    console.log(req.user);

    await prisma.doctorNote.create({
      data: {
        userId: isUserExist.id,
        note,
        doctorId: req.user.id,
      },
    });

    res.status(201).json({ message: "create doctor notes successfully" });
  } catch (error) {
    next(error);
  }
}

export async function getAllRecords(req, res, next) {
  try {
    const records = await prisma.doctorNote.findMany({
      where: { doctorId: req.user.id },
    });

    res.status(200).json({ records });
  } catch (error) {
    next(error);
  }
}

export async function getRecordByUserId(req, res, next) {
  try {
    const { id } = req.user;
    const { userId } = req.params;
    const recordsById = await prisma.doctorNote.findMany({
      where: { doctorId: id, userId: Number(userId) },
    });

    res.status(200).json({ records: recordsById });
  } catch (error) {
    next(error);
  }
}

export async function updateNote(req, res, next) {
  try {
    const { note } = req.body;
    const doctorId = req.user.id;
    const { id } = req.params;

    const isNoteExist = await prisma.doctorNote.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!isNoteExist) {
      createError(400, "User doesn't exist");
    }

    const updated = await prisma.doctorNote.update({
      where: {
        doctorId,
        id: Number(id),
      },
      data: {
        note,
      },
    });

    res.status(200).json({ updated });
  } catch (error) {
    next(error);
  }
}

export async function deleteNote(req, res, next) {
  try {
    const { id } = req.params;
    const isNoteExist = await prisma.doctorNote.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!isNoteExist) {
      createError(400, "Note doesn't exist");
    }

    await prisma.doctorNote.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    next(error);
  }
}

export async function doctorGetMe(req, res, next) {
  res.status(200).json({ user: req.user });
}
