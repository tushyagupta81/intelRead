import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../src/db/index.ts";
import path from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { sessionId } = req.query;

    // Fetch file details using session ID
    const file = await prisma.pdfFile.findUnique({
        where: { sessionId: String(sessionId) },
    });

    if (!file) {
        return res.status(404).json({ error: "PDF not found" });
    }

    // Serve the PDF content
    const pdfPath = path.join(process.cwd(), file.filePath); // Construct file path
    res.setHeader("Content-Type", "application/pdf");
    return res.sendFile(pdfPath); // Send PDF file
}
