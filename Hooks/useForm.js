import { useState } from 'react';

const useForm = () => {

    const [formField, setFormField] = useState({})

    const handleInputFieldChange = (e) => {
        setFormField({
            ...formField,
            [e.target.name]: e.target.value
        })
    }

    return { formField, handleInputFieldChange }

}

export default useForm;