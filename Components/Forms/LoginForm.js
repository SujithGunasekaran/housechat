import Link from 'next/link';


const LoginForm = (props) => {

    const { formField, formError, formSuccess, handleInputFieldChange, handleLoginFormSubmit, loading } = props;

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
            {
                <button disabled={loading ? true : false} className={loading ? "form_disable_btn" : "form_btn"}>{loading ? 'Signing in...' : 'Signin'}</button>
            }
            {
                formError ? <div className="form_error">{formError}</div> : null
            }
            {
                formSuccess && <div className="form_success">{formSuccess}</div>
            }
            <div className="form_having_account">
                New to HouseChat ?
                <Link href='/Signup'>Signup</Link>
            </div>
        </form>
    )
}

export default LoginForm;
