import React from 'react'
import FilterOrder from './FilterOrder';
import AdminMedicTabs from './AdminMedicTabs;'

export default function MedicTabs() {

    return (
        <AdminMedicTabs Medics={FilterOrder} Specialties='Specialties' />
    )
}
