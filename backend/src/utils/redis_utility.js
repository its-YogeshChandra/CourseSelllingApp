import { createClient } from "redis";

const client = createClient(
    {
        url : process.env.REDIS_URL
    }
);

client.on('error', err => console.log('Redis Client Error', err));


const uploadOnRedis = async (name, url , lessonId , type) => {
    try {
        await client.connect();
         //update the redis data with the job 
        const uploadJob = await client.hSet(`job:${lessonId}`, {
            name, url, lessonId, type
        });
        return uploadJob;
    } catch (error) {
        throw new ApiError(500, "Error while uploading on redis")
    }
}

export {uploadOnRedis};
