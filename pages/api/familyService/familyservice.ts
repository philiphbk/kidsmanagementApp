import buildMakeParent from "../models/parent";
import buildCareGiver from "../models/careGiver";
import buildMakeChild from "../models/child";
import {
  ParentForm,
  ChildForm,
  CaregiverForm,
} from "@/lib/definitions/form-interfaces";

interface FamilyData {
  parentData: ParentForm;
  caregiverDataArray: CaregiverForm[];
  childData: ChildForm;
}

export async function createFamily({
  parentData,
  caregiverDataArray,
  childData,
}: FamilyData) {
  try {
    // Step 1: Create the parent and retrieve the ID
    const parentId = await buildMakeParent();

    // Step 2: Create each caregiver and collect their IDs
    const caregiverIds = await Promise.all(
      caregiverDataArray.map(async (caregiverData) => {
        return await buildCareGiver();
      })
    );

    // Step 3: Create the child, including references to the parent ID and caregiver IDs
    // Ensure your ChildForm or the equivalent object type can accommodate these IDs
    const childCompleteData = {
      ...childData,
      parentId: parentId,
      caregiverIds: caregiverIds, // Assuming your Child model can handle an array of caregiver IDs
    };

    const childId = await buildMakeChild();

    return {
      parentId,
      caregiverIds,
      childId,
    };
  } catch (error) {
    console.error("Error creating family:", error);
    throw new Error("Failed to create family.");
  }
}
