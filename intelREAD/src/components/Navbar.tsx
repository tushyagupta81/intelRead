import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import {
    RegisterLink,
    LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { ArrowRight } from "lucide-react";

export default function Navbar() {
    return (
        <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
            <MaxWidthWrapper>
                <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
                    <Link href='/' className='flex z-40 font-semibold'>
                        <span>intelREAD</span>
                    </Link>
                    <div className='hidden items-center space-x-5 sm:flex'>
                        <>
                            <RegisterLink className={buttonVariants({
                                size: 'sm',

                            })}>Get started</RegisterLink>
                        </>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    );
}
