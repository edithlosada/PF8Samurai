import React, { useState, useEffect } from 'react';
import supabase from '../../supabase.config.js';
import 'firebase/auth';
import MedicsTable from "../FilterOrder/MedicsTable"

//styles
import styles from './AdminMedic.module.css';

//icons
import CreateIcon from '@material-ui/icons/Create';

function AdminMedic() {
    const [listMedics, setListMedics] = useState([]);
    const [editActive, setEditActive] = useState(false);

   const fetchMedics = async () => {
        const { data: medics, error: errorFetchMedics } = await supabase
            .from('medics')
            .select(
                'dni, name, lastname, medic_license, email, phone_number, birthdate, state, profilePic, medical_specialities (name)'
            );
        if (errorFetchMedics) return console.log(errorFetchMedics);
        setListMedics(medics);
    };

    useEffect(() => {
        fetchMedics();
        console.log('useRender activated');
    }, []);

    const handleSubmit = (e) => {};

    if (listMedics.length === 0) return <h2>Cargando...</h2>;
    console.log(listMedics);

    return (
        <div className={styles.container}>
            <MedicsTable rows={listMedics}/>
        </div>
    );
}

export default AdminMedic;