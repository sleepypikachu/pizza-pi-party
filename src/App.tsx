import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import Calculator from './components/Calculator'
import Recipe from './components/Recipe'
import './App.css'

// Create a new component that will be wrapped by Router
function AppContent() {
  const [rotation, setRotation] = useState(0)
  const velocityRef = useRef(0)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const lastTimeRef = useRef(performance.now())
  const location = useLocation()

  const handlePizzaClick = () => {
    // Get the sign of current velocity, or random direction if not moving
    const currentDirection = Math.sign(velocityRef.current) || (Math.random() < 0.5 ? 1 : -1)
    
    // Add acceleration in the same direction as current rotation
    // Random amount between 0.2 and 0.5 degrees per millisecond
    velocityRef.current += currentDirection * (0.2 + Math.random() * 0.3)
    
    // Start animation if it's not already running
    if (!animationFrameRef.current) {
      lastTimeRef.current = performance.now()
      animationFrameRef.current = requestAnimationFrame(animate)
    }
  }

  const animate = (time: number) => {
    const deltaTime = time - lastTimeRef.current
    lastTimeRef.current = time

    // Update velocity with friction
    velocityRef.current *= 0.99 // Friction coefficient
    
    // Update rotation
    setRotation(prev => prev + velocityRef.current * deltaTime)

    // Continue animation if there's still significant movement
    if (Math.abs(velocityRef.current) > 0.05) {
      animationFrameRef.current = requestAnimationFrame(animate)
    } else {
      animationFrameRef.current = undefined
      velocityRef.current = 0;
    }
  }

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (location.pathname === '/') {
      // Set initial velocity for a gentle spin
      velocityRef.current = 0.3
      lastTimeRef.current = performance.now()
      animationFrameRef.current = requestAnimationFrame(animate)
    }
  }, [location.pathname])

  return (
    <div className="app">
      <div className="container">
        <h1>
          <img 
            src="/pizza.svg" 
            alt="Pizza" 
            role="button"
            aria-label="Click to spin the pizza"
            tabIndex={0}
            style={{ 
              transform: `rotate(${rotation}deg)`,
              cursor: 'pointer',
              willChange: 'transform'
            }}
            onClick={handlePizzaClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handlePizzaClick();
              }
            }}
          />
          Pizza Pi Party
        </h1>
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/recipe" element={<Recipe />} />
        </Routes>
      </div>
    </div>
  )
}

// Main App component that provides the Router context
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
