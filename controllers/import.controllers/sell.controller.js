
const xlsx = require('xlsx')
const dbcon = require('../../dbconfig/dbconfig')
const logger = require('../../config-log/logger')
exports.createtotal_sell = async (req, res) => {

    try {
        logger.info('POST/sell')
        if (req.file == undefined) {
            
            return res.status(400).send("ກະບຸນາເລືອກໄຟຮ excel ກ່ອນ!");
        }
        //....path of excel file.............
        let path = __basedir + "/" + req.file.filename;
        let workbook = xlsx.readFile(path);
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

        const columnA_Id = [];
        const columnB_Sn1 = [];
        const columnC_Sn2 = [];
        const columnD_Sn3 = [];
        const columnE_Sn4 = [];
        const columnF_Sn5 = [];
        const columnG_Sn6 = [];


        //push lottery number to array
        for (let z in worksheet) {

            //get id
            if (z.toString()[0] === 'B') {
                columnA_Id.push(worksheet[z].v);
            }
            //Total sells
            if (z.toString()[0] === 'C') {
                columnB_Sn1.push(worksheet[z].v);

            }
            if (z.toString()[0] === 'D') {
                columnC_Sn2.push(worksheet[z].v);

            }
            if (z.toString()[0] === 'E') {
                columnD_Sn3.push(worksheet[z].v);

            }
            if (z.toString()[0] === 'F') {
                columnE_Sn4.push(worksheet[z].v);

            }
            if (z.toString()[0] === 'G') {
                columnF_Sn5.push(worksheet[z].v);

            }
            if (z.toString()[0] === 'H') {
                columnG_Sn6.push(worksheet[z].v);

            }
        }

        //delete title and subtitle
        columnA_Id.splice(0, 2)
        columnA_Id.splice(columnA_Id.length - 2, 2)

        columnB_Sn1.splice(0, 2)
        columnB_Sn1.splice(columnB_Sn1.length - 2, 2)

        columnC_Sn2.splice(0, 2)
        columnC_Sn2.splice(columnC_Sn2.length - 1, 1)

        columnD_Sn3.splice(0, 2)
        columnD_Sn3.splice(columnD_Sn3.length - 1, 1)

        columnE_Sn4.splice(0, 2)
        columnE_Sn4.splice(columnE_Sn4.length - 1, 1)

        columnF_Sn5.splice(0, 1)
        columnF_Sn5.splice(columnF_Sn5.length - 1, 1)

        columnG_Sn6.splice(0, 1)
        columnG_Sn6.splice(columnG_Sn6.length - 1, 1)

        let installment_id = 0

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
                res.status(403).send("Error")
            }

            if (result === undefined || result.length == 0) {

                dbcon.query(`insert into tbinstallment (installment) VALUES (?)`, [installment_value], (error, data) => {
                    if (error) {
                        logger.error(error)
                        res.status(403).send("Error");
                    }
                    else{
                        logger.info(data)
                        installment_id = data.insertId
                    }
                   
                })

            }
            /**
             * ເອົາຂໍ້ມູນທັງຫມົດຈາກ excel ເກັບໄວ້ຕົວປ່ຽນ all data
             */
            let all_data = []
            let sell_total = 0

            for (let i = 0; i < columnA_Id.length; i++) {
                //Get totall
                sell_total = columnB_Sn1[i] + columnC_Sn2[i] + columnD_Sn3[i] + columnE_Sn4[i] + columnF_Sn5[i] + columnG_Sn6[i]

                //Pushing a data
                all_data.push([columnA_Id[i], installment_id, columnB_Sn1[i], columnC_Sn2[i], columnD_Sn3[i], columnE_Sn4[i], columnF_Sn5[i], columnG_Sn6[i], sell_total, converted_date])
            }
            logger.info(all_data);
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
                                sql: `insert into tbsell (lottery_id,installment_id,sell_n1,sell_n2,sell_n3,sell_n4,sell_n5,sell_n6,sell_total,sell_date)  VALUES ?`,
                                values: [all_data]
                            }, (error, data) => {

                            if (!error){
                                logger.info(data)
                                res.send(data)
                            }
                                   
                                else {
                                    logger.error(error)
                                }
                            })
                        }
                        else {
                            logger.warn(data)
                            return res.status(403).send({ data: data, message: "ງວດນີ້ມີແລ້ວ. ກະລຸນາເລືອກງວດໃຫມ່" })
                        }
                    }
                    else {
                        logger.error(error)
                        res.status(403).send("Error")
                    }
                })
        })
    } catch (error) {
        logger.error(error)
    }
}

