<template>
<v-container>
   <div class="submit-form">
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa-s">
           <div v-if="!submitted">
                <v-card-title>Add Student</v-card-title>
                <v-divider></v-divider>
                <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
                  
                  <v-text-field  label="Student Id " v-model="student.No" prepend-icon="mdi-note"  :rules="NoRules" required></v-text-field>

                    <v-text-field  label="Name" v-model="student.Name" prepend-icon="mdi-note"  :rules="nameRules" required></v-text-field>

                    <v-text-field  label="Faculty" v-model="student.Faculty" prepend-icon="mdi-view-list"  :rules="reqRules" required></v-text-field>

                    <v-text-field label="Batch" v-model="student.Batch" prepend-icon="mdi-view-list"  :rules="reqRules"  required></v-text-field>

                    <v-text-field  label="MobileNo" v-model="student.MobileNo" prepend-icon="mdi-cellphone"   :rules="mobileRules"  required></v-text-field>
                  

                      <v-btn to='' color="primary" @click=" savestudent()">SAVE</v-btn>
                      
                  
              
                </v-form>
          </div>
          <div  v-else>
          <v-alert 
            color="green"
            dense
            elevation="6"
            outlined
            prominent
            type="success" push="/student"
          >Student Added Successfull !</v-alert></div>
        </v-card>
      </v-col>
    </v-row>
   </div>
  </v-container>
</template>

<script>

import studentApi from '../../services/studentApi';
export default {
  data() {
    return{
      valid: true,
       Name:"",
        NoRules: [
        v => !!v || 'ID is required',
        v => (v && v.length <= 11) || 'Name must be less than 11 characters',
      ],
       nameRules: [
         v => !!v || 'This is required feild',
      ],
       mobileRules: [
        v => !!v || 'Invalid Mobile No',
        v => (v && v.length < 11) || 'Mobile no must be 10 characters',
      ],
       reqRules: [
        v => !!v || 'This is required feild',
      ],
      rulesImg: [(value) => !!value || "This field is required!"],

      

      student:{
        Id:null,
        No:"",
        Name:"",
        Faculty:"",
        Batch:"",
        MobileNo: 0,
        },
      submitted: false
    };
    
  },

  methods:{
          savestudent(){
            var data = {
              no:this.student.No,
              name: this.student.Name,
              faculty: this.student.Faculty,
              batch:this.student.Batch,
              mobile:this.student.MobileNo,
         

            };
            studentApi.create(data).then(response => {
                this.student.id = response.data.id;
                console.log(response.data);
                this.submitted = true;
              })
              .catch(e => {
                console.log(e);

              });
          }
      }

}
    
  
</script>

