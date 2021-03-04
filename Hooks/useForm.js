import { useState } from 'react';

const useForm = (fromPage) => {

    const [formField, setFormField] = useState({})

    const handleInputFieldChange = (e) => {
        setFormField({
            ...formField,
            [e.target.name]: e.target.value
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(formField);
        // let result = ValidForm();
        // if (result) {
        //     console.log("Success");
        // }
    }

    // const ValidForm = () => {
    //     let result = true;
    //     Object.keys(formField).forEach((fieldKey) => {
    //         if (formField[fieldKey] === '') {
    //             setFromFieldFrror((prevFormFieldError) => {
    //                 console.log(fieldKey);
    //                 let formFieldError = JSON.parse(JSON.stringify(prevFormFieldError));
    //                 formFieldError[fieldKey + 'Error'] = `Please Enter ${fieldKey}`;
    //                 return formFieldError;
    //             })
    //             result = false;
    //         }
    //     })
    //     return result;
    // }

    return { formField, handleInputFieldChange, handleFormSubmit }

}

export default useForm;