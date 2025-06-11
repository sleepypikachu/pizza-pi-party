import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

function Calculator() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  
  const [inputs, setInputs] = useState({
    numberOfPizzas: Number(searchParams.get('pizzas')) || 1,
    pizzaSize: searchParams.get('size') || '12',
    hydration: searchParams.get('hydration') || '70'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams({
      pizzas: inputs.numberOfPizzas.toString(),
      size: inputs.pizzaSize,
      hydration: inputs.hydration
    })
    navigate(`/recipe?${params.toString()}`)
  }

  return (
    <div>
      <h2>Calculator</h2>
      <form onSubmit={handleSubmit} role="form" aria-label="Pizza calculator form">
        <div className="form-group">
          <label htmlFor="numberOfPizzas">Number of Pizzas</label>
          <input
            type="number"
            id="numberOfPizzas"
            className="form-control"
            min="1"
            max="20"
            value={inputs.numberOfPizzas}
            onChange={(e) => setInputs(prev => ({ ...prev, numberOfPizzas: parseInt(e.target.value) }))}
            aria-describedby="pizzas-description"
          />
          <span id="pizzas-description" className="visually-hidden">
            Enter a number between 1 and 20
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="pizzaSize">Pizza Size (inches)</label>
          <select
            id="pizzaSize"
            className="form-control"
            value={inputs.pizzaSize}
            onChange={(e) => setInputs(prev => ({ ...prev, pizzaSize: e.target.value }))}
          >
            <option value="10">10"</option>
            <option value="12">12"</option>
            <option value="14">14"</option>
            <option value="16">16"</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="hydration">Hydration (%)</label>
          <select
            id="hydration"
            className="form-control"
            value={inputs.hydration}
            onChange={(e) => setInputs(prev => ({ ...prev, hydration: e.target.value }))}
          >
            <option value="65">65%</option>
            <option value="70">70%</option>
            <option value="75">75%</option>
            <option value="80">80%</option>
          </select>
        </div>

        <button type="submit" className="btn">
          Generate Recipe
        </button>
      </form>
    </div>
  )
}

export default Calculator 