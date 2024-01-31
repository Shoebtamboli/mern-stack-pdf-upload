import React from "react";
import "./FileList.css";

function FileList({ files }) {
  // Accept files directly as a prop

  const handlePreview = (filename) => {
    window.open(`${process.env.REACT_APP_API_URL}/files/${filename}`, "_blank");
  };

  return (
    <div className="file-list-container">
      <h2>Uploaded Files</h2>
      <ul className="file-list">
        {files && files.length > 0 ? (
          files.map((file) => (
            <li key={file.id} className="file-item">
              <span className="file-name">{file.filename}</span>
              <span className="file-size">
                ({(file.size / 1024).toFixed(2)} KB)
              </span>
              <button
                onClick={() => handlePreview(file.filename)}
                className="preview-button"
              >
                Preview
              </button>
            </li>
          ))
        ) : (
          <li className="no-files">No files uploaded yet</li>
        )}
      </ul>
    </div>
  );
}

export default FileList;
