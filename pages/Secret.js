import withApollo from '../hoc/withApollo';
import withAuth from '../hoc/withAuth';

function Secret() {
    return (
        <div className="form_main_container">Secret Component</div>
    )
}

export default withApollo(withAuth(Secret))