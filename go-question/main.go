package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type Problem struct {
	ID       int      `json:"id"`
	Question string   `json:"question"`
	Answer   []string `json:"answer"`
	Correct  string   `json:"correct"`
}

var problems = []Problem{
	{ID: 1,
		Question: "質問1正解はA",
		Answer:   []string{"A", "B", "C", "D"},
		Correct:  "A",
	},
	{ID: 2,
		Question: "質問2正解はア",
		Answer:   []string{"ア", "イ", "ウ", "エ"},
		Correct:  "B",
	},
}

func main() {
	http.HandleFunc("/", getFruits)
	fmt.Println("Starting server at port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func getFruits(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173") // 追加
	json.NewEncoder(w).Encode(problems)
}
