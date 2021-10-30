
const dbcon = require('../../dbconfig/dbconfig')
const logger = require('../../config-log/logger')

//create company
let company = {
    company_id: 0, company_name: "",
    company_address: "", company_phone: "", company_email: "", company_logo: ""
}
exports.createcompany = (req, res) => {

    try {
        company = req.body;

        logger.info('POST/company')
        logger.info(req.body)

        dbcon.query(`INSERT INTO tbcompany (company_name,company_address,company_phone,company_email)
        VALUES (?,?,?,?,?,?)`, [company.company_name,
        company.company_address, company.company_phone, company.company_email], (error, result) => {

            if (error) {
                logger.error(error)
                res.status(403).send("Error")
            }
            else {
                logger.info(result)
                res.send({ error: false, data: result, message: "created." })
            }


        });
    } catch (error) {
        logger.error(error)
        return res.status(500).send({ message: "Something wrong" })
    }
}

exports.getcompany = (req, res) => {

    try {
        dbcon.query(`SELECT * FROM tbcompany`, (error, result) => {

            if (error) {
                logger.error(error)
                res.status(403).end("Error")
            }
            else {
                logger.info(result)
                res.send(result)
            }
        });
    } catch (error) {
        logger.error(error)
        return res.status(500).send({ message: "Something wrong" })
    }
}

exports.updatecompany = (req, res) => {

    try {
        company = req.body;
        
        logger.info('PUT/company')
        logger.info(req.body)

        dbcon.query(`UPDATE tbcompany SET company_name=?,company_address=?,company_phone=?,company_email=?
        WHERE company_id = ?`, [company.company_name,
        company.company_address, company.company_phone, company.company_email, company.company_id], (error, result) => {

            if (error) {
                logger.error(error)
                res.status(403).send("Error")
            }
            else {
                logger.info(result)
                res.send({ data: result, message: "updated." })
            }
        });
    } catch (error) {
        logger.error(error)
        return res.status(500).send({ message: "Something wrong" })
    }
}