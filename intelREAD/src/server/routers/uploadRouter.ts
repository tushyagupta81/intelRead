import { createRouter } from "@trpc/server";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../db"; // Import the Prisma client

export const uploadRouter = createRouter()
  .mutation("uploadPdf", {
    input: z.object({
      fileName: z.string(),
      filePath: z.string(),
    }),
    resolve: async ({ input }) => {
      const sessionId = uuidv4(); // Generate unique session ID
      // Save file metadata and session ID to the database
      return prisma.pdfFile.create({
        data: {
          fileName: input.fileName,
          filePath: input.filePath,
          sessionId: sessionId,
        },
      });
    },
  });
