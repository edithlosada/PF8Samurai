import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    TextField,
  } from "@material-ui/core";
  import React, { useState } from "react";
  import style from "./familydata.module.css";


  const DatosEmpresa = () => {
    const [input, setInputs] = useState({
      bussines_name: "",
      bussines_group: "",
      rh_name: "",
      company_phone: "",
      company_email: "",
    });
    const [errors, setErrors] = useState({});
    // const handleChange=(e)=>{
    //   const{value,name} = e.target
    //   setInputs({...inputs,
    //             [name]:value})
    //   validator (name,value)
    // }
    // const validator =(value,name)=>{
    //   let temp = {}
    //   temp.bussines_name= value.length ? "" : "Campo requerido"
    //   temp.bussines_group= value.length? "" : "Campo requerido"
    //   temp.rh_name= value.length?"" : "Campo requerido"
    //   temp.company_phone= value.length?"" :"Tu teléfono debe contener un mínimo de 6 números."
    //   temp.company_email=(/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}.test(value))? "": "Ingresá un email válido."
  
    //   setErrors({...temp})
    // }
  
    return (
        <div className={style.ctn}>
            <div>
            <h2 className={style.title}>Datos Empresa</h2>
            </div >
        <div className={style.formCtn}>
            <div className={style.form}>
                <TextField
                name="bussines_name"
                label="Razon Social"
                variant="outlined"
                value={input.bussines_name}
                />
                <TextField
                name="bussines_group"
                label="Grupo Empresarial"
                variant="outlined"
                value={input.bussines_group}
                />
                <TextField
                name="rh_name"
                label="Nombre y Apellido de RRHH Ref. de la Empresa"
                variant="outlined"
                value={input.rh_name}
                />
                <TextField
                name="company_phone"
                label="Telefono de la empresa"
                variant="outlined"
                value={input.company_phone}
                />
                <TextField
                name="company_email"
                label="E-mail de la empresa"
                variant="outlined"
                value={input.company_email}
                />
                </div>
        </div>
    </div>
    );
  };
  export default DatosEmpresa;