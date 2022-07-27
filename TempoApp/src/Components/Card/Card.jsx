import './Card.css'
import propTypes from 'prop-types'
import { useState } from 'react'
import { useContext } from 'react'
import {mainContext} from '../../App'
import { useEffect } from 'react'
import errorData from '../../helpers/errorData'


function Card(props) {

    // formatando o que irei Receber do fetch para administrar somente os dados que irei usar.
    const {
        location,
        current,
        id,
    } =  props.data

    const{
        removeCard = () => null
    } = props


    return (

         <div className="card">

            <div className="container-close">
                <button onClick={() => removeCard(id)} className='bt-close'> x </button>
            </div>

            <div className="city">
                <span className='city-span' >{location.name}</span>
                <span className='regiao-span'> {`${location.region}, ${location.country}`}</span>
            </div>

            <div className="temp">
                <span className='temp-span'>{current.temp_c}</span>
                <span className='temp-c-span'>°C</span>
            </div>

            <div className="ext">
                <img src={current.condition.icon} alt="weather icon" />
                <span className='info-span' >{current.condition.text}</span>
            </div>

        </div>

    )
}

export default Card

Card.propTypes = {
    data: propTypes.object,
};
