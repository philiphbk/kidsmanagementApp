import { makeCareGiver, makeChild, makeParent } from "../../models";

const register: any = {
  parent: async (parentInformation: any) => {
    const parent = makeParent(parentInformation);
    const allowedParentData = parent.getCreateParentData();
    await parent.save(allowedParentData)
  },

  child: async (childInformation: any) => {
    const child = makeChild(childInformation);
    const allowedChildData = child.getCreateChildData();
    await child.save(allowedChildData)
  },

  careGiver: async (careGiverInformation: any) => {
    if (!careGiverInformation) {
      return;
    }
    const careGiver = makeCareGiver(careGiverInformation);
    const allowedCareGiverData = careGiver.getCareGiverData()
    return careGiver.save(allowedCareGiverData);
  }
};

export default register;
