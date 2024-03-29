import DatePicker from 'react-datepicker';
import { useEffect } from 'react';

function PortfolioForm(props) {

    const { formField, formError, startDate, loading, endDate, setEndDate, setStartDate, setFormField, handleInputFieldChange, handlePortfolioFormSubmit, handleDateChange } = props;

    const { initialData, buttonDisplayValue } = props;

    useEffect(() => {
        if (initialData) {
            setFormField(initialData)
            const { startDate, endDate } = initialData;
            setStartDate(startDate ? new Date(parseInt(startDate, 10)) : null);
            setEndDate(endDate ? new Date(parseInt(endDate, 10)) : null);
        }
    }, [initialData])


    return (
        <form onSubmit={handlePortfolioFormSubmit}>
            <div className="form_label">Portfolio Title</div>
            <input
                className='form_input_field'
                type="text"
                name="title"
                placeholder="Enter Portfolio Title"
                value={formField.title}
                onChange={handleInputFieldChange}
            />
            <div className="form_label">Company Name</div>
            <input
                className='form_input_field'
                type="text"
                name="company"
                placeholder="Enter Company Name"
                value={formField.company}
                onChange={handleInputFieldChange}
            />
            <div className="form_label">Company Website</div>
            <input
                className='form_input_field'
                type="text"
                name="companyWebsite"
                placeholder="Enter Company Website"
                value={formField.companyWebsite}
                onChange={handleInputFieldChange}
            />
            <div className="form_label">Location</div>
            <input
                className='form_input_field'
                type="text"
                name="location"
                placeholder="Enter Location"
                value={formField.location}
                onChange={handleInputFieldChange}
            />
            <div className="form_label">Job Title</div>
            <input
                className='form_input_field'
                type="text"
                name="jobTitle"
                placeholder="Enter Job Title"
                value={formField.jobTitle}
                onChange={handleInputFieldChange}
            />
            <div className="form_label">Description</div>
            <textarea
                className='form_text_area'
                type="text"
                name="description"
                rows="40"
                placeholder="Enter Description"
                value={formField.description}
                onChange={handleInputFieldChange}
            />
            <div className="form_label">Start Date</div>
            <div>
                <DatePicker
                    showYearDropdown
                    className='form_input_field'
                    name="startData"
                    placeholderText="Start Date"
                    selected={startDate}
                    onSelect={handleDateChange('startDate', setStartDate)}
                />
            </div>
            <div className="form_label">End Date</div>
            <div>
                <DatePicker
                    showYearDropdown
                    className='form_input_field'
                    name="endDate"
                    placeholderText="End Date"
                    disabled={endDate ? false : true}
                    selected={endDate}
                    onSelect={handleDateChange('endDate', setEndDate)}
                />
            </div>
            {
                endDate &&
                <div className="form_date_hide" onClick={() => handleDateChange('endDate', setEndDate)(null)} >
                    No end date
                </div>
            }
            {
                !endDate &&
                <div className="form_date_show" onClick={() => handleDateChange('endDate', setEndDate)(new Date())} >
                    Show end date
                </div>
            }
            {
                loading ? <div className="form_disable_btn">{buttonDisplayValue}....</div> : <button className="form_btn">{buttonDisplayValue}</button>
            }
            {
                formError ? <div className="form_error">{formError}</div> : null
            }
        </form>
    )

}

export default PortfolioForm;