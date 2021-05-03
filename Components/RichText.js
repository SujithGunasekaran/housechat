import MUIRichTextEditor from "mui-rte";

export default function RichText({ handleRichText, setCommentValue = null, defaultData }) {
    return (
        <MUIRichTextEditor
            label="Add Your Comments.."
            defaultValue={defaultData}
            onSave={handleRichText('content', setCommentValue)}
            inlineToolbar={false}
        />
    )
}
