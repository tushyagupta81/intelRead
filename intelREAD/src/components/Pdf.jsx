"use client";
import React, { useState } from "react";
import ChatBox from "./ChatBot";
import PdfViewer from "./PdfViewer";

const Pdf = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const fileUrl = URL.createObjectURL(file);
      setPdfFile(fileUrl);
      setFileUploaded(true);
      // Pop-up, message on successful submission
      await fetch("http://localhost:8000/api/new/", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: file,
      })
        .then(
          (response) => response.json(), // if the response is a JSON object
        )
        .then(
          (success) => console.log(success), // Handle the success response object
        )
        .catch(
          (error) => console.log(error), // Handle the error response object
        );
    } else {
      alert("Please upload a valid PDF file.");
    }
  };
  let content;
  if (pdfFile) {
    content = <PdfViewer pdfFile={pdfFile} />;
  } else {
    content = <div className=""></div>;
  }

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        {content}
        {!fileUploaded && (
          <div className="flex flex-col items-center mr-60">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              className="p-2 border border-gray-400 rounded-lg"
            />
            <p className="mt-2 text-gray-500">Upload a PDF file</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Pdf;

