<template>
  <v-container>
     <v-toolbar-title class="title black--text ml-1">
      ALL COURSES<span class="caption">
        <br />
      </span>
    </v-toolbar-title>
    <v-toolbar-title class="title black--text ml-2">
      <container>
        <v-row>
      <v-col>
     <container>
       <span class="title black--text ml-2">Home > Courses </span>
     </container></v-col><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-col>
      <container><v-btn color="primary" @click="downloadPDF()">Generate PDF</v-btn></container></v-col>
        </v-row>
      </container>
    </v-toolbar-title>
    <br />

    <v-alert
      border="left"
      close-text="Close Alert"
      color="green accent-4"
      dark
      dismissible
      v-if="alt"
    >
      {{ this.message }}
    </v-alert>

    <div class="table" style="height: 100vh" id="report">
      
      <v-data-table
        :headers="headers"
        :items="courses"
        class="elevation-1"
        :items-per-page="5"
        item-key="name"
        :search="search"
        :sort-desc="[false, true]"
        multi-sort
        :footer-props="{
          showFirstLastPage: true,
          firstIcon: 'mdi-arrow-collapse-left',
          lastIcon: 'mdi-arrow-collapse-right',
          prevIcon: 'mdi-minus',
          nextIcon: 'mdi-plus',
        }"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Course Report</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
             <v-spacer></v-spacer>

    
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
        <a></a>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>
      

<script>
import courseApi from "../../services/courseApi";

export default {
  data() {
    return {
      alt: false,
      massage: "",
      courses: [],
      title: "name",
      dialog: true,
      dialogDelete: false,
      id: "",
      filterable: false,
      search:"",
      editdialog: false,
      currentCourse: "",
      message: "",
      headers: [
        // { text: "ID", align: "start", sortable: false, value: "id" },
        { text: "ID ", value: "id" },
        { text: "NAME", value: "name" },
        { text: "FACULTY", value: "faculty" },
        { text: "LECTURER", value: "lecturer" },
         { text: "ENROLLMENTS", value: "stdcont" },

      ],
    };
  },
  methods: {
    retrieveCourses() {
      // axios.get("localhost:3000/api/course")
      courseApi
        .getAll()
        .then((response) => {
          this.courses = response.data.map(this.getDisplayCourses);

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveCourses();
    },

    

    deleteStudent(id) {
      courseApi
        .delete(id)
        .then((response) => {
          console.log(response);
          alt = true;
          massage = "Delete successfull  !!";
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
          massage = "Delete error  !!";
        });
    },

    getDisplayCourses(course) {
      return {
        id: course._id,
        name: course.name,
        faculty: course.faculty,
        lecturer: course.lecturer,
        stdcont: course.stdcont,
      };
    },


    editItem(id) {
      this.id = id;
      console.log(id);
      this.editdialog = true;
      this.getStudentById(id);
    },

    getStudentById(id) {
      courseApi
        .getById(id)
        .then((response) => {
          this.currentCourse = response.data;

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

     updateCourse(currentCourse) {
      var id = currentCourse._id;
      var data = {
       
        name: currentCourse.name,
        faculty: currentCourse.faculty,
        lecturer: currentCourse.lecturer,
         stdcont: currentCourse.stdcont,
      };
      console.log(data);
      courseApi
        .update(id, data)
        .then((response) => {
          console.log(response.data);
          this.message = "The tutorial was updated successfully!";
          this.editdialog = false;
        
          this.refreshList();
           this.editdialog = false;
        })
        .catch((e) => {
          console.log(id, data);
          console.log(e);
        });
    },

    deleteItem(id) {
      this.id = id;
      this.dialogDelete = true;
    },

    deleteItemConfirm(id) {
      console.log(id);

      courseApi
        .delete(id)
        .then((res) => {
          console.log(res);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });

      this.dialogDelete = false;
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    close() {
      this.editdialog = false;
    },
    alartDisplay(massage) {
      return massage;
    },
    downloadPDF(){
        const element = document.getElementById("report");
        html2pdf().from(element).save();},





  },
  watch: {
    editdialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  mounted() {
    this.retrieveCourses();
  },
};
</script>

<style>
</style>