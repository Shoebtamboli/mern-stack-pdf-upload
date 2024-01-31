import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import FileList from "./FileList";
import FileUpload from "./FileUpload";

function FileManagement() {
  const [files, setFiles] = useState([]);

  const fetchFiles = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/files/all`
      );
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  }, []); // Dependencies are empty, ensuring fetchFiles is memoized and not recreated on each render

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]); // Dependency array includes fetchFiles now, but thanks to useCallback, it's stable

  const addFileToList = useCallback((file) => {
    setFiles((prevFiles) => [file, ...prevFiles]);
  }, []); // Memoizing this function as well

  return (
    <div>
      <FileUpload addFileToList={addFileToList} fetchFiles={fetchFiles} />
      <FileList files={files} />
      {/* Corrected prop from file to files for clarity */}
    </div>
  );
}

export default FileManagement;
