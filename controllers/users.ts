import { Request, Response } from "express";
import { User, UserToUpdate } from "../models";
import { runUserValidation } from "../helpers";

export const createUser = async (req: Request, res: Response) => {
  try {
    const invalidEntry = await runUserValidation(req.body);

    if (invalidEntry) {
      return res.status(422).json({
        code: 422,
        reason: "ValidationError",
        message: invalidEntry.message,
        location: invalidEntry.location,
      });
    }

    const { username, password, email } = req.body;
    const hashedPassword = await User.hashPassword(password);
    const createdUser = await User.create({
      username,
      password: hashedPassword,
      email,
    });
    const { id } = createdUser.apiRepr();

    return res.status(200).json({
      id,
      username,
      email,
    });
  } catch (err) {
    console.error("USER CREATION ERROR", err);
    res.status(500).json({ code: 500, message: "Internal server error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const existingUser = await User.find({ _id: req.params.userId });
    if (!existingUser || !existingUser.length) {
      return res.status(404).json({
        code: 404,
        reason: "Not found",
        message: "User by this ID does not exist",
        location: req.params.userId,
      });
    }

    const { id, username, email, streams } = existingUser[0].apiRepr();
    res.status(201).send({
      id,
      username,
      email,
      streams,
    });
  } catch (err) {
    console.error("ERROR GETTING USER", err);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  if (!(req.params.userId === req.body.id)) {
    const message = `Request patch id (${req.params.userId} and request body id (${req.body.id}) must match)`;
    console.error(message);
    res.status(400).json({ message: message });
  }

  try {
    const toUpdate: UserToUpdate = {};
    const updateableFields = ["streams" as const];

    updateableFields.forEach((field) => {
      if (field in req.body) {
        toUpdate[field] = req.body[field];
      }
    });

    const foundUser = await User.findOneAndUpdate(
      { _id: req.body.id },
      { $set: toUpdate },
      { new: true }
    ).exec();

    if (foundUser) {
      const { streams } = foundUser;
      res.status(200).json({
        id: req.body.id,
        streams,
      });
    }
  } catch (err) {
    console.error("USER UPDATE ERROR", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
