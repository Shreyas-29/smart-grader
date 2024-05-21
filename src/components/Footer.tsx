import React from 'react'
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const Footer = () => {
    return (
        <footer className="w-full h-auto md:h-16 border-t border-border static bottom-0 inset-x-0 bg-background px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between h-full max-w-screen-xl mx-auto py-4">
                <div className="flex items-center gap-2">
                    <h1 className="text-base font-semibold">
                        Smart Grader🎓
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        &copy; {new Date().getFullYear()} All rights reserved
                    </p>
                </div>
                <div className="flex items-center justify-end gap-4 mt-3 md:mt-0">
                    <Link href="#" className={buttonVariants({ size: "sm", variant: "ghost" })}>
                        Terms of Service
                    </Link>
                    <Link href="#" className={buttonVariants({ size: "sm", variant: "ghost" })}>
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </footer>
    )
};

export default Footer
