'user strict';
var dbConn = require('../../config/db.config');

var student = function(student){
    this.name = student.name;
    this.DOB = student.DOB;
    this.phoneNumber = student.phoneNumber;
    this.email = student.email;
    this.city  = student.city;
};
student.create = function (newStudent, result) {    
    dbConn.query("INSERT INTO student set ?", newStudent, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });           
};
student.findById = function (id, result) {
    dbConn.query("Select * from student where id = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};
student.findAll = function (result) {
    dbConn.query("Select * from student", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('student : ', res);  
            result(null, res);
        }
    });   
};
student.update = function(id, student, result){
  dbConn.query("UPDATE student SET name=?,DOB=?,phoneNumber=?,email=?,city=? WHERE id = ?", [student.name,student.DOB,student.phoneNumber,student.email,student.city, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};
student.delete = function(id, result){
     dbConn.query("DELETE FROM student WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= student;