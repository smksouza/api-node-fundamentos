import http from 'node:http'
import { json } from './middleware/json.js'
import { routes } from './routes.js'



const serve = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if (route) {
        const routeParams = req.url.match(route.path)
        console.log(routeParams)

        return route.handler(req, res)
    }
    return res.writeHeader(404).end()
})

serve.listen(3333)