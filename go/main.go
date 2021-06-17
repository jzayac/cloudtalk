package main

import (
	rest "cloudtalk/restaurants"
	suzies "cloudtalk/restaurants/suzies"
	ucapa "cloudtalk/restaurants/ucapa"
	veroni "cloudtalk/restaurants/veroni"

	"cloudtalk/template"
)

func main() {

	rest.New(veroni.New(), template.Basic{}).Get()
	rest.New(ucapa.New(), template.Basic{}).Get()
	rest.New(suzies.New(), template.Basic{}).Get()

}
