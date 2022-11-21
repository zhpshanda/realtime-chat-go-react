package main

import (
	"fmt"
	"github.com/Etherealsdu/realtime-chat-go-react/pkg/websocket"
	"net/http"
	"strconv"
)

var idChannel = make(chan int)

func genID() {
	var id = 1
	for {
		idChannel <- id
		id++
	}
}
func serveWs(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println("WebSocket Endpoint Hit")

	ws, err := websocket.Upgrade(w, r)
	if err != nil {
		fmt.Fprintf(w, "%+V\n", err)
	}

	client := &websocket.Client{
		ID:   strconv.Itoa(<-idChannel),
		Conn: ws,
		Pool: pool,
	}

	pool.Register <- client
	client.Read()
}

func setupRoutes() {
	pool := websocket.NewPool()
	go pool.Start()

	http.HandleFunc("/ws", func(writer http.ResponseWriter, request *http.Request) {
		serveWs(pool, writer, request)
	})
}

func main() {
	fmt.Println("Distributed Chat App v0.01")
	go genID()
	setupRoutes()
	http.ListenAndServe(":8080", nil)
}
