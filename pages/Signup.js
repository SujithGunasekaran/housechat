import SignupForm from '../Components/Forms/SignupForm';
import useForm from '../Hooks/useForm';
import withApollo from '../hoc/withApollo';
import { useSignup } from '../apollo/actions';
import RedirectComponent from '../Components/Redirect';
import BaseLayout from '../layouts/BaseLayout';

function Signup() {

    const { formField, formError, formSuccess, setFormSuccess, setFormError, handleInputFieldChange } = useForm('Signup');

    const [setUserData] = useSignup();

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
        <BaseLayout>
            <div className="form_main_container">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4 mx-auto">
                            <div className="form_signup_heading">Join HouseChat</div>
                            <div className="form_heading" style={{ textAlign: 'center', fontSize: '1.7rem', marginBottom: '2px' }}>Create Account</div>
                            <div className="form_heading_line" style={{ width: '90px', margin: 'auto' }}></div>
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
        </BaseLayout>
    )
}

export default withApollo(Signup)