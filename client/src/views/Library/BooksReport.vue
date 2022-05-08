<template>
  <v-container>
    <v-toolbar-title class="title black--text ml-1">
      ALL BOOKS<span class="caption">
        <br />
      </span>
    </v-toolbar-title>
    <v-toolbar-title class="title black--text ml-2">
      <container>
        <v-row>
      <v-col>
     <container>
       <span class="title black--text ml-2">Home > Books > Report </span>
     </container></v-col><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-col>
      <container><v-btn color="primary" @click="downloadPDF()">Download PDF</v-btn></container></v-col>
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

    <div class="table" style="height: 100vh" id="report">
      
      <v-data-table
        :headers="headers"
        :items="books"
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
            <v-toolbar-title> Books</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            
            
             
             <v-spacer></v-spacer>
            <template>
              <v-row align="center" justify="space-around">
                <v-btn to="/addbook" color="primary">Add Book</v-btn>
              </v-row>
            </template>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>
      

<script>
import bookApi from "../../services/libraryApi";

export default {
  data() {
    return {
      alt: false,
      massage: "",
      books: [],
      title: "name",
      dialog: true,
      dialogDelete: false,
      id: "",
      filterable: false,
      search:"",
      editdialog: false,
      currentBook: "",
      message: "",
      headers: [
        { text: "BOOK ID",  value: "bid" },
        { text: 'NAME', value: 'name' },
        { text: 'AUTHOR', value: 'author' },
        { text: 'COURSE', value: 'course' },
        { text: 'QUANTITY', value: 'quntity' },
        { text: 'STATUS', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    };
  },
  methods: {
    retrieveCourses() {
      // axios.get("localhost:3000/api/course")
      bookApi
        .getAll()
        .then((response) => {
          this.books = response.data.map(this.getDisplayCourses);
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
      bookApi
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

    getDisplayCourses(book) {
      return {
        id: book._id,
        bid:book.bid,
        name: book.name,
        author: book.author,
        course:book.course,
        quntity: book.quntity,
        status: book.status,
      };
    },


    editItem(id) {
      this.id = id;
      console.log(id);
      this.editdialog = true;
      this.getBookById(id);
    },

    getBookById(id) {
      bookApi
        .getById(id)
        .then((response) => {
          this.currentBook = response.data;

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

     updateBook(currentBook) {
      var id = currentBook._id;
      var data = {
        bid : currentBook.bookid,
        name: currentBook.name,
        author : currentBook.author,
        course: currentBook.course,
         quntity: currentBook.quntity,
          status: currentBook.status,
      };
      console.log(data);
      bookApi
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

      bookApi
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
    this.retrieveCourses();
  },
};
</script>

<style>
</style>