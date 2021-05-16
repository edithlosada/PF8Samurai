import {
  FormControlLabel,
  TextField,
  FormLabel,
  Radio,
  RadioGroup,
  InputAdornment,
  Checkbox,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import validator from "./Validator.js";
import styles from "./DatosSalud.module.css"
const DatosSalud = () => {
  const [input, setInputs] = useState({});
  const [radioInputs, SetRadioInputs] = useState({
    surgeryRad: "",
    paceMakerRad: "",
    prosthesisRad: "",
    psychiatricRad: "",
    psychActuallyRad: "",
    hospitalizationRad: "",
    otherTreatmentsRad: "",
    medicalResultsRad: "",
    hereditaryDiseasesRad: "",
    bloodTransRad: "",
    pregnantRad: "",
    studiesSixMonthsRad: "",
    visionHearingRad: "",
    diabetesRad: "",
    adictionsRad: "",
    treatmentAdictionsRad: "",
    eatingDisordersRad: "",
    otherPatRad: "",
  });
  const [dateInputs, setDateInputs] = useState({
    dateSurgery: "",
    prosthesisDate: "",
    psychhospitalizationDate: "",
    hospitalizationnDate: "",
    medicalStudiesDate: "",
    bloodTransDate: "",
    treatmentDate: "",
  });
  const [errors, setErrors] = useState({});
  // const [errorsDate,setErrorsDate] = useState({})
  const handleChange = (e) => {
    setInputs((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleRadioInputs = (e) => {
    SetRadioInputs((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
    setErrors({...errors,readioErrors:validator(radioInputs, "radio")});
  };
  const handleDate = (e) => {
    console.log("entro el input",e.target.value)
    setDateInputs((prevState) => {
      return {
        ...prevState,
        [e.target.name]: (e.target.value),
      };
    });
    setErrors({...errors,dateErrors:validator(dateInputs,"fecha")})
  };
  useEffect(()=>{
      console.log("actualizado hola seba")
      setErrors(errors)
  },[errors])

  return (
    <>
      <div id="cabecera">
        <h4> Declaracion jurada de antecedentes de salud </h4>
        <TextField
          name="completeName"
          label="Nombre y Apeliido"
          variant="outlined"
          value={input.completeName}
          onChange={handleChange}
        />
        <TextField
          name="dni"
          label="DNI"
          type="number"
          variant="outlined"
          value={input.dni}
          onChange={handleChange}
        />
      </div>
      <div classsname={styles.pocho}>
        <FormLabel  component="legend">
          {" "}
          1¿Posee antecedentes de cirugías?{" "}
        </FormLabel>
        <RadioGroup
          aria-label="Surgery"
          name="surgeryRad"
          value={radioInputs.surgeryRad}
          onChange={handleRadioInputs}
        >
          <FormControlLabel value="No" control={<Radio />} label="No" />
          <FormControlLabel value="Si" control={<Radio />} label="Si" />
        </RadioGroup>
        {radioInputs.surgeryRad === "Si" ? (
          <div>
            <TextField
              name="typeSurgery"
              label="Tipo de Cirugia"
              variant="outlined"
              value={input.typeSurgery}
              
            />
            <TextField
              name="dateSurgery"
              label="Fecha"
              variant="outlined"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleDate}
              value={dateInputs.dateSurgery}
            />
            <TextField
              name="surgeryDiagnosis"
              label="Diagnostico"
              variant="outlined"
              value={input.surgeryDiagnosis}
            />
          </div>
        ):null
       }
        
      </div>
      <FormLabel component="legend">
        {" "}
        2- ¿Tiene colocado un marcapasos o cardiodesfibrilador?{" "}
      </FormLabel>
      <RadioGroup
        aria-label="paceMaker"
        name="paceMakerRad"
        value={radioInputs.paceMakerRad}
        onChange={handleRadioInputs}
      >
        <FormControlLabel value="No" control={<Radio />} label="No" />
        <FormControlLabel value="Si" control={<Radio />} label="Si" />
      </RadioGroup>
      <FormLabel component="legend">
        {" "}
        3- ¿Tiene colocada una prótesis traumatológica?{" "}
      </FormLabel>
      <RadioGroup
        aria-label="prosthesis"
        name="prosthesisRad"
        value={radioInputs.prosthesisRad}
        onChange={handleRadioInputs}
      >
        <FormControlLabel value="No" control={<Radio />} label="No" />
        <FormControlLabel value="Si" control={<Radio />} label="Si" />
      </RadioGroup>
      {radioInputs.prosthesisRad === "Si" ? (
        <div>
          <TextField
            name="prosthesisDate"
            label="Fecha"
            variant="outlined"
            value={dateInputs.prosthesisDate}
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={handleDate}
          />
          <TextField
            name="typeProsthesis"
            label="Tipo de prótesis:"
            variant="outlined"
            value={input.typeProsthesis}
          />
        </div>
      ) : null}

      <FormLabel component="legend">
        4-¿Cuenta con antecedentes de enfermedades psiquiátricas?{" "}
      </FormLabel>
      <RadioGroup
        aria-label="psych"
        name="psychiatricRad"
        value={radioInputs.psychiatricRad}
        onChange={handleRadioInputs}
      >
        <FormControlLabel value="No" control={<Radio />} label="No" />
        <FormControlLabel value="Si" control={<Radio />} label="Si" />
      </RadioGroup>
      <FormLabel component="legend">
        ¿Está actualmente en tratamiento psiquiátrico?
      </FormLabel>
      <RadioGroup
        aria-label="psychActually"
        name="psychActuallyRad"
        value={radioInputs.psychActuallyRad}
        onChange={handleRadioInputs}
      >
        <FormControlLabel value="No" control={<Radio />} label="No" />
        <FormControlLabel value="Si" control={<Radio />} label="Si" />
      </RadioGroup>
      {radioInputs.psychActuallyRad === "Si" ? (
        <div>
          <TextField
            name="psychDiagnosis"
            label="Diagnóstico"
            variant="outlined"
            value={input.psychDiagnosis}
          />
          <TextField
            name="psychMeds"
            label="Medicación"
            variant="outlined"
            value={input.psychMeds}
          />
          <TextField
            name="psychhospitalization"
            label="Internaciones Psiquiátricas"
            variant="outlined"
            value={input.psychhospitalization}
          />
          <TextField
            name="psychhospitalizationDate"
            label="Fecha"
            variant="outlined"
            value={dateInputs.psychhospitalizationDate}
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={handleDate}
          />
        </div>
      ) : null}

      <FormLabel component="legend">
        5- ¿Tiene antecedentes de internaciones clínicas?
      </FormLabel>
      <RadioGroup
        aria-label="hospitalization"
        name="hospitalizationRad"
        value={radioInputs.hospitalizationRad}
        onChange={handleRadioInputs}
      >
        <FormControlLabel value="No" control={<Radio />} label="No" />
        <FormControlLabel value="Si" control={<Radio />} label="Si" />
      </RadioGroup>
      {radioInputs.hospitalizationRad === "Si" ? (
        <div>
          <TextField
            name="hospitalizationReason"
            label="Motivo"
            variant="outlined"
            value={input.hospitalizationReason}
          />
          <TextField
            name="hospitalizationnDate"
            label="Fecha"
            variant="outlined"
            value={dateInputs.hospitalizationnDate}
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={handleDate}
          />
        </div>
      ) : null}

      <FormLabel component="legend">
        6- ¿Se encuentra realizando algún tratamiento (fonoaudiología,
        psicomotricidad, kinesiología, terapia ocupacional, otros)?
      </FormLabel>
      <RadioGroup
        aria-label="otherTreatments"
        name="otherTreatmentsRad"
        value={radioInputs.otherTreatmentsRad}
        onChange={handleRadioInputs}
      >
        <FormControlLabel value="No" control={<Radio />} label="No" />
        <FormControlLabel value="Si" control={<Radio />} label="Si" />
      </RadioGroup>
      {radioInputs.otherTreatmentsRad === "Si" ? (
        <div>
          <TextField
            name="otherT"
            label="¿Cuál/es?"
            variant="outlined"
            value={input.otherT}
          />
          <TextField
            name="otherTDiagnosis"
            label="Diagnóstico"
            variant="outlined"
            value={input.otherTDiagnosis}
          />
          <TextField
            name="otherTMedic"
            label="Médico Tratante"
            variant="outlined"
            value={input.otherTMedic}
          />
          <TextField
            name="otherTNumber"
            label="Teléfono"
            type="number"
            variant="outlined"
            value={input.otherTNumber}
          />
        </div>
      ) : null}

      <FormLabel component="legend">
        7- Fecha de la última vez que se realizó estudios - análisis
      </FormLabel>
      <TextField
        name="medicalStudiesDate"
        variant="outlined"
        value={dateInputs.medicalStudiesDate}
        type="date"
        InputLabelProps={{ shrink: true }}
        onChange={handleDate}
      />
      <FormLabel component="legend">¿El resultado fue normal?</FormLabel>
      <RadioGroup
        aria-label="medicalResults"
        name="medicalResultsRad"
        value={radioInputs.medicalResultsRad}
        onChange={handleRadioInputs}
      >
        <FormControlLabel value="No" control={<Radio />} label="No" />
        <FormControlLabel value="Si" control={<Radio />} label="Si" />
      </RadioGroup>

      {radioInputs.medicalResultsRad === "No" ? (
        <div>
          <TextField
            name="studiesDiagnostic"
            label="Diagnóstico"
            variant="outlined"
            value={input.studiesDiagnostic}
          />
        </div>
      ) : null}

      <FormLabel component="legend">
        8- ¿Padece enfermedades congénitas o hereditarias?
      </FormLabel>
      <RadioGroup
        aria-label="hereditaryDiseases"
        name="hereditaryDiseasesRad"
        value={radioInputs.hereditaryDiseasesRad}
        onChange={handleRadioInputs}
      >
        <FormControlLabel value="No" control={<Radio />} label="No" />
        <FormControlLabel value="Si" control={<Radio />} label="Si" />
      </RadioGroup>
      {radioInputs.hereditaryDiseasesRad === "Si" ? (
        <div>
          <TextField
            name="hereditaryDiseases"
            label="¿Cuál/es?"
            variant="outlined"
            value={input.hereditaryDiseases}
          />
        </div>
      ) : null}

      {/* ////////////////// hasta aca /// */}

      <FormLabel component="legend">
        9- ¿Ha recibido transfusiones de sangre?
      </FormLabel>
      <RadioGroup
        aria-label="bloodTrans"
        name="bloodTransRad"
        value={radioInputs.bloodTransRad}
        onChange={handleRadioInputs}
      >
        <FormControlLabel value="No" control={<Radio />} label="No" />
        <FormControlLabel value="Si" control={<Radio />} label="Si" />
      </RadioGroup>
      {radioInputs.bloodTransRad === "Si" ? (
        <div>
          <TextField
            name="bloodTransReason"
            label="Causa"
            variant="outlined"
            value={input.bloodTransReason}
          />
          <TextField
            name="bloodTransDate"
            label="Fecha"
            variant="outlined"
            value={dateInputs.bloodTransDate}
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={handleDate}
          />
        </div>
      ) : null}
      <FormLabel component="legend">10- ¿Está embarazada?</FormLabel>
      <RadioGroup
        aria-label="pregnant"
        name="pregnantRad"
        value={radioInputs.pregnantRad}
        onChange={handleRadioInputs}
      >
        <FormControlLabel value="No" control={<Radio />} label="No" />
        <FormControlLabel value="Si" control={<Radio />} label="Si" />
      </RadioGroup>
      <FormLabel component="legend">11-Cantidad de hijos</FormLabel>
      <TextField
        name="childrens"
        label=""
        type="number"
        variant="outlined"
        value={input.childrens}
      />
      <FormLabel component="legend">
        12- ¿Padece actualmente alguna enfermedad o alteración física que
        requiera estudios, cirugías o internaciones en los próximos 6 meses?
      </FormLabel>
      <RadioGroup
        aria-label="StudiesSixMonths"
        name="studiesSixMonthsRad"
        value={radioInputs.studiesSixMonthsRad}
        onChange={handleRadioInputs}
      >
        <FormControlLabel value="No" control={<Radio />} label="No" />
        <FormControlLabel value="Si" control={<Radio />} label="Si" />
      </RadioGroup>
      {radioInputs.studiesSixMonthsRad === "Si" ? (
        <div>
          <TextField
            name="studiesSixMonthsD"
            label="¿Cuál/es?"
            type="number"
            variant="outlined"
            value={input.studiesSixMonthsD}
          />
        </div>
      ) : null}

      <FormLabel component="legend">
        13-¿Tiene dificultades en la visión y/o en la audición?
      </FormLabel>
      <RadioGroup
        aria-label="visionHearing"
        name="visionHearingRad"
        value={radioInputs.visionHearingRad}
        onChange={handleRadioInputs}
      >
        <FormControlLabel value="No" control={<Radio />} label="No" />
        <FormControlLabel value="Si" control={<Radio />} label="Si" />
        {radioInputs.visionHearingRad === "Si" ? (
          <div>
            <TextField
              name="VHDetail"
              label="¿Cuál/es?"
              variant="outlined"
              value={input.VHDetail}
            />
            <TextField
              name="VHDiagnostic"
              label="Diagnostico"
              variant="outlined"
              value={input.VHDiagnostic}
            />
          </div>
        ) : null}
      </RadioGroup>

      <FormLabel component="legend">
        14- ¿Ha presentado o presenta alguna de estas patologías: diabetes tipo
        1 o 2, VIH, hepatitis B, hepatitis C, tuberculosis, mal de Chagas?
      </FormLabel>
      <RadioGroup
        aria-label="diabetes"
        name="diabetesRad"
        value={radioInputs.diabetesRad}
        onChange={handleRadioInputs}
      >
        <FormControlLabel value="No" control={<Radio />} label="No" />
        <FormControlLabel value="Si" control={<Radio />} label="Si" />
      </RadioGroup>
      <TextField
        name="otherDiabetes"
        label="Otras,¿Cuál/es?"
        variant="outlined"
        value={input.otherDiabetes}
      />

      <FormLabel component="legend">
        {" "}
        15- ¿Padece o padeció adicciones (drogas, alcohol, etc.)?{" "}
      </FormLabel>
      <RadioGroup
        aria-label="adictions"
        name="adictionsRad"
        value={radioInputs.adictionsRad}
        onChange={handleRadioInputs}
      >
        <FormControlLabel value="No" control={<Radio />} label="No" />
        <FormControlLabel value="Si" control={<Radio />} label="Si" />
      </RadioGroup>
      {radioInputs.adictionsRad === "Si" ? (
        <div>
          <TextField
            name="adictionsDetail"
            label="¿Cuál/es?"
            variant="outlined"
            value={input.adictionsDetail}
          />
        </div>
      ) : null}

      <FormLabel component="legend"> ¿Está o estuvo en tratamiento? </FormLabel>
      <RadioGroup
        aria-label="treatmentAdictions"
        name="treatmentAdictionsRad"
        value={radioInputs.treatmentAdictionsRad}
        onChange={handleRadioInputs}
      >
        <FormControlLabel value="No" control={<Radio />} label="No" />
        <FormControlLabel value="Si" control={<Radio />} label="Si" />
      </RadioGroup>
      {radioInputs.treatmentAdictionsRad === "Si" && (
        <div>
          <TextField
            name="treatmentDate"
            label="Fecha del tratamiento"
            variant="outlined"
            value={dateInputs.treatmentDate}
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={handleDate}
          />
        </div>
      )}

      <FormLabel component="legend">
        {" "}
        16- ¿Presenta trastornos de la alimentación (bulimia,
        anorexia,obesidad)?{" "}
      </FormLabel>
      <RadioGroup
        aria-label="eatingDisorders"
        name="eatingDisordersRad"
        value={radioInputs.eatingDisordersRad}
        onChange={handleRadioInputs}
      >
        <FormControlLabel value="No" control={<Radio />} label="No" />
        <FormControlLabel value="Si" control={<Radio />} label="Si" />
      </RadioGroup>
      {radioInputs.eatingDisordersRad === "Si" && (
        <div>
          <TextField
            name="eatingDisordersD"
            label="¿Cuál/es?"
            variant="outlined"
            value={input.eatingDisordersD}
          />
        </div>
      )}

      <FormLabel component="legend">17-Peso </FormLabel>
      <TextField
        name="weight"
        variant="outlined"
        value={input.weight}
        InputProps={{
          endAdornment: <InputAdornment position="start">Kg</InputAdornment>,
        }}
      />
      <FormLabel component="legend">18- Altura </FormLabel>
      <TextField
        name="height"
        variant="outlined"
        value={input.height}
        InputProps={{
          endAdornment: <InputAdornment position="start">m</InputAdornment>,
        }}
      />

      <FormLabel component="legend">
        {" "}
        19- ¿Tiene, tuvo o está tramitando un certificado de discapacidad?{" "}
      </FormLabel>
      <RadioGroup
        aria-label="disabilityCert"
        name="disabilityCertRad"
        value={radioInputs.disabilityCertRad}
        onChange={handleRadioInputs}
      >
        <FormControlLabel value="No" control={<Radio />} label="No" />
        <FormControlLabel value="Si" control={<Radio />} label="Si" />
      </RadioGroup>
      {radioInputs.disabilityCertRad === "Si" && (
        <div>
          <FormLabel component="legend">
            {" "}
            Fecha de vigencia (desde y hasta) del certificado
          </FormLabel>
          <TextField
            name="disabilityCertD"
            variant="outlined"
            value={input.disabilityCertD}
          />
        </div>
      )}

      <FormLabel component="legend">
        {" "}
        20- ¿Padece o padeció alguna patología aparte de las mencionadas en los
        puntos anteriores ?{" "}
      </FormLabel>
      <RadioGroup
        aria-label="otherPat"
        name="otherPatRad"
        value={radioInputs.otherPatRad}
        onChange={handleRadioInputs}
      >
        <FormControlLabel value="No" control={<Radio />} label="No" />
        <FormControlLabel value="Si" control={<Radio />} label="Si" />
        {<div></div>}
      </RadioGroup>
      <TextField
        name="otherPatD"
        label="¿Cuál/es?"
        variant="outlined"
        value={input.otherPatD}
      />

      <div>
        <Checkbox
          color="primary"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
        <FormLabel component="legend">
    
          "Declaro bajo juramento que en la presente informé la totalidad de mis
          antecedentes de salud y/o de cada uno de los integrantes de mi grupo
          familiar, no habiendo omitido dato alguno, estando por lo tanto
          INTEGRA facultado para resolver el vínculo en caso de falsedad en los
          términos del Dec. Reg. 1993/11, art. 9, inc. b, el que también declaro
          conocer. Autorizo expresamente a INTEGRA a requerir información médica
          referida a mi persona y/o grupo familiar a cualquier prestador y/o
          institución de salud."
        </FormLabel>
      </div>
    </>
  );
}
export default DatosSalud;
