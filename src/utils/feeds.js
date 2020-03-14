import RSSParser from 'rss-parser'

const parser = new RSSParser()
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

function getFeeds(context) {
  context.feedUrls.forEach(url => {
    parser.parseURL(CORS_PROXY + url, function (err, feed) {
      context.feeds.push(feed)
    })
    context.feedLoader = false
  })
}

export { getFeeds }
