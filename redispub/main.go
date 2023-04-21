package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/go-redis/redis/v8"
	"github.com/rs/cors"
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

	// Configuración de CORS
	c := cors.Default()
	corsHandler := c.Handler

	// Inicializar el contador en 0
	counter := 0

	// Ruta para recibir los votos
	http.HandleFunc("/votar", func(w http.ResponseWriter, r *http.Request) {
		// Decodificar el JSON del cuerpo de la solicitud
		decoder := json.NewDecoder(r.Body)
		var voto Voto
		err := decoder.Decode(&voto)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// Incrementar el contador y obtener el nuevo valor
		counter = int(rdb.Incr(context.Background(), "contador_votos").Val())

		// Insertar el voto en Redis
		json, err := json.Marshal(voto)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		err = rdb.Publish(context.Background(), "votos", json).Err()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		// Insertar el voto en Redis

		key := fmt.Sprintf("voto:%d", counter)
		err = rdb.Set(context.Background(), key, json, 0).Err()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		// Responder con un mensaje de éxito y el contador de votos
		fmt.Fprintf(w, "¡Gracias por votar! (%d votos registrados)", counter)
	})

	// Iniciar el servidor HTTP con CORS
	err := http.ListenAndServe(":8080", corsHandler(http.DefaultServeMux))
	if err != nil {
		log.Fatal("Error al iniciar el servidor HTTP:", err)
	}
}