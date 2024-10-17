import { useState } from "react";
import { trpc } from "../utils/trpc"; // Assume tRPC is set up

export default function UploadButton() {
    const [file, setFile] = useState<File | null>(null);
    const { mutateAsync: uploadPdf } = trpc.uploadPdf.useMutation();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        // Save the file to the server (can be uploaded via API or direct file system)
        const filePath = `/uploads/${file.name}`;
        await uploadPdf({
            fileName: file.name,
            filePath: filePath,
        });
        // Add file-saving logic here (for simplicity, assuming it's saved in `/public/uploads/`)
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} accept="application/pdf" />
            <button onClick={handleUpload}>Upload PDF</button>
        </div>
    );
}
