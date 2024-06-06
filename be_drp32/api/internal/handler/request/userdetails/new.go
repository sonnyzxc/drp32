package userdetails

type Request struct {
	Email    string `json:"email"`
	Name     string `json:"name"`
	FamilyID int64  `json:"familyID"`
	Admin    bool   `json:"admin"`
}
