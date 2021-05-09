import { useState } from 'react';
import withApollo from '../hoc/withApollo';
import RedirectComponent from '../Components/Redirect';
import { useForgotUser, useResetPassword } from '../apollo/actions';
import useForm from '../Hooks/useForm';
import ForgotForm from '../Components/Forms/ForgotForm';

function ForgostPassword() {

    const { formField, formError, formSuccess, setFormSuccess, setFormError, handleInputFieldChange, resetFormField } = useForm();

    //states
    const [canProccesToReset, setCanProceedToReset] = useState(false);

    // mutations
    const [checkUser, { loading: checkLoading }] = useForgotUser();
    const [resetPassword, { loading: resetLoading }] = useResetPassword();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (canProccesToReset) {
                const { data } = await resetPassword({ variables: formField });
                if (data?.forgotPassword) {
                    setFormSuccess(data.forgotPassword);
                    resetFormField();
                }
            }
            else {
                const { data } = await checkUser({ variables: formField });
                if (data && !data.forgotUser) {
                    setFormError('Please enter valid Email');
                }
                if (data?.forgotUser) setCanProceedToReset(true);
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

    if (formSuccess) return <RedirectComponent path="/Login" query={{ message: "RESET_PASSWORD", type: 'Success' }} />

    return (
        <div className="form_main_container">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        {
                            formError ? <div className="form_error">{formError}</div> : null
                        }
                        <div className="form_container">
                            <div className="form_heading form_text_medium">Reset Password</div>
                            <ForgotForm
                                canProccesToReset={canProccesToReset}
                                editEmail={() => setCanProceedToReset(false)}
                                formField={formField}
                                handleInputFieldChange={handleInputFieldChange}
                                onFormSubmit={handleFormSubmit}
                                loading={checkLoading ? checkLoading : resetLoading ? resetLoading : false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withApollo(ForgostPassword);
