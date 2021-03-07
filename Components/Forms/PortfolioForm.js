

function PortfolioForm(props) {

    const { formField, formError, handleInputFieldChange, handlePortfolioFormSubmit } = props;

    return (
        <form onSubmit={handlePortfolioFormSubmit}>
            <input
                className='form_input_field'
                type="text"
                name="title"
                placeholder="Enter Portfolio Title"
                value={formField.title}
                onChange={handleInputFieldChange}
            />
            <input
                className='form_input_field'
                type="text"
                name="company"
                placeholder="Enter Company Name"
                value={formField.company}
                onChange={handleInputFieldChange}
            />
            <input
                className='form_input_field'
                type="text"
                name="location"
                placeholder="Enter Location"
                value={formField.location}
                onChange={handleInputFieldChange}
            />
            <input
                className='form_input_field'
                type="text"
                name="jobTitle"
                placeholder="Enter Job Title"
                value={formField.jobTitle}
                onChange={handleInputFieldChange}
            />
            <textarea
                className='form_text_area'
                type="text"
                name="description"
                rows="40"
                placeholder="Enter Description"
                value={formField.description}
                onChange={handleInputFieldChange}
            />
            <input
                className='form_input_field'
                type="text"
                name="startDate"
                placeholder="Start Date"
                value={formField.startDate}
                onChange={handleInputFieldChange}
            />
            <input
                className='form_input_field'
                type="text"
                name="endDate"
                placeholder="End Date"
                value={formField.endDate}
                onChange={handleInputFieldChange}
            />
            <button className="form_btn">Create Portfolio</button>
        </form>
    )

}

export default PortfolioForm;