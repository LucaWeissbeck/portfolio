import axios from 'axios';
import { APICall } from './APICall.js';

export class GeneratePresignedURL extends APICall {
    constructor() {
        if (GeneratePresignedURL.instance) {
            return GeneratePresignedURL.instance;
        }
        super();
        this.leaf_path = "/generatePresignedURLForDocument";
        this.api_path = this.base + this.leaf_path
        GeneratePresignedURL.instance = this;
    }

    async generatePresignedURL(objectKey, secret) {
        const data = { "objectKey": objectKey, "secret": secret };
        try {
            const response = await axios.post(this.api_path, data);
            // The secret was correct and S3 Presigned URL is returned
            return response.data;

        } catch (error) {
            // Handle the error
            console.error(error.response.data);
            return error.response.data;
        }
    }


}


