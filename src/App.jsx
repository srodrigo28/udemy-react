import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ShowProducts from './components/ShowProducts'

function App() {
  
  return (
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<ShowProducts />} /> 
        </Routes>
      </BrowserRouter>
  )
}

export default App
