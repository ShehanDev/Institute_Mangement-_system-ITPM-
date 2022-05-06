<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa-s">
          <v-card-title>Add Lecture</v-card-title>
          <v-divider></v-divider>
          <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">

              <v-text-field  label="Lecture Id" v-model="student.StudentID" prepend-icon="mdi-note"   :rules="IdRules" ></v-text-field>

              <v-text-field  label="Name" v-model="student.Name" prepend-icon="mdi-note"  :rules="nameRules" required></v-text-field>

              <v-text-field  label="Gender" v-model="student.Faculty" prepend-icon="mdi-view-list"  :rules="reqRules" required></v-text-field>

                <v-text-field label="Faculty" v-model="student.Batch" prepend-icon="mdi-view-list"  :rules="reqRules"  required></v-text-field>

                <v-text-field  label="MobileNo" v-model="student.MobileNo" prepend-icon="mdi-cellphone"   :rules="mobileRules"  required></v-text-field>
                <v-text-field  label="E-Mail" v-model="student.email" prepend-icon="mdi-note"   :rules="emailRules" ></v-text-field>

               <v-btn to='/addedlecture' color="primary">SAVE</v-btn>

          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import API from "../../api";
// import axios from 'axios';
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
      

      student:{
        StudentID:"",
        Name:"",
        Faculty:"",
        Batch:"",
        MobileNo:"",
      },
    };
    
  },

  methods:{
    async submitForm(){

    
      const formData = new FormData();
      formData.append('StudentID',this.student.StudentID);
      formData.append('Name',this.student.Name);
      formData.append('Faculty',this.student.Faculty);
      formData.append('Batch',this.student.Batch);
      formData.append('MobileNo',this.student.MobileNo);
      
    
      if(this.$refs.form.validate()){
        
      // const response = await API.createstudent(formData);
      // this.$router.push({name:'studentView',params:{message: response.message}});
      const response = await axios.post("localhost:3000/api/student",formData)
      console.log(response)
      
    
      this.$refs.form.reset();


    }
  },
}
}
</script>

