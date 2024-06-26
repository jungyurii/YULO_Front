import React from "react";

export default function FileUpload({ files, setFiles }) {

  const onChangeFiles = (e) => {
    const fileList = e.target.files;
    if (fileList !== null) {
      setFiles(fileList);
    }
  };

  return (
    <div>
      <input type="file" name="userfile" multiple onChange={onChangeFiles} />
    </div>
  );
}