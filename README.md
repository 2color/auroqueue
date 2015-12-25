# Auro Queue
==========

A queue management system for Auroville. Build with modern open source technologies. 

## The Goal:
Create a simple queue management system for the Auroville Financial Services. Made to run on a Raspberry Pi together with a switch for token handout and screen to display queue status and other pluggable widgets. 

## The Stack:

**Javascript** - Almost the whole application is build with Javascript. ES2015 aka ECMAScript 6 is used for its invaluable syntactic sugar making the code readable.

**Node.js** - Because it's fast, easy to get started, and ubiquitous. Version 4.* LTS is used for long term support, stability and security.
[http://nodejs.org/](http://nodejs.org/)

**Hapi** - A very well designed server framework that is easy to understand, and most importantly well documented.  Used in production by Yahoo, Walmart, Paypal and many others. 
Hapi is build in a modular manner which means it requires some plugins.
[good] - process monitoring
[good-console] - console reporter
[inert] - static file serving plugin
[lab] - simple test utility
[code] - asertion library
[http://hapijs.com/](http://hapijs.com/)

**Socket.IO** - a JavaScript library for realtime web applications. It enables realtime, bi-directional communication between web clients and servers. Auro Queue only uses Server -> Client communication. Socket.IO was chosen for its simplicity, reliability and compatibility. 
[http://socket.io/](http://socket.io/)

**Pure.css** - A tiny responsive css framework to make developers look like they have an idea about design.
[http://purecss.io/](http://purecss.io/)


### Raspberry Pi config
it was added to the 192.168.10.1 network for installation and debugging. The configuration for that should be removed once it's fully setup.
Additionally the root password has been changed. That too should be reverted.

### Requirements:
Install Node.js by following the following guide [http://blog.wia.io/installing-node-js-v4-0-0-on-a-raspberry-pi/](following guide).

After Node.js is installed, run `npm install` to install all dependencies.

PM2 is required as a process manager for node which will make sure Auroqueue stays up.

To install pm2 globally
```
$ npm install -g pm2
```

Start the server by running the command:
```
$ npm start
```

Now all of your server html and js files are being watched and on change the node server gets restarted automatically.

#### Premature Optimizations
> "Premature optimization is the root of all evil”
It is always so tempting. Great efforts have been made to avoid these. A proper build system, minification, uglification etc. are not here for a reason.


#### Folder Structure
There are two main folders in the stack. The "**public**" folder for front-end (client side) code. All files within are served under the path `/public/`

The "**server**" folder contains server side code with the exception of the `server.js` file in the root.