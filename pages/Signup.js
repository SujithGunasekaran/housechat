import SignupForm from '../Components/Forms/SignupForm';
import useForm from '../Hooks/useForm';

export default function Signup() {

    const { formField, handleInputFieldChange, handleFormSubmit } = useForm('Signin');

    return (
        <div className="form_main_container">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        <div className="form_heading">signup</div>
                        <div className="form_container">
                            <SignupForm
                                formField={formField}
                                handleInputFieldChange={handleInputFieldChange}
                                handleFormSubmit={handleFormSubmit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}