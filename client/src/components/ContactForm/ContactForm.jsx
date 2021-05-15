import React, { useState } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Styles from './ContactForm.module.css';
import emailjs from 'emailjs-com'
import LogoNav from '../../assets/logo-integra.png';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import supabase from '../../supabase.config';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#41aea9',
        },
        secondary: {
            main: '#e8ffff',
        },
    },
});

const useStyles = makeStyles({
    root: {
        width: '50%',
        height: '70%',
        background: '#e8ffff',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function ContactForm() {
    const classes = useStyles();

    const [input, setInput] = useState({
        name: '',
        age: '',
        dni: '',
        phone_number: '',
        email: '',
    });
    const [errors, setErrors] = useState({
        name: false,
        age: false,
        dni: false,
        phone_number: false,
        email: false,
        onProcess: false
    });
    const [successRequest, setSuccessRequest] = useState(false);
    const [errorRequest, setErrorRequest] = useState(false);
    const [redirect, setRedirect] = useState(false);
   
    const handleClickOpen = async (e) => {

        await inputEmailFetchCheck(input.email)

        if (
            !errors.age &&
            !errors.dni &&
            !errors.phone_number &&
            !errors.email &&
            !errors.name &&
            !errors.onProcess
        ) {
            console.log('errors:', errors)
            setSuccessRequest(true);
            const { data: contactFormResolve, error: insertEmailError } = await supabase.from('guest_contacts').insert([
                {
                    dni: parseInt(input.dni),
                    name: input.name,
                    age: parseInt(input.age),
                    phone_number: parseInt(input.phone_number),
                    email: input.email
                }
            ]);

            contactFormResolve && sendeMail()

            setInput({
                name: '',
                age: '',
                dni: '',
                phone_number: '',
                email: '',
            });
        } else {
            setErrorRequest(true);
        }
    };

    const handleClose = () => {
        setSuccessRequest(false);
        setErrorRequest(false);
    };
    const handleBack = () => {
        setRedirect(true);
        setSuccessRequest(false)
    };

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(
            validate(e.target.name, e.target.value)
        );
    };

    function validate(inputName, value) {
        const emailPattern =
            /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
        const namePattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
        const numberPattern = /^[0-9\b]+$/;
        let errors = {
            name: false,
            age: false,
            dni: false,
            phone_number: false,
            email: false,
            onProcess: false
        };

        switch (inputName) {
            case 'name': {
                if (!namePattern.test(value)) {
                    errors = { ...errors, [inputName]: true };
                } else {
                    errors = { ...errors, [inputName]: false };
                }
                break;
            }
            case 'age': {
                if (!numberPattern.test(value)) {
                    errors = { ...errors, [inputName]: true };
                } else {
                    errors = { ...errors, [inputName]: false };
                }
                break;
            }
            case 'dni': {
                if (!numberPattern.test(value) || value.length !== 8) {
                    errors = { ...errors, [inputName]: true };
                } else {
                    errors = { ...errors, [inputName]: false };
                }
                break;
            }
            case 'phone_number': {
                if (
                    !numberPattern.test(value) ||
                    value.length < 10
                ) {
                    errors = { ...errors, [inputName]: true };
                } else {
                    errors = { ...errors, [inputName]: false };
                }
                break;
            }
            case 'email': {
                if (!emailPattern.test(value)) {
                    errors = { ...errors, [inputName]: true };
                } else {
                    errors = { ...errors, [inputName]: false };
                }
                break;
            }
        }
        return errors;
    }

    async function inputEmailFetchCheck(email){

        const { data: emails, error: emailError } = await supabase.from('guest_contacts').select('email').eq('email', email)
        emails && console.log('emails!', emails)

        if (emails.length) {
            setErrors({ ...errors, onProcess: true, successRequest: false })
        } else {
            setErrors({ ...errors, onProcess: false, successRequest: true })
        }
        console.log('state erros',errors)
        console.log('fetch erros',emailError)

    }

    function sendeMail() {

        emailjs.send('service_wcpzjw7', 'template_r93a6bs', input, 'user_mgft1j53RDkaGc1EWyKNK')
            .then((result) => {
                console.log('resultado:', result.text);
            }, (error) => {
                console.log('error:', error.text);
            });
    }

    // const renderRedirect = () => {
    //     if (redirect) {
    //         setSuccessRequest(false)
    //     }
    // };

    const success = ()=>{
        if (successRequest) {
            return (
                <div
                    className={Styles.successRequest}
                    style={!successRequest ? { display: 'none' } : {}}
                >
                    <div className={Styles.successRequestContent}>
                        <p className={Styles.successRequestTitle}>
                            ¡Gracias por escribirnos!
                        </p>
                        <div></div>
                        <div>
                            <p className={Styles.successRequestSubTitle}>
                                {' '}
                                Un asesor se comunicara con vos
                            </p>
                            <p className={Styles.successRequestSubTitle}>
                                {' '}
                                para charlar sobre tu próximo plan.
                            </p>
                        </div>
                        <Button
                            className={Styles.buttonVolverSuccess}
                            variant='contained'
                            color='secondary'
                            onClick={handleBack}
                            style={{ borderRadius: 100 }}
                        >
                            Volver
                        </Button>
                        {/* {renderRedirect()} */}
                    </div>
                </div>
            )
        } else {
            return null
        }
    }

    return (
        <div className={Styles.conteinerAll}>
            <ThemeProvider theme={theme}>
                {success()}
                <Card className={classes.root}>
                    <Snackbar
                        open={errorRequest}
                        autoHideDuration={6000}
                        onClose={handleClose}
                    >
                        <Alert onClose={handleClose} severity='error'>
                            Error! Verifique sus datos
                        </Alert>
                    </Snackbar>
                    <div className={Styles.formConteiner}>
                        <div className={Styles.inputs}>
                            <div className={Styles.imgConteiner}>
                                <img src={LogoNav} alt='Logo' />
                            </div>
                            <div className={Styles.textField}>
                                <label htmlFor=''>Me llamo </label>
                                <TextField
                                    id='name-input'
                                    type='text'
                                    name='name'
                                    autoComplete='off'
                                    value={input.name}
                                    onChange={(e) => handleInputChange(e)}
                                    {...(errors.name && {
                                        error: errors.name,
                                        helperText: 'Nombre invalido',
                                    })}
                                />
                            </div>
                            <div className={Styles.textField}>
                                <label htmlFor=''>Tengo </label>
                                <TextField
                                    id='age-input'
                                    type='tel'
                                    name='age'
                                    autoComplete='off'
                                    value={input.age}
                                    onChange={(e) => handleInputChange(e)}
                                    {...(errors.age && {
                                        error: true,
                                        helperText: 'Edad invalido',
                                    })}
                                    inputProps={{ maxLength: 3 }}
                                />
                                <label htmlFor=''> años.</label>
                            </div>
                            <div className={Styles.textField}>
                                <label htmlFor=''>Mi DNI es </label>
                                <TextField
                                    id='dni-input'
                                    type='tel'
                                    name='dni'
                                    autoComplete='off'
                                    value={input.dni}
                                    onChange={(e) => handleInputChange(e)}
                                    {...(errors.dni && {
                                        error: true,
                                        helperText: 'Dni invalido',
                                    })}
                                    inputProps={{ maxLength: 8 }}
                                />
                            </div>
                            <div className={Styles.textField}>
                                <label htmlFor=''>Mi teléfono es </label>
                                <TextField
                                    id='phone-input'
                                    type='tel'
                                    name='phone_number'
                                    autoComplete='off'
                                    value={input.phone_number}
                                    onChange={(e) => handleInputChange(e)}
                                    {...(errors.phone_number && {
                                        error: true,
                                        helperText: 'Teléfono invalido',
                                    })}
                                    inputProps={{ maxLength: 12 }}
                                />
                            </div>
                            <div className={Styles.textField}>
                                <label htmlFor=''>Mi email es </label>
                                <TextField
                                    id='email-input'
                                    type='text'
                                    name='email'
                                    autoComplete='off'
                                    value={input.email}
                                    onChange={(e) => handleInputChange(e)}
                                    {...(errors.email && {
                                        error: true,
                                        helperText: 'eMail invalido',
                                    })}
                                />
                            </div>
                        </div>
                        <div>
                            <Button
                                variant='contained'
                                color='primary'
                                style={{ borderRadius: 100, margin: 10 }}
                                onClick={handleClickOpen}
                                disabled={
                                    !input.age ||
                                    !input.dni ||
                                    !input.phone_number ||
                                    !input.email ||
                                    !input.name
                                }
                            >
                                Consultar
                            </Button>
                            <Button
                                variant='contained'
                                color='secondary'
                                onClick={handleBack}
                                style={{ borderRadius: 100, margin: 10 }}
                            >
                                Volver
                            </Button>
                            {/* {renderRedirect()} */}
                        </div>
                        <Snackbar
                            open={errors.onProcess && successRequest}
                            autoHideDuration={6000}
                            onClose={handleClose}
                        >
                            <Alert onClose={handleClose} severity='info'>
                                {' '}
                            Éste correo ya tiene una solicitud en proseso!
                        </Alert>
                        </Snackbar>
                    </div>
                </Card>
            </ThemeProvider>
        </div>
    );
}

export default ContactForm;