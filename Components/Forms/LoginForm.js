import Link from 'next/link';


const LoginForm = (props) => {

    const { formField, handleInputFieldChange, handleLoginFormSubmit, loading } = props;

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
            <div className="form_forgot_password"><Link href="/ForgotPassword">Forgot Password ?</Link></div>
            {
                <button disabled={loading ? true : false} className={loading ? "form_disable_btn" : "form_btn"}>{loading ? 'Signing in...' : 'Signin'}</button>
            }
            <div className="form_having_account">
                New to HouseChat ?
                <Link href='/Signup'>Signup</Link>
            </div>
        </form>
    )
}

export default LoginForm;
