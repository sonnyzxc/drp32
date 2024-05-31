package userDetails

type Request struct {
	Email    string `json:"email"`
	Name     string `json:"name"`
	FamilyID int64  `json:"familyID"`
}
