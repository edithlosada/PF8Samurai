import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './NewBenef.css';
import { addNpBen } from '../../actions/plans.actions';

export default function NewBenef() {
  let dispatch = useDispatch();

  let [newbenef, setNewbenef] = useState({ benefit_title: '', benefit_description: '' });
  let [newbenefs, setNewbenefs] = useState([]);

  let addedben = useSelector(state => state.addedbenefs);
  let sended = useSelector(state => state.sended);

  // Cuando envía el formulario manda el arreglo de 
  // nuevos beneficios al store.
  useEffect(() => {
    if (sended) {

      // Guarda el arreglo de benefeficios en el store para el 
      // el componente padre.
      dispatch(addNpBen(newbenefs));  // <-----
      console.log(`Beneficios:`,newbenefs);

      // Función que postea los nuevos beneficios en la
      // base de datos.
      async function postNewBenefs(newbenefs) {

        // let ArrObjBenefs = newbenefs.map( b => {
        // newbenefs.map

        //   //----------------------------
        //   let { data: benefits, error: errorBenef } = await supabase
        //   .from('benefits')
        //   .insert([
        //     {
        //       benefit_description: newplan.description,
        //       benefit_description: newplan.description,
        //     },
        //   ]);
        // //----------------------------
        // })
      }

    }
  }, [sended, newbenefs, dispatch]);



  // Una vez que el store recibe los beneficios limpia el input y arreglo.
  useEffect(() => {
    if (addedben) {

      setNewbenef({ benefit_title: '', benefit_description: '' });
      setNewbenefs([]);
    }
  }, [addedben]);

  function handleChange(e) {
    let { target } = e;
    let { value, name } = target;
    setNewbenef({ ...newbenef, [name]: value });
    console.log(`estado:`, newbenef);
    return;
  }

  // Función que agrega un beneficio a la selección
  function handleClickPlus(e) {
    if (newbenef.benefit_title && newbenef.benefit_description) {
      setNewbenefs([...newbenefs, newbenef]);//ojo
      setNewbenef({ benefit_title: '', benefit_description: '' });
      console.log(`agregué ${newbenef}`)
    }
    return;
  }

  // Función que quita un beneficio de la selección
  function removeItem(titulo) {
    let newItems = newbenefs.filter(e => e.benefit_title !== titulo);
    setNewbenefs(newItems);
    return;
  }

  // Cuando hace click en el botón lo saca
  function handleDelClick(e) {
    e.preventDefault();
    let itm = e.target.value;
    console.log(`saqué ${itm}`)
    removeItem(itm);
    return;
  }




  return (
    <div className="np_ben_form">
      <div className="np_nbcont">
        <input
          id="input_name"
          type="text"
          className="np_a_input"
          value={newbenef.benefit_title}
          name='benefit_title'
          placeholder="Título del nuevo beneficio"
          onChange={handleChange}>
        </input>
        <textarea
          id="input_description"
          type="text"
          className="np_a_input"
          value={newbenef.benefit_description}
          name='benefit_description'
          placeholder="Detalle del nuevo beneficio"
          onChange={handleChange}>
        </textarea>
        <input className="npb_plus" type="button" onClick={handleClickPlus} value={'+'} />
      </div>
      <div className="np_ben_cont">
        {newbenefs && newbenefs.map((item, index) => (
          // <div onClick={handleDelClick} key={index}  value={item}>
            <button className="selbenbtn" onClick={handleDelClick} key={index}  value={item.benefit_title} >
              {item.benefit_title}
            </button>
          //   <button className="selbenbtn" value={benefit_description}
          //    key={index}>
          //   {item}
          // </button> 
          // </div>

        ))}
      </div>
    </div>
  )
}
