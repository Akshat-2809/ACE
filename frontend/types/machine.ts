export type MachineCategory =
  | "Excavator"
  | "Concrete Pump"
  | "Fiori"
  | "JCB"
  | "Crane";

export type AvailabilityStatus = "yes" | "no";

export interface Machine {
  id?: string;         // optional — used by old mock data
  _id?: string;        // optional — MongoDB's document id
  category: MachineCategory;
  company: string;
  model: string;
  image: string;
  location: string;
  pricePerDay: number;
  modelYear?: number;
  hoursUsed?: number;
  availability: AvailabilityStatus;
  availableFrom?: string | null;
  ownerName: string;
  ownerContact: string;
  description?: string;
}