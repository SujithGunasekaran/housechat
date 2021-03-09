import useForm from '../Hooks/useForm';
import LoginForm from '../Components/Forms/LoginForm';
import { useSignin } from '../apollo/actions';
import withApollo from '../hoc/withApollo';
import RedirectComponent from '../Components/Redirect';
import BaseLayout from '../layouts/BaseLayout';

function Login() {

    const { formField, formError, formSuccess, setFormSuccess, setFormError, handleInputFieldChange } = useForm();

    // Mutations

    const [signIn, { loading }] = useSignin();

    const handleLoginFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await signIn({ variables: formField });
            if (data && data.signIn) {
                setFormSuccess(true);
            }
        }
        catch (err) {
            if (JSON.parse(JSON.stringify(err)).graphQLErrors && JSON.parse(JSON.stringify(err)).graphQLErrors.length > 0) {
                setFormError(JSON.parse(JSON.stringify(err)).graphQLErrors[0].message);
            }
            else {
                setFormError('Something went wrong please try again...!')
            }
        }
    }

    if (formSuccess) {
        return <RedirectComponent path="/" />
    }

    return (
        <BaseLayout>
            <div className="form_main_container">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4 mx-auto">
                            <div className="form_heading">Login</div>
                            <div className="form_container">
                                <LoginForm
                                    formField={formField}
                                    handleInputFieldChange={handleInputFieldChange}
                                    handleLoginFormSubmit={handleLoginFormSubmit}
                                    formError={formError}
                                    loading={loading}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}

export default withApollo(Login);