const validator = (input, tipo) => {
    const errors = {};
    let size = Object.keys(input).length;
    let contador = 0;

    if (tipo === 'number') {
        for (const key in input) {
            if (input[key] === 'hide') ++contador;
            else if (!/^\d*$/.test(input[key]) || !input[key]) {
                //comprabar que solo haya numeros sin otros caracter
                errors[key] =
                    'Datos invalidos,solo se admiten numeros sin puntos ni comas.';
            } else ++contador;
        }
        if (contador === size) errors.textNumComplete = true;
        else errors.textNumComplete = false;
    }

    if (tipo === 'text') {
        // let size = Object.keys(input).length;
        // let contador = 0;
        for (const key in input) {
            //comprobar si es un numero
            if (input[key] === 'hide') ++contador;
            else if (!/^[A-Za-z\s]+$/g.test(input[key])) {
                //es un string, valido que sean solo letras y espacios
                errors[key] = 'Datos invalidos.';
            } else ++contador;
        }
        if (contador === size) errors.textComplete = true;
        else errors.textComplete = false;
    }

    if (tipo === 'mix') {
        for (const key in input) {
            // console.log(`aca esta el mix ${key} y lo otro es ${typeof input[key]}`)
            if (input[key] === 'hide') ++contador;
            else if (!/^[A-Za-z0-9\s]+$/g.test(input[key])) {
                errors[key] = 'Datos invalidos.';
            } else ++contador;
        }
        if (contador === size) errors.textMixComplete = true;
        else errors.textMixComplete = false;
    }
    if (tipo === 'email') {
        for (const key in input) {
            if (input[key] === 'hide') ++contador;
            else if (
                !/[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g.test(
                    input[key]
                )
            ) {
                errors[key] = 'Email invalidos.';
            } else ++contador;
        }
        if (contador === size) errors.emailComplete = true;
        else errors.emailComplete = false;
    }
    if (tipo === 'radio') {
        for (const key in input) {
            if (input[key] === 'hide') ++contador;
            else if (!input[key]) errors[key] = 'Debe seleccionar una opción';
            else ++contador;
        }
        if (contador === size) errors.radComplete = true;
        else errors.radComplete = false;
    }

    if (tipo === 'date') {
        for (const key in input) {
            if (!input[key]) errors[key] = 'Debe seleccionar una opción';
            else if (input[key] !== 'hide') {
                //es una fecha
                let aux = new Date(input[key]);
                if (Date.now() < Date.parse(aux)) {
                    errors[key] =
                        'Debe seleccionar una fecha anterior a la actual';
                } else ++contador;
            } else ++contador;
        }
        if (contador === size) errors.dateComplete = true;
        else errors.dateComplete = false;
    }
    return errors;
};
export default validator;
