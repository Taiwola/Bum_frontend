import { generateUploadButton, generateUploadDropzone, generateReactHelpers } from '@uploadthing/react';
import type { OurFileRouter } from '@/api/uploadthing/core';

const API_BASE_URL = "http://localhost:4000/api/uploadthing"

export const UploadButton = generateUploadButton<OurFileRouter>({
    url: API_BASE_URL
});
export const UploadDropzone = generateUploadDropzone<OurFileRouter>({
    url: API_BASE_URL
});


export const {useUploadThing, uploadFiles} = generateReactHelpers<OurFileRouter>();