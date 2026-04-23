const http = require('http');

const data = JSON.stringify({
  email: 'r7729090@gmail.com',
  password: 'password123'
});

console.log('Sending login request...');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log('Response received');
  console.log('Status:', res.statusCode);
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  res.on('end', () => {
    console.log('Response body:', body);
    process.exit(0);
  });
});

req.on('error', (error) => {
  console.error('Request error:', error.message);
  process.exit(1);
});

req.write(data);
req.end();
