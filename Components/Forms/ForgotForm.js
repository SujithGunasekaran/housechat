
const ForgotForm = (props) => {

    const { formField, handleInputFieldChange, onFormSubmit, loading, canProccesToReset, editEmail } = props;

    return (
        <form onSubmit={onFormSubmit}>
            <input
                className='form_input_field'
                type="email"
                name="email"
                placeholder="Email Address"
                value={formField.email}
                onChange={handleInputFieldChange}
            />
            {
                canProccesToReset &&
                <input
                    className="form_input_field"
                    type="password"
                    name="password"
                    placeholder="Enter New Password"
                    value={formField.password}
                    onChange={handleInputFieldChange}
                />
            }
            <div className="forgot_btn_display">
                {
                    canProccesToReset &&
                    <div className="forgot_back_btn" onClick={() => editEmail()}>
                        Back
                    </div>
                }
                <button disabled={loading ? true : false} className={loading ? 'forgot_form_reset_hide' : 'forgot_form_reset_btn'}>{loading ? (canProccesToReset ? 'Reseting...' : 'Checking...') : (canProccesToReset ? 'Reset' : 'Next')}</button>
            </div>
        </form>
    )
}

export default ForgotForm;
