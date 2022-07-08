# NODEJS-BOILERPLATE
nodejs-boilerplate-rest-api

LOAD-BALANCING
Load-Balancer :
	A load balancer acts as the traffic cop sitting in front of your application servers and routing client requests across all servers capable of fulfilling those requests in a manner that maximizes speed and capacity utilization and ensures that no one server is overworked, which could degrade performance.

Using Cluster Module: NodeJS has a built-in module called Cluster Module to take the advantage of a multi-core system. Using this module you can launch NodeJS instances to each core of your system. Master process listening on a port to accept client requests and distribute across the worker using some intelligent fashion. So, using this module you can utilize the working ability of your system.
