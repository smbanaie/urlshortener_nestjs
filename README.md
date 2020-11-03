<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

A minimal URL Shortener  App Build With  [Nest] js app (https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Prerequisites

- make sure that the ***Redis Server*** is up 
  
  -  if you have changed the redis default settings, set the the correct redis host and port in `config/redis.config.ts` file 
  
- make sure that the postgres (I used V12) is running 
  - Set the *Credentials* in `config/de.config.ts` (configuration class)
  - create the database `shortener_development` manually 
  
- Run Cassandra and in cqlsh  (cassandra default cmd) run these codes: 

  - ``` sql
    Create keyspace Analytics with replication={'class':SimpleStrategy,'replication_factor': 1};
    ```

  - 



## Running the app

```bash
# Build The DB
$ npm run db:migrate

# Run in Dev Mode
$ npm run start:dev

# Check The Swagger 
http://localhost:3000

```



- Author - [Mojtaba Banaei](https://banaie.ir)

