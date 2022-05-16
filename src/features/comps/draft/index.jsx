import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const DraftEditor = ({ id, value, onChange}) => {

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: value,
  })

  return <EditorContent editor={editor} />
}

export default DraftEditor;
