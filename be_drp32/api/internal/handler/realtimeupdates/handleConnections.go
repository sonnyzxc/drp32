package realtimeupdates

import (
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true // Allow all origins, change this for production
	},
}

var clients = make(map[*websocket.Conn]bool)
var Broadcast = make(chan []byte)

func (h Handler) HandleConnections() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ws, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Fatalf("Failed to upgrade: %v", err)
			return
		}
		defer ws.Close()

		clients[ws] = true

		for {
			_, msg, err := ws.ReadMessage()
			if err != nil {
				log.Printf("Error reading message: %v", err)
				delete(clients, ws)
				break
			}
			log.Printf("[Websocket] RTU: messsage from user %s: %s", r.Host, msg)
		}
	}
}

func HandleMessages() {
	for {
		msg := <-Broadcast
		for client := range clients {
			err := client.WriteMessage(websocket.TextMessage, msg)
			if err != nil {
				log.Printf("Error writing message: %v", err)
				client.Close()
				delete(clients, client)
			}
		}
	}
}
