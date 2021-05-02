import withApollo from '../hoc/withApollo';
import withAuth from '../hoc/withAuth';
import BaseLayout from '../layouts/BaseLayout';

function Secret() {
    return (
        <BaseLayout>
            <div className="form_main_container">Secret Component</div>
        </BaseLayout>
    )
}

export default withApollo(withAuth(Secret, ['admin']))
