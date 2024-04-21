import { ParentForm } from "@/lib/definitions/form-interfaces";
import { makeParent } from "../models";
import { db } from "../db";
import { generateMagicLink, sendEmail } from "../login/sendEmail";
import "dotenv/config";

const config = {
  EMAIL_OPTIONS: {
    from: process.env.EMAIL_FROM || "philip@gmail.com",
  },
};

export const createParent = async (parentData: ParentForm) => {
  const parent = makeParent(parentData);
  const parentDataToSave = parent.getCreateParentData();
  await parent.save(parentDataToSave);
};

export const loginParent = async (email: string, password: string) => {
  const parent = await db.getByEmail("parent", email);
  if (!parent) {
    throw new Error("User not found");
  }
  const loginLink = await generateMagicLink(email);
  const options = {
    from: config.EMAIL_OPTIONS.from,
    to: email,
    subject: "Your Magic Login Link",
    html: `<p>Click <a href="${loginLink}">here</a> to log in.</p>`,
  };

  await sendEmail(options);
  return "Email sent";
};
