import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const PdfViewer = ({ pdfFile }) => {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
      <div className="h-screen w-full border-r border-gray-300">
        <Viewer fileUrl={pdfFile} />
      </div>
    </Worker>
  );
};
export default PdfViewer;

