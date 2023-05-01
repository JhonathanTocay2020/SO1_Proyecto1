# syntax=docker/dockerfile:1
#Version golang
FROM golang:1.20
WORKDIR /app


COPY go.mod ./
COPY go.sum ./
COPY . .

RUN go mod download

# EXPOSE 3300
RUN go build -o /backendSub

CMD ["/backendSub"]
