## NestJS DDD (Domain Drive Design) MongoDB - Oracle - Kafka Project Structure

Nestjs DDD REST API  template ready to use 
### Getting start

### Project structure 📂

```
├── .env.sample
├── Readme.md
├── package.json
├── .github
│   ├── helm
│   │   └── values-development.yml
│   └── workflows
│       └── pipeline.yml
│       └── datadog.yml
│       └── pull-request.yml
├── oas
└── src
    ├── application                      
    │          ├── [name …]                       
    │          │      └── controllers
    |          |	  	       └── [name..].controller.ts
    │          └── health
    |                └──  controllers
    |   	  	               └── health.controller.ts
    ├── common
    |     └── constants
    |     └── helpers 
    |     └── interfaces
    ├── config
    |	    ├── databases
    |	    |	        └──[....]
    |     └── queue     
    |     └── swagger
    |     └── logger
    |
    ├── domain
    |	         └── [....]	
    ├── infrastructure
    |           └── repositories
    |                  ├── databases
    |                  |      └── mongo
    |	                 |      └── oracle
    |                  └── queue   	
    |	         	              └──  kafka		
    |      
    ├── main.ts
    ├── app.module.ts
```

### Running the project
```
 # Development mode
 	$ npm run start   #or 
	$ yarn start
	
#  Watch mode
    $ npm run start:dev    #or 
	$ yarn dev
	
#  Production mode
   $ npm run start:prod    #or
```
