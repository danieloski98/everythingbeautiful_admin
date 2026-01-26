
// store/uiAtoms.ts
import { IAdmin } from "@/helper/model/admin"; 
import { atom } from "jotai";

// Initial value is false
export const userAtom = atom<IAdmin | null>();
