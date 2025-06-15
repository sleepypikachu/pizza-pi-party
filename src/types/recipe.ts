// Base interface for all recipe types
export interface BaseRecipe {
  name: string;
  description: string;
  proofingSchedule: ProofingSchedule;
  defaultHydration: number;
  calculateIngredients(params: RecipeParams): Ingredient[];
}

// Interface for proofing schedule
export interface ProofingSchedule {
  bulkProof: TimeRange | null;
  ballProof: TimeRange | null;
  coldProof: TimeRange | null;
  warmUp: number | null;
}

export interface TimeRange {
  min: number;
  max: number;
  unit: 'hours' | 'days';
}

// Interface for ingredient
export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  isOptional?: boolean;
}

// Interface for recipe parameters
export interface RecipeParams {
  numberOfPizzas: number;
  pizzaSize: number;
  hydration?: number;
  [key: string]: any; // Allow for additional recipe-specific parameters
}