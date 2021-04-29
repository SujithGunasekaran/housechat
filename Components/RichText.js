import MUIRichTextEditor from "mui-rte";


export default function RichText({ setCommentValue }) {

    return (
        <MUIRichTextEditor
            label="Add Your Commentes..."
            onSave={(data) => setCommentValue(data)}
            inlineToolbar={true}
        />
    )
}
