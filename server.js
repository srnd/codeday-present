const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  let server = createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    handle(req, res, parsedUrl)
  }).listen(process.env.PORT, process.env.IP || "0.0.0.0", err => {
    if (err) throw err
    let addr = server.address();
    console.log("> Ready on http://", addr.address + ":" + addr.port);
  })
})