import amqplib from "amqplib";

// Singleton — reuse one connection + channel across the app
let _connection = null;
let _channel = null;

// Connect once, reuse everywhere. Re-throws on failure so callers
// know the broker is down instead of silently getting undefined.
const connectToRabbitMQ = async () => {
  if (_channel && _connection) {
    return { connection: _connection, channel: _channel };
  }

  const connection = await amqplib.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();

  // Auto-reconnect on unexpected close
  connection.on("error", (err) => {
    console.error("[RabbitMQ] Connection error:", err.message);
    _connection = null;
    _channel = null;
  });

  connection.on("close", () => {
    console.warn("[RabbitMQ] Connection closed — will reconnect on next send");
    _connection = null;
    _channel = null;
  });

  _connection = connection;
  _channel = channel;

  console.log("[RabbitMQ] Connected ✓");
  return { connection, channel };
};

// Assert the queue once per queue name (cached), not on every send
const _assertedQueues = new Set();

const sendMessageToQueue = async (channel, queueName, message) => {
  // Assert queue only once per process lifetime
  if (!_assertedQueues.has(queueName)) {
    await channel.assertQueue(queueName, { durable: true });
    _assertedQueues.add(queueName);
  }

  const sent = channel.sendToQueue(
    queueName,
    Buffer.from(JSON.stringify(message)),
    { persistent: true }
  );

  if (!sent) {
    // Buffer full — message IS queued, but wait for drain before sending more
    console.log("[RabbitMQ] Backpressure — waiting for drain...");
    await new Promise((resolve) => channel.once("drain", resolve));
  }

  console.log(`[RabbitMQ] Message sent to queue: ${queueName}`);
  return true;
};

export { connectToRabbitMQ, sendMessageToQueue };