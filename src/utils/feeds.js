import RSSParser from 'rss-parser'
import { error, log} from '@/utils/logger'

const parser = new RSSParser()
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'

function getFeeds(context, list) {
  list.forEach(url => {
    context.feedsLoaded = false
    parser.parseURL(CORS_PROXY + url, function (err, feed) {
      if (err !== null) {
        error('Feeds', `Error receiving feed at URL ${url}. Vérifiez l'orthographe de votre lien ou la disponibilité du service.`, err)
      }
      log('Feeds', 'log', `Received feed ${feed.title}`)
      feed.page = 1
      context.feeds.push(feed)
      feed.items.forEach(item => {
        item.feedUrl = feed.feedUrl
        context.feedItems.push(item)
      })
      context.feedItems.sort((a,b) => {
        const dateA = new Date(a.pubDate).getTime()
        const dateB = new Date(b.pubDate).getTime()
        return (dateA > dateB) ? -1 : ((dateB > dateA) ? 1 : 0)
      })
      context.feedsLoaded = true
    })
  })
}

export { getFeeds }
