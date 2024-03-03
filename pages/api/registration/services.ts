import { makeCareGiver, makeChild, makeParent } from "../models";

const register: any = {
  parent: async (parents: any) => {
    const parent = makeParent(parents);
    const allowedParentData = parent.getCreateParentData();
    return await parent.save(allowedParentData);
  },

  careGiver: async (careGiverList: any[]) => {
    if (!careGiverList.length) {
      return;
    }
    let careGIds: any = [];
    for (const careGiver of careGiverList) {
      const careGiverResult = makeCareGiver(careGiver);
      const allowedCareGiverData = careGiverResult.getCareGiverData();
      const savedCareGiver: any = await careGiverResult.save(
        allowedCareGiverData
      );
      if (savedCareGiver) {
        careGIds.push(savedCareGiver.id);
      }
    }
    return careGIds;
  },

  child: async (childList: any[], parentid: number, careGIds = []) => {
    for (const ward of childList) {
      const child = makeChild(ward, parentid);
      const allowedChildData = child.getCreateChildData();
      await child.save(allowedChildData);
    }
  },
};

export default register;
