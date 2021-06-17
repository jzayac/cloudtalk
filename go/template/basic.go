package template

import (
	"cloudtalk/model"

	"github.com/gookit/color"
)

type Basic struct{}

func (Basic) Render(restaurant *model.Restaurant) {
	color.New(color.Blue, color.BgBlack).Println(restaurant.Title)

	for _, day := range restaurant.Days {
		color.New(color.Green, color.BgBlack).Printf("\t%s\n", day.DayName)
		for _, meal := range day.Meals {
			color.New(color.White, color.BgBlack).Printf("\t\t%s\n", meal.Description)
		}
	}
}
