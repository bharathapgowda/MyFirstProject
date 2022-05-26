'use strict';

const student = require('../models/student.model');

exports.findAll = function(req, res) {
  student.findAll(function(err, student) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', student);
    res.send(student);
  });
};


exports.create = function(req, res) {
    const new_student = new student(req.body);

   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        student.create(new_student, function(err, student) {
            if (err)
            res.send(err);
            res.json({error:false,message:"student added successfully!",data:student});
        });
    }
};


exports.findById = function(req, res) {
    student.findById(req.params.id, function(err, student) {
        if (err)
        res.send(err);
        res.json(student);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        student.update(req.params.id, new student(req.body), function(err, student) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'student successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
  student.delete( req.params.id, function(err, student) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'student successfully deleted' });
  });
};