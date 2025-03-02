// import { Kafka, logLevel } from "kafkajs";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";
// import dotenv from "dotenv";

// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const caPath = path.resolve(__dirname, "../../src/config/ca.pem");

// const kafka = new Kafka({
//   brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
//   ssl: true,
//   sasl: {
//     mechanism: "plain",
//     username: process.env.KAFKA_USERNAME,
//     password: process.env.KAFKA_PASSWORD,
//   },
// });

// export const producer = kafka.producer();
// export const consumer = kafka.consumer({ groupId: "chats" });

// export const connectKafkaProducer = async () => {
//   await producer.connect();
//   console.log("Kafka Producer connected...");
// };
import { Kafka, logLevel } from "kafkajs";
import dotenv from "dotenv";

dotenv.config();

const kafka = new Kafka({
  clientId: "chats",
  brokers: ["localhost:9092"], // Use Kafka service name from docker-compose
  logLevel: logLevel.INFO,
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "chats" });

export const connectKafkaProducer = async () => {
  try {
    await producer.connect();
    console.log("✅ Kafka Producer connected...");
  } catch (error) {
    console.error("❌ Kafka Producer connection failed:", error);
  }
};

// export const connectKafkaConsumer = async () => {
//   try {
//     await consumer.connect();
//     console.log("✅ Kafka Consumer connected...");
//   } catch (error) {
//     console.error("❌ Kafka Consumer connection failed:", error);
//   }
// };
