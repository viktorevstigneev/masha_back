const { HttpStatusCode } = require('../constants');
const { People, createMusic, getMusicData, deleteMusic, updateMusic } = require('../models/Music');

const nodemailer = require('nodemailer');


// //  {
// 				user: 'menyu.servis@mail.ru',
// 				
				// pass2: ceu27dgfbChdNzrAmbF5
// 			},

const handleAddMusic = async (req, res) => {
	try {
		let transporter = nodemailer.createTransport({
			host: 'smtp.mail.ru',
			port: 587,
			secure: false,
			auth: {
				user: 'mashayanushko130@mail.ru',
				pass: 'ceu27dgfbChdNzrAmbF5',
			},
		});

		const textMsg = `
			${req.body.name} хочет связаться с вами \n
			email: ${req.body.email}
			параметры сообщения: ${req.body.param}
			сообщение: ${req.body.message}
		`;

		let result = await transporter.sendMail({
			from: 'mashayanushko130@mail.ru',
			to: 'mashayanushko130@mail.ru',
			subject: req.body.subject,
			text: textMsg,
		});
		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		console.log('error: ', error);
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleGetMusic = async (req, res) => {
	try {
		let result;
		result = await getMusicData();
		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleDeleteMusic = async (req, res) => {
	try {
		const result = await deleteMusic(req.params.id);

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleUpdateMusic = async (req, res) => {
	try {
		const result = await updateMusic(req.params.id, {
			name: req.body.name,
			description: req.body.description,
			createdDate: req.body.createdDate,
			logo: req.file.filename,
		});

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

module.exports = {
	handleAddMusic,
	handleGetMusic,
	handleDeleteMusic,
	handleUpdateMusic,
};
