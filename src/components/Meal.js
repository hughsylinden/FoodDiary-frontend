import React from 'react'
import moment from 'moment'

function Meal({name,calories,time}) {
  const d = moment(time).format('DD/MM/YYYY')
  const t = moment(time).format('HH:mm:ss')
  return (
    <div>
      <div>{name}</div>
      <div>{calories}</div>
      <div>{d}</div>      
      <div>{t}</div>      
      <br/>
    </div>
  )
}

export default Meal
