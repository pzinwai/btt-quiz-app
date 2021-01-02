import React from 'react'
import ReactDOM from 'react-dom'
import Quiz from './components/Quiz'

import './style.css';

function App() {
  return (
    <div className="App">
      <Quiz />
    </div>
  )
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App></App>, rootElement) //renders the component(first parameter) as a child of the element(second parameter)