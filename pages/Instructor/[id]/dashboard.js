import withApollo from '../../../hoc/withApollo';
import withAuth from '../../../hoc/withAuth';
import { useRouter } from 'next/router';
import BaseLayout from '../../../layouts/BaseLayout';
import { useGetUserPortfolio, useDeletePortfolios } from '../../../apollo/actions';
import { getDataFromTree } from '@apollo/client/react/ssr';
import Link from 'next/link';
import { formatDate } from '../../../utils/Function';

function InstructorDashboard() {

    // Mutations
    const { data, error } = useGetUserPortfolio();
    const [deletePortfolio] = useDeletePortfolios();

    const userPortfolios = data ? data.userPortfolio : [];

    const handleDeletePortfolio = (id) => {
        deletePortfolio({ variables: { id: id } })
            .catch((err) => {
                let errorData = JSON.parse(JSON.stringify(err));
                if (errorData.graphQLErrors && errorData.graphQLErrors.length > 0) {
                    console.log(errorData)
                }
                else {
                    console.log(errorData)
                }
            })
    }

    return (
        <BaseLayout>
            <div className="instructor_main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-7 mx-auto">
                            <div className="instructor_heading">Instructor Dashboard</div>
                            <div className="instructor_container">
                                {
                                    userPortfolios.map((portfolioInfo, index) => (
                                        <div className="portfolio_card_container" key={index}>
                                            <div className="portfolio_card_body">
                                                <div className="portfolio_card_body_title">{portfolioInfo.title}</div>
                                                <div className="portfolio_card_body_sub_title">{portfolioInfo.jobTitle}</div>
                                                <div className="portfolio_card_body_info">{portfolioInfo.description}</div>
                                            </div>
                                            <div className="portfolio_card_footer">{formatDate(portfolioInfo.startDate)} - {portfolioInfo.endDate ? formatDate(portfolioInfo.endDate) : 'Present'}</div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <Link href="/Portfolio/[id]/EditPortfolio" as={`/Portfolio/${portfolioInfo._id}/EditPortfolio`}>
                                                        <button className="instructor_update_btn">Update</button>
                                                    </Link>
                                                </div>
                                                <div className="col-md-6">
                                                    <button className="instructor_delete_btn" onClick={() => { handleDeletePortfolio(portfolioInfo._id) }}>Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}

export default withApollo(withAuth(InstructorDashboard, ['admin', 'instructor']), { getDataFromTree });