import axios from 'axios';
import { APICall } from './APICall';

class GeneratePresignedURL extends APICall {
    constructor() {
        if (GeneratePresignedURL.instance) {
            return GeneratePresignedURL.instance;
        }
        super();
        this.leaf_path = "/generatePresignedURLForDocument";
        this.api_path = this.root + this.leaf_path
        GeneratePresignedURL.instance = this;
    }

    async generatePresignedURL(objectKey, secret) {
        const data = { "objectKey": objectKey, "secret": secret }
        try {
            const response = await axios.post(this.leaf_path, data);
            if (response.status === 200) {
                // The secret was correct and S3 Presigned URL is returned
                return response.data
            }
            else if (response.status === 401) {
                return "Incorrect password or missing password."
            }
            else {
                return "Server Error."
            }

        } catch (error) {
            console.error(error);
            return
        }
    }


}
export default GeneratePresignedURL;

