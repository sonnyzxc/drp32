package choreDetails

type Request struct {
	Description string `json:"description"`
	Points      int    `json:"points"'`
	AssignedTo  int64  `json:"assigned-to"`
	DueDate     string `json:"due-date"`
}
