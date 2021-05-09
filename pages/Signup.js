import SignupForm from '../Components/Forms/SignupForm';
import useForm from '../Hooks/useForm';
import withApollo from '../hoc/withApollo';
import { useSignup } from '../apollo/actions';
import RedirectComponent from '../Components/Redirect';

function Signup() {

    const { formField, formError, formSuccess, setFormSuccess, setFormError, handleInputFieldChange } = useForm('Signup');

    const [setUserData, { loading }] = useSignup();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await setUserData({ variables: formField });
            if (data && data.signUp) {
                setFormSuccess(true);
            }
        }
        catch (err) {
            let errorData = JSON.parse(JSON.stringify(err));
            console.log("signup error", errorData);
            if (errorData.graphQLErrors && errorData.graphQLErrors.length > 0) {
                setFormError(errorData.graphQLErrors[0].message);
            }
            else {
                setFormError('Something went wrong please try again...!')
            }
        }
    }

    if (formSuccess) return <RedirectComponent path="/Login" query={{ message: "LOGGED_IN", type: 'Success' }} />

    return (
        <div className="form_main_container">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        {
                            formError ? <div className="form_error">{formError}</div> : null
                        }
                        <div className="form_container">
                            <div className="form_heading">Create Account</div>
                            <SignupForm
                                formField={formField}
                                handleInputFieldChange={handleInputFieldChange}
                                onFormSubmit={handleFormSubmit}
                                loading={loading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withApollo(Signup)
