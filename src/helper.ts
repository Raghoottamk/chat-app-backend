import prisma from "./config/db.config.js";
import { producer, consumer } from "./config/kafka.config.js";

export const produceMessage = async (topic: string, message: any) => {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
};

// export const consumeMessages = async (topic: string) => {
//   await consumer.connect();
//   await consumer.subscribe({ topic: topic });

//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       const data = JSON.parse(message.value.toString());
//       console.log({
//         partition,
//         offset: message.offset,
//         value: data,
//       });

//       await prisma.chats.create({
//         data: data,
//       });

//       // Process the message (e.g., save to DB, trigger some action, etc.)
//     },
//   });
// };
export const consumeMessages = async (topic: string) => {
  console.log("🚀 Starting Kafka Consumer...");
  try {
    await consumer.connect();
    console.log(`✅ Kafka Consumer connected to broker.`);

    await consumer.subscribe({ topic });
    console.log(`✅ Subscribed to topic: ${topic}`);

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`📩 Received message from topic: ${topic}`);
        console.log({
          partition,
          offset: message.offset,
          value: message.value?.toString(),
        });

        const data = JSON.parse(message.value.toString());

        await prisma.chats.create({
          data: data,
        });
      },
    });
  } catch (error) {
    console.error("❌ Kafka Consumer error:", error);
  }
};
