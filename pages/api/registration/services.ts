import { makeCareGiver, makeChild, makeParent } from "../models";
let parentIdresult = "";
let careGIdsresults: any = [];

const register: any = {
  parent: async (parents: any) => {
    const parent = makeParent(parents);
    parentIdresult = parent.getId();
    const allowedParentData = parent.getCreateParentData();
    await parent.save(allowedParentData); // Update the type to 'any'
    return parentIdresult;
  },

  careGiver: async (careGiverList: any[]) => {
    if (!careGiverList.length) {
      return;
    } else {
      for (const careGiver of careGiverList) {
        const careGiverResult = makeCareGiver(careGiver);
        careGIdsresults.push(careGiverResult.getId());
        const allowedCareGiverData = careGiverResult.getCareGiverData();
        await careGiverResult.save(allowedCareGiverData);
        // if (savedCareGiver) {
        //   careGIds.push(savedCareGiver.id);
        // }
      }
    }
    return careGIdsresults;
  },

  // Convert comma-separated string back into an array
  // const careGIdsArray = careGIdsString.split(',');

  child: async (childList: any[], parentId: string, careGIds: string) => {
    parentId = parentIdresult;
    careGIds = careGIdsresults.join(",");

    for (const ward of childList) {
      const child = makeChild(ward, parentId, careGIds);
      const allowedChildData = child.getCreateChildData();
      await child.save(allowedChildData);
    }
  },
};

export default register;
