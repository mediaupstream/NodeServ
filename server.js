var proxy = require('http-proxy'), port = 80;
proxy.createServer({
  router: {
    // Three different nodejs apps/servers
    'nodejs-1.example.com': '127.0.0.1:8001',
    'nodejs-2.example.com': '127.0.0.1:8002',
    'nodejs-3.example.com': '127.0.0.1:8003',
    // ... add more domains/servers here like for rails, example:
    // 'a-rails-app.com': '127.0.0.1:3000',    
    // Send everything else to Apache or NGINX or wherever.
    '[^/]*': '127.0.0.1:8080'
  }
}).listen(port);

console.log("= NodeServ: running on port "+port);