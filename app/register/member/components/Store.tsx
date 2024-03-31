// store/store.ts
import { RegistrationForm } from "@/lib/definitions/form-interfaces";
import { create } from "zustand";

interface RegistrationState {
  formData: RegistrationForm | null;
  setFormData: (formData: RegistrationForm) => void;
}

export const useStore = create<RegistrationState>((set) => ({
  formData: null,
  setFormData: (formData) => set({ formData }),
}));
