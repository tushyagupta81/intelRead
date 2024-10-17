import { trpc } from "../utils/trpc";
import Link from "next/link";

export default function Home() {
    const { data: files, isLoading } = trpc.getUserFiles.useQuery();

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Uploaded PDFs</h1>
            <ul>
                {files?.map((file) => (
                    <li key={file.id}>
                        <Link href={`/api/pdf/${file.sessionId}`}>
                            <a>{file.fileName}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
