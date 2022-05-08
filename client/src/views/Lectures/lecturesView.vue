<template>
  <v-container>
   <v-toolbar-title class="title black--text ml-1">
      ALL LECTURERS<span class="caption">
        <br />
      </span>
    </v-toolbar-title>
    <v-toolbar-title class="title black--text ml-2">
      <container>
        <v-row>
      <v-col>
     <container>
       <span class="title black--text ml-2">Home > Lecturers </span>
     </container></v-col><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-col>
      <container><v-btn color="primary" button to="/lecturesReport">Generate PDF</v-btn></container></v-col>
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
        :items="lectures"
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
            <v-toolbar-title>Manage Lectures</v-toolbar-title>
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
                <v-btn to="/addlecture" color="primary">Add Lecturer</v-btn>
              </v-row>
            </template>

            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Delete</v-card-title>
                <v-card-title class="text-h10">
                  Are you sure you want to remove this Lececture  ?</v-card-title
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
              v-if="currentLectures"
              v-model="editdialog"
              max-width="500px"
            >
              <v-card>
                <v-card-title>
                  <span class="text-h5">Edit Lecturer</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                     <v-row>
                      <v-text-field
                        v-model="currentLectures.lid"
                        label="lecture id"
                      ></v-text-field> </v-row
                    >
                    <v-row>
                      <v-text-field
                        v-model="currentLectures.name"
                        label="name"
                      ></v-text-field> </v-row
                    ><v-row>
                      <v-text-field
                        v-model="currentLectures.faculty"
                        label="faculty"
                      ></v-text-field> </v-row
                    ><v-row>
                      <v-text-field
                        label="gender"
                        v-model="currentLectures.gender"
                      >
                      </v-text-field> </v-row
                    ><v-row>
                      <v-text-field
                        v-model="currentLectures.mobile"
                        label="mobile"
                      ></v-text-field>
                    </v-row>
                    <v-row>
                      <v-text-field
                        v-model="currentLectures.email"
                        label="email"
                      ></v-text-field>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>

                  <v-btn
                    color="blue darken-1"
                    text
                    @click=" updateLecture(currentLectures)"
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
import lectureApi from "../../services/lectureApi";

export default {
  data() {
    return {
      alt: false,
      massage: "",
      lectures: [],
      title: "name",
      dialog: true,
      dialogDelete: false,
      id: "",
      filterable: false,
      search:"",
      editdialog: false,
      currentLectures: "",
      message: "",
      headers: [
        { text: "ID",  value: "Lid" },
        { text: 'NAME', value: 'name' },
        { text: 'GENDER', value: 'gender' },
        { text: 'FACULTY', value: 'faculty' },
        { text: 'MOBILE NO', value: 'mobile' },
        { text: 'EMAIL', value: 'email' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    };
  },
  methods: {
    retrieveLectures() {
      // axios.get("localhost:3000/api/lecture")
      lectureApi
        .getAll()
        .then((response) => {
          this.lectures = response.data.map(this.getDisplayLectures);

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveLectures();
    },

    

    deleteLecture(id) {
      lectureApi
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

    getDisplayLectures(lecture) {
      return {
        id: lecture._id,
        Lid:lecture.lid ,
        name:lecture.name,
        faculty: lecture.faculty,
        gender: lecture.gender,
        email: lecture.email,
        mobile:lecture.mobile,
      };
    },


    editItem(id) {
      this.id = id;
      console.log(id);
      this.editdialog = true;
      this.getLectureById(id);
    },

    getLectureById(id) {
      lectureApi
        .getById(id)
        .then((response) => {
          this.currentLectures = response.data;

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

     updateLecture(currentLectures) {
      var id = currentLectures._id;
      var data = {
       lid:currentLectures.lid,
        name: currentLectures.name,
        faculty: currentLectures.faculty,
        gender: currentLectures.gender,
         mobile: currentLectures.mobile,
         email:currentLectures.email
      };
      console.log(data);
      lectureApi
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

      lectureApi
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
    this.retrieveLectures();
  },
};
</script>

<style>
</style>