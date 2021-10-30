const dbcon = require('../../dbconfig/dbconfig')
const logger = require('../../config-log/logger')
//create user

let User = { user_id: 0, user_name: "", user_password: "", user_phone: "", brance_id: 0, permision_id: 0 }
exports.create = (req, res) => {

    try {
        User = req.body
        logger.info('POST/user')
        logger.info(req.body)

        if (User.user_name == "" || User.user_phone == "" || User.permision_id == 0 || User.brance_id == 0) {
            logger.warn('The body cannot empty')
            return res.status(400).send({ message: "Please provide user info" })
        }

        dbcon.query(`insert into tbuser(user_name,user_phone,permision_id,brance_id) values(?,?,?,?)`,
            [User.user_name, User.user_phone, User.permision_id, User.brance_id], (error, result) => {

                if (error) {
                    logger.error(error)
                    res.status(403).send("Error")
                }
                else {
                    logger.info(result)
                    return res.send({ data: result, message: "Created" })
                }

            })
    } catch (error) {
        logger.error(error)
        return res.status(500).send("Something wrong")
    }
}

//update user 

exports.update = (req, res) => {
    try {
        User = req.body
        logger.info('PUT/user')
        logger.info(req.body)
        if (User.user_name == "" || User.user_phone == "" || User.permision_id == 0 || User.brance_id == 0 || User.user_id == 0) {
            logger.warn('The body cannot empty')
            return res.status(400).send({ message: "Please provide user info" })
        }

        dbcon.query(`update tbuser set user_name=?,user_phone=?,permision_id=?,brance_id=? where user_id=?`,
            [User.user_name, User.user_phone, User.permision_id, User.brance_id, User.user_id], (error, result) => {

                if (error) {
                    logger.error(error)
                    res.status(403).send("Error")
                }
                else {
                    logger.info(result)
                    return res.send({ data: result, message: "Updated" })
                }

            })
    } catch (error) {
        logger.error(error)
        return res.status(500).send(error)
    }
}
//delete
exports.delete = (req, res) => {
    try {
        User = req.params
        logger.info('DELTE/user (PUT). By user id: ' + req.params.user_id)
        if (User.user_id == 0) {
            logger.warn('No user for delete')
            return res.status(400).send({ message: "Please provide user id" })
        }

        dbcon.query(`update  tbuser set user_dlst = 0 where user_id=?`,
            [User.user_id], (error, result) => {

                if (error) {
                    logger.error(error)
                    res.status(403).send("Error")
                }
                else {
                    logger.info(result)
                    return res.send({ data: result, message: "Deleted" })
                }

            })
    } catch (error) {
        logger.error(error)
        return res.status(500).send("Something wrong")
    }
}
//get user
exports.get = (req, res) => {
    try {
        User = req.params
        logger.info('GET/user. By brance id: ' + req.params.brance_id)

        dbcon.query(`
                SELECT      tbuser.user_name,tbuser.user_phone,
                            tbpermision.permision from tbuser inner join tbpermision 
                INNER JOIN
                            tbbrance on tbuser.permision_id = tbpermision.permision_id AND
                            tbuser.brance_id = tbbrance.brance_id
                WHERE       tbuser.user_dlst = 1 AND tbbrance.brance_id = ${User.brance_id}`,
            (error, result) => {

                if (error) {
                    logger.error(error)
                    res.status(403).send("Error")
                }
                else {
                    logger.info(result)
                    return res.send({ data: result, message: "Sucess" })
                }
            })
    } catch (error) {
        logger.error(error)
        return res.status(500).send("Something wrong")
    }
}




