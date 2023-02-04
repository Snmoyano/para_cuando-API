const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()
const routerModels = require('./routes/models.router')
const db = require('./database/models')
const app = express()
const PORT = process.env.PORT || 8000
const authRouter = require('./routes/auth.routes')
const swaggerUI = require('swagger-ui-express')
const swaggerDoc = require('./swagger.json')
const routerErrorHandler = require('./routes/errorhandler.router')

///arriba
/*
Cors Settings
*/
const whitelist = ['http://localhost:8000']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Denied By CORS'))
    }
  },
}

if (process.env.NODE_ENV === 'production') {
  app.use(cors())
  /* Set security HTTP headers */
  /* For Error ERR_BLOCKED_BY_RESPONSE.NotSameOrigin 200 
       https://stackoverflow.com/questions/70752770/helmet-express-err-blocked-by-response-notsameorigin-200
  */
  app.use(helmet({ crossOriginResourcePolicy: false }))
} else {
  app.use(cors())
}

/*
Accept Json & form-urlencoded
*/
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*
Routes

*/
//

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))

//

/* 
    Tell everyone the state of your api
*/
app.get('/', ({ res }) => {
  return res.json({
    api: 'API Join Momentum',
    state: 'Up and Running',
    version: '1.0.0',
  })
})

routerModels(app)
routerErrorHandler(app)

app.listen(PORT, () => {
  console.log(`Server on PORT: ${PORT}`)
})
