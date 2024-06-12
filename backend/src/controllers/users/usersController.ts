import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import admin from "firebase-admin";
import { URL } from "url";
const firebaseServiceAccount = require("@/config/firebaseServiceAccount.json");

// Prisma init
const prisma = new PrismaClient();

// Firebase account initialization
admin.initializeApp({
  credential: admin.credential.cert(firebaseServiceAccount),
  storageBucket: "gs://starterappboilerplate-9a9c0.appspot.com",
});

// Helper function to type guard
const isErrorWithMessage = (error: any): error is { message: string } => {
  return typeof error === "object" && error !== null && "message" in error;
};

// ====================================================================
// ======== EXTRACT ALL USERS AND THEIR INFO FOR ADMIN PURPOSES =======
// ====================================================================
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    // returns object with array of users

    // Map over users to remove password field from each user object
    const usersWithoutPasswords = users.map(
      ({ password, ...userWithoutPassword }) => userWithoutPassword
    );

    res.json(usersWithoutPasswords);
  } catch (error) {
    if (isErrorWithMessage(error)) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unexpected error occurred" });
    }
  }
};

// ====================================================================
// ======================== CHANGE USER AVATAR ========================
// ====================================================================
export const changeUserAvatar = async (req: Request, res: Response) => {
  const file = req.file;
  const userId = req.body.userId;
  if (!file) {
    return res.status(400).send("No file uploaded.");
  }
  try {
    // Access storage bucket
    const bucket = admin.storage().bucket();

    // Retrieve the current user data
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Validate file extension
    const allowedExtensions = /jpeg|jpg|png|webp/;
    const extname = allowedExtensions.test(file.originalname.toLowerCase());
    const mimetype = allowedExtensions.test(file.mimetype);

    if (!extname || !mimetype) {
      return res.status(400).json({
        error:
          "Wrong type of file extension. Allowed file extenstions: jpeg | jpg | png | webp",
      });
    }

    // If user has an existing avatar URL, delete the old file
    if (user && user.avatarUrl) {
      try {
        // Parse the URL to get the pathname
        const parsedUrl = new URL(user.avatarUrl);
        const decodedPathname = decodeURIComponent(parsedUrl.pathname);
        const oldFileName = decodedPathname.split("/").pop();
        if (oldFileName) {
          const oldFile = bucket.file(`avatars/${oldFileName}`);
          await oldFile.delete();
        }
      } catch (error) {
        console.error("Error deleting old avatar file:", error);
      }
    }

    // Set fileName to userId since only one avatar for profile
    const fileName = `avatars/${userId}?t=${new Date().getTime()}`;
    // Upload the file
    const fileUpload = bucket.file(fileName);
    await fileUpload.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
      },
    });
    // Get firebase file url and set expiration time
    const fileURL = await fileUpload.getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    });

    // Update the user's avatar URL in the database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { avatarUrl: fileURL[0] },
    });

    res.json({
      message: "Avatar URL saved",
      newAvatarUrl: updatedUser.avatarUrl,
    });
  } catch (error) {
    console.error("Error saving avatar URL:", error);
    res.status(500).json({ error: "Failed to save avatar URL" });
  }
};
