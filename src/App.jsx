import { useState } from 'react'
import './App.css'
import Card from './Components/Card/Card'
import './Components/Card/Card.css'
import fetchData from './Service/WeatherApi'
import initailData from './helpers/initialData'
import { createContext } from 'react'
import { useEffect } from 'react'
import initialData from './helpers/initialData'
import errorData from './helpers/errorData'
import CardErr from './Components/Card/cardErr'




export const mainContext = createContext();

function App() {



  const [city, setCity] = useState('');
  const [data, setData] = useState(initailData);
  const [vis, setVis] = useState(false);
  const [tst, setTst] = useState(false);

  const initialRes = 'camacari'

  const handleSubmit = (event) => {

    event.preventDefault();

    fetchData(city).then((res) => {
      console.log('fethcData ok')
      setData(res)
      setVis(true);
    })

      .catch((e) => {
        console.log(`Catch: ${e}`)
        setVis(false)
        setData(errorData)
      })

  }

  const NewCard = event => {
    event.preventDefault()
    console.log('add new card')
    return <Card />

  }

  return (

    <div className="Main">

      <div className="container">

        <form onSubmit={handleSubmit}>
          <input
            value={city}
            onChange={({ target: { value } }) => setCity(value)}
            type="text"
            placeholder='Digite a cidade que deseja'
            required
          >
          </input>
          <button type='submit'> Pesquisar</button>
        </form>

        {vis && <div className='card-main'> < Card data={data} /> </div>}

      </div>

      <div className='container-second'>
        <button className='bt-add'> + </button>
      </div>



    </div>
  )
}

export default App
