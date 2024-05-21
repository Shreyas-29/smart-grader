import Link from "next/link";
import React from 'react'
import { buttonVariants } from "./ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Navbar = async () => {

    const { getUser } = getKindeServerSession();

    const user = await getUser();

    return (
        <header className="sticky top-0 inset-x-0 w-full h-14 border-b border-border z-[999] bg-white/50 backdrop-blur-lg">
            <div className="flex items-center justify-between max-w-screen-xl mx-auto w-full px-4 md:px-8 h-full">
                <h1 className="text-lg font-semibold">
                    <Link href="/">
                        Smart Grader🎓
                    </Link>
                </h1>

                {user ? (
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className={buttonVariants({ size: "sm", variant: "ghost" })}>
                            Dashboard ⚡
                        </Link>
                        <Link href="/api/auth/logout" className={buttonVariants({ size: "sm" })}>
                            Logout
                        </Link>
                    </div>
                ) : (
                    <div className="flex items-center justify-end gap-4">
                        <Link href="/api/auth/login" className={buttonVariants({ size: "sm", variant: "ghost" })}>
                            Login
                        </Link>
                        <Link href="/api/auth/register" className={buttonVariants({ size: "sm" })}>
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </header>
    )
};

export default Navbar
