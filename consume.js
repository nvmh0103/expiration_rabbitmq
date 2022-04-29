const amqplib = require('amqplib');

var amqp_url ='amqp://localhost:5672';

async function do_consume() {
    var conn = await amqplib.connect(amqp_url, "heartbeat=60");
    var ch = await conn.createChannel()
    var q = 'test_queue';
    await conn.createChannel();
    await ch.assertQueue(q, {durable: true});
    while (1){
        await ch.consume(q, function (msg) {
            console.log(msg.content.toString());
            ch.ack(msg);
            });
    }
    
    setTimeout( function()  {
        ch.close();
        conn.close();},  10000 );
}

do_consume();