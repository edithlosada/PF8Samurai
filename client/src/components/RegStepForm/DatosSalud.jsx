import { FormControlLabel, TextField } from "@material-ui/core"
import React, { useState } from "react"


const DatosSalud = () =>{

const [input,setInput] = useState({
    complete_name: "",
    dni: ""
})
  return (
    <>
  <div id="cabecera">     
    <TextField 
      name="complete_name"
      label ="Nombre y Apeliido" 
      variant="outlined"
      value={input.complete_name}/>
    <TextField 
      name= "dni"
      label ="DNI" 
      variant="outlined"
      value={input.dni}/>
  </div> 
  </>
  )
}
export default DatosSalud