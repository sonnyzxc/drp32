package choredetails

type Request struct {
	Description string `json:"description"`
	Emoji       string `json:"emoji"`
	Points      int    `json:"points"`
	AssignedTo  int64  `json:"assigned-to"`
	DueDate     string `json:"due-date"`
}
