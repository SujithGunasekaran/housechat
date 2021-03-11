import withApollo from '../../../hoc/withApollo';
import withAuth from '../../../hoc/withAuth';
import PortfolioForm from '../../../Components/Forms/PortfolioForm';
import useForm from '../../../Hooks/useForm'
import BaseLayout from '../../../layouts/BaseLayout';
import { useGetPortfolioById, useUpdatePortfolios } from '../../../apollo/actions';
import { useRouter } from 'next/router';

function EditPortfolio() {

    const router = useRouter();
    const { id } = router.query;

    // Mutations
    const [updatePortfolio, { loading }] = useUpdatePortfolios();

    // Query
    const { data } = useGetPortfolioById(id);

    const { formField, formError, startDate, endDate, setEndDate, setFormField, setStartDate, setFormError, handleInputFieldChange, handleDateChange } = useForm();

    const handlePortfolioFormSubmit = (e) => {
        e.preventDefault();
        updatePortfolio({ variables: { id, ...formField } })
            .then(() => {
                console.log("Successs");
            })
            .catch((err) => {
                let errorData = JSON.parse(JSON.stringify(err));
                if (errorData.graphQLErrors && errorData.graphQLErrors.length > 0) {
                    setFormError(errorData.graphQLErrors[0].message);
                }
                else {
                    setFormError('Something Went wrong please try again...!')
                }
            })
    }

    return (
        <BaseLayout>
            <div className="form_main_container">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4 mx-auto">
                            <div className="form_heading">Edit Portfolio</div>
                            <div className="form_container">
                                {
                                    data && data.portfolio &&
                                    <PortfolioForm
                                        formField={formField}
                                        formError={formError}
                                        startDate={startDate}
                                        endDate={endDate}
                                        initialData={data.portfolio}
                                        loading={loading}
                                        setFormField={setFormField}
                                        setEndDate={setEndDate}
                                        setStartDate={setStartDate}
                                        handleInputFieldChange={handleInputFieldChange}
                                        handlePortfolioFormSubmit={handlePortfolioFormSubmit}
                                        handleDateChange={handleDateChange}
                                        buttonDisplayValue='Update Portfolio'
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}

export default withApollo(withAuth(EditPortfolio, ['admin', 'instructor']));