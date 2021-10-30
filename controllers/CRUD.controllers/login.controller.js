const axios = require('axios')
const logger = require('../../config-log/logger')
const params = new URLSearchParams()
const config = {
    headers: {
     'Content-Type': 'application/x-www-form-urlencoded'
        //'Content-Type': 'application/row'
        //'Content-Type': 'application/x-www-form-urlencoded'
    }
}
const endpoint = 'http://localhost:8080/auth/realms/Finance_Excel/protocol/openid-connect/token'

exports.login = (req, res) => {

    const { username, password } = req.body
 
    logger.info('POST/login')
    logger.info(req.body)
    
    if (!username){
        logger.warn('Username empty')
        res.status(400).json({ 
            resultCode: '001' ,
            resultDesc: 'Enter your name' 
        })
    }  
    else if (!password){
        logger.warn('Password empty')
        res.status(400).json({ 
            resultCode: '002' ,
            resultDesc: 'Enter your password' 
        })
    }
    else {
        params.append('grant_type', 'password')
        params.append('client_id', 'Finance_Excel')
        params.append('client_secret', 'b108a043-1f19-4997-97c9-9375525d957f')
       
        params.append('username', `${username}`)
        params.append('password', `${password}`)

        logger.info(params)

        axios.post(endpoint, params, config)
            .then((response) => {
                bearerHeader = response.data.access_token;

                logger.info(bearerHeader)
                res.send({ data: bearerHeader, message: `Logined by ${username}` })
                return res.send(bearerHeader);
            })
            .catch((error) => {
                logger.error(error)
                res.status(404).send({ message: "Username or password Incorect" })
            })
    }

}
