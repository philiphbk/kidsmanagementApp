import { makeCareGiver, makeChild, makeParent } from "../../models";

const register: any = {
  parent: async (parents: any) => {
    const parent = makeParent(parents);
    const allowedParentData = parent.getCreateParentData();
    await parent.save(allowedParentData);
  },

  child: async (childList: any[]) => {
    for (const ward of childList) {
      const child = makeChild(ward);
      const allowedChildData = child.getCreateChildData();
      await child.save(allowedChildData);
    }
  },

  careGiver: async (careGiverList: any[]) => {
    if (!careGiverList.length) {
      return;
    }
    for (const careGiver of careGiverList) {
      const careGiverResult = makeCareGiver(careGiver);
      const allowedCareGiverData = careGiverResult.getCareGiverData();
      return careGiverResult.save(allowedCareGiverData);
    }
  },
};

export default register;
