import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill-new';
import 'quill/dist/quill.snow.css'; // Import Quill editor styles
// import './quill.css';

const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'size': [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'script': 'sub'}, { 'script': 'super' }], //Super & subscript
    [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Added 'bullet' list option
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    [{ 'color': [] }, { 'background': [] }], // Dropdown with color options
    [{ 'align': [] }],
    ['clean'] // Remove formatting button
  ],
};

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'script',
  'list', 'indent',
  'link', 'image', 'color', 'background', 'align'
];

function ReactQuillNewEditor({ value = '', onChange, placeholder = '' }) {
  const handleEditorChange = (content) => {
    if (onChange) {
      onChange(content);
    } else {
      console.warn('onChange function is not provided');
    }
  };

  return (
    <ReactQuill
      value={value}
      onChange={handleEditorChange}
      modules={modules}
      formats={formats}
      placeholder={placeholder}
    />
  );
}

ReactQuillNewEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default ReactQuillNewEditor;
