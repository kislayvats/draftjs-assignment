import React, { useEffect, useState } from 'react';
import { Editor, EditorState, RichUtils,convertFromRaw ,convertToRaw} from 'draft-js';
import { EditorWrapper } from './EditorStyle';
import { useDispatch, useSelector } from 'react-redux';
import { updateContent } from '../../store/contentSlice';
import { toast } from 'react-toastify';

const DraftEditor = () => {
  const dispatch =useDispatch();
  const content=useSelector(state=>state.content);
  const [editorState, setEditorState] = useState(() => {
    if (content?.text) {
      const contentState = convertFromRaw(JSON.parse(content.text));
      return EditorState.createWithContent(contentState);
    } else {
      return EditorState.createEmpty();
    }
  });

  const onChange = (newEditorState) => {
    setEditorState(newEditorState);
    dispatch(updateContent({ text: JSON.stringify(convertToRaw(newEditorState.getCurrentContent())) }));

  };

   const handleBeforeInput = (chars) => {
    console.log("My character=>",chars)
    if (chars === '#') {
      // Convert to heading
      onChange(RichUtils.toggleBlockType(editorState, 'header-one'));
      return 'handled';
    } else if (chars === '*') {
      // Convert to bold
      onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
      return 'handled';
    } else if (chars === '@') {
   // Convert to red line
   onChange(RichUtils.toggleInlineStyle(editorState, 'REDLINE'));
   return 'handled';
    } else if (chars === '$') {
      // Convert to underline
      onChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
      return 'handled';
    }

    return 'not-handled';
  };

  useEffect(() => {
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
      const contentState = convertFromRaw(JSON.parse(savedContent));
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, []);
  

  const customStyleMap = {
    'REDLINE': {
      color: 'red',
    },
    "UNDERLINE":{
      textDecoration: 'underline',
    },
  
  };
  const handleSave = () => {
    // Save content to localStorage
    const rawContentState = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    localStorage.setItem('editorContent', rawContentState);
toast('Saved content to localStorage');
  };

  useEffect(() => {
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
      const contentState = convertFromRaw(JSON.parse(savedContent));
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, []);
  return (
    <>
          {/* name and save button along with reset button */}
<div className='flexCenter' style={{width:"90%"}}>
<h3 style={{
    flex:1,
    textAlign:"center",
}}>
    Demo editor by kislay
</h3>
    <button onClick={handleSave}>
     Save
    </button>
</div>

    {/* main editor */}
   <EditorWrapper>

     <Editor
      editorState={editorState}
      onChange={onChange}
      handleBeforeInput={handleBeforeInput}
      customStyleMap={customStyleMap}
      placeholder='Write something...'
    />
   </EditorWrapper>
    </>
  );
};

export default DraftEditor;
