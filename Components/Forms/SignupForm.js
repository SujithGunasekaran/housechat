import Link from 'next/link';

const SignupForm = (props) => {

    const { formField, handleInputFieldChange, onFormSubmit, formError } = props;

    return (
        <form onSubmit={onFormSubmit}>
            <div className="row">
                <div className="col-md-6">
                    <input
                        className='form_input_field'
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formField.username}
                        onChange={handleInputFieldChange}
                    />
                </div>
                <div className="col-md-6">
                    <input
                        className='form_input_field'
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={formField.email}
                        onChange={handleInputFieldChange}
                    />
                </div>
            </div>
            <input
                className='form_input_field'
                type="password"
                name="password"
                placeholder="Password"
                value={formField.password}
                onChange={handleInputFieldChange}
            />
            <input
                className='form_input_field'
                type="password"
                name="passwordConfirmation"
                placeholder="Password Confirmation"
                value={formField.passwordConfirmation}
                onChange={handleInputFieldChange}
            />
            <button className="form_btn">Create Account</button>
            {
                formError ? <div className="form_error">{formError}</div> : null
            }
            <div className="form_having_account">
                Already having Account ?
                <Link href='/Login'>Signin</Link>
            </div>
        </form>
    )
}

export default SignupForm;