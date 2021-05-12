import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import styles from './DatosTitular.module.css'
import supabase from '../../supabase.config';

const DatosTitular = () =>{
	const [successRequest, setSuccessRequest] = useState(false);
	const [errorRequest, setErrorRequest] = useState(false);
	const [input, setInput] = useState({
        first_name: '',
		last_name:'',
        birth: '',
		sex:'',//falta
        dni: '',
		cuil:'',
        phone_number: '',
		nationality:'',
		occupation:'',
		marital_status:'',
        mail: '',
		address:{
			street_name:'',
			number:'',
			apartment:'',
			city:'',
			province:''
		}
    });
    const [errors, setErrors] = useState({
        first_name: false,
		last_name:false,
        birth_date: false,
		sex:false,
        dni: false,
		cuil:false,
        phone_number: false,
		nationality:false,
		occupation:false,
		marital_status:false,
        mail: false,
		address:{
			street_name:false,
			number:false,
			city:false,
			province:false
		}
    });

	return (
		<div className={styles.form}>
			<div className={styles.personalData}>
				<div className={styles.firstColumn}>
					<label htmlFor="">Datos del titular</label>
					<div className={styles.input}>
						<TextField
							id='first_name-input'
							label='Nombre'
							type='text'
							name='first_name'
							autoComplete='off'
							value={input.first_name}
							variant='outlined'
							// InputLabelProps={{
							// 	shrink: true,
							//   }}
							// onChange={(e) => handleInputChange(e)}
							{...(errors.name && {
								error: errors.name,
								helperText: 'Nombre invalido',
							})}
						/>
					</div>
					<div className={styles.input}>
						<TextField
							id='last_name-input'
							label='Apellido'
							type='text'
							name='last_name'
							autoComplete='off'
							value={input.last_name}
							variant='outlined'
							// InputLabelProps={{
							// 	shrink: true,
							//   }}
							// onChange={(e) => handleInputChange(e)}
							{...(errors.name && {
								error: errors.name,
								helperText: 'Nombre invalido',
							})}
						/>
					</div>
					<div className={styles.input}>
						<TextField
							id='cuil-input'
							label='Cuil'
							type='tel'
							name='cuil'
							autoComplete='off'
							value={input.cuil}
							variant='outlined'
							// onChange={(e) => handleInputChange(e)}
							{...(errors.age && {
								error: true,
								helperText: 'Edad invalido',
							})}
						/>
					</div>
					<div className={styles.input}>
						<TextField
							id='dni-input'
							label='DNI'
							type='tel'
							name='dni'
							autoComplete='off'
							value={input.dni}
							variant='outlined'
							// onChange={(e) => handleInputChange(e)}
							{...(errors.dni && {
								error: true,
								helperText: 'Dni invalido',
							})}
							inputProps={{ maxLength: 8 }}
						/>
					</div>
					<div className={styles.input}>
						<TextField
							id='phone-input'
							label='Teléfono'
							type='tel'
							name='phone_number'
							autoComplete='off'
							value={input.phone_number}
							variant='outlined'
							// onChange={(e) => handleInputChange(e)}
							{...(errors.phone_number && {
								error: true,
								helperText: 'Teléfono invalido',
							})}
							inputProps={{ maxLength: 12 }}
						/>
					</div>
				</div>
				<div className={styles.secondColumn}>
					<label>{` `}</label>
					<div className={styles.input}>
						<TextField
							id='mail-input'
							label='Email'
							type='text'
							name='mail'
							autoComplete='off'
							value={input.mail}
							variant='outlined'
							// onChange={(e) => handleInputChange(e)}
							{...(errors.mail && {
								error: true,
								helperText: 'Mail invalido',
							})}
						/>
					</div>
					<div className={styles.input}>
						<TextField
							id='nacionality-input'
							label='Nacionalidad'
							type='text'
							name='nacionality'
							autoComplete='off'
							value={input.nacionality}
							variant='outlined'
							// onChange={(e) => handleInputChange(e)}
							{...(errors.mail && {
								error: true,
								helperText: 'Mail invalido',
							})}
						/>
					</div>
					<div className={styles.input}>
						<TextField
							id='occupation-input'
							label='Ocupacion'
							type='text'
							name='ocupation'
							autoComplete='off'
							value={input.occupation}
							variant='outlined'
							// onChange={(e) => handleInputChange(e)}
							{...(errors.mail && {
								error: true,
								helperText: 'Mail invalido',
							})}
						/>
					</div>
					<div className={styles.input}>
						<TextField
							id='marital_status-input'
							label='Estado civil'
							type='text'
							name='marital_status'
							autoComplete='off'
							value={input.marital_status}
							variant='outlined'
							// onChange={(e) => handleInputChange(e)}
							{...(errors.mail && {
								error: true,
								helperText: 'Mail invalido',
							})}
						/>
					</div>
					<div className={styles.input}>
						<TextField
							id="birth"
							label="Birthday"
							type="date"
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</div>
				</div>
			</div>
			<div className={styles.addressData}>
				<label htmlFor="">Dirección</label>
				<div className={styles.input}>
					<TextField
						id='street_name-input'
						label='Calle'
						type='text'
						name='street_name'
						autoComplete='off'
						value={input.street_name}
						variant='outlined'
						// onChange={(e) => handleInputChange(e)}
						{...(errors.mail && {
							error: true,
							helperText: 'Mail invalido',
						})}
					/>
				</div>
				<div className={styles.input}>
					<TextField
						id='apartment-input'
						label='Piso/Depto'
						type='text'
						name='apartment'
						autoComplete='off'
						value={input.apartment}
						variant='outlined'
						// onChange={(e) => handleInputChange(e)}
						{...(errors.mail && {
							error: true,
							helperText: 'Mail invalido',
						})}
					/>
				</div>
				<div className={styles.input}>
					<TextField
						id='number-input'
						label='Numero'
						type='text'
						name='number'
						autoComplete='off'
						value={input.number}
						variant='outlined'
						// onChange={(e) => handleInputChange(e)}
						{...(errors.mail && {
							error: true,
							helperText: 'Mail invalido',
						})}
					/>
				</div>
				<div className={styles.input}>
					<TextField
						id='city-input'
						label='Localidad'
						type='text'
						name='city'
						autoComplete='off'
						value={input.city}
						variant='outlined'
						// onChange={(e) => handleInputChange(e)}
						{...(errors.mail && {
							error: true,
							helperText: 'Mail invalido',
						})}
					/>
				</div>
				<div className={styles.input}>
					<TextField
						id='province-input'
						label='Provincia'
						type='text'
						name='province'
						autoComplete='off'
						value={input.province}
						variant='outlined'
						// onChange={(e) => handleInputChange(e)}
						{...(errors.mail && {
							error: true,
							helperText: 'Mail invalido',
						})}
					/>
				</div>
			</div>
		</div>
	)
}
export default DatosTitular