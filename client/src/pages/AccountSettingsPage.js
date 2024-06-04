import { useState } from "react";
import AWS from "aws-sdk";

function AccountSettingsPage() {
  const [file, setFile] = useState(null);

  const uploadFile = async () => {

    const S3_BUCKET = "culinary-critique";

    // S3 Region
    const REGION = "us-west-1";

    // S3 Credentials
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
    });

    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    // Files Parameters

    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
    };

    // Uploading file to s3

    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        // File uploading progress
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();

    await upload.then((err, data) => {
      console.log(err);
      // Fille successfully uploaded
      alert("File uploaded successfully.");
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };
  return (
    <div className="App">
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile}>Upload</button>
      </div>
    </div>
  );
}

export default AccountSettingsPage;