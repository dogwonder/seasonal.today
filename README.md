## seasonal.today - based on juckWonder

---------------

## License

seasonal.today is licensed under [MIT license](https://github.com/dogwonder/juckWonder/blob/master/LICENSE). 

* [Eat the Seasons](http://www.eattheseasons.co.uk/)
* [BBC Good Food](https://www.bbcgoodfood.com/seasonal-calendar/)
* [Love British Food](http://www.lovebritishfood.co.uk/british-food-and-drinks/whats-in-season-when)


### SVG Sprite

Gulp tasks

`svgsprite`
`move-iconsa`

```
<span class="icon svg-fruit--{{ fruit.name | lower |  replace(" ", "_") }}"></span>
<span class="icon svg-vegetables--{{ vegetable.name | lower |  replace(" ", "_") }}"></span>
<span class="icon svg-herbs--{{ herb.name | lower |  replace(" ", "_") }}"></span>
```

### SVG icons

```
<img class="icon" src="images/icons/fruit/{{ fruit.name | lower |  replace(" ", "_") }}.svg" alt="{{ fruit.name }}"> 
<img class="icon" src="images/icons/vegetables/{{ vegetable.name | lower |  replace(" ", "_") }}.svg" alt="{{ vegetable.name }}">
<img class="icon" src="images/icons/herbs/{{ herb.name | lower |  replace(" ", "_") }}.svg" alt="{{ herb.name }}">
```



