// TODO: Add more types as needed
export type Category =
  | "Text Generation"
  | "Image and Video Generation"
  | "Music and Sound Generation";

// TODO: Add more categories as needed
export type EnterpriseCategory =
  | "Marketing/Content Creation"
  | "Developer tools"
  | "Design tools";

export interface AIProduct {
  licence: string;
  ecosystem: string;
  last_update: string;
  // TODO: use Category instead string
  category: string[];
  link: string;
  description: string;
  // TODO: use EnterpriseCategory instead string
  enterprise_categories: string[];
  id: string;
  name: string;
  state: string;
}

export type AIProducts = AIProduct[];
