import Link from 'next/link';


const LoginForm = (props) => {

    const { formField, handleInputFieldChange } = props;

    return (
        <form>
            <input
                className='form_input_field'
                type="text"
                name="username"
                placeholder="Username"
                value={formField.username}
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
            <div className="form_having_account">
                Don't have an Account ?
                <Link href='/Signup'>Signup</Link>
            </div>
        </form>
    )
}

export default LoginForm;