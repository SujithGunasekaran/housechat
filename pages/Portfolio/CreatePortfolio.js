import withApollo from '../../hoc/withApollo';
import withAuth from '../../hoc/withAuth';
import PortfolioForm from '../../Components/Forms/PortfolioForm';
import useForm from '../../Hooks/useForm';
import { useCreatePortfolio } from '../../apollo/actions';
import { useRouter } from 'next/router';
import BaseLayout from '../../layouts/BaseLayout';

function CreatePortfolio() {

    const { formField, formError, formSuccess, startDate, endDate, setEndDate, setStartDate, setFormError, setFormSuccess, handleInputFieldChange, handleDateChange } = useForm();
    const router = useRouter();
    const [createPortfolio, { loading }] = useCreatePortfolio();

    const handlePortfolioFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await createPortfolio({ variables: formField })
            if (data && data.createPortfolio) {
                router.push('/Portfolio');
            }
        }
        catch (err) {
            let errorData = JSON.parse(JSON.stringify(err));
            if (errorData.graphQLErrors && errorData.graphQLErrors[0].message) {
                setFormError(errorData.graphQLErrors[0].message);
            }
            else {
                setFormError('Something Went wrong please try again...!')
            }
        }
    }

    return (
        <BaseLayout>
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
                                    loading={loading}
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
        </BaseLayout>
    )
}

export default withApollo(withAuth(CreatePortfolio, ['admin', 'instructor']));