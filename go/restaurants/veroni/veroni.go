package veroniRestaurant

import (
	"io"
	"regexp"
	"strings"

	"cloudtalk/model"

	"github.com/PuerkitoBio/goquery"
)

type veroni struct {
	url   string
	title string
}

func (a veroni) GetUrl() string {
	return a.url
}

func (a veroni) Parse(body io.ReadCloser) (*model.Restaurant, error) {
	doc, err := goquery.NewDocumentFromReader(body)

	if err != nil {
		return nil, err
	}

	var dayOffer []model.Day

	doc.Find(".menicka").Each(func(i int, s *goquery.Selection) {

		title := s.Find(".nadpis").Text()
		arr := strings.Fields(title)
		dayName := arr[0]
		date := arr[1]

		// fmt.Printf("%+v\n", title)
		var meals []model.Meal
		s.Find("li").Each(func(j int, sj *goquery.Selection) {
			clean := strings.TrimSpace(sj.Text())
			space := regexp.MustCompile(`\s+`)
			clean = space.ReplaceAllString(clean, " ")

			meals = append(meals, model.Meal{
				Description: clean,
			})
		})

		dayOffer = append(dayOffer,
			model.Day{
				DayName: dayName,
				Date:    date,
				Meals:   meals,
			})

	})

	restaurant := &model.Restaurant{
		Title: a.title,
		Days:  dayOffer,
	}

	return restaurant, nil
}

func New() *veroni {
	return &veroni{
		url:   "https://www.menicka.cz/4921-veroni-coffee--chocolate.html",
		title: "VERONI CAFE",
	}
}
