import { useNavigate, useSearchParams } from 'react-router-dom'
import { recipes, getRecipeType } from '../config/recipes'

function Recipe() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  
  const numberOfPizzas = Number(searchParams.get('pizzas')) || 1
  const pizzaSize = Number(searchParams.get('size') || 12);
  const recipeType = getRecipeType(searchParams.get('recipe'))
  const recipe = recipes[recipeType]
  const hydration = Number(searchParams.get('hydration') || recipe.defaultHydration)

  const ingredients = recipe.calculateIngredients({
    numberOfPizzas,
    pizzaSize,
    hydration
  })

  return (
    <div role="main">
      <h2>{recipe.name} Recipe</h2>
      
      <div className="recipe-card" role="region" aria-label="Recipe details">
        <p aria-live="polite">
          For {numberOfPizzas} {numberOfPizzas === 1 ? 'pizza' : 'pizzas'} ({pizzaSize}") at {hydration}% hydration
        </p>
        
        <ul className="recipe-list" role="list">
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient.amount}{ingredient.unit} {ingredient.name}</li>
          ))}
        </ul>

        <div className="proofing-notes" role="region" aria-label="Proofing instructions">
          <h3>Proofing Instructions</h3>
          <ul className="recipe-list" role="list">
            {recipe.proofingSchedule.bulkProof && (
              <li>Bulk proof: {recipe.proofingSchedule.bulkProof.min}-{recipe.proofingSchedule.bulkProof.max}{recipe.proofingSchedule.bulkProof.unit} at room temperature</li>
            )}
            {recipe.proofingSchedule.ballProof && (
              <li>Ball and proof: {recipe.proofingSchedule.ballProof.min}-{recipe.proofingSchedule.ballProof.max}{recipe.proofingSchedule.ballProof.unit} at room temperature</li>
            )}
            {recipe.proofingSchedule.coldProof && (
              <li>Cold proof: {recipe.proofingSchedule.coldProof.min}-{recipe.proofingSchedule.coldProof.max}{recipe.proofingSchedule.coldProof.unit} in refrigerator (the longer the better)</li>
            )}
            <li>Remove from refrigerator {recipe.proofingSchedule.warmUp}h before use</li>
          </ul>
        </div>
      </div>

      <button className="btn" onClick={() => {
        const params = new URLSearchParams({
          pizzas: numberOfPizzas.toString(),
          size: pizzaSize.toString(),
          hydration: hydration.toString(),
          recipe: recipeType
        })
        navigate(`/?${params.toString()}`)
      }}>
        Edit Recipe
      </button>
    </div>
  )
}

export default Recipe 