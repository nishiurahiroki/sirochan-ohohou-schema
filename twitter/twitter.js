const Twitter = require('twitter')
const AuthInfo = require('./authInfo')
const client = new Twitter(AuthInfo)

module.exports.getTweet = ({target}) => {
  const param = {
    screen_name : target,
    count : 200
  }

  return new Promise((resolve, reject) => {
    client.get('statuses/user_timeline', param, (error, tweets, response) => {
      if(error) {
        return reject(error, response)
      }

      resolve(tweets, response)
    })
  })
}
