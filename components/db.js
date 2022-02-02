const db = require('mongoose');

const URL = 'mongodb://localhost:27017/mydbname'

module.exports = () => {
    const connect = () => {
        db.connect(URL,
            {
                keepAlive: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
        },
        (err) => {
            if(err){
                console.log('error')
            }
        }
        )
    }
    connect();
}