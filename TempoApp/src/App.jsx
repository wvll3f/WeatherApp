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

  // estado sobre a cidade
  const [city, setCity] = useState('');
  const [idcontroller, setIdcontroller] = useState(0);

  // estados de busca de dados
  const [data, setData] = useState([initailData]);
  const [clone, setClone] = useState([])

  // estado para a vizualização
  const [flag, setFlag] = useState(false);

  // estado sobre o cartão
  const [list, setList] = useState([initialData])
  const [cartao, setCartao] = useState()

  // função para expor o valor dos dados a cada modificação
  useEffect(() => {
    console.log(data)
  }, [data])

  // encaminha o valor do input para a pesquisa da APi
  const handleSubmit = (event) => {
    event.preventDefault();

    fetchData(city).then((res) => {
      console.log('fethcData ok')

      if (flag) {
        // utilizando o "prev" para adicionar um novo elemento mas mantendo os dados anteriores sem alteração
        // estipulando o id dos elementos do array a apartir da posição ocupada em comparação ao seu tamanho posição = ultimo valor de adição encontrado agtravés do lenght
        setData(prev => [...prev, { id: data.length, ...res }])

      } else {
        //tagando id 0 para o valor inicial e após isso esperando a resposta do fetch
        setData([{ id: 0, ...res }])
      }
      // alterando o estado para setar os ids dinamicamente
      setFlag(true)
      setIdcontroller(prev => prev++)
    })

      .catch((e) => {
        console.log(`Catch: ${e}`)
        setData(errorData)
      })

  }


  let dataAux = [...data]
  const removeCard = (id) => {

    //  console.log('data ', data)

    // dataAux.splice(id, 1)
    if (id > 0) {
      dataAux = data.filter(item => item.id != id);
    }
    else if (id == 0 && data.length == 1) {
      setData(initailData)
    }
    else {
      dataAux = [...data]
    }
    console.log(id)
    setData(dataAux)
  }

  return (

    <div className="Main">

      {/* div dos cartões */}
      <div className='container-second' >
        <ul>
          {
            //função de criação de novos cards diretamente
            data.map((item) => { return <li className='card-main'> < Card data={item} removeCard={removeCard} /> </li> })
          }
        </ul>
        <button onClick={adicionarCard} className='bt-add'> + </button>
      </div>

      {/* div do form */}
      <div className="container">

        {/* função de aplicar o fetch */}

        <form onSubmit={handleSubmit}>
          <input
            value={city}
            onChange={({ target: { value } }) => setCity(value)}
            type="text"
            placeholder='Digite a cidade que deseja'
            required
          >
          </input>
          <button type='submit' className='bt-form'> Pesquisar</button>
        </form>
      </div>
    </div>
  );

  function adicionarCard() {
    setList([...list, cartao])
    setCity('')
  }

}

export default App
