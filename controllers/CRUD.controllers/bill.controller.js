const dbcon = require('../../dbconfig/dbconfig')
const logger = require('../../config-log/logger')
const PDFDocument = require('pdfkit')
const doc = new PDFDocument({ size: "A7" })
const fs = require('fs')

let filename = ""

exports.getbill = (req, res) => {

	const thork_id = req.params.thork_id
try{
	dbcon.query(`CALL Bill(${thork_id})`, (err, data) => {

		if (!err) {

			if(data.affectedRows===undefined || data.length==0)
			{
				logger.warn("No data to show on the bill")
				res.send({message:"ບໍ່ມີຂໍ້ມູນ"})
			}
			else
			{
             logger.info(data)
			const bill = data[0][0]
			filename = Date.now() + `bill.pdf`
			doc.pipe(fs.createWriteStream(`docs/` + filename, { encoding: 'UTF-8' }));

			const left = 60;

			doc
				.image('http://localhost:8000/image/clogo.png', 28, 20, { width: 30 })
				.fillColor("#444444")
				//	Name of company
				.fontSize(8)
				.font('./fonts/phetsarath_ot.ttf')
				.text("ຫວຍສົມໃນນຶກ", 50, 25, { align: "center" })
				//Bill title
				.fontSize(6)
				.text("ບິນຖອກເງິນ", 50, 40, { align: "center" })
				//Installment title
				.fontSize(5)
				.text("ງວດ: " + bill.installment, left, 60, { align: "left" })
				//Brance title
				.fontSize(5)
				.text("ສາຂາ: ", left, 70, { align: "left" })
				//Date 
				.fontSize(5)
				.text("ວັນທີ: " + bill.date, 0, 60, { align: "right" })
				//Name of brance
				.fontSize(5)
				.text("ນະຄອນຫລວງ", 0, 70, { align: "right" })
				//......List of title ......

				//Name of seller
				.text(".................................................", 60, 80, { align: "center" })
				.fontSize(5)
				.text("ທ້າວ ສົມດີ", left, 90, { align: "left" })
				//Lottery Id title
				.fontSize(5)
				.text("ລະຫັດເຄື່ອງຂາຍເລກ: ", left, 100, { align: "left" })
				//Get value sell title
				.fontSize(5)
				.text("ຍອດຂາຍ: ", left, 110, { align: "left" })
				//Real thork title
				.fontSize(5)
				.text("ຍອດຖອກຕົວຈິງ: ", left, 120, { align: "left" })
				//Cash pay title
				.fontSize(5)
				.text("ຈ່າຍສົດ: ", left, 130, { align: "left" })
				//Transfer pay title
				.fontSize(5)
				.text("ໂອນ", left, 140, { align: "left" })
				//Own title
				.fontSize(5)
				.text("ຕິດຫນີ້: ", left, 150, { align: "left" })
				//Date title
				.fontSize(5)
				.text("ວັນທີ: ", left, 160, { align: "left" })

				//.......List of values from above........
				//Lottery Id title
				.fontSize(5)
				.text(bill.lottery_id, 10, 100, { align: "right" })
				//Get value sell title
				.fontSize(5)
				.text(bill.sell_total + " ກີບ", 10, 110, { align: "right" })
				.fontSize(5)
				.text(bill.real_thork + " ກີບ", 10, 120, { align: "right" })
				//Cash pay title
				.fontSize(5)
				.text(bill.thork_by_cash + " ກີບ", 10, 130, { align: "right" })
				//Transfer pay title
				.fontSize(5)
				.text(bill.thork_by_transfer + " ກີບ", 10, 140, { align: "right" })
				//Own title
				.fontSize(5)
				.text(bill.own + " ກີບ", 10, 150, { align: "right" })
				//Date title
				.fontSize(5)
				.text(bill.date, 10, 160, { align: "right" })

				//....phu hud
				.text(".................................................", 60, 170, { align: "center" })
				.fontSize(5)
				.text("ຜູ້ຮັບ", 10, 180, { align: "right" })
				.text(bill.seller_name, 10, 190, { align: "right" })
			
			doc.end();
			res.send({ message: "Successful for generate Pdf for you." })
		}

		}
		else {
			logger.error(err)
			res.status(403).send("ERR:")
		}
	})
}catch(err) {
	logger.error(err) 
}
}
