import React, { useEffect, useState } from "react";
import axios from "axios";
import FileList from "./FileList";
import FileUpload from "./FileUpload";

function FileManagement() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = () => {
    axios
      .get("http://localhost:5000/files/all")
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
      });
  };

  const addFileToList = (file) => {
    setFiles((prevFiles) => [file, ...prevFiles]);
  };

  return (
    <div>
      <FileUpload addFileToList={addFileToList} fetchFiles={fetchFiles} />
      <FileList file={files} />
    </div>
  );
}

export default FileManagement;
