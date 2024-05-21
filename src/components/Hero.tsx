"use client";

import React from 'react'
import { CloudUpload, FileCheck, FileText, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TypewriterEffect, TypewriterEffectSmooth } from "./ui/typewritter-effect";
import Image from "next/image";

const features = [
    {
        Icon: FileCheck,
        title: 'Automatic Grading',
        info: 'Save time and effort by automating answer sheet evaluation.',
    },
    {
        Icon: CloudUpload,
        title: 'Cloud-Based Processing',
        info: 'Process answer sheets securely and efficiently on the cloud.',
    },
    {
        Icon: FileText,
        title: 'Multiple Format Support',
        info: 'Evaluate answer sheets in various formats, including PDF, DOCX, etc.',
    },
    {
        Icon: RefreshCw,
        title: 'Easy Upload and Processing',
        info: 'Simply upload answer sheets and get results with a few clicks.',
    },
];

const steps = [
    {
        step: "Step 1",
        title: "Upload Your Answer Sheet",
        description: "Easily upload your handwritten answer sheets in PDF format through our secure portal.",
    },
    {
        step: "Step 2",
        title: "Automated Processing",
        description: "Our advanced OCR and NLP technologies extract and analyze the text from your answer sheets.",
    },
    {
        step: "Step 3",
        title: "Receive Results",
        description: "Get detailed evaluation results, including scores and feedback, in a matter of minutes.",
    },
];

const Hero = () => {

    const words = [
        {
            text: "Automated",
        },
        {
            text: "answer",
        },
        {
            text: "sheet",
        },
        {
            text: "evaluation",
        },
        {
            text: "with",
        },
        {
            text: "AI",
        },
    ];

    return (
        <section className="flex flex-col justify-center items-center max-w-screen-xl mx-auto h-full z-30 relative pt-28 lg:pt-40">

            <div className="flex flex-col items-center justify-center mx-auto max-w-2xl text-center px-4 md:px-0">
                <div className="absolute pointer-events-none z-10 bg-primary/20 opacity-50 md:opacity-100 blur-[8rem] w-80 h-80 rounded-full top-0 lg:top-20 right-0 lg:left-1/3"></div>
                <TypewriterEffect words={words} className="text-4xl lg:text-5xl font-bold !leading-tight" />
                <p className="text-lg text-center mt-4 text-muted-foreground">
                    Effortlessly evaluate answer sheets with the help of AI ✨
                </p>
                <div className="flex items-center justify-center mt-6 gap-5">
                    <Button asChild>
                        <Link href="/dashboard">
                            Get Started
                        </Link>
                    </Button>
                    <Button asChild variant="subtle">
                        <Link href="/upload">
                            Upload Files
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full pt-32 lg:pt-52 px-4 md:px-8 lg:px-0 max-w-screen-lg">
                {features.map((feature) => (
                    <div key={feature.title} className="flex flex-col items-start">
                        <feature.Icon className="w-8 h-8 text-primary" />
                        <h3 className="text-lg font-semibold mt-4">{feature.title}</h3>
                        <p className="text-muted-foreground mt-2">{feature.info}</p>
                    </div>
                ))}
            </div>

            <div className="w-full flex flex-col items-center justify-center pt-32 lg:pt-52 px-4 md:px-8 lg:px-0 max-w-screen-lg mx-auto">
                <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold">
                    How It Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full pt-10 lg:pt-20">
                    {steps.map((step) => (
                        <div key={step.title} className="flex flex-col items-start">
                            <h3 className="text-base font-medium text-muted-foreground/80">{step.step}</h3>
                            <h4 className="text-lg font-semibold mt-4">{step.title}</h4>
                            <p className="text-muted-foreground mt-2">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* make a call to action section with banner and text with title, info and button to left like with an image at bottom right */}
            <div className="w-full flex flex-col items-center justify-center pt-32 lg:pt-52 px-4 md:px-8 lg:px-0 max-w-screen-lg mx-auto mb-40">
                <div className="flex flex-col md:flex-row lg:flex-1 w-full items-center p-5 md:p-8 lg:px-14 lg:py-12 rounded-xl border border-primary-foreground bg-blue-950 gap-6 relative">
                    <div className="lg:flex-[0.8] flex flex-col items-start">
                        <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold text-background">
                            Ready to get started?
                        </h2>
                        <p className="text-base text-muted/80 max-w-sm mt-4">
                            Sign up for a free account and start evaluating answer sheets with ease.
                        </p>
                        <div className="flex items-center justify-center mt-6 gap-5">
                            <Button asChild>
                                <Link href="/">
                                    Sign Up
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <Image
                        src="/cta.png"
                        alt="cta"
                        width={1057}
                        height={819}
                        className="w-full md:w-72 h-48 rounded-lg lg:rounded-tl-lg lg:rounded-none object-cover lg:absolute bottom-0 right-0 lg:right-0 lg:bottom-0"
                    />
                </div>
            </div>


        </section>
    )
};

export default Hero
