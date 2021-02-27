import { useState } from 'react';

const useForm = (fromPage) => {

    const [formField, setFormField] = useState({ "username": "", "password": "" })
    const [formFieldError, setFromFieldFrror] = useState({ "usernameError": "", "passwordError": "" })

    const handleInputFieldChange = (e) => {
        setFormField((prevFormField) => {
            let formField = JSON.parse(JSON.stringify(prevFormField));
            formField[e.target.name] = e.target.value;
            return formField;
        })
        if (formFieldError[e.target.name + 'Error'] !== '') {
            setFromFieldFrror((prevFormFieldError) => {
                let formFieldError = JSON.parse(JSON.stringify(prevFormFieldError));
                formFieldError[e.target.name + 'Error'] = '';
                return formFieldError;
            })
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let result = ValidForm();
        if (result) {
            console.log("Success");
        }
    }

    const ValidForm = () => {
        let result = true;
        Object.keys(formField).forEach((fieldKey) => {
            if (formField[fieldKey] === '') {
                setFromFieldFrror((prevFormFieldError) => {
                    console.log(fieldKey);
                    let formFieldError = JSON.parse(JSON.stringify(prevFormFieldError));
                    formFieldError[fieldKey + 'Error'] = `Please Enter ${fieldKey}`;
                    return formFieldError;
                })
                result = false;
            }
        })
        return result;
    }

    return { formField, formFieldError, handleInputFieldChange, handleFormSubmit }

}

export default useForm;