
// const complete = {
//   page1:false,
//   page2:false,
//   page3:false,
//   page4:false}

const validator = (input,tipo) =>{
  const errors={}

if (tipo === "radio"){
  let size = Object.keys(input).length
  let contador = 0

  for (const key in input) {
    if (!input[key]) {
      errors[key] = "Debe seleccionar una opción";  
    }else{++contador}
  }
  if(contador===size){
    errors.Radcomplete=true
  }else{
    errors.Radcomplete=false
  }}
if (tipo ==="fecha")regularexpresion
if (tipo==="texto") regularexpresion

  return errors
}
export default validator
