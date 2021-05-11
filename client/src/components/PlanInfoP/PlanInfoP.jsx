import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { saveNpBenefSel, sendedNpForm } from '../../actions/plans.actions';
import './PlanInfoP.css';
// path: http://localhost:3000/admin/PlanInfoP

import { createClient } from '@supabase/supabase-js'
// Información de la base de datos
const supabaseUrl = 'https://qeubfsxlcvapzvjihzep.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMDMyNDU4NCwiZXhwIjoxOTM1OTAwNTg0fQ.l9ZzKLUoPFsMWMCismH6RkXsEzBiSrDMylGB9V_HHjI"
const supabase = createClient(supabaseUrl, supabaseKey)

//path='/admin/NewPlanP'
export default function PlanInfoP() {
  let dispatch = useDispatch();

  // Estado donde voy a guardar los datos del plan
  // traidos desde la base de datos.
  // {}
  let [planInfo, setPlanInfo] = useState({});

  // // Función que se trae los datos del plan de la base de datos
  // // y los cuarda en el estado local 'benefSupa'.
  // async function getBenefAsync() {
  //   // let { data: benefits, error } = await supabase <- Ver manejo de errores
  //   let { data: planinfo } = await supabase
  //     .from('planinfo')
  //     .select('*')
  //   console.log(planinfo)
  //   //[{"id_benefit": 1, "benefit_description": "Internación Gratuita"},{},{}]
  //   setPlanInfo(planinfo)
  // }

  let [benefArr, setBenefArr] = useState([]);

  useEffect(() => {
    setPlanInfo({ pname: 'Integra 101', price: 2700, benefits: ['Médico a domicilio', 'Internación gratis', 'Cobertura medicamentos'] });
    setBenefArr(planInfo.benefits);
    console.log(planInfo);
    console.log(benefArr);
  }, []);

  let [pname, setPname] = useState('');
  let [price, setPrice] = useState('');

  let handleChange = (e) => {
    let item = e.target.name;
    switch (item) {
      case 'pname':
        setPname(e.target.value);
        break;
      case 'price':
        setPrice(e.target.value);
        break;
      default:
        break;
    }
  }


  let handleSubmit = (e) => {
    // e.preventDefault();
    // dispatch(sendedNpForm(true));// state.sended = true
  }

  return (
    <div className="pd_page">
      {/* <AdminNav/> */}
      <div className="pd_form">
        <h4> Detalles de un determinado plan</h4>
        {/* <hr className="sep1" />
        <hr className="sep2" /> */}
        <form
          method="post"
          // action="http://localhost:300" 
          className="pd_inputArea"
          onSubmit={handleSubmit}
        >
          <div className="pd_firstline">
            <input
              id="input_name"
              type="text"
              className="pd_nameinput"
              value={pname}
              name='pname'
              placeholder={planInfo.pname}
              onChange={handleChange}>
            </input>
            <input
              id="input_name"
              type="text"
              className="pd_priceinput"
              value={price}
              name='price'
              placeholder={planInfo.price}
              onChange={handleChange}>
            </input>
          </div>
          <div className="pd_benefcont">
            {benefArr.map((item, index) => (
              <input
                id={index}
                key={index}
                type="text"
                className="pd_benefit"
                value={item}
                name=''
                placeholder={item}
                onChange={handleChange}>
              </input>
            ))}
          </div>
          <div className="pd_button-area">
            <button className="pd_button modificar" type="submit">Modificar</button>
            <button className="pd_button" type="submit">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
