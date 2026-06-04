import { connect } from "amqplib";



const connectToRabbitMQ = async () => {
    try {
        const connection = await connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        return { connection, channel };
    } catch (error) {
        console.error("the broker connection error : ", error)
    }
}

const sendMessageToQueue = async (channel, queueName, message) => {
    try {
        await channel.assertQueue(queueName, {
            durable: true 
        });

        await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
        console.log(`Message sent to queue: ${queueName}`);
        
    } catch (error) {
        console.error("the broker send message error : ", error)
    }
}
export { connectToRabbitMQ , sendMessageToQueue };