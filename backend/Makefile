include .env


build:
	if [ -f "${BINARY}" ]; then \
		rm ${BINARY}; \
		echo "Deleted ${BINARY}"; \
	fi
	@echo "Building binary..."
	go build -o ${BINARY} cmd/web/main.go

run: build
	./${BINARY}
	@echo "binary started!"

tidy:
	go mod tidy

