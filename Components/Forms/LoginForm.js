import Link from 'next/link';


const LoginForm = (props) => {

    const { formField, formError, handleInputFieldChange, handleLoginFormSubmit } = props;

    return (
        <form onSubmit={handleLoginFormSubmit}>
            <input
                className='form_input_field'
                type="email"
                name="email"
                placeholder="Email Address"
                value={formField.email}
                onChange={handleInputFieldChange}
            />
            <input
                className='form_input_field'
                type="password"
                name="password"
                placeholder="Password"
                value={formField.password}
                onChange={handleInputFieldChange}
            />
            <div className="form_forgot_password">Forgot Password ?</div>
            <button className="form_btn">Sign in</button>
            {
                formError ? <div className="form_error">{formError}</div> : null
            }
            <div className="form_having_account">
                Don't have an Account ?
                <Link href='/Signup'>Signup</Link>
            </div>
        </form>
    )
}

export default LoginForm;