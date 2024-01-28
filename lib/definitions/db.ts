import { Caregiver, Child, Parent } from "./form-interfaces";

type Model = Child | Parent | Caregiver

export interface DBModel {
  (tableName: string): {
    getOne: (id: string) => Promise<any>;
    create: (data: Model) => Promise<any>;
  }
}
