import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import style from "./familydata.module.css";

const FamilyData = () => {

  const [input,setInput]=useState('');

  const handleChage = (e)=>{
    setInput(e.target.value);
  }
  const handle = ()=>{
    // let errors = '';
    // let contador = 0; 
    // //console.log(typeof input)
    //      //comprobar si es un numero
    //      if (!isNaN(Number(input))) {
    //       //si ingreso es numero
    //       if (!/^\d*$/.test(input)){//comprabar que solo haya numeros sin otros caracter
    //           errors = "Datos invalidos,solo se admiten numeros sin puntos ni comas.";
    //       }else console.log('es un numero correcto');
    //   } else if (!/^[A-Za-z\s]+$/g.test(input)){//es un string, valido que sean solo letras y espacios
    //     //*******NO FUNCIONA CUANDO PONGO LETRAS Y NUMEROS [a-zA-Z\t\h]+|(^$)*/
    //       errors = "Datos invalidos, solo letras y espacios.";
    //   }else console.log('es un string correcto');;
    //   //if(contador===size) errors.Radcomplete=true;
    //   //else errors.Radcomplete=false;  
    //   console.log('errors',errors) ; 
    //   console.log('contador',contador) ; 

  }
  // const [selectedDate, setSelectedDate] = useState(Date);
  // const handleDateChange = (date) => {
  //   console.log('hoy',Date.now())
  //   console.log(date.getTime())
  //   if(Date.now() < date.getTime()) console.log('la fecha de hoy es menor')
  //   else console.log('la fecha de hoy es mayor')
  //   console.log(date)
  //   setSelectedDate(date);
  // };

  
  // //onChange={handlerChangeInput}
  //value={inputValue}
  //value={input.gender}
  //onChange={(e) => handleInputChange(e)}

  /**
    el text fiel cuando esta incorrecto se deben agregar las propiedades:
    error, se debe incluir para dar color
    label="Error"
    helperText="Incorrect entry."
   */
  const [inputs,setInputs]= useState({
 

  });

  return (
    <div className={style.ctn}>
      <div>
        <h2 className={style.title}>Datos de Familiares</h2>
      </div >
      <div className={style.formCtn}>
        <div className={style.form}>
            <div className={style.campus}>
              <TextField
                
                size="small"
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                onChange={(e)=>handleChage(e)}
              />
            </div>
            <div className={style.campus}>
              <TextField
                
                size="small"
                id="outlined-basic"
                label="Apellido"
                variant="outlined"
              />
            </div>
            <div className={style.campus}>
              <TextField
                size="small"
                id="outlined-number"
                label="Edad"
                type="number"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div>
              <TextField
                name='fechanac'
                size="small"
                id="outlined-number"
                label="BirthDate"
                type="date"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e)=>console.log( Date.parse(e.target.value))}
                onClick={(e) => console.log(e.target.value)}
              />
            </div>  
            <div className={style.campus}>
                <InputLabel id="demo-simple-select-filled-label">Relationship</InputLabel>
                <Select
                  className={style.listbox}
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value={"male"}>Wife</MenuItem>
                  <MenuItem value={"female"}>Son</MenuItem>
                  <MenuItem value={"female"}>Other</MenuItem>
                </Select>
            </div>
            <div className={style.campus}>
                <InputLabel id="demo-simple-select-filled-label">Genre</InputLabel>
                <Select
                  className={style.listbox}
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value={"male"}>Masculino</MenuItem>
                  <MenuItem value={"female"}>Femenino</MenuItem>
                </Select>
            </div>
                    
        </div>

        
        
      
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="dd/MM/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider> */}
        
      </div>
      
    </div>
  );
};
export default FamilyData;
