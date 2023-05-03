package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"

	"github.com/go-redis/redis/v8"
	_ "github.com/go-sql-driver/mysql"
)

type Voto struct {
	Sede         int    `json:"sede"`
	Municipio    string `json:"municipio"`
	Departamento string `json:"departamento"`
	Papeleta     string `json:"papeleta"`
	Partido      string `json:"partido"`
}

func main() {
	// Configurar la conexión con Redis
	rdb := redis.NewClient(&redis.Options{
		Addr:     "104.154.28.100:6379",
		Password: "", // no hay contraseña
	})

	// Configurar la conexión con MySQL
	db, err := sql.Open("mysql", "root:mysql1234@tcp(35.192.54.180:3306)/Proyecto1")
	if err != nil {
		log.Fatal("Error al conectar a MySQL:", err)
	}

	// Crear un subscriptor de Redis
	sub := rdb.Subscribe(context.Background(), "votos")
	defer sub.Close()
	fmt.Println("Iniciando Redis Sub")
	// Procesar los mensajes recibidos
	for {
		msg, err := sub.ReceiveMessage(context.Background())
		if err != nil {
			log.Println("Error al recibir mensaje de Redis:", err)
			continue
		}

		// Decodificar el voto
		var voto Voto
		err = json.Unmarshal([]byte(msg.Payload), &voto)
		if err != nil {
			log.Println("Error al decodificar el voto:", err)
			continue
		}

		// Insertar el voto en MySQL
		stmt, err := db.Prepare("INSERT INTO votos(no_sede, municipio, departamento, papeleta, partido) VALUES(?, ?, ?, ?, ?)")
		if err != nil {
			log.Println("Error al preparar la consulta de inserción:", err)
			continue
		}

		_, err = stmt.Exec(voto.Sede, voto.Municipio, voto.Departamento, voto.Papeleta, voto.Partido)
		if err != nil {
			log.Println("Error al insertar el voto en MySQL:", err)
			continue
		}

		fmt.Println("Voto insertado en MySQL:", voto)
	}
}