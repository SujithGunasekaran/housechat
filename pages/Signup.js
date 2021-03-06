import SignupForm from '../Components/Forms/SignupForm';
import useForm from '../Hooks/useForm';
import withApollo from '../hoc/withApollo';
import { useSignup } from '../apollo/actions';
import Redirect from '../Components/Redirect';

function Signup() {

    const { formField, handleInputFieldChange } = useForm('Signup');

    const [setUserData, { data, error }] = useSignup(formField);

    if (data && data.signUp) {
        return (
            <Redirect
                path='/Login'
            />
        )
    }

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
                                onFormSubmit={(e) => {
                                    e.preventDefault();
                                    setUserData(formField)
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withApollo(Signup)