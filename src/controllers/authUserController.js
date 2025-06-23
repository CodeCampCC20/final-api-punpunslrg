import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function userRegister(req, res, next) {
  try {
    const { username, password, confirmPassword } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (user) {
      createError(400, "Username is already exist");
    }

    const hash = await bcrypt.hash(password, 10);

    const result = await prisma.user.create({
      data: {
        username,
        password: hash,
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

export async function userLogin(req, res, next) {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findFirst({
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

    const payload = { id: user.id, username: user.username };
    const token = await jwt.sign(payload, process.env.USER_SECRET, {
      expiresIn: "7d",
    });

    res.json({ message: "Login Success !", accessToken: token, payload });
  } catch (error) {
    next(error);
  }
}

export async function userUpdate(req, res, next) {
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

export async function createHealthRecord(req, res, next) {
  try {
    const { type, value } = req.body;

    if (!type || !value) {
      createError(400, "Invalid input");
    }

    await prisma.healthRecord.create({
      data: {
        type,
        value,
        userId: req.user.id,
      },
    });

    // console.log(req.user)
    res.status(201).json({ message: "create health record successfully" });
  } catch (error) {
    next(error);
  }
}

export async function getAllRecords(req, res, next) {
  try {
    const records = await prisma.healthRecord.findMany({
      where: { userId: req.user.id },
    });

    res.status(200).json({ records });
  } catch (error) {
    next(error);
  }
}

export async function getRecordById(req, res, next) {
  try {
    const { id } = req.params;

    const recordById = await prisma.healthRecord.findFirst({
      where: { id: Number(id) },
    });

    if (!recordById) {
      createError(400, "Record doesn't exist");
    }

    res.status(200).json({ recordById });
  } catch (error) {
    next(error);
  }
}

export async function updateRecord(req, res, next) {
  try {
    const { type, value } = req.body;
    const { id } = req.params;

    const isRecordExist = await prisma.healthRecord.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!isRecordExist) {
      createError(400, "Record doesn't exist");
    }

    const updated = await prisma.healthRecord.update({
      where: {
        id: Number(id),
      },
      data: {
        type,
        value,
      },
    });

    res.status(200).json({ updated });
  } catch (error) {
    next(error);
  }
}

export async function deleteRecord(req, res, next) {
  try {
    const { id } = req.params;

    const isRecordExist = await prisma.healthRecord.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!isRecordExist) {
      createError(400, "Record doesn't exist");
    }
    await prisma.healthRecord.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: "Record deleted" });
  } catch (error) {
    next(error);
  }
}

export async function getNoteFromDoc(req, res, next) {
  try {
    const { id } = req.user;
    const isNoteExist = await prisma.doctorNote.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!isNoteExist) {
      createError(400, "Record doesn't exist");
    }
    const recordFromDoc = await prisma.doctorNote.findFirst({
      where: {
        userId: id,
      },
    });

    res.status(200).json({ records: recordFromDoc });
  } catch (error) {
    next(error);
  }
}

export async function userGetMe(req, res, next) {
  res.status(200).json({ user: req.user });
}
