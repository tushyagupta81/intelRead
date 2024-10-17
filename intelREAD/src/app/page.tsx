import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Pdf from "../components/Pdf";
import PdfViewer  from "@/components/PdfViewer";
import ChatBox from "@/components/ChatBot";

export default function Home() {
    return (
        <>
            <MaxWidthWrapper className=' sm:mt-40 flex flex-col justify-center items-center text-center'>
                <h1
                    className='max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl
      '
                >
                    Chat with your{" "}
                    <span className='text-blue-600'>documents</span> in seconds.
                </h1>
                <p className='mt-5 max-w-prose text-zinc-700 sm:text-lg'>
                    intelREAD allows you to have conversation with any pdf
                    document. Simply upload your file and start asking questions
                    right away.
                </p>
            </MaxWidthWrapper>
            <div>
                <div className='relative isolate'>
                <div>
    <div className='mx-auto max-w-6xl mb-20'>
        <div className='mt-16 flow-root sm:mt-24'>
            <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl lg:p-4'>
                <div  className="flex ">
                    <div style={{ overflow: 'auto', maxHeight: '80vh' }} className="flex-1 mr-10">
                    <Pdf />
                    </div>
                  <div className="flex-1">
                  <ChatBox />
                  </div>
                </div>
            </div>
        </div>
    </div>
                    </div>
                    <div
                        aria-hidden='true'
                        className='pointer-event-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
                    >
                        <div
                            style={{
                                clipPath:
                                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                            }}
                            className='relative left-[calc(50%-13rem) aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30  sm:left-[calc(50%-36rem)] sm:w-[72.187rem] z-50'
                        />
                    </div>
                </div>
            </div>
            {/* Feature Section */}
            
        </>
    );
}
