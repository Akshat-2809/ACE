import { MachineCategory } from "@/types/machine";

export const categories: MachineCategory[] = [
  "Excavator",
  "Concrete Pump",
  "Fiori",
  "JCB",
  "Crane",
];

export const companiesByCategory: { [key: string]: string[] } = {
  Excavator: ["JCB", "CAT", "Tata Hitachi", "Komatsu", "Volvo", "SANY", "Hyundai"],
  "Concrete Pump": ["Schwing Stetter", "Putzmeister", "SANY", "Zoomlion"],
  Fiori: ["Fiori"],
  JCB: ["JCB"],
  Crane: ["ACE", "KATO", "Liebherr", "Tadano"],
};

export const modelsByCategoryAndCompany: { [key: string]: { [key: string]: string[] } } = {
  Excavator: {
    JCB: [
      "520X", "JCB 8I", "JCB 130", "NXT 140", "NXT 145 Quarry Master",
      "NXT 150", "NXT 205", "NXT 210", "NXT 225 LCM", "345 LC", "385 LC",
    ],
    CAT: [
      "CAT 316GC", "CAT 321", "CAT 322", "CAT 324", "CAT 330GC", "CAT 350",
    ],
    "Tata Hitachi": [
      "EX130 Prime", "ZAXIS 140H", "EX200 Infra", "EX200LC Prime",
      "EX210", "EX215 LCQ", "ZAXIS 220LC", "EX350", "ZAXIS 370 LCH",
    ],
    Komatsu: ["PC71", "PC81", "PC130-7", "PC136-7"],
    Volvo: ["EC950E", "EC750D", "EC550E", "EC480D", "EC380D", "EC300D"],
    SANY: [
      "SY55C", "SY75C", "SY80U", "SY135C", "SY135F",
      "SY155U", "SY155H", "SY365H", "SY375H", "SY550HD", "SY980H",
    ],
    Hyundai: [
      "R130", "R140", "R210", "R215", "R245LR",
      "R220LS", "R230", "R340L", "HX360L", "HX380", "HX520L",
    ],
  },
  "Concrete Pump": {
    "Schwing Stetter": ["S 28 X", "S 36 X", "S 43 SX", "S 52 SX", "S 61 SX"],
    Putzmeister: ["BSF 28.09H", "BSF 36.09H", "BSF 42.09H", "BSF 52.09H"],
    SANY: ["SY5120THB-28", "SY5196THB-37", "SY5280THB-48"],
    Zoomlion: ["ZLJ5160THBB-20X", "ZLJ5270THB-37X"],
  },
  Fiori: {
    Fiori: [
      "DB 260S", "DB 350S", "DB 460S", "DB 600S", "DB 800S", "DBX 35", "DBX 50",
    ],
  },
  JCB: {
    JCB: ["JCB 3DX", "JCB 3DX Super", "JCB 4DX", "JCB 3CX", "JCB 4CX"],
  },
  Crane: {
    ACE: ["ACE 14XW", "ACE 16XW", "ACE 20XW", "ACE 30XW", "ACE 55XW"],
    KATO: ["KATO SR-250", "KATO SR-300", "KATO SR-500"],
    Liebherr: ["LTM 1030", "LTM 1050", "LTM 1100", "LTM 1200"],
    Tadano: ["GR-300EX", "GR-500EX", "GR-800EX"],
  },
};

export const companies = [
  ...new Set(Object.values(companiesByCategory).flat()),
];

export const locations = [
  "Indore",
  "Dewas",
  "Ujjain",
  "Bhopal",
  "Pithampur",
  "Other",
];