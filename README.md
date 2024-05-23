# TEFA Kitchen Service

## Environment Variables
Name     | Desc
---------|-------------
AMQP_URL | RabbitMQ URL

## Prerequisite
> * NodeJS 20
> * RabbitMQ

## Getting Started
> * Clone the repository
```bash
git clone https://github.com/Join-Sistem/tefa-kitchen-service.git
```
> * Install dependencies
```bash
cd tefa-kitchen-service
npm install
```
> * Run the project
```bash
npm start
```

## Usages

> * Check the console logs, should be received messages from tefa-order-service

```bash
Order received: {"name":"Bambang","food":"Mie Goreng","beverage":"Jeruk Es","table_number":"01"}
Will be cooked soon!
```
> * wait for 5s
```bash
Order ready to be served, sending to waiter.
```