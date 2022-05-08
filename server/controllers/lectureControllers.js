const Lecture =  require('../models/lecture');
const fs = require('fs');
module.exports =  class lectureapi{

    //get all the lecture
    static async fetchAlllectures(req,res){
        //res.send("Get all lectures..!");
        try{
            const lectures = await Lecture.find();
            res.status(200).json(lectures);
        }catch(err){
            res.status(404).json({ message: err.message})
        }
    }


    //create lecture
    static async createlecture(req,res){
        const lecture = req.body;
     

        try{
           await Lecture.create(lecture);
           res.status(201).json({ message : "lecture created succesfully "})

        }catch(err){
            res.status(400).json({message : err.message});

        }
    }

    //get lecture by id
    static async fetchlectureByid(req,res){
        //res.send("get lecture by id")
        const id  = req.params.id;
        try{
            const  lecture = await  Lecture.findById(id)
            res.status(200).json(lecture);
        }catch(err){
            res.status(404).json({message: err.message})
        }
    }


    //update lecture
    static async updatelectureByid(req,res){
        const  id = req.params.id ;
        const newlecture =req.body;

        try{
            await Lecture.findByIdAndUpdate(id,newlecture);
            res.status(200).json({message : 'lecture updated successfully'})


        }catch(err){
            res.status(404).json({message : err.message})
            console.log("Error")

        }
         
    }

    //delete lecture
    static async deletelectureByid(req,res){
        //
        const id = req.params.id;
        try{
            const result = await Lecture.findByIdAndDelete(id);
            res.status(200).json({message : 'lecture deleted successfully'})
        } catch(err){
            res.status(404).json({message: err.message})
        }
    }

}