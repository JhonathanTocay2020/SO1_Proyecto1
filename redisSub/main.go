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
		Addr:     "localhost:6379",
		Password: "", // no hay contraseña
	})

	// Configurar la conexión con MySQL
	db, err := sql.Open("mysql", "root:mysql1234@tcp(localhost:3306)/Proyecto1")
	if err != nil {
		log.Fatal("Error al conectar a MySQL:", err)
	}

	// Crear un subscriptor de Redis
	sub := rdb.Subscribe(context.Background(), "votos")
	defer sub.Close()

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

/*
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

// Definir un tipo para el objeto Voto
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
		Addr:     "localhost:6379",
		Password: "", // no hay contraseña
	})

	// Configurar la conexión con MySQL
	db, err := sql.Open("mysql", "root:mysql1234@tcp(localhost:3306)/Proyecto1")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Subscribirse a los cambios en la clave "contador_votos"
	pubsub := rdb.Subscribe(context.Background(), "contador_votos")
	defer pubsub.Close()

	// Procesar los mensajes del canal de subscripción
	for msg := range pubsub.Channel() {
		log.Printf("Mensaje recibido: %s\n", msg.Payload)
		// Obtener el valor de la clave "contador_votos"
		counter, err := rdb.Get(context.Background(), "contador_votos").Int64()
		if err != nil {
			log.Println("Error al obtener el valor de contador_votos:", err)
			continue
		}

		// Leer el voto correspondiente a ese contador en Redis
		jsonString, err := rdb.Get(context.Background(), fmt.Sprintf("voto:%d", counter)).Result()
		if err != nil {
			log.Println("Error al obtener el voto:", err)
			continue
		}
		var voto Voto
		err = json.Unmarshal([]byte(jsonString), &voto)
		if err != nil {
			log.Println("Error al decodificar el voto:", err)
			continue
		}

		// Insertar el voto en la base de datos de MySQL
		_, err = db.Exec("INSERT INTO votos(no_sede, municipio, departamento, papeleta, partido) VALUES(?, ?, ?, ?, ?)",
			voto.Sede, voto.Municipio, voto.Departamento, voto.Papeleta, voto.Partido)
		if err != nil {
			log.Println("Error al insertar el voto en MySQL:", err)
			continue
		}

		log.Printf("Voto insertado en MySQL: %+v\n", voto)
	}
}*/
