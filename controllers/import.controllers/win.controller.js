
const xlsx = require('xlsx')
const dbcon = require('../../dbconfig/dbconfig')
const logger = require('../../config-log/logger');
const { data } = require('../../config-log/logger');
const { log_lottery_out } = require('../CRUD.controllers/lottery_out.controller');
exports.createtotal_win = async (req, res) => {

    try {

        logger.info('POST/win')
        if (req.file == undefined) {
            logger.warn('No file excel for selete') 
            return res.status(400).send("Please upload an excel file!");
        }
        //....path of excel file.............
        let path = __basedir + "/" + req.file.filename;
        let workbook = xlsx.readFile(path)
        let WSH = workbook.SheetNames[0]
        let worksheet = workbook.Sheets[WSH];
        logger.info(path)

        const installment_cell = 'D1';
        const date_cell = 'F1';

        //// ........get date and installment.........
        const desired_cell_installment = worksheet[installment_cell];
        const installment_value = (desired_cell_installment ? desired_cell_installment.v : undefined);

        const desired_cell_date = worksheet[date_cell];
        const date_value = (desired_cell_date ? desired_cell_date.v : undefined);

        //convert date from excel to js
        var date1 = new Date(Math.round((date_value - (25567 + 1)) * 86400 * 1000));
        var converted_date = date1.toISOString().split('T')[0];
        //valaible for conatain lottery number value
        const columnA_Id = [];

        const columnH_Pn1 = [];
        const columnI_Pn2 = [];
        const columnJ_Pn3 = [];
        const columnK_Pn4 = [];
        const columnL_Pn5 = [];
        const columnM_Pn6 = [];

        //push lottery number to array
        for (let z in worksheet) {

            //get id
            if (z.toString()[0] === 'B') {
                columnA_Id.push(worksheet[z].v);
            }

            //Total win
            if (z.toString()[0] === 'J') {
                columnH_Pn1.push(worksheet[z].v);

            }
            if (z.toString()[0] === 'K') {
                columnI_Pn2.push(worksheet[z].v);

            }
            if (z.toString()[0] === 'L') {
                columnJ_Pn3.push(worksheet[z].v);

            }
            if (z.toString()[0] === 'M') {
                columnK_Pn4.push(worksheet[z].v);

            }
            if (z.toString()[0] === 'N') {
                columnL_Pn5.push(worksheet[z].v);

            }
            if (z.toString()[0] === 'O') {
                columnM_Pn6.push(worksheet[z].v);
            }
        }

        //delete title and subtitle
        columnA_Id.splice(0, 2)
        columnA_Id.splice(columnA_Id.length - 2, 2)

        columnH_Pn1.splice(0, 1)
        columnH_Pn1.splice(columnH_Pn1.length - 1, 1)

        columnI_Pn2.splice(0, 1)
        columnI_Pn2.splice(columnI_Pn2.length - 1, 1)

        columnJ_Pn3.splice(0, 1)
        columnJ_Pn3.splice(columnJ_Pn3.length - 1, 1)

        columnK_Pn4.splice(0, 1)
        columnK_Pn4.splice(columnK_Pn4.length - 1, 1)

        columnL_Pn5.splice(0, 1)
        columnL_Pn5.splice(columnL_Pn5.length - 1, 1)

        columnM_Pn6.splice(0, 1)
        columnM_Pn6.splice(columnM_Pn6.length - 1, 1)

        const win_nout = req.params.win_nout
        let installment_id = 0
 

        if (!win_nout) {
            logger.warn('No number out')
            return res.status(400).send({ message: 'Please provided the number out' })
        }
        /**
         * ເກັບລະຫັດງວດ
         */
        dbcon.query(`select max(installment_id) as maxid from tbinstallment`, (error, data) => {

            if (error) {
                logger.error(error)
                res.status(403).send("Error")
            }
            else {
                logger.info(data)
                const data1 = data[0]
                installment_id = data1.maxid
            }

        })


        //ກວດສອບວ່າ ງວດດັ່ງກ່າວມີແລ້ວບໍ?
        dbcon.query(`select installment from tbinstallment where installment=?`, [installment_value], (error, result) => {

            if (error) {
                logger.error(error)
                res.send("Error")
            }

            if (result === undefined || result.length == 0) {

                dbcon.query(`insert into tbinstallment (installment) VALUES (?)`, [installment_value], (error, data) => {
                    if (error) {
                        logger.error(error)
                        res.status(403).send("Error")
                    }
                    else {
                        logger.info(data)
                        installment_id = data.insertId
                    }

                })

            }
            /**
             * ເອົາຂໍ້ມູນທັງຫມົດຈາກ excel ເກັບໄວ້ຕົວປ່ຽນ all data
             */
            let all_data = []
            let win_total = 0

            for (let i = 0; i < columnA_Id.length; i++) {
                //Get totall
                win_total = columnH_Pn1[i] + columnI_Pn2[i] + columnJ_Pn3[i] + columnK_Pn4[i] + columnL_Pn5[i] + columnM_Pn6[i]

                //Pushing a data
                all_data.push([columnA_Id[i], installment_id, columnH_Pn1[i], columnI_Pn2[i], columnJ_Pn3[i], columnK_Pn4[i], columnL_Pn5[i], columnM_Pn6[i], win_total, converted_date, win_nout])
            }
            logger.info(all_data)
            /**
             * ກວດສອບວ່າ ງວດ ແລະ ເລກເຄື່ອງນີ້ມີຢູ່ໃນລະບົບແລ້ວບໍ?
             */
            dbcon.query(`SELECT lottery_id, installment_id FROM tbsell WHERE lottery_id=? and installment_id=?`,
                [columnA_Id[0], installment_id], (error, data) => {
                    if (!error) {

                        if (data.affectedRows == 0 || data.length === 0) {
                            /**
                       * Inserting all data into database
                       */
                            dbcon.query({
                                sql: `insert into tbwin (lottery_id,installment_id,win_n1,win_n2,win_n3,win_n4,win_n5,win_n6,win_total,win_date,win_nout)  VALUES ?`,
                                values: [all_data]
                            }, (error, data) => {
                                if (error) {
                                    logger.error(error)
                                    res.status(403).send("Error")
                                }
                                else {
                                    logger.info(data)
                                    res.send(data)
                                }

                            })

                        }
                        else {
                            logger.warn(data)
                            return res.status(403).send({ data: data, message: "ງວດນີ້ມີແລ້ວ. ກະລຸນາເລືອກງວດໃຫມ່" })
                        }
                    }
                })

        })

    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: "Could not create file: " + req.file.orginalfile })
    }
}




exports.get = (req, res) => {

    try {
        dbcon.query(`select * from tbwin`, (error, data) => {

            if (error) res.send("Error" + error)

            res.send({ data: data, message: "Success" })
        })
    } catch (error) {
        res.status(500).send(error)
    }
}