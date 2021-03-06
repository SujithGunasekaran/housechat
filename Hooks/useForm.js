import { useState } from 'react';

const useForm = () => {

    const [formField, setFormField] = useState({})
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState(false);

    const handleInputFieldChange = (e) => {
        setFormField({
            ...formField,
            [e.target.name]: e.target.value
        })
        if (formError) setFormError('');
    }

    return { formField, formError, formSuccess, setFormSuccess, setFormError, handleInputFieldChange }

}

export default useForm;