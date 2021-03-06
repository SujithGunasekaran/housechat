import useForm from '../Hooks/useForm';
import LoginForm from '../Components/Forms/LoginForm';

export default function Login() {

    const { formField, handleInputFieldChange } = useForm();

    const handleLoginFormSubmit = (e) => {
        e.preventDefault();
        console.log(formField);
    }

    return (
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
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}