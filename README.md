"# backend-hapi" 
Migrate File menggunakan package 
npm install -g db-migrate
npm install -g db-migrate-pg

untuk menjalankannya menggunakan command : db-migrate up initialize

dan untuk file .env
struktunya 

## Server
PORT=8080
HOST=localhost

## DB 
DB_PORT = 5432
DB_HOST = localhost
DB_USER = postgres
DB_PASSWORD =  ## password
DB_NAME = test

## open api 
OPEN_API = ## api untuk get data
