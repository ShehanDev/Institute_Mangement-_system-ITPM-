import http from "../http-common";

class courseApi{
  getAll() {
    return http.get("/course");
  }
  getById(id) {
    return http.get(`/course/${id}`);
   
  }
   create(data) {
    return http.post("/course", data);
  }
  update(id,data) {
    return http.put(`/course/${id}`,data);
  }
  
  delete(id) {
    return http.delete(`/course/${id}`);
  }

}
export default new courseApi();

