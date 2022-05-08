<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa-s">
          
           <div v-if="!submitted"> 
             <v-card-title>Add Lecturer</v-card-title>
          <v-divider></v-divider>

          <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">

              <v-text-field  label="Lecture Id" v-model="lecture.LID" prepend-icon="mdi-note"   :rules="IdRules" ></v-text-field>

              <v-text-field  label="Name" v-model="lecture.Name" prepend-icon="mdi-note"  :rules="nameRules" required></v-text-field>

              <v-text-field  label="Gender" v-model="lecture.Gender" prepend-icon="mdi-view-list"  :rules="reqRules" required></v-text-field>

                <v-text-field label="Faculty" v-model="lecture.Faculty" prepend-icon="mdi-view-list"  :rules="reqRules"  required></v-text-field>

                <v-text-field  label="MobileNo" v-model="lecture.MobileNo" prepend-icon="mdi-cellphone"   :rules="mobileRules"  required></v-text-field>
                <v-text-field  label="E-Mail" v-model="lecture.Email" prepend-icon="mdi-note"   :rules="emailRules" ></v-text-field>

               <v-btn @click="  savelecture() " color="primary">SAVE</v-btn>

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
              push="/lecture"
              >Lecturer Added Successfully !</v-alert
            >
          </div>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
 import lectureApi from "../../services/lectureApi";
export default {
 
  data() {
    return{
      valid: true,
       Name:"",
        IdRules: [
        v => !!v || 'Id is required',
        v => (v && v.length <= 5) || 'Id must be less than 5 characters',
      ],
       nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 15) || 'Name must be less than 15 characters',
      ],
       mobileRules: [
        v => !!v || 'Invalid Mobile No',
        v => (v && v.length < 11) || 'Mobile no must be 10 characters',
      ],
       reqRules: [
        v => !!v || 'This is required feild',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      

      lecture:{
        LID:"",
        Name:"",
        Faculty:"",
        Gender:"",
        MobileNo:0,
        Email:"",
      },
       submitted: false 
    };
    
  }, methods: {
    savelecture() {
      var data = {
        lid:this.lecture.LID,
        name: this.lecture.Name,
        faculty: this.lecture.Faculty,
        gender: this.lecture.Gender,
        mobile: this.lecture.MobileNo,
        email: this.lecture.Email,
      
      };
      lectureApi
        .create(data)
        .then((response) => {
          this.lecture.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

 

}
</script>

