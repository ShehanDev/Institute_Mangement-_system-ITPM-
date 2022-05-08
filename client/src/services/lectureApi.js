import http from "../http-common";

class LectureApi{
  getAll() {
    return http.get("/lecture");
  }
  getById(id) {
    return http.get(`/lecture/${id}`);
   
  }
   create(data) {
    return http.post("/lecture", data);
  }
  update(id,data) {
   
    return http.put(`/lecture/${id}`,data);
    
  }
  
  delete(id) {
    return http.delete(`/lecture/${id}`);
  }

}
export default new LectureApi();

