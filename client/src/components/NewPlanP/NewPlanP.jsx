import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MultiSelectBenef from './MultiSelectBenef';
import NewBenef from './NewBenef';
import { saveNpBenefSel, sendedNpForm } from '../../actions/plans.actions';
import './NewPlanP.css';
// import axios from 'axios';
// import AdminNav from ''
import { createClient } from '@supabase/supabase-js'
// Información de la base de datos
const supabaseUrl = 'https://qeubfsxlcvapzvjihzep.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMDMyNDU4NCwiZXhwIjoxOTM1OTAwNTg0fQ.l9ZzKLUoPFsMWMCismH6RkXsEzBiSrDMylGB9V_HHjI"
const supabase = createClient(supabaseUrl, supabaseKey)

//path='/admin/NewPlanP'
export default function NewPlanP() {
  const dispatch = useDispatch();

  // CAMBIAR A OBJETO

  let [newPlan, setNewPlan] = useState({ description: '', price: '' });
  let [errors, setErrors] = useState({
    description: '',
    price: '',
    benefits: ''
  })


  let handleChange = (e) => {
    // e.preventDefault();
    let { name, value, type } = e.target;
    setNewPlan({ ...newPlan, [name]: value })
    return;
  }



  let handleBlur = (e) => {
    let itmname = e.target.name;
    let value = e.target.value;
    let error = '';
    switch (itmname) {
      case 'description': error = 'Debe ingresar un nombre de plan' 
        break;
      case 'price': error = 'Debe ingresar un precio'
        break;
      default: error = '';
        break;
    }
    if (!value.length) setErrors({ ...errors, [itmname]:error});
    else setErrors({ ...errors, [itmname]:''})
  }

  let sbenefs = useSelector(state => state.npbensel);
  let nbenefs = useSelector(state => state.addedbenefs);
  let sended = useSelector(state => state.sended);

  // [{ "id_benefit": 1, "benefit_description": "Internación Gratuita" },{}]

  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendedNpForm(true));// state.sended = true
    e.target.reset();
  }

  useEffect(() => {
    console.log(sbenefs);
    console.log("console2",Object.values(sbenefs));
    
  }, [sbenefs]);

  // Cuando presione guardar el formulario, sended pasa a "true"
  // se dispara esto que limpia el estado local de beneficios seleccionados.
  useEffect(() => {
    if (sended) {





      let benefits = sbenefs;
      if (nbenefs.length !== 0) {
        // crear a la base beneficios nuevos.
        benefits = sbenefs.concat(nbenefs);
      }



      // let Plan = { description: pname, price, benefits, createdAt: "2021-05-07T19:12:24+00:00", modifiedAt: "2021-05-07T19:12:24+00:00" };
      let Plan = { ...newPlan, price: parseInt(newPlan.price) };
      console.log('plan', Plan);
      // crear a la base el nuevo plan (let newPlan)

      //setear la relacion plan beneficios todos id_plan --- id_benefit.

      // Una vez que hace lo que tiene que hacer setea sended en false.
      dispatch(sendedNpForm(false));// state.sended = false

      alert('agregaste plan');
      setNewPlan({ description: '', price: '' })

    }
  }, [sended, sbenefs, nbenefs, dispatch]);

const validator = ()=>  {
    if (sbenefs.length) return true;
    return false
}
  return (
    <div className="np_page">
      {/* <AdminNav/> */}
      <h6>Esta es la página del administrador</h6>
      <div className="np_form">
        <h4> Beneficios del nuevo plan</h4>
        <hr className="sep1" />
        <hr className="sep2" />
        <form method="post" action="http://localhost:300" className="np_inputArea" onSubmit={handleSubmit}>
          <div className="np_firstline">
            <input
              id="input_name"
              type="text"
              className="np_nameinput"
              value={newPlan.description}
              name='description'
              placeholder="Nombre del plan"
              onChange={handleChange}
              onBlur={handleBlur}>
            </input>
            {errors.description && <p>{errors.description}</p>}
            <input
              id="input_name"
              type="text"
              className="np_priceinput"
              value={newPlan.price}
              name='price'
              placeholder="Importe mensual"
              onChange={handleChange}
              onBlur={handleBlur}>
            </input>
            {errors.price && <p>{errors.price}</p>}
          </div>
          <div className="np_selectArea">
            <MultiSelectBenef />
            <NewBenef />
            {errors.benefits && <p>{errors.benefits}</p>}
          </div>
          <div className="np_button-area">
             {validator()? 
              <button className="np_button" type="submit">Guardar</button>
              :<button disabled className="np_buttonD" type="submit">Guardar</button>}
             {/* 
             {disabled = v()}
             validar()?classname="np_button":"np_buttonD"
              
             */}
          </div>
        </form>
      </div>
    </div>
  )
};
