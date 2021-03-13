import useForm from '../Hooks/useForm';
import LoginForm from '../Components/Forms/LoginForm';
import { useSignin } from '../apollo/actions';
import withApollo from '../hoc/withApollo';
import RedirectComponent from '../Components/Redirect';
import BaseLayout from '../layouts/BaseLayout';
import { useRouter } from 'next/router';
import { messages } from '../variables/messages';

function Login() {

    const { formField, formError, formSuccess, setFormSuccess, setFormError, handleInputFieldChange } = useForm();

    const { message, type } = useRouter().query;
    if (message) {
        if (type === 'Success') {
            if ((typeof formSuccess === 'string' && !formSuccess) || (typeof formSuccess === 'boolean' && !formSuccess)) {
                console.log("Hello should not happen")
                setFormSuccess(messages[type][message])
            }
        }
        if (type === 'Error' && !formError) {
            setFormError(messages[type][message]);
        }
    }

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
            let errorData = JSON.parse(JSON.stringify(err));
            if (errorData.graphQLErrors && errorData.graphQLErrors.length > 0) {
                setFormError(errorData.graphQLErrors[0].message);
            }
            else {
                setFormError('Something went wrong please try again...!')
            }
        }
    }

    if (typeof formSuccess === 'boolean' && formSuccess) {
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
                                    formSuccess={formSuccess}
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