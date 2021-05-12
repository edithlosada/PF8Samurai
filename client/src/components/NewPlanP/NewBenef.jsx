import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNpBen } from '../../actions/plans.actions'; 
import './NewBenef.css';

export default function NewBenef(props) {
  let dispatch = useDispatch();

  let [newbenef, setNewbenef] = useState({
    benefit_title: '',
    benefit_description: '',
  });
  let [newbenefs, setNewbenefs] = useState([]);

  let sended = useSelector((state) => state.sended);

  useEffect(() => {
    if (newbenefs.length) {

      // Guarda el arreglo de benefeficios en el store para el
      // el componente padre.
      dispatch(addNpBen(newbenefs)); 
      // console.log(`Nuevos beneficios:`, newbenefs);
    }
  }, [newbenefs,dispatch]);

  // Cuando envía el formulario limpia input.
  useEffect(() => {
    if (sended) {
      setNewbenef({ benefit_title: '', benefit_description: '' });
      setNewbenefs([]);
    }
  }, [sended]);

  function handleChange(e) {
    let { target } = e;
    let { value, name } = target;
    setNewbenef({ ...newbenef, [name]: value });
    // console.log(`estado:`, newbenef);
    return;
  }

  // Función que agrega un beneficio a la selección
  function handleClickPlus(e) {
    if (newbenef.benefit_title && newbenef.benefit_description) {
      setNewbenefs([...newbenefs, newbenef]); //ojo
      setNewbenef({ benefit_title: '', benefit_description: '' });
      console.log(`agregué ${newbenef}`);
    }
    return;
  }

  // Función que quita un beneficio de la selección
  function removeItem(titulo) {
    let newItems = newbenefs.filter((e) => e.benefit_title !== titulo);
    setNewbenefs(newItems);
    return;
  }

  // Cuando hace click en el botón lo saca
  function handleDelClick(e) {
    e.preventDefault();
    let itm = e.target.value;
    console.log(`saqué ${itm}`);
    removeItem(itm);
    return;
  }

  return (
    <div className='np_ben_form'>
      <div className='np_nbeneffirst'>
        <input
          id='benef_title'
          type='text'
          className='np_a_input'
          value={newbenef.benefit_title}
          name='benefit_title'
          placeholder='Título del nuevo beneficio'
          onChange={handleChange}
        ></input>
        <input
          className='npb_plus'
          type='button'
          onClick={handleClickPlus}
          value={'+'}
        />
      </div>
      <textarea
        id='input_description'
        type='text'
        className='np_a_input'
        value={newbenef.benefit_description}
        name='benefit_description'
        placeholder='Detalle del nuevo beneficio'
        onChange={handleChange}
        onBlur={props.handleBlur}
      ></textarea>
      <div className='np_ben_cont'>
        {newbenefs &&
          newbenefs.map((item, index) => (
            <button
              className='selbenbtn'
              onClick={handleDelClick}
              key={index}
              value={item.benefit_title}
            >
              {item.benefit_title}
            </button>
          ))}
      </div>
    </div>
  );
}
