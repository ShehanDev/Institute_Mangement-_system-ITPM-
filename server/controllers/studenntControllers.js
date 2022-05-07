const Student =  require('../models/student');
module.exports =  class studentapi{

    //get all the student
    static async fetchAllstudents(req,res){
        //res.send("Get all students..!");
        try{
            const students = await Student.find();
            res.status(200).json(students);
        }catch(err){
            res.status(404).json({ message: err.message})
        }
    }


    //create student
    static async createstudent(req,res){
  
        const student = req.body;
        console.log(req.body);


        try{
           await Student.create(student);
           res.status(201).json({ message : "student created succesfully "})

        }catch(err){
            res.status(400).json({message : err.message});

        }
    }

    //get student by id
    static async fetchstudentByid(req,res){
        //res.send("get student by id")
        const id  = req.params.id;
        try{
            const  student = await  Student.findById(id)
            res.status(200).json(student);
        }catch(err){
            res.status(404).json({message: err.message})
        }
    }


    //update student
    static async updatestudentByid(req,res){
        const  id = req.params.id ;
        console.log(req.body)
        const newstudent =req.body;
        try{
            await Student.findByIdAndUpdate(id,newstudent);
            res.status(200).json({message : 'student updated successfully'})
            

        }catch(err){
            res.status(404).json({message : err.message})
            console.log("Error")

        }
         
    }

    //delete student
    static async deletestudentByid(req,res){
        //
        const id = req.params.id;
        try{
            const result = await Student.findByIdAndDelete(id);
      
            res.status(200).json({message : 'student deleted successfully'})
        } catch(err){
            res.status(404).json({message: err.message})
        }
    }

}