

function ReplyBox({ setShowReplyPanel, showReplyPanel }) {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="reply_box_head">Reply to :</div>
                </div>
            </div>
            <form>
                <div className="row">
                    <div className="col-md-6">
                        <input
                            className="reply_box_input_field"
                            placeholder="Topic Title"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <textarea
                            className="reply_box_input_comment"
                            placeholder="Comment"
                        />
                    </div>
                </div>
                <div className="reply_box_btn_container">
                    <button className="reply_box_reply_btn">Reply</button>
                    <div className="reply_box_cancel_btn">Cancel</div>
                    <div className="reply_box_hide_btn" onClick={() => setShowReplyPanel(false)}>HIDE PREVIEW</div>
                </div>
            </form>
        </div>
    )
}

export default ReplyBox;