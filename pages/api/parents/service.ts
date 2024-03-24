import { Parent } from "@/lib/definitions/form-interfaces";
import config from "../config";
import { db } from "../db";
import { generateMagicLink, sendEmail } from "../login/sendEmail";
import { makeParent } from "../models";

export const createParent = async (parentData: Parent) => {
  const parent = makeParent(parentData);
  const parentDataToSave = parent.getCreateParentData();
  await parent.save(parentDataToSave);
}

export const loginParent = async (email: string, password: string) => {
  const parent = await db("parent").getByEmail(email);
  if (!parent) {
    throw new Error("User not found");
  }
  const loginLink = await generateMagicLink(email);
  const options = {
    from: config.EMAIL_OPTIONS.from,
    to: email,
    subject: "Your Magic Login Link",
    html: `<p>Click <a href="${loginLink}">here</a> to log in.</p>`,
  }

  await sendEmail(options)
  return "Email sent";
}
