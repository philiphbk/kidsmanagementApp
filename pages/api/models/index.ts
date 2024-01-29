import buildCareGiver from './careGiver';
import buildMakeChild from "./child";
import buildMakeParent from './parent';

const makeParent = buildMakeParent();
const makeChild = buildMakeChild();
const makeCareGiver = buildCareGiver();

export {
  makeCareGiver, makeChild,
  makeParent
};

