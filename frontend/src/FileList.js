import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FileList.css";

function FileList({ file }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/files/all")
      .then((response) => {
        console.log(response);
        setFiles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
      });
  }, [file]);

  const handlePreview = (filepath) => {
    const relativePath = filepath.replace(/^.*[\\/]/, "");
    window.open(`http://localhost:5000/files/${relativePath}`, "_blank");
  };

  return (
    <div className="file-list-container">
      <h2>Uploaded Files</h2>
      <ul className="file-list">
        {files.length > 0 ? (
          files.map((file) => (
            <li key={file.id} className="file-item">
              <span className="file-name">{file.filename}</span>
              <span className="file-size">
                ({(file.size / 1024).toFixed(2)} KB)
              </span>
              <button
                onClick={() => handlePreview(file.filepath)}
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
