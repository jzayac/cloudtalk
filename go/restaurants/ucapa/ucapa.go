package ucapaRestaurant

import (
	"io"
	"regexp"
	"strings"

	"cloudtalk/model"

	"github.com/PuerkitoBio/goquery"
)

type ucapa struct {
	url   string
	title string
}

func (a ucapa) GetUrl() string {
	return a.url
}

func (a ucapa) Parse(body io.ReadCloser) (*model.Restaurant, error) {
	doc, err := goquery.NewDocumentFromReader(body)

	if err != nil {
		return nil, err
	}

	var dayOffer []model.Day

	doc.Find(".row.mb-4").Each(func(i int, s *goquery.Selection) {
		dayName := s.Find(".day").Text()
		date := s.Find(".date").Text()

		var meals []model.Meal
		s.Find(".row").Each(func(j int, sj *goquery.Selection) {
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

func New() *ucapa {
	return &ucapa{
		url:   "https://www.pivnice-ucapa.cz/denni-menu.php",
		title: "PIVNICE U CAPA",
	}
}
