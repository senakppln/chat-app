const WebSocket = require('ws');
const assert = require('assert');

const WS_URL = 'ws://localhost:3000';

async function testWebSocketMessaging() {
  console.log('Test: WebSocket üzerinden mesajlaşma...');
  
  const client1 = new WebSocket(WS_URL);
  const client2 = new WebSocket(WS_URL);

  let messageReceived = false;

  client2.on('message', (message) => {
    console.log('Client 2 mesaj aldı:', message.toString());
    assert.strictEqual(
      message.toString(),
      'Test Message',
      'Client 2 yanlış mesaj aldı.'
    );
    messageReceived = true;
  });

  client1.on('open', () => {
    console.log('Client 1 bağlandı, mesaj gönderiyor...');
    client1.send('Test Message');
  });

  client2.on('open', () => {
    console.log('Client 2 bağlandı, mesaj bekleniyor...');
  });

  await new Promise((resolve) => {
    setTimeout(() => {
      client1.close();
      client2.close();
      assert.ok(messageReceived, 'Client 2 mesaj almadı.');
      console.log('✔ Test başarılı!');
      resolve();
    }, 1000); 
  });
}
testWebSocketMessaging().catch((err) => {
  console.error('❌ Test başarısız:', err.message);
  process.exit(1);
});
