const parser = new DOMParser()

function getFeeds(context, feeds) {
  feeds.forEach(feed => {
    context.$http.get(`https://cors-anywhere.herokuapp.com/${feed}`).then(data => {
      data.text().then(text => {
        let xml = parser.parseFromString(text, "text/xml")

        let rawItems = xml.getElementsByTagName('item')
        let items = []
        for (let i = 0; i < rawItems.length; i++) {
          let item = rawItems[i]
          items.push({
            title: item.getElementsByTagName('title')[0].innerHTML,
            link: item.getElementsByTagName('link')[0].innerHTML,
            date: item.getElementsByTagName('pubDate')[0].innerHTML
          })
        }

        context.feeds.push({
          name: xml.getElementsByTagName('title')[0].innerHTML,
          items
        })
      })
    })
  })
}

export { getFeeds }
