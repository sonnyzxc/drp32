FROM golang:1.18

RUN apt-get update

# Copy the source from the current directory to the Working Directory inside the container
COPY . .

WORKDIR ./api

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download && go mod verify

RUN go install golang.org/x/tools/cmd/goimports@v0.1.10

# Install SQLBoiler and the PostgreSQL driver
RUN go install github.com/volatiletech/sqlboiler/v4@v4.15.0 && \
    go install github.com/volatiletech/sqlboiler/v4/drivers/sqlboiler-psql@v4.15.0

RUN go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest

RUN go mod vendor

# Command to run SQLBoiler, migrate the database, and then run the app
CMD ["sh", "-c", "migrate -path ./data/migrations -database ${DATABASE_URL} up && go run -mod=vendor cmd/${PROJECT_NAME}/*.go"]
