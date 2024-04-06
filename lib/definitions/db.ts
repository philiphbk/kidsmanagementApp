import { CaregiverForm, ChildForm, ParentForm } from "./form-interfaces";

type Model = ChildForm | ParentForm | CaregiverForm;

// test

export interface DBModel {
  (tableName: string): {
    getOne: (id: string) => Promise<any>;
    create: (data: Model) => Promise<any>;
  };
}
