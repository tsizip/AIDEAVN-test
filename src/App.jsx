import './index.css'
import './App.css'
import FilterMotel from './components/FilterMotel'
import CandlestickChart from './components/CandlestickChart '


function App() {
  return (
    <>
    <h2 className='text-center'>Filter Motel</h2>
     <FilterMotel/>
     <h2 className='text-center'>Chart</h2>
     <CandlestickChart/>
    </>
  )
}

export default App
