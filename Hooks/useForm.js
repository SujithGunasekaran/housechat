import { useState } from 'react';

const useForm = () => {

    const [formField, setFormField] = useState({})
    const [formError, setFormError] = useState('')

    const handleInputFieldChange = (e) => {
        setFormField({
            ...formField,
            [e.target.name]: e.target.value
        })
    }

    return { formField, formError, setFormError, handleInputFieldChange }

}

export default useForm;