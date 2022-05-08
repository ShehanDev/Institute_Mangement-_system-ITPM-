<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa-s">
          <div v-if="!submitted">
            <v-card-title>Add Course</v-card-title>
            <v-divider></v-divider>
            <v-form
              ref="form"
              @submit.prevent="submitForm"
              lazy-validation
              class="pa-5"
              enctype="multipart/form-data"
            >

              <v-text-field
                label="Course Id"
                v-model="course.No"
                prepend-icon="mdi-note"
                :rules="nameRules"
              ></v-text-field>
              <v-text-field
                label="CourseName"
                v-model="course.Name"
                prepend-icon="mdi-note"
                :rules="nameRules"
              ></v-text-field>
              <v-text-field
                label="Faculty"
                v-model="course.Faculty"
                prepend-icon="mdi-view-list"
                :rules="reqRules"
              ></v-text-field>
              <v-text-field
                label="Lecture"
                v-model="course.Lecture"
                prepend-icon="mdi-note"
                :rules="reqRules"
              ></v-text-field>
              <v-text-field
                label="Description"
                v-model="course.Description"
                prepend-icon="mdi-note"
                :rules="reqRules"
              ></v-text-field>
              <v-text-field
                label="Duration"
                v-model="course.Duration"
                prepend-icon="mdi-note"
                :rules="enRules"
              ></v-text-field>
              <v-text-field
                label="Enrollmets"
                v-model="course.Stdcont"
                prepend-icon="mdi-note"
                :rules="enRules"
              ></v-text-field>

              <v-btn  @click="savecourse()" color="primary">SAVE</v-btn>
            </v-form>
          </div>
          <div v-else>
            <v-alert
              color="green"
              dense
              elevation="6"
              outlined
              prominent
              type="success"
              push="/student"
              >Student Added successfull !</v-alert
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import courseApi from "../../services/courseApi";
export default {
  data() {
    return {
      valid: true,

      IdRules: [
        (v) => !!v || "Id is required",
        (v) => (v && v.length <= 10) || "Id must be less than 10 characters",
      ],
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
      ],
      enRules: [
        (v) => !!v || "enroll No is required",
        (v) => (v && v.length < 5) || "Enrolments no less than 5 characters",
      ],
      reqRules: [(v) => !!v || "This is required feild"],
      rules: [(value) => !!value / "This field is required"],

      course: {
        Id: null,
        no:"",
        Name: "",
        Faculty: "",
        Lecture: "",
        Description: "",
        Stdcont: 0,
      },
        submitted: false
    };
  },
  methods: {
    savecourse() {
      var data = {
        no:this.course.No,
        name: this.course.Name,
        faculty: this.course.Faculty,
        lecturer: this.course.Lecture,
        discription: this.course.Description,
        stdcont: this.course.Stdcont,
      
      };
      courseApi
        .create(data)
        .then((response) => {
          this.course.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
