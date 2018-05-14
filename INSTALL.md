# Installation Guide

## Prerequisites
- Docker
- Docker Compose

## Setup
1. docker volume create --name ows-auth-service-postgres
1. docker-compose build

## Running the server
	docker-compose up &>log/docker.log &

Server will be listening on http://localhost:3000

## Running the tests
