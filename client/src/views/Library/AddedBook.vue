<template>
 <v-container>
   <v-alert border="left" close-text="Close Alert" color="green accent-4" dark dismissible v-if="this.$route.params.message">
     {{this.$route.params.message}}
   </v-alert>

   <v-toolbar-title class="title black--text ml-2">
                ALL BOOKS<span class="caption">
                  <br>
                  <br>
                </span>
              </v-toolbar-title>
               <v-toolbar-title class="title black--text ml-2">
                Home  >  Books<span class="caption">
                  <br>
                  
                </span>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <br>
 <div class="table" style="height:100vh;">
  <v-data-table
    :headers="headers"
    :items="bookID"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Manage Books</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
          <v-text-field
          v-model="search"
          label="search"
          append-icon="mdi-magnify"
          single-line
          hide-details
      ></v-text-field>

      <v-spacer></v-spacer>
    
        <template>
          <v-row
          align="center"
          justify="space-around"
            >
  
         <v-btn to='/addbook' color="primary">Add Book</v-btn>
        
          </v-row>
        </template>

        <v-dialog
          v-model="dialog"
          max-width="500px"
        >

          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                 
                    <v-text-field
                      v-model="editedItem.BID"
                      label="Book ID"
                    ></v-text-field>
                </v-row>
                <v-row>
                  
                 
                    <v-text-field
                      v-model="editedItem.Bname"
                      label="Book name"
                    ></v-text-field>
                </v-row><v-row>
                  
                    <v-text-field
                      v-model="editedItem.author"
                      label="Author"
                    ></v-text-field>

                </v-row><v-row>
                    <v-text-field
                      v-model="editedItem.course"
                      label="Course name">
                      </v-text-field>
                 </v-row><v-row>
                    <v-text-field
                      v-model="editedItem.date"
                      label="Date"
                    ></v-text-field>

                  </v-row> <v-row>
                    <v-text-field
                      v-model="editedItem.quantity"
                      label="Quantity"
                    ></v-text-field>
                  </v-row> <v-row>
                    <v-text-field
                      v-model="editedItem.status"
                      label="Status"
                    ></v-text-field>
                  </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>

            
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
             <v-card-title class="text-h5">Delete</v-card-title>
             
            <v-card-title class="text-h10">Are you sure you want to delete this book?</v-card-title>

            <v-spacer></v-spacer>
          
            <v-card-actions>
                <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
      
        </v-dialog>
      </v-toolbar>
    </template>
        <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>

 </div>
 </v-container>
</template>

<script>
  export default {
    data: () => ({
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'BOOK ID',
          align: 'start',
          sortable: false,
          value: 'BID',
        },
        { text: 'NAME', value: 'Bname' },
        { text: 'AUTHOR', value: 'author' },
        { text: 'COURSE', value: 'course' },
        { text: 'DATE', value: 'date' },
        { text: 'QUANTITY', value: 'quantity' },
        { text: 'STATUS', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      bookID: [],
      editedIndex: -1,
      editedItem: {
        BID:'',
        Bname: '',
        author: 0,
        course: 0,
        date: 0,
        quantity: 0,
        status: 0,
      },
      defaultItem: {
        BID:'',
        Bname: '',
        author: 0,
        course: 0,
        date: 0,
        quantity: 0,
        status: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Add Book' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.bookID = [
          {
            BID:'#0001',
            Bname: 'Introduction to programming',
            author: 'Nick Samoylov',
            course: 'Information Technology',
            date: 'June 15, 2018',
            quantity: '15',
            status: 'Available',
         
          },
          {
             BID:'#0002',
            Bname: 'Elements of Marketing Management',
            author: 'Dr Mariam Noronha',
            course: 'Bachelor of Commerce',
            date: 'May 15, 2008',
            quantity: '18',
            status: 'Available',
          },
          {
            BID:'#0003',
            Bname: 'Advanced Mathematics',
            author: 'Stanley Farlow',
            course: 'Advanced Mathematics',
            date: 'June 15, 2000',
            quantity: '30',
            status: 'Available',
          },
          {
            BID:'#0004',
            Bname: 'Morpho: Anatomy for Artists',
            author: 'Michel Lauricella',
            course: 'Art',
            date: 'June 15, 2018',
            quantity: '19',
            status: 'Available',
            
          },
          
           {
            BID:'#0005',
            Bname: 'Harry Potter',
            author: 'J.K.Rowling',
            course: 'Art',
            date: 'June 15, 2020',
            quantity: '20',
            status: 'Available',
            
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.bookID.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.bookID.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.bookID.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.bookID[this.editedIndex], this.editedItem)
        } else {
          this.bookID.push(this.editedItem)
        }
        this.close()
      },
       filterOnlyCapsText (value, search, item) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
      },
    },

  }
</script>

<style>
.myTable{
  overflow-y: hidden;
}
</style>