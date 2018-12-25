var output = {
  reviews: []
}

$browser.get($pageUrl).then(async () => {
  var reviewEls = await $browser.findElements({
    className: 'empReview'
  })
  for (var i = 0; i < reviewEls.length; i++) {
    var getFieldByClass = async (classNameValue) => {
      try {
        var field = await reviewEls[i].findElement({
          className: classNameValue
        })
      } catch (e) {
        return ''
      }
      return field.getText()
    }
    var url = await reviewEls[i].findElement({
      className: 'reviewLink'
    })
    url = await url.getAttribute('href')
    var reviewId = url.match(/RVW([0-9])\w+/)[0]
    try {
      var date = await reviewEls[i].findElement({
        tagName: 'time'
      })
      date = await date.getAttribute('datetime')
    } catch (err) {
      date = null // no date field, probably a Featured Review
    }
    var stars = await reviewEls[i].findElement({
      className: 'value-title'
    })
    stars = await stars.getAttribute('title')
    stars = '*'.repeat(stars)
    var review = {
      reviewId,
      url,
      date,
      summary: await getFieldByClass('summary'),
      stars,
      author: await getFieldByClass('authorInfo'),
      pros: await getFieldByClass('pros'),
      cons: await getFieldByClass('cons'),
      advice: await getFieldByClass('adviceMgmt')
    }
    if (date != null) { // we only care about non-featured/dated reviews
      output.reviews.push(review)
    }
  }
  output.reviews = output.reviews.reduce(function (map, obj) {
    map[obj.reviewId] = obj
    return map
  }, {})
  console.log(JSON.stringify(output, null, 2))
})
