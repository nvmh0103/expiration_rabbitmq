const amqplib = require('amqplib');

var amqp_url = 'amqp://localhost:5672';

async function produce(){
    console.log("Publishing");
    var conn = await amqplib.connect(amqp_url, "heartbeat=60");
    var ch = await conn.createChannel()
    var exch = 'test_exchange';
    var q = 'test_queue';
    var rkey = 'test_route';
    var msg = 'Hello World!';
    await ch.assertExchange(exch, "x-delayed-message", {durable: true,arguments: {'x-delayed-type':  "direct"}}).catch(console.error);
    await ch.assertQueue(q, {durable: true});
    await ch.bindQueue(q, exch, rkey);
    await ch.publish(exch, rkey, Buffer.from(msg),{headers:{"x-delay": 5000}});
    setTimeout( function()  {
        ch.close();
        conn.close();},  500 );
}
produce();