<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa-s">
          <v-card-title>Add Book</v-card-title>
          <v-divider></v-divider>
          <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">

              <v-text-field  label="Book ID" v-model="student.bookID" prepend-icon="mdi-note"   :rules="IdRules" ></v-text-field>

              <v-text-field  label=" Book Name" v-model="student.Name" prepend-icon="mdi-note"  :rules="nameRules" required></v-text-field>

              <v-text-field  label="Author" v-model="student.Faculty" prepend-icon="mdi-view-list"  :rules="reqRules" required></v-text-field>

                <v-text-field label="Course" v-model="student.Course" prepend-icon="mdi-view-list"  :rules="reqRules"  required></v-text-field>
                <v-text-field  label="Date" v-model="student.date" prepend-icon="mdi-calendar-range"   :rules="reqRules"  required></v-text-field>
                <v-text-field  label="Quantity" v-model="student.Quantity" prepend-icon="mdi-note"   :rules="reqRules"  required></v-text-field>
                <v-text-field  label="status" v-model="student.status" prepend-icon="mdi-note"   :rules="reqRules"  required></v-text-field>
                 <v-btn to='/addedbook' color="primary">SAVE</v-btn>
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
        v => (v && v.length <= 5) || 'ID must be less than 5 characters',
      ],
       nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 12) || 'Book Name must be less than 12 characters',
      ],

       reqRules: [
        v => !!v || 'This is required feild',
      ],
      

      student:{
        bookID:"",
        Name:"",
        Course:"",
        Faculty:"",
        Date:"",
        Quantity:"",
        status:"",
      },
    };
    
  },

  methods:{
    async submitForm(){

    
      const formData = new FormData();
      formData.append('bookID',this.student.bookID);
      formData.append('Name',this.student.Name);
      formData.append('Course',this.student.Course);
      formData.append('Faculty',this.student.Faculty);
      formData.append('Date',this.student.Date);
      formData.append('Quantity',this.student.Quantity);
      formData.append('status',this.student.status);
     
    
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

