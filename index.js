var app = require('./src/app')
var config = require('./config')

app.listen(config.PORT, function () {
    console.log(`listening on port ${config.PORT}`)
})

