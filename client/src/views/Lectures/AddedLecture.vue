 <template>
 <v-container>
   <v-alert border="left" close-text="Close Alert" color="green accent-4" dark dismissible v-if="this.$route.params.message">
     {{this.$route.params.message}}
   </v-alert>

   <v-toolbar-title class="title black--text ml-2">
                ALL LECTURES<span class="caption">
                  <br>
                  <br>
                </span>
              </v-toolbar-title>
               <v-toolbar-title class="title black--text ml-2">
                Home  >  Lecteres<span class="caption">
                  <br>
                  
                </span>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <br>
 <div class="table" style="height:100vh;">
  <v-data-table
    :headers="headers"
    :items="lectureID"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Manage Lecturers</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical3
        ></v-divider>
        <v-spacer></v-spacer>
         <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>

      <v-spacer></v-spacer>
    
        <template>
          <v-row
          align="center"
          justify="space-around"
            >
  
         <v-btn to='/addlecture' color="primary">Add Lecture</v-btn>
        
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
                      v-model="editedItem.LID"
                      label="LectureID"
                    ></v-text-field>
                </v-row><v-row>

                  
                    <v-text-field
                      v-model="editedItem.Lname"
                      label="Name"
                    ></v-text-field>
                 </v-row><v-row>

                  
                    <v-text-field
                      v-model="editedItem.gender"
                      label="Gender"
                    ></v-text-field>
                    </v-row><v-row>

                 
                    <v-text-field
                      v-model="editedItem.SFaculty"
                      label="Faculty"
                    ></v-text-field>
                  </v-row><v-row>

                    <v-text-field
                      v-model="editedItem.LMobile"
                      label="Mobile No"
                    ></v-text-field>
                    </v-row><v-row>
                  
                 
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
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
             
            <v-card-title class="text-h10">Are you sure you want to delete this lecture?</v-card-title>

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
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'LECTURE ID',
          align: 'start',
          sortable: false,
          value: 'LID',
        },
      
        { text: 'NAME', value: 'Lname' },
        { text: 'GENDER', value: 'gender' },
        { text: 'FACULTY', value: 'SFaculty' },
        { text: 'MOBILE NO', value: 'LMobile' },
        { text: 'EMAIL', value: 'email' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      studentID: [],
      editedIndex: -1,
      editedItem: {
        LID:'',
        Lname: '',
        gender: 0,
        SFaculty: 0,
        LMobile: 0,
        email: 0,
      },
      defaultItem: {
        LID:'',
        Lname: '',
        gender: 0,
        SFaculty: 0,
        LMobile: 0,
        email: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Add Lecture' : 'Edit Item'
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
        this.lectureID = [
          {
            LID:'001',
            Lname: 'L.L.Hewapathirana',
            gender: 'Female',
            SFaculty: 'Computing',
            LMobile: '0767856123',
            email: 'lakmi76@gmail.com',
          },
          {
            LID:'002',
            Lname: 'D.H.K.Chathurangi',
            gender: 'Female',
            SFaculty: 'Computing',
            LMobile: '0762345678',
            email: 'chathu78@gmail.com',
             
           
          },
          {
            LID:'003',
            Lname: 'S.W.Samaranayaka',
            gender: 'Female',
            SFaculty: 'Business',
            LMobile: '0712389567',
            email: 'wasu90@gmail.com', 
          },
          {
            LID:'004',
            Lname: 'T.S.Mallawaarachchi',
            gender: 'Male',
            SFaculty: 'Engineering',
            LMobile: '0784537123',
            email: 'shehan90@gmail.com', 
     
            
          },

           {
            LID:'005',
            Lname: 'S.D.Senanayaka',
            gender: 'Male',
            SFaculty: 'Engineering',
            LMobile: '0712345123',
            email: 'tharu90@gmail.com', 
     
            
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.lectureID.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.lectureID.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.lectureID.splice(this.editedIndex, 1)
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
          Object.assign(this.studentID[this.editedIndex], this.editedItem)
        } else {
          this.lectureID.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>

<style>
.myTable{
  overflow-y: hidden;
}
</style>