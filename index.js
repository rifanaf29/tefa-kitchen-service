require('dotenv').config()
const amqp = require("amqplib");
const amqpServer = process.env.AMQP_URL;
let channel, connection;
process.setMaxListeners(0);

connectToQueue();

async function connectToQueue() {
    try {
        connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();
        await channel.assertQueue("order");
        channel.consume("order", data => {
            console.log(`Order received: ${data.content}`);
            channel.ack(data);
            console.log("Will be cooked soon!\n")
            createWaiter(data.content)
        });
    } catch (ex) {
        console.error(ex);
    }
}

const createWaiter = async waiter => {
    await sleep(5000);
    const queue = "waiter";
    await channel.sendToQueue(queue, waiter);
    console.log("Order ready to be served, sending to waiter.")
    process.once('SIGINT', async () => { 
        console.log('got sigint, closing connection');
        await channel.close();
        await connection.close(); 
        process.exit(0);
    });
};

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}