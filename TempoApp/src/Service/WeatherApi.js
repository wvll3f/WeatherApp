import errorData from "../helpers/errorData";

// key do cadastro da API
const KEY = '59d131c7eb9e4a5e879155838222906'

const fetchData = async (city) => {

    const url = `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}&aqi=no`

    const fetchResponse = await fetch(url)

    if (fetchResponse.status == 400) {

        console.log('erro')
        const datap = errorData; 
        return datap

    } else {

        const data = await fetchResponse.json()
        return data;
    }

}

export default fetchData