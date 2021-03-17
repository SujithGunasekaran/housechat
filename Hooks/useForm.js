import { useState } from 'react';

const useForm = () => {

    const [formField, setFormField] = useState({})
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleInputFieldChange = (e) => {
        setFormField({
            ...formField,
            [e.target.name]: e.target.value
        })
        if (formError) setFormError('');
    }

    const handleDateChange = (dateType, setDate) => date => {
        setFormField({
            ...formField,
            [dateType]: date ? new Date(date.setHours(0, 0, 0, 0)).toISOString() : date
        })
        setDate(date);
    }

    const resetFormField = () => {
        setFormField((prevFormField) => {
            let formField = JSON.parse(JSON.stringify(prevFormField));
            formField = {};
            return formField;
        })
    }

    return { formField, formError, formSuccess, startDate, endDate, resetFormField, setEndDate, setStartDate, setFormField, setFormSuccess, setFormError, handleInputFieldChange, handleDateChange }

}

export default useForm;