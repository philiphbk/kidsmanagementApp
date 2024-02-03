import { Parent } from "@/lib/definitions/form-interfaces";
import { makeParent } from "../models";

export const createParent = async (parentData: Parent) => {
  const parent = makeParent(parentData);
  const parentDataToSave = parent.getCreateParentData();
  await parent.save(parentDataToSave);
}

