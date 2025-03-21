import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex gap-8 mb-8">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="w-24 h-24" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="w-24 h-24" alt="React logo" />
        </a>
      </div>

      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Vite + React</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          count is {count}
        </button>
        <p className="mt-4 text-gray-600">
          Edit <code className="font-mono text-sm bg-gray-200 p-1 rounded">src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p className="text-gray-600 text-center">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
