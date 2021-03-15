import BaseLayout from '../../../layouts/BaseLayout';
export default function CategoryTopics() {
    return (
        <BaseLayout>
            <div>
                <div className="forum_categories_main_container">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="forum_categories_heading">Category Topics Component</div>
                            </div>
                        </div>
                        <div className="forum_categories_table_container">
                            <table class="table table-striped">
                                <thead className="forum_categories_table_heading">
                                    <tr>
                                        <th scope="col">First</th>
                                        <th scope="col">Last</th>
                                        <th scope="col">Handle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}
