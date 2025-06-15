import type { BaseRecipe, RecipeParams } from '../types/recipe';

const neapolitanRecipe: BaseRecipe = {
  name: 'Neapolitan',
  description: 'Traditional Neapolitan pizza with sourdough starter',
  defaultHydration: 70,
  proofingSchedule: {
    bulkProof: {
        unit: 'hours',
        max: 8,
        min: 4,
    },
    ballProof: {
        unit: 'hours',
        min: 2,
        max: 4,
    },
    coldProof: {
        max: 72,
        min: 12,
        unit: 'hours'
    },
    warmUp: 2,
  },
  calculateIngredients: (params: RecipeParams) => {
    const baseFlourPerPizza = 560/3;
    const starterRatio = 85/560;
    const saltRatio = 14/560;

    const scalingFactor = Math.pow(Number(params.pizzaSize) / 2, 2)/36;
    const flour = Math.round((scalingFactor * baseFlourPerPizza * params.numberOfPizzas) / 10) * 10;
    const starter = starterRatio * flour;
    const waterFromStarter = starter / 2; // 50% of starter is water
    const targetHydration = Number(params.hydration || this.defaultHydration) / 100;
    const totalWaterNeeded = flour * targetHydration;
    const water = Math.round((totalWaterNeeded - waterFromStarter) / 10) * 10;
    const salt = saltRatio * flour;

    return [
        { name: 'starter', amount: Number(starter.toFixed(0)), unit: 'g' },
        { name: 'water', amount: Number(water.toFixed(0)), unit: 'g' },
              { name: 'salt', amount: Number(salt.toFixed(0)), unit: 'g' },
      { name: '00 flour', amount: Number(flour.toFixed(0)), unit: 'g' },


    ];
  }
}

const americanChainRecipe: BaseRecipe = {
    name: 'American Chain',
    description: 'American Chain style with commercial yeast',
    defaultHydration: 60,
    proofingSchedule: {
      bulkProof: {
          unit: 'hours',
          max: 2,
          min: 1,
      },
      ballProof: null,
      coldProof: {
          max: 24,
          min: 12,
          unit: 'hours'
      },
      warmUp: 2,
    },
    calculateIngredients: (params: RecipeParams) => {
      const baseFlourPerPizza = 500/2;
      const yeastRatio = 7/500;
      const saltRatio = 10/500;
      const sugarRatio = 15/500;
      const vegOilRatio = 30/500;

      const scalingFactor = Math.pow(Number(params.pizzaSize) / 2, 2)/36;
      const flour = Math.round((scalingFactor * baseFlourPerPizza * params.numberOfPizzas) / 10) * 10;
      const yeast = yeastRatio * flour;
      const targetHydration = Number(params.hydration || this.defaultHydration) / 100;
      const water = flour * targetHydration
      const salt = saltRatio * flour;
      const sugar = sugarRatio * flour;
      const oil = vegOilRatio * flour;
  
      return [
          { name: 'sugar', amount: Number(sugar.toFixed(0)), unit: 'g' },
          { name: 'salt', amount: Number(salt.toFixed(0)), unit: 'g' },
          { name: 'yeast', amount: Number(yeast.toFixed(0)), unit: 'g'},
          { name: 'bread flour', amount: Number(flour.toFixed(0)), unit: 'g' },
          { name: 'vegetable oil', amount: Number(oil.toFixed(0)), unit: 'g'},
          { name: 'water', amount: Number(water.toFixed(0)), unit: 'g' },
      ];
    }
  }

export const recipes = {
  neapolitan: neapolitanRecipe,
  americanChain: americanChainRecipe,
};

export type RecipeType = keyof typeof recipes;

export function getRecipeType(input: string | null): RecipeType {
  if (input && input in recipes) {
    return input as RecipeType;
  }
  return 'neapolitan';
}
