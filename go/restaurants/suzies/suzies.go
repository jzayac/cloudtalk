package suziesRestaurant

import (
	"io"
	"regexp"
	"strings"

	"cloudtalk/model"

	"github.com/PuerkitoBio/goquery"
)

type suzies struct {
	url   string
	title string
}

func (a suzies) GetUrl() string {
	return a.url
}

func (a suzies) Parse(body io.ReadCloser) (*model.Restaurant, error) {
	doc, err := goquery.NewDocumentFromReader(body)

	if err != nil {
		return nil, err
	}

	var dayOffer []model.Day

	doc.Find("#weekly-menu .day").Each(func(i int, s *goquery.Selection) {

		title := s.Find("h4").Text()
		arr := strings.Fields(title)
		dayName := arr[0]
		date := arr[1]

		var meals []model.Meal
		s.Find(".item").Each(func(j int, sj *goquery.Selection) {

			description := sj.Find(".title").Text()

			if description == "" {
				description = sj.Find(".text").Text()
			}

			description = strings.TrimSpace(description)
			space := regexp.MustCompile(`\s+`)
			description = space.ReplaceAllString(description, " ")

			if len(description) > 50 {
				description = description[:49]
			}

			price := strings.TrimSpace(sj.Find(".price").Text())

			meals = append(meals, model.Meal{
				Description: description + " " + price + " Kc",
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

func New() *suzies {
	return &suzies{
		url:   "http://www.suzies.cz/poledni-menu.html",
		title: "SUZIES STEAK PUB",
	}
}
