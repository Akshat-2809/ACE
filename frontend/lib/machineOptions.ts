import { MachineCategory } from "@/types/machine";

export const categories: MachineCategory[] = [
  "Excavator",
  "Concrete Pump",
  "Fiori",
  "JCB",
  "Crane",
];

export const companies = [
  "JCB",
  "CAT (Caterpillar)",
  "Tata Hitachi",
  "CASE",
  "Mahindra",
  "ACE",
  "Volvo",
  "Hyundai",
  "Kobelco",
];

// Top trending / most-used models in India per company
export const modelsByCompany: Record<string, string[]> = {
  JCB: ["JCB 3DX", "JCB 3DX Super", "JCB 4DX", "JCB NXT 140", "JCB 130"],
  "CAT (Caterpillar)": ["CAT 424", "CAT 320", "CAT 426", "CAT 432"],
  "Tata Hitachi": ["SHINRAI Prime", "EX 200LC", "ZAXIS 220", "Kharab 40"],
  CASE: ["CASE 770 EX", "CASE 851 NX", "CASE CX220C"],
  Mahindra: ["EarthMaster VX", "EarthMaster SX", "Mahindra SX Smart 50"],
  ACE: ["ACE AX-124", "ACE BL 200", "ACE AX-130"],
  Volvo: ["Volvo EC210", "Volvo EC480", "Volvo EW145B"],
  Hyundai: ["Hyundai R210", "Hyundai R140", "Hyundai R215"],
  Kobelco: ["Kobelco SK140", "Kobelco SK210LC", "Kobelco SK350LC"],
};

export const locations = [
  "Indore",
  "Dewas",
  "Ujjain",
  "Bhopal",
  "Pithampur",
  "Other",
];