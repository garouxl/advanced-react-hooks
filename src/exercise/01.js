// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

import {ErrorBoundary} from 'react-error-boundary'

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function countReducer(state, action) {
  const {type, step} = action
  const {count} = state
  switch (type) {
    case 'INCREMENT':
      return {count: count + step}

    case 'DECREMENT':
      return {count: count - step}
    default:
      throw new Error(`Unsupported action type: ${type}`)
  }
}

function Counter({initialCount = 0, step = 1, type}) {
  const [state, dispatch] = React.useReducer(countReducer, {
    count: initialCount,
  })
  const {count} = state
  const handleClick = () =>
    dispatch({type, step})

  return <button onClick={handleClick}>{count}</button>
}

function App() {
  return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Counter type="INCREMENT"  />
        <Counter type="DECREMENT"  />
        <p>This one generate an error:</p>
        <Counter type="mais" />
      </ErrorBoundary>
  )
}

export default App
