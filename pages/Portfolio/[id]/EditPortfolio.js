import withApollo from '../../../hoc/withApollo';
import withAuth from '../../../hoc/withAuth';
import PortfolioForm from '../../../Components/Forms/PortfolioForm';
import useForm from '../../../Hooks/useForm'
import BaseLayout from '../../../layouts/BaseLayout';
import { useGetPortfolioById } from '../../../apollo/actions';
import { useRouter } from 'next/router';

function EditPortfolio() {

    const router = useRouter();

    const { data } = useGetPortfolioById(router.query.id);

    const { formField, formError, startDate, endDate, setEndDate, setFormField, setStartDate, setFormError, handleInputFieldChange, handleDateChange } = useForm();

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
                                        setFormField={setFormField}
                                        setEndDate={setEndDate}
                                        setStartDate={setStartDate}
                                        handleInputFieldChange={handleInputFieldChange}
                                        handleDateChange={handleDateChange}
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