import withApollo from '../../../hoc/withApollo';
import withAuth from '../../../hoc/withAuth';
import { useRouter } from 'next/router';
import BaseLayout from '../../../layouts/BaseLayout';
import { Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText } from 'reactstrap';

function InstructorDashboard() {
    const router = useRouter();
    return (
        <BaseLayout>
            <div className="instructor_main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-7 mx-auto">
                            <div className="instructor_heading">Instructor Dashboard</div>
                            <div className="instructor_container">
                                <Card>
                                    <CardHeader>Header</CardHeader>
                                    <CardBody>
                                        <CardTitle tag="h5">Special Title Treatment</CardTitle>
                                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                        <Button>Go somewhere</Button>
                                    </CardBody>
                                    <CardFooter>Footer</CardFooter>
                                </Card>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}

export default withApollo(withAuth(InstructorDashboard, ['admin', 'instructor']));