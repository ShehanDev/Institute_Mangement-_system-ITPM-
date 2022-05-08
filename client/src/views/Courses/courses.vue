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
      <container><v-btn color="primary" to="coursesReport">Genarate Pdf</v-btn></container></v-col>
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

    <div class="table" style="height: 100vh">
      
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
            <v-toolbar-title>Manage Courses</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            
            
             <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
           
            ></v-text-field>
             <v-spacer></v-spacer>
            <template>
              <v-row align="center" justify="space-around">
                <v-btn to="/addcourse" color="primary">Add Course</v-btn>
              </v-row>
            </template>

            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Delete</v-card-title>
                <v-card-title class="text-h10">
                  Are you sure you want to delete this course ?</v-card-title
                >
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="deleteItemConfirm(id)"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog
              v-if="currentCourse"
              v-model="editdialog"
              max-width="500px"
            >
              <v-card>
                <v-card-title>
                  <span class="text-h5">Edit Course</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-text-field
                        v-model="currentCourse.name"
                        label="Name"
                      ></v-text-field> </v-row
                    ><v-row>
                      <v-text-field
                        v-model="currentCourse.faculty"
                        label="Faculty"
                      ></v-text-field> </v-row
                    ><v-row>
                      <v-text-field
                        label="LECTURER"
                        v-model="currentCourse.lecturer"
                      >
                      </v-text-field> </v-row
                    ><v-row>
                      <v-text-field
                        v-model="currentCourse.stdcont"
                        label="ENROLLMENTS"
                      ></v-text-field>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cencel
                  </v-btn>

                  <v-btn
                    color="blue darken-1"
                    text
                    @click=" updateCourse(currentCourse)"
                    >Save</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item.id)"
            >mdi-pencil</v-icon
          >
          <v-icon small @click="deleteItem(item.id)">mdi-delete</v-icon>
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
        { text: "ID ", value: "no" },
        { text: "NAME", value: "name" },
        { text: "FACULTY", value: "faculty" },
        { text: "LECTURER", value: "lecturer" },
         { text: "ENROLLMENTS", value: "stdcont" },
        { text: "ACTIONS", value: "actions", sortable: false },
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
        no:course.no,
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