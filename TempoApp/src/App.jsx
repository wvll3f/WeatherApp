import { useState } from 'react'
import './App.css'
import Card from './Components/Card/Card'
import './Components/Card/Card.css'
import fetchData from './Service/WeatherApi'
import initailData from './helpers/initialData'
import { useEffect } from 'react'
import initialData from './helpers/initialData'
import errorData from './helpers/errorData'
import CardErr from './Components/Card/cardErr'


function App() {

  // estado sobre a cidade
  const [city, setCity] = useState('');
  const [idcontroller, setIdcontroller] = useState(0);

  // estados de busca de dados
  const [data, setData] = useState([]);
  const [clone, setClone] = useState([]);

  // estado para a vizualização
  const [flag, setFlag] = useState(false);
  const [vis, setVis] = useState(true);
  // estado sobre o cartão
  const [list, setList] = useState([initialData]);
  const [cartao, setCartao] = useState();

  // função para expor o valor dos dados a cada modificação
  useEffect(() => {
    console.log(data)
  }, [data])

  const estilo = {
    filter: 'blur(4px)',
    display: 'none'
  }
  const newEstilo = {

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
    alignItems: 'center',
    paddingBottom: '2em',
    width: '100%',
    minWidth: '300px',
    height: '50vh',
    marginLeft: '5px',
    marginRight: '5px',

  };
 var placeHouderText = 'Digite a cidade que deseja'

  // encaminha o valor do input para a pesquisa da APi
  const handleSubmit = (event) => {
    event.preventDefault();

    fetchData(city).then((res) => {
      console.log('fethcData ok')
      //primeira validação para não aparecer mesnagem de erro
      if (res.id == 'erro') {
        [{ id: 'erro' }]
        window.alert('Digite uma cidade valida')
      }
      else if (flag) {
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
      setCity('')
    })
      .catch((e) => {
        console.log(`Catch: ${e}`)
        setData(errorData)
      })

  }

  let dataAux = [...data]

  const removeCard = (id) => {
    setCity('')
    //  console.log('data ', data)
    // dataAux.splice(id, 1)
    if (id > 0) {
      dataAux = data.filter(item => item.id != id);
    }
    else if (data.length == 1) {
      dataAux = []
    }
    else {
      dataAux = data.filter(item => item.id != id);
    }
    console.log(id)
    setData(dataAux)
  }

  const removeAll = (e) => {
    e.preventDefault()
    setCity('')
    setData([])
  }

 

  useEffect(() => {
    if (data.id == 'erro') {
      dataAux.pop()
      setData(dataAux)
    } else {
      //console.log(data)
    }
  }, [data]);

  return (

    <div className="Main">


      {vis && <div className='modal-aviso-ini' >
        <section className='modal-aviso-ini-sec'>
          <h1> Olá, tudo bem? </h1>
          <h3>Este é um aplicativo web desenvolvido em react Js</h3>
          <p>Para utiliza-lo basta pesquisar a cidade que deseja verificar o clima atual e apertar <strong> [ Enter ] </strong> ou no botão <strong>[ pesquisar ]</strong>.</p>
        </section>
        <button onClick={removeModal}>OK</button>
      </div>}

      {/* div dos cartões */}
      <div className='container-second' >
        <ul>
          { //função de criação de novos cards diretamente
            data.map((item) => { return <li className='card-main'> < Card data={item} removeCard={removeCard} /> </li> })
          }
        </ul>
      </div>

      {/* div do form */}
      <div className="container" style={vis ? estilo : newEstilo}>

        {/* função de aplicar o fetch */}

        <form onSubmit={handleSubmit}>
          <input
            value={city}
            onChange={({ target: { value } }) => setCity(value)}
            type="text"
            placeholder={placeHouderText}
            required
            disabled={vis ? true : false}
          >
          </input>
          <button disabled={vis ? true : false} type='submit' className='bt-form'> Pesquisar</button>
          <button disabled={vis ? true : false} onClick={removeAll} className="bt-remove-all"> Limpar </button>
        </form>
      </div>

    </div>
  );

  function removeModal() {
    setVis(!vis)
  }



}

export default App
