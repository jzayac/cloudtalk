
node:
	cd nodejs && docker-compose up

golang:
	cd go && docker-compose up

clean:
	cd go && docker-compose down --volumes
	cd nodejs && docker-compose down --volumes
