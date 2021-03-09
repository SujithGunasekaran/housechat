import withApollo from '../../hoc/withApollo';
import withAuth from '../../hoc/withAuth';
import PortfolioForm from '../../Components/Forms/PortfolioForm';
import useForm from '../../Hooks/useForm';
import { useCreatePortfolio } from '../../apollo/actions';
import { useRouter } from 'next/router';


function CreatePortfolio() {

    const { formField, formError, formSuccess, startDate, endDate, setEndDate, setStartDate, setFormError, setFormSuccess, handleInputFieldChange, handleDateChange } = useForm();
    const router = useRouter();
    const [createPortfolio, { error }] = useCreatePortfolio();

    const handlePortfolioFormSubmit = async (e) => {
        e.preventDefault();
        await createPortfolio({ variables: formField });
        router.push('/Portfolio');
    }

    return (
        <div className="form_main_container">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        <div className="form_heading">Create Portfolio</div>
                        <div className="form_container">
                            <PortfolioForm
                                formField={formField}
                                formError={formError}
                                startDate={startDate}
                                endDate={endDate}
                                setEndDate={setEndDate}
                                setStartDate={setStartDate}
                                handleInputFieldChange={handleInputFieldChange}
                                handlePortfolioFormSubmit={handlePortfolioFormSubmit}
                                handleDateChange={handleDateChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withApollo(withAuth(CreatePortfolio, ['admin', 'instructor']));