import http from "../http-common";

class StudentApi{
  //Get all students
  getAll() {
    return http.get("/student");
  }

  //Get student
  getById(id) {
    return http.get(`/student/${id}`);
   
  }

  //Create new Student
   create(data) {
    return http.post("/student", data);
  }

  //Update student
  update(id,data) {
    return http.put(`/student/${id}`,data);   
  }
  
  //Delete Student
  delete(id) {
    return http.delete(`/student/${id}`);
  }

}
export default new StudentApi();

