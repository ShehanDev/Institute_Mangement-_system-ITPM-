import http from "../http-common";

class StudentApi{
  getAll() {
    return http.get("/student");
  }
  getById(id) {
    return http.get(`/student/${id}`);
   
  }
   create(data) {
    return http.post("/student", data);
  }
  update(id,data) {
   
    return http.put(`/student/${id}`,data);
    
  }
  
  delete(id) {
    return http.delete(`/student/${id}`);
  }

}
export default new StudentApi();

