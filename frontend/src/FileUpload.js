import React, { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

function FileUpload({ addFileToList, fetchFiles }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [error, setError] = useState(""); // State to store the error message

  const onFileChange = (e) => {
    setError(""); // Reset error message when a new file is selected
    const chosenFile = e.target.files[0];
    setFile(chosenFile);
    setFileName(chosenFile ? chosenFile.name : "No file chosen");
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:5000/files/upload", formData)
      .then((response) => {
        console.log("File uploaded successfully:", response.data);
        addFileToList(response.data);
        setFileName("No file chosen"); // Reset file name display after upload
        setFile(null); // Reset file state after upload
      })
      .catch((error) => {
        console.error("Error uploading file:", error.response.data);
      });
  };

  return (
    <div className="upload-container">
      <h2>Upload PDF File</h2>
      <form onSubmit={onFormSubmit} className="upload-form">
        <label className="custom-file-upload">
          <input
            type="file"
            onChange={onFileChange}
            accept=".pdf"
            className="file-input"
            style={{ display: "none" }} // Hide the default input
          />
          Choose File
        </label>
        <button type="submit" className="upload-button">
          Upload File
        </button>
      </form>
      {error && <div className="upload-error">{error}</div>}{" "}
      {/* Display error message */}
      <div className="file-display">
        <strong>Selected File:</strong> {fileName}
      </div>
    </div>
  );
}

export default FileUpload;
