const express = require('express')
const expressGraphQl = require('express-graphql')
const {buildSchema} = require('graphql')

const twitter = require('./twitter/twitter.js')

const schema = buildSchema(`
  type Query {
    ohoHou : [String]
  }
`)

const ohoHou = twitter
                .getTweet({target : 'SIROyoutuber'})
                .then(tweets => tweets.map(tweet => tweet.text))
                .then(texts => texts.filter(text => text.match(/【オホー報】/)))

const app = express()
app.use('/graphql', expressGraphQl({
  schema,
  rootValue : { ohoHou },
  graphiql : true
}))

app.listen(80, () => console.log('running graphql server.'))
