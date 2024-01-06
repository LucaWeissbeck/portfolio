import axios from 'axios';
import axiosRetry from 'axios-retry'
import { APICall } from './APICall.js';

axiosRetry(axios, {
    retries: 5,
    retryDelay: (retryCount) => {
        console.log(`retry attempt: ${retryCount}`);
        return retryCount * 2000; // time interval between retries
    },
    retryCondition: (error) => {
        // Retry on network errors and 5xx server responses
        return axiosRetry.isNetworkError(error) ||
            (error.response && error.response.status >= 500);
    }
});

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
        try {
            const data = { "objectKey": objectKey, "secret": secret };
            const response = await axios.post(this.api_path, data);
            return response.data;
        } catch (error) {
            console.error("Error in generatePresignedURL:", error);
            throw error;
        }


    }
}