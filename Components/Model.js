export default function Model(props) {

    const { title, successBtn, cancelBtn, onSuccess, onCancel } = props;

    return (
        <div>
            <div className="model_title">
                {title}
            </div>
            <div className="model_btn_display">
                <button className="model_success_btn" onClick={() => onSuccess()}>{successBtn}</button>
                <div className="model_cancel_btn" onClick={() => onCancel()}>{cancelBtn}</div>
            </div>
        </div>
    )
}
