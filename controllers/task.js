require('dotenv').config();
const task = require('../models').task;
const date = require('../common/date');
const compose = require('../common/compose');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

let limit = 10;
let offset = 0;

module.exports = {
    fetchAll(req, res){
        try { 
            return task.findAndCountAll({
                limit: limit,
                offset: typeof req.query.offset != 'undefined' && typeof req.query.offset == 'number' ? parseInt(req.query.offset) : offset
            })
            .then(async (data) => {
                let response = {
                    count: data.count,
                    rows: data.rows,
                    pages: await compose.pagination(data.count, limit)
                };
                return res.status(200).send({ success: true, data: response, message: 'Process success.' });
            }).catch((error) => {
                console.log(error);
                return res.status(500).send({ success: false, data: error, message: 'Database error.' });
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ success: false, data: error, message: 'Something went wrong.' });
        }
    },
    create(req, res){
        try {
            if(typeof req.body.name == 'undefined' || req.body.name == '') return res.status(200).send({ success: false, data: null, message: 'Please input a name for the task.' });
            return task.findOne({
                where: {
                    name: req.body.name,
                    completedAt: {
                        [Op.not]: null
                    }
                }
            }).then((data) => {
                if(data) return res.status(200).send({ success: false, data: null, message: 'Task already exist.' });
                task.create({
                    name: req.body.name
                });
                return res.status(200).send({ success: true, data: null, message: 'Task information has been save.' });
            }).catch((error) => {
                console.log(error);
                return res.status(500).send({ success: false, data: error, message: 'Database error.' });
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ success: false, data: error, message: 'Something went wrong.' });
        }
    },
    update(req, res){
        try {
            if(typeof req.body.id == 'undefined' || req.body.id == '') return res.status(200).send({ success: false, data: null, message: 'There is no id on the payload.' });
            if(typeof req.body.isDone != 'boolean') return res.status(200).send({ success: false, data: null, message: 'There is no isDone on the payload or it must be a boolean type.' });
            return task.findOne({
                where: {
                    id: req.body.id
                }
            }).then((data) => {
                if(!data) return res.status(200).send({ success: false, data: null, message: 'No record found.' });
                data.update({
                    completedAt: req.body.isDone ? date.now() : null
                });
                return res.status(200).send({ success: true, data: null, message: 'Task information has been update.' });
            }).catch((error) => {
                console.log(error);
                return res.status(500).send({ success: false, data: error, message: 'Database error.' });
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ success: false, data: error, message: 'Something went wrong.' });
        }
    },
    delete(req, res){
        try {
            if(typeof req.body.id == 'undefined' || req.body.id == '') return res.status(200).send({ success: false, data: null, message: 'There is no id on the payload.' });
            return task.findOne({
                where: {
                    id: req.body.id
                }
            }).then((data) => {
                if(!data) return res.status(200).send({ success: false, data: null, message: 'No record found.' });
                data.destroy();
                return res.status(200).send({ success: true, data: null, message: 'Task information has been delete.' });
            }).catch((error) => {
                console.log(error);
                return res.status(500).send({ success: false, data: error, message: 'Database error.' });
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ success: false, data: error, message: 'Something went wrong.' });
        }
    }
}