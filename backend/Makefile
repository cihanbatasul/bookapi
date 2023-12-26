include .env
MIGRATIONS_DIR = migrations
TIMEZONE = utc
MIGRATIONS_NAME=books_migrations
create_docker_container:
	docker run --name ${DB_DOCKER_CONTAINER} -p 5433:5432 -e POSTGRES_USER=${USER} -e POSTGRES_PASSWORD=${PASSWORD} -d postgres:12-alpine

create_db:
	docker exec -it ${DB_DOCKER_CONTAINER} createdb --username=${USER} --owner=${USER} ${DB_NAME}

connect_db_terminal:
	docker exec -it ${DB_DOCKER_CONTAINER} psql -U intero -d ${DB_NAME}

migrations_create:
	migrate create -ext sql -dir ${MIGRATIONS_DIR} -seq ${MIGRATIONS_NAME} 

migrate_up:
	migrate -path ${MIGRATIONS_DIR} -database "postgres://${USER}:${PASSWORD}@${HOST}:${DB_PORT}/${DB_NAME}?sslmode=disable" -verbose up

migrate_down:
	migrate -path ${MIGRATIONS_DIR} -database "postgres://${USER}:${PASSWORD}@${HOST}:${DB_PORT}/${DB_NAME}?sslmode=disable" -verbose down

build:
	if [ -f "${BINARY}" ]; then \
		rm ${BINARY}; \
		echo "Deleted ${BINARY}"; \
	fi
	@echo "Building binary..."
	go build -o ${BINARY} ./cmd/web/main.go

run: build
	cd ${APP_DIR} && ./${BINARY}
	@echo "Binary started!"

tidy:
	go mod tidy
