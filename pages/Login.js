import { useEffect, useRef } from 'react';
import useForm from '../Hooks/useForm';
import LoginForm from '../Components/Forms/LoginForm';
import { useSignin } from '../apollo/actions';
import withApollo from '../hoc/withApollo';
import RedirectComponent from '../Components/Redirect';
import BaseLayout from '../layouts/BaseLayout';
import { useRouter } from 'next/router';
import { messages } from '../variables/messages';

function Login() {

    let disposeId = useRef(null);
    const { formField, formError, formSuccess, setFormSuccess, setFormError, handleInputFieldChange } = useForm();

    const router = useRouter();
    const { message, type } = router.query;

    const disposeMessage = () => {
        router.replace('/Login', '/Login', { shallow: true })
    }

    useEffect(() => {
        if (message) {
            disposeId.current = setTimeout(() => {
                disposeMessage();
            }, 3000)
        }
        return (() => {
            clearTimeout(disposeId.current);
        })
    }, [messages])

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
                            <div className="form_heading_line"></div>
                            <div className="form_container">
                                {
                                    type === 'Success' && <div className="form_success">{messages[type][message]}</div>
                                }
                                {
                                    type === 'Error' && <div className="form_error">{messages[type][message]}</div>
                                }
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