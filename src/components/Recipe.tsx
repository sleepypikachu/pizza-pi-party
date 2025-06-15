import { useNavigate, useSearchParams } from 'react-router-dom'

const FLOUR_PER_PIZZA = 560/3;
const STARTER_PER_FLOUR = 85/560;
const SALT_PER_FLOUR = 14/560;

// Proofing time ranges in hours
const BULK_PROOF_MIN = 4;
const BULK_PROOF_MAX = 8;
const BALL_PROOF_MIN = 2;
const BALL_PROOF_MAX = 4;
const COLD_PROOF_MIN = 12; // Minimum 12 hours for cold proof
const COLD_PROOF_MAX = 72; // Up to 3 days
const WARM_UP = 2;

function Recipe() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  
  const numberOfPizzas = Number(searchParams.get('pizzas')) || 1
  const pizzaSize = searchParams.get('size') || '12'
  const hydration = searchParams.get('hydration') || '70'

  // Calculate recipe based on inputs
  const calculateRecipe = () => {
    const scalingFactor = Math.pow(Number(pizzaSize) / 2, 2)/36;
    const flourPerPizza = Math.round((scalingFactor * FLOUR_PER_PIZZA * numberOfPizzas) / 10) * 10;
    const starterPerPizza = STARTER_PER_FLOUR * flourPerPizza;
    const waterFromStarter = starterPerPizza / 2; // 50% of starter is water
    const targetHydration = Number(hydration) / 100;
    const totalWaterNeeded = flourPerPizza * targetHydration;
    const waterPerPizza = Math.round((totalWaterNeeded - waterFromStarter) / 10) * 10;
    const saltPerPizza = SALT_PER_FLOUR * flourPerPizza;

    return {
      flour: flourPerPizza.toFixed(0),
      water: waterPerPizza.toFixed(0),
      salt: saltPerPizza.toFixed(0),
      starter: starterPerPizza.toFixed(0),
    }
  }

  const recipe = calculateRecipe()

  return (
    <div role="main">
      <h2>Your Pizza Recipe</h2>
      
      <div className="recipe-card" role="region" aria-label="Recipe details">
        <p aria-live="polite">
          For {numberOfPizzas} {numberOfPizzas === 1 ? 'pizza' : 'pizzas'} ({pizzaSize}") at {hydration}% hydration
        </p>
        
        <ul className="recipe-list" role="list">
          <li>{recipe.flour}g flour</li>
          <li>{recipe.water}g water</li>
          <li>{recipe.salt}g salt</li>
          <li>{recipe.starter}g 100% hydration starter</li>
        </ul>

        <div className="proofing-notes" role="region" aria-label="Proofing instructions">
          <h3>Proofing Instructions</h3>
          <ul className="recipe-list" role="list">
            <li>Bulk proof: {BULK_PROOF_MIN}-{BULK_PROOF_MAX}h at room temperature</li>
            <li>Ball and proof: {BALL_PROOF_MIN}-{BALL_PROOF_MAX}h at room temperature</li>
            <li>Cold proof: {COLD_PROOF_MIN}-{COLD_PROOF_MAX}h in refrigerator (the longer the better)</li>
            <li>Remove from refrigerator {WARM_UP}h before use</li>
          </ul>
        </div>
      </div>

      <button className="btn" onClick={() => {
        const params = new URLSearchParams({
          pizzas: numberOfPizzas.toString(),
          size: pizzaSize,
          hydration: hydration
        })
        navigate(`/?${params.toString()}`)
      }}>
        Edit Recipe
      </button>
    </div>
  )
}

export default Recipe 