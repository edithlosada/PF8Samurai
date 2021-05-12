import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MultiSelectBenef from './MultiSelectBenef';
import NewBenef from './NewBenef';
import { sendedNpForm } from '../../actions/plans.actions';
import { createClient } from '@supabase/supabase-js';
import Alert from '@material-ui/lab/Alert';

import './NewPlanP.css';

// Información de la base de datos
const supabaseUrl = 'https://qeubfsxlcvapzvjihzep.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMDMyNDU4NCwiZXhwIjoxOTM1OTAwNTg0fQ.l9ZzKLUoPFsMWMCismH6RkXsEzBiSrDMylGB9V_HHjI';
const supabase = createClient(supabaseUrl, supabaseKey);

//path='/admin/NewPlanP'
export default function NewPlanP() {
  const dispatch = useDispatch();

  const [newPlan, setNewPlan] = useState({ description: '', price: '' });
  const [errors, setErrors] = useState({
    description: '',
    price: '',
    benefits: ''
  });
  const [ success, SetSuccess ] = useState('')

  let handleChange = (e) => {
    let { name, value } = e.target;
    setNewPlan({ ...newPlan, [name]: value });
    return;
  };

  // Función que deshabilita el botón de guardar hasta
  // que los campos estén completados.
  let handleBlur = (e) => {
    const { name, value } = e.target;
    let error;

    switch (name) {
      case 'description':
        error = !value.trim().length || !/^[a-zA-Z\s]+$/.test(value) ? 'Debe ingresar una descripción' : '';
        setErrors({ ...errors, [name]: error })
        break;
      case 'price':
        error = !/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(value) ? 'Debe ingresar un precio válido positivo' : '';
        setErrors({ ...errors, [name]: error })
        break;
      default:
        break;
    }
  }


  let sbenefs = useSelector((state) => state.npbensel); // Beneficios preexistentes seleccionados
  let nbenefs = useSelector((state) => state.addedbenefs);// Nuevos beneficios seleccionados
  let sended = useSelector((state) => state.sended); // Estado de envío del formulario

  useEffect(() => {
    console.log(sbenefs);
    console.log('console2', Object.values(sbenefs));
  }, [sbenefs]);

  // Cuando guarda lo cargado en el formulario:
  let handleSubmit = async (e) => {
    e.preventDefault();

    const idNBenefs = []; // Arreglo de id de nuevos beneficios seleccionados
    dispatch(sendedNpForm(true)); // state.sended = true
    console.log(
      'vos me estas diciendo',
      newPlan,
      'y encima queres que tenga',
      sbenefs,
      nbenefs
    );
    e.target.reset();

    // ACA SE AGREGAN LOS NUEVOS BENEFICIOS A LA DB

    await nbenefs.forEach(async (nben) => {
      console.log(nben);
      const { data, error } = await supabase.from('benefits').insert([
        {
          benefit_title: nben.benefit_title.toLowerCase(),
          benefit_description: nben.benefit_description,
        },

      ]);
      console.log(error);
      // data viene como un arreglo de beneficios con la forma:
      // [{id_benefit: 35, benefit_title: "Internacion", benefit_description: "cobertura al 100%"}]
      // Agrega sólo los ids en la tabla de nuevos beneficios.
      idNBenefs.push(data[0].id_benefit);
    });
    console.log('ID BENEFICIOSSSSSSS', idNBenefs);

    // ACA SE AGREGAN LOS NUEVOS PLANES A LA DB

    const { data, error } = await supabase
      .from('plans')
      .insert([
        { description: newPlan.description, price: newPlan.price },
      ]);
    console.log(error);
    // data viene como un arreglo de beneficios con la forma:
    //[{"id_plan": 21,"description": "Superplan","price": 3000}]
    console.log('ID PLANNNNN', data);
    const idNewPlan = data[0].id_plan;
    console.log(idNewPlan);

    // ACA SE VINCULAN LOS BENEFICIOS Y LOS PLANES EN LA DB
    const allBenefs = sbenefs.concat(idNBenefs);
    await allBenefs.forEach(async (idBenef) => {
      const { data: tablaIntermedia, error: errorsito } = await supabase
        .from('plans_benefits')
        .insert([{ id_plan: idNewPlan, id_benefit: idBenef }]);
      if (errorsito) console.log(errorsito);
      console.log(tablaIntermedia);
    });
  };



  // Cuando presione guardar el formulario, sended pasa a "true"
  // se dispara esto que limpia el estado local de beneficios seleccionados.
  useEffect(() => {
    if (sended) {

      // Una vez que hace lo que tiene que hacer setea sended en false.
      dispatch(sendedNpForm(false)); // state.sended = false

      SetSuccess('Tu plan se agregó correctamente!');
      setNewPlan({ description: '', price: '' });
    }
  }, [sended, dispatch]);

  const validator = () => {
    if (sbenefs.length && Object.values(errors).every(e => !e.length)) return true;
    return false;
  };
  return (
    <div className='np_page'>
      <h6>Esta es la página del administrador</h6>
      <div className='np_form'>
        <h4> Creación de un nuevo plan</h4>
        <hr className='sep1' />
        <hr className='sep2' />
        <form className='np_inputArea' onSubmit={handleSubmit}>
          <div className='np_firstline'>
            <div className='np_fl_cont'>
              <input
                id='input_name'
                type='text'
                className='np_input_name'
                value={newPlan.description}
                name='description'
                placeholder='Nombre del plan'
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {errors.description && <Alert severity='error' className='np_errormsj'>{errors.description}</Alert>}
            </div>
            <div className='np_fl_cont'>
              <input
                id='np_priceinput'
                type='text'
                className='np_priceinput'
                value={newPlan.price}
                name='price'
                placeholder='Importe mensual'
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {errors.price && <Alert severity='error' className='np_errormsj'>{errors.price}</Alert>}
            </div>
          </div>
          <div className='np_selectArea'>
            <MultiSelectBenef />
            <NewBenef />
          </div>
          <div className='np_button-area'>
            <button
              disabled={!validator()}
              className={validator()? 'np_button' : 'np_buttonD'}
              type='submit'
            >
              Guardar
              </button>
          </div>
        </form>
        {success && <Alert severity='success'>{success}</Alert>}
      </div>
    </div>
  );
}
