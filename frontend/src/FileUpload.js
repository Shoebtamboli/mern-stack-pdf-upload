import React, { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

function FileUpload({ addFileToList, fetchFiles }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const onFileChange = (e) => {
    setError(""); // Reset error message when a new file is selected
    const chosenFile = e.target.files[0];
    if (chosenFile) {
      setFile(chosenFile);
      setFileName(chosenFile.name);
    } else {
      setFile(null);
      setFileName("No file chosen");
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/files/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
      addFileToList(response.data.file); // Ensure response data structure is correct
      setFileName("No file chosen"); // Reset file name display after upload
      setFile(null); // Reset file state after upload
      setError(""); // Clear any existing errors
      if (fetchFiles) fetchFiles(); // Refresh the file list if applicable
    } catch (uploadError) {
      const errorMessage =
        uploadError.response?.data?.message ||
        "Error uploading file. Please try again later.";
      console.error("Error uploading file:", errorMessage);
      setError(errorMessage);
    } finally {
      setIsUploading(false);
    }
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
            style={{ display: "none" }} // Hide the default input
          />
          Choose File
        </label>
        <button type="submit" className="upload-button" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload File"}
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
