"use client";

import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import React, { useCallback, useState, useTransition } from 'react'
import Dropzone, { FileRejection } from "react-dropzone";
import { toast } from "sonner";
import { Document, Page, pdfjs } from 'react-pdf';
import { ArrowLeft, CloudUpload, Loader2, MousePointerSquareDashed } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import pdfParse from 'pdf-parse';
import { Button } from "@/components/ui/button";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const UploadPage = () => {

    const router = useRouter();

    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [pdfUrl, setPdfUrl] = useState<string>('');
    const [numPages, setNumPages] = useState<number | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isDragOver, setIsDragOver] = useState<boolean>(false);
    const [extractedText, setExtractedText] = useState<string>('');

    const [isPending, startTransition] = useTransition();

    const { startUpload, isUploading } = useUploadThing("imageUploader", {
        onClientUploadComplete: ([data]) => {
            // after uploading the pdf, set the pdf url to the state and show the pdf preview with pdfjs
        },
        onUploadProgress(p) {
            setUploadProgress(p);
        },
    });

    const extractTextFromPDF = async (pdfData: ArrayBuffer) => {
        const loadingTask = pdfData.byteLength ? pdfjs.getDocument({ data: pdfData }) : null;
        if (!loadingTask) return;

        const pdf = await loadingTask.promise;
        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();

            // @ts-ignore
            text += textContent.items.map(item => item.str || '').join('\n');
        }

        return text;
    };

    const onDropAccepted = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const url = URL.createObjectURL(file);
        setPdfFile(file);
        setPdfUrl(url);
        setIsDragOver(false);
        startTransition(async () => {
            let progress = 0;
            const pdfData = await acceptedFiles[0].arrayBuffer();
            const extractedText = await extractTextFromPDF(pdfData);
            const interval = setInterval(() => {
                progress += 10;
                if (progress >= 100) {
                    clearInterval(interval);
                    setUploadProgress(100);
                    setExtractedText(extractedText!);
                } else {
                    setUploadProgress(progress);
                }
            }, 300);
        });
    }, []);

    const onDropRejected = (rejectedFiles: FileRejection[]) => {
        const [file] = rejectedFiles;
        setIsDragOver(false);

        if (file.file.size > 20 * 1024 * 1024) {
            return toast.error("File size is too large.", {
                description: "Please upload a file smaller than 20MB."
            });
        }

        toast.error("File type is not supported.", {
            description: "Please upload a PDF file only."
        });
    };


    return (
        <div className="flex-1 flex items-center justify-center min-h-screen lg:min-h-[calc(100vh-120px-1px)] px-4 md:px-0">
            {!pdfFile ? (
                <div className={`w-full max-w-3xl p-6 border-2 border-dashed h-[300px] rounded-2xl bg-white ${isDragOver ? 'border-primary bg-primary/10' : 'border-border'}`}>
                    <Dropzone
                        accept={{ 'application/pdf': ['.pdf'] }}
                        maxSize={20 * 1024 * 1024} // 20MB
                        onDropAccepted={onDropAccepted}
                        onDropRejected={onDropRejected}
                        onDragEnter={() => setIsDragOver(true)}
                        onDragLeave={() => setIsDragOver(false)}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()} className="flex flex-col items-center justify-center h-full cursor-pointer">
                                <input {...getInputProps()} />
                                {isDragOver ? (
                                    <MousePointerSquareDashed className="w-6 h-6 mb-2 text-muted-foreground" />
                                ) : isUploading || isPending ? (
                                    <Loader2 className="w-6 h-6 mb-2 text-muted-foreground animate-spin" />
                                ) : (
                                    <CloudUpload className="w-6 h-6 mb-2 text-muted-foreground" />
                                )}
                                {isUploading ? (
                                    <div className="flex flex-col items-center">
                                        <p className="">Uploading...</p>
                                        <Progress value={uploadProgress} className="mt-2 w-40 h-1.5 bg-slate-300" />
                                    </div>
                                ) : isPending ? (
                                    <div className="flex flex-col items-center">
                                        <p className="">Redirecting, please wait...</p>
                                    </div>
                                ) : isDragOver ? (
                                    <p>
                                        <span className="font-semibold">Drop file</span>
                                        {" "} to upload
                                    </p>
                                ) : (
                                    <p>
                                        <span className="font-semibold">Click to upload</span>
                                        {" "} or drag and drop
                                    </p>
                                )}
                            </div>
                        )}
                    </Dropzone>
                    {isPending && (
                        <div className="mt-4 text-center">
                            <p>Uploading...</p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full w-full max-w-6xl mx-auto">
                    <div className="flex items-center justify-between w-full p-4">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => router.push("/")}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Go back
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => setPdfFile(null)}
                        >
                            Upload another file
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 w-full lg:max-h-screen border border-none bg-white shadow-none overflow-hidden pb-10 md:pb-0">
                        <div className="p-4 relative">
                            <iframe
                                src={pdfUrl}
                                width="100%"
                                height="550px"
                                className="border border-border rounded-lg !scrollbar-hide"
                                title="PDF Preview"
                            />
                        </div>
                        <div className="flex h-[550px] overflow-y-auto pt-4 px-4">
                            <div className="pt-4 px-4 flex flex-col items-start w-full max-h-full border-border border rounded-xl overflow-">
                                <h2 className="mb-4 pb-4 border-b border-border w-full text-xl font-semibold">
                                    Extracted Text
                                </h2>
                                <div className="w-full max-h-full overflow-y-auto">
                                    <p className="whitespace-pre-wrap text-gray-800 w-full">
                                        {extractedText}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default UploadPage
