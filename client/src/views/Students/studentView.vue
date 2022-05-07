<template>
  <v-container>
    <v-toolbar-title class="title black--text ml-2">
      ALL STUDENTS<span class="caption">
        <br />
        <br />
      </span>
    </v-toolbar-title>
    <v-toolbar-title class="title black--text ml-2">
      Home > Students
      <span class="caption">
        <br />
      </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
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
        :items="students"
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
            <v-toolbar-title>Manage Students</v-toolbar-title>
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
                <v-btn to="/addstudent" color="primary">Add Student</v-btn>
              </v-row>
            </template>

            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Delete</v-card-title>
                <v-card-title class="text-h10">
                  Are you sure you want to delete this student ?</v-card-title
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
              v-if="currentStudent"
              v-model="editdialog"
              max-width="500px"
            >
              <v-card>
                <v-card-title>
                  <span class="text-h5">Edit Student</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-text-field
                        v-model="currentStudent.no"
                        label="StudentID"
                      ></v-text-field>
                    </v-row>
                    <v-row>
                      <v-text-field
                        v-model="currentStudent.name"
                        label="Name"
                      ></v-text-field> </v-row
                    ><v-row>
                      <v-text-field
                        v-model="currentStudent.faculty"
                        label="Faculty"
                      ></v-text-field> </v-row
                    ><v-row>
                      <v-text-field
                        label="Batch"
                        v-model="currentStudent.batch"
                      >
                      </v-text-field> </v-row
                    ><v-row>
                      <v-text-field
                        v-model="currentStudent.mobile"
                        label="Mobile No"
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
                    @click="updateStudent(currentStudent)"
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

import studentApi from "../../services/studentApi";

export default {
  data() {
    return {
      alt: false,
      massage: "",
      students: [],
      title: "name",
      dialog: true,
      dialogDelete: false,
      id: "",
      filterable: false,
      search:"",
      editdialog: false,
      currentStudent: "",
      message: "",
      headers: [
        // { text: "ID", align: "start", sortable: false, value: "id" },
        { text: "STUDENT ID ", value: "no" },
        { text: "NAME", value: "name" },
        { text: "FACULTY", value: "faculty" },
        { text: "BATCH", value: "batch" },
         { text: "MOBILE NO", value: "mobile" },
        { text: "ACTIONS", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveStudents() {
      // axios.get("localhost:3000/api/student")
      studentApi
        .getAll()
        .then((response) => {
          this.students = response.data.map(this.getDisplayStudents);

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveStudents();
    },

    

    deleteStudent(id) {
      studentApi
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

    getDisplayStudents(student) {
      return {
        id: student._id,
        no: student.no,
        name: student.name,
        faculty: student.faculty,
        batch: student.batch,
        mobile: student.mobile,
      };
    },
    editItem(id) {
      this.id = id;
      console.log(id);
      this.editdialog = true;
      this.getStudentById(id);
    },

    getStudentById(id) {
      studentApi
        .getById(id)
        .then((response) => {
          this.currentStudent = response.data;

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateStudent(currentStudent) {
      var id = currentStudent._id;
      var data = {
        no: currentStudent.no,
        name: currentStudent.name,
        faculty: currentStudent.faculty,
        batch: currentStudent.batch,
         mobile: currentStudent.mobile,
      };
      console.log(data);
      studentApi
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

      studentApi
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
    this.retrieveStudents();
  },
};
</script>

<style>
</style>