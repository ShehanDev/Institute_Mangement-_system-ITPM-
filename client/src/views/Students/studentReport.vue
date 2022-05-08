<template>
  <v-container>
    <v-toolbar-title class="title black--text ml-1">
      STUDENTS REPORT
      <span class="caption">
        <br />
      </span>
    </v-toolbar-title>
    <v-toolbar-title class="title black--text ml-2">
      <container>
        <v-row>
          <v-col>
            <container>
              <span class="title black--text ml-2"
                >Home > Students > Report</span
              >
            </container></v-col
          ><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer
          ><v-col>
            <container
              ><v-btn color="primary" @click="downloadPDF()" button>Download PDF</v-btn></container
            ></v-col
          >
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
    <div >
    <div class="table" style="height: 100vh" id="report">
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
            <v-toolbar-title>Student Report</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>

            <v-spacer></v-spacer>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }"> </template>
      </v-data-table>
    </div>
    </div>
  </v-container>
</template>
      

<script>
import jspdf from "jspdf";
import "jspdf-autotable";

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
      search: "",
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
    this.retrieveStudents();
  },
};
</script>

<style>
</style>