import Link from 'next/link';
import useForm from '../Hooks/useForm';
export default function Login() {
    const { formField: { username, password }, formFieldError: { usernameError, passwordError }, handleInputFieldChange, handleFormSubmit } = useForm('Login');
    console.log(usernameError);
    return (
        <div className="login_main_container">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        <div className="login_heading">Login</div>
                        <div className="login_form_container">
                            <form onSubmit={handleFormSubmit}>
                                <input
                                    className={usernameError ? 'login_form_input_field_error' : 'login_form_input_field'}
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={username}
                                    onChange={handleInputFieldChange}
                                />
                                {usernameError ? <div className="login_form_input_error">{usernameError}</div> : null}
                                <input
                                    className={passwordError ? 'login_form_input_field_error' : 'login_form_input_field'}
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={handleInputFieldChange}
                                />
                                {passwordError ? <div className="login_form_input_error">{passwordError}</div> : null}
                                <div className="login_form_forgot_password">Forgot Password ?</div>
                                <button className="login_form_btn">Sign in</button>
                                <div className="login_form_having_account">
                                    Already having Account ?
                                    <Link href='/Signup'>Signin</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}