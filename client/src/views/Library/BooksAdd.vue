<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa-s">
        <div v-if="!submitted">
          <v-card-title>Add Book</v-card-title>
          <v-divider></v-divider>
          <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
                <v-text-field  label="Book ID" v-model="book.bookID" prepend-icon="mdi-note"   :rules="IdRules" ></v-text-field>
                <v-text-field  label=" Name" v-model="book.Name" prepend-icon="mdi-note"  :rules="nameRules" required></v-text-field>
                <v-text-field  label="Author" v-model="book.Author" prepend-icon="mdi-view-list"  :rules="reqRules" required></v-text-field>
                <v-text-field label="Course" v-model="book.Course" prepend-icon="mdi-view-list"  :rules="reqRules"  required></v-text-field>
                <v-text-field  label="Quantity" v-model="book.Quntity" prepend-icon="mdi-note"   :rules="reqRules"  required></v-text-field>
                <v-text-field  label="status" v-model="book.Status" prepend-icon="mdi-note"   :rules="reqRules"  required></v-text-field>
                 <v-btn @click="savebook()" color="primary">SAVE</v-btn>
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
import bookApi from "../../services/libraryApi";
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
      

      book:{
        Id:null,
        bookID:"",
        Name:"",
        Course:"",
        Author:"",
        Quntity:0,
        Status:"",
      },
      submitted: false
    };
    
  },

 methods: {
    savebook() {
      var data = {
        bid:this.book.bookID,
        name: this.book.Name,
        author: this.book.Author,
        course: this.book.Course,
        quntity: this.book.Quntity,
        status: this.book.Status,
      
      };
      bookApi
        .create(data)
        .then((response) => {
          this.book.id = response.data.id;
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

