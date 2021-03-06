import SignupForm from '../Components/Forms/SignupForm';
import useForm from '../Hooks/useForm';
import withApollo from '../hoc/withApollo';
import { useSignup } from '../apollo/actions';
import Redirect from '../Components/Redirect';

function Signup() {

    const { formField, formError, setFormError, handleInputFieldChange } = useForm('Signup');

    const [setUserData] = useSignup(formField);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await setUserData(formField)
            if (data && data.signUp) {
                return <Redirect path='/Login' />
            }
        }
        catch (err) {
            if (JSON.parse(JSON.stringify(err)).graphQLErrors.length > 0) {
                setFormError(JSON.parse(JSON.stringify(err)).graphQLErrors[0].message);
            }
            else {
                setFormError('Something went wrong please try again...!')
            }
        }
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
                                formError={formError}
                                handleInputFieldChange={handleInputFieldChange}
                                onFormSubmit={handleFormSubmit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withApollo(Signup)