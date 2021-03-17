import useForm from '../Hooks/useForm';

function ReplyBox(props) {

    const { handleReplyFormSubmit, onClose } = props;

    const { formField, handleInputFieldChange, resetFormField } = useForm();

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="reply_box_head">Reply to :</div>
                </div>
            </div>
            <form onSubmit={(e) => handleReplyFormSubmit(e, formField, resetFormField)}>
                <div className="row">
                    <div className="col-md-6">
                        <input
                            name="title"
                            className="reply_box_input_field"
                            placeholder="Topic Title"
                            value={formField.title ? formField.title : ''}
                            onChange={handleInputFieldChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <textarea
                            name="content"
                            className="reply_box_input_comment"
                            placeholder="Content"
                            value={formField.content ? formField.content : ''}
                            onChange={handleInputFieldChange}
                        />
                    </div>
                </div>
                <div className="reply_box_btn_container">
                    <button className="reply_box_reply_btn">Reply</button>
                    <div className="reply_box_cancel_btn" onClick={onClose}>Cancel</div>
                    <div className="reply_box_hide_btn" onClick={onClose}>HIDE PREVIEW</div>
                </div>
            </form>
        </div>
    )
}

export default ReplyBox;