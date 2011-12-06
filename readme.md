# NodeServ    

**Host multiple NodeJS Applications and legacy code (php, rails, etc) using node-http-proxy**

---  
**Overview**  
I wanted to be able to host multiple NodeJS applications and legacy applications (PHP, Rails, etc) all on the same machine. One option is to use **NGINX** as a proxy server but then you can't utilize the full power of WebSockets in your NodeJS apps. see: [https://github.com/LearnBoost/socket.io/wiki/Nginx-and-Socket.io](https://github.com/LearnBoost/socket.io/wiki/Nginx-and-Socket.io)

Why not just make a NodeJS application to handle all requests to your webserver (port 80) and then proxy the requests on through to your running NodeJS apps based on the hostname / domain name, etc. Everything else can then be sent to NGINX or Apache running on another port like 8080 for example.

This just feels *right* to me, but maybe it's crazy. Let me know what you think.  
  
Thanks to **Nodejitsu** for the wonderful [node-http-proxy](https://github.com/nodejitsu/node-http-proxy) NPM package, it's RAD!  

--- 

### How to do it...
   
1. Download the source  
2. `cd` into the nodeserv directory  
3. type `npm install` to pull down `http-proxy` npm module dependency  
4. edit `server.js` and modify the `router` object per your needs  
5. start your NodeJS apps and legacy apps or servers (NGINX, Apache, etc)  
6. save and fire up the server `sudo node server.js` (sudo is required if you bind to port 80)  
  
  
An example router configuration could look like:   
   
    router: {
      'example': '127.0.0.1:8001',
      'super-awesome-site.com': '127.0.0.1:8002',
      'kittens.example.com': '127.0.0.1:8003',
      // Send everything else to an NGINX instance running on port 8080
      '[^/]*': '127.0.0.1:8080'
    }
   
Now when you access `example` you'll get to the App that is running on port 8001 (in our case a nifty NodeJS 
app). If you visit `super-awesome-site.com` you'll get to the app on port 8003, etc...

---  

### Notes

Make sure to add entries to your hosts file, usually at `/etc/hosts`.:

    127.0.0.1 example
    127.0.0.1 super-awesome-site.com
    127.0.0.1 kittens.example.com
    # ...etc
    
Make sure you're NodeJS apps are running, you can do something simple: `node some-server.js &&` or more complex.

Make sure if you change your NGINX or Apache to run on port 8080 that you update all of your VirtualHost configs to reflect that change!

