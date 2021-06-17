package restaurants

import (
	"io"
	"log"
	"net/http"

	"cloudtalk/model"
)

type facility interface {
	Parse(io.ReadCloser) (*model.Restaurant, error)
	GetUrl() string
}

type renderer interface {
	Render(*model.Restaurant)
}

type Fetch struct {
	body     io.ReadCloser
	facility facility
	rend     renderer
}

func (a Fetch) Get() {
	url := a.facility.GetUrl()
	resp, err := http.Get(url)
	if err != nil {
		log.Fatalln(err)
	}

	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		log.Fatalf("status code error: %d %s", resp.StatusCode, resp.Status)
	}

	restaurant, err := a.facility.Parse(resp.Body)

	if err != nil {
		log.Fatalln(err)
	}

	a.rend.Render(restaurant)
}

func New(inst facility, rend renderer) *Fetch {
	return &Fetch{
		facility: inst,
		rend:     rend,
	}
}
