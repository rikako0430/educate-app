package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

type Problem struct {
	ID       int      `json:"id"`
	Question string   `json:"question"`
	Answer   []string `json:"answer"`
	Correct  string   `json:"correct"`
}

func main() {
	// MySQLに接続
	db, err := sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/quiz_db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// 接続確認
	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	// HTTPハンドラの設定
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		getProblems(w, r, db)
	})

	fmt.Println("Starting server at port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func getProblems(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	// MySQLからデータを取得
	rows, err := db.Query("SELECT id, question, answer, correct FROM problems")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var problems []Problem
	for rows.Next() {
		var p Problem
		var answerJSON string
		if err := rows.Scan(&p.ID, &p.Question, &answerJSON, &p.Correct); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		// JSON形式のanswerを[]stringに変換
		if err := json.Unmarshal([]byte(answerJSON), &p.Answer); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		problems = append(problems, p)
	}

	// レスポンスの設定
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	json.NewEncoder(w).Encode(problems)
}

// var problems = []Problem{
// 	{ID: 1,
// 		Question: "質問1正解はA",
// 		Answer:   []string{"A", "B", "C", "D"},
// 		Correct:  "A",
// 	},
// 	{ID: 2,
// 		Question: "質問2正解はイ",
// 		Answer:   []string{"ア", "イ", "ウ", "エ"},
// 		Correct:  "イ",
// 	},
// 	{ID: 3,
// 		Question: "質問2正解は3",
// 		Answer:   []string{"1", "2", "3"},
// 		Correct:  "1",
// 	},
// }

// func main() {
// 	http.HandleFunc("/", getProblems)
// 	fmt.Println("Starting server at port 8080")
// 	log.Fatal(http.ListenAndServe(":8080", nil))
// }

// func getProblems(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")
// 	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173") // 追加
// 	json.NewEncoder(w).Encode(problems)
// }
