<template>
  <div class="team">
     <v-card-title><h2>Dashboard</h2></v-card-title>
    <v-container >
      <v-layout row wrap>
         <v-flex
        sm6
        xs12
        md6
        lg3
      >
       <v-card class="ma-3">
    <v-list-item  >
       <v-list-item-avatar
        tile
        class="mt-n7"
      >
       
      </v-list-item-avatar>
      <v-list-item-content>
        <div class="overline text-right">Total Courses</div>
        <v-list-item-title class="headline mb-1 text-right" >614</v-list-item-title>
        <div><v-divider></v-divider></div>
      </v-list-item-content> 
    </v-list-item>
    <v-card-actions>
      <v-icon text class="ma-2">person</v-icon>
      <div class="overline">Manage</div>
    </v-card-actions>
  </v-card>
      </v-flex>
       <v-flex
        sm6
        xs12
        md6
        lg3
      >
       <v-card class="ma-3">
    <v-list-item>
       <v-list-item-avatar
        tile
        class="mt-n7"
      >
     
      </v-list-item-avatar>
      <v-list-item-content>
        <div class="overline text-right">Total Students</div>
        <v-list-item-title class="headline mb-1 text-right" >+700</v-list-item-title>
        <div><v-divider></v-divider></div>
      </v-list-item-content> 
    </v-list-item>
    <v-card-actions>
      <v-icon text class="ma-2">person</v-icon>
      <div class="overline">Manage</div>
    </v-card-actions>
  </v-card>
      </v-flex>
       <v-flex
        sm6
        xs12
        md6
        lg3
      >
       <v-card class="ma-3">
    <v-list-item>
       <v-list-item-avatar
        tile
        class="mt-n8"
      >
     <font-awesome-icon icon="fa-regular fa-chalkboard-user" />
     
      </v-list-item-avatar>
      <v-list-item-content>
        <div class="overline text-right"> Total Lecteres</div>
        <v-list-item-title class="headline mb-1 text-right" >245</v-list-item-title>
        <div><v-divider></v-divider></div>
      </v-list-item-content> 
    </v-list-item>
    <v-card-actions>
      <v-icon text class="ma-2">person</v-icon>
      <div class="overline">Manage</div>
    </v-card-actions>
  </v-card>
      </v-flex>
       <v-flex
        sm6
        xs12
        md6
        lg3
      >
       <v-card class="ma-3">
    <v-list-item >
       <v-list-item-avatar
        tile
        class="mt-n7"
      >
      
      </v-list-item-avatar>
      <v-list-item-content>
        <div class="overline text-right">Total Books</div>
        <v-list-item-title class="headline mb-1 text-right" >1730</v-list-item-title>
        <div><v-divider></v-divider></div>
      </v-list-item-content> 
    </v-list-item>
    <v-card-actions>
      <v-icon text class="ma-2">person</v-icon>
      <div class="overline"> Manage</div>
    </v-card-actions>
  </v-card>
 </v-flex>
 <v-row>
        <v-col cols="12" sm="6">
          <v-card>
            <v-app-bar flat color="rgba(0,0,0,0)">
              <v-toolbar-title class="title black--text pl-0 ml-2">
                Impression 
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="deep-purple" class="white--text mr-2">Weekly</v-btn>
              <v-btn color="deep-purple lighten-4" class="deep-purple--text ">Monthly</v-btn>
            </v-app-bar>
            <v-sparkline
            :fill="fill"
            :line-width="width"
            :padding="padding"
            :smooth="radius || false"
            :value="value"
            auto-draw
            color="deep-purple"></v-sparkline>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card>
            <v-app-bar flat color="rgba(0,0,0,0)">
              <v-toolbar-title class="title black--text pl-0 ml-2">
                Activity
              </v-toolbar-title>
            </v-app-bar>
            <v-app-bar flat color="rgba(0,0,0,0)">
              <v-btn fab color="purple lighten-4" elevation="0">
               
              </v-btn>
              <v-toolbar-title class="title black--text ml-2">
                courses enrollments <span class="caption"><br>120</span>
              </v-toolbar-title>
              <v-spacer></v-spacer>
             
            </v-app-bar>
             <v-app-bar flat color="rgba(0,0,0,0)">
              <v-btn fab color="green lighten-4" elevation="0">
                
              </v-btn>
              <v-toolbar-title class="title black--text ml-2">
                Students Admission Forms<span class="caption"><br>1115</span>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-title class="subtitle-1 black--text ml-2">
                -
              </v-toolbar-title>
             
            </v-app-bar>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card height="180px">
            <v-row>
              <v-col cols="12" sm="4">
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="mb-4">Today's trends courses </div>
                    <v-list-item-subtitle class="grey--text">as of 25 May 2022 9.41 am</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="12" sm="8">
                <v-sparkline
                :value="value"
                :smooth="radius || false"
                :padding="padding"
                :line-width="width"
                :stroke-linecap="lineCap"
                :fill="fills"
                :type="type"
                :auto-line-width="autoLineWidth"
                auto-draw
                color="red"
                >

                </v-sparkline>
                <v-card-actions class="justify-end">
                  <v-btn text color="green">
                    <v-icon class="mt-n2 pr-2">fas fa-sort-down</v-icon> 8.5
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card>
            <v-row>
              <v-col cols="12" sm="6" class="border">
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="mb-4">Library Meterials</div>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-progress-circular
                        rotate="360"
                        size="100"
                        width="15"
                        value="70"
                        color="teal"
                        >
                        70%
                        </v-progress-circular>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-list-item-subtitle class="grey--text mt-8">150</v-list-item-subtitle>
                        <v-list-item-subtitle class="grey--text">250</v-list-item-subtitle>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-sol cols="12" sm="6" align="center">
                <v-list-item two-line class="mt-10">
                  <v-list-item-content>
                     <v-list-item-title class="headline mb-1 black--text">
                    1500
                  </v-list-item-title>
                  <v-list-item-subtitle class="grey--text">books</v-list-item-subtitle>
                  </v-list-item-content>
                 
                </v-list-item>
              </v-sol>
            </v-row>
          </v-card>
        </v-col>
      </v-row>       
       
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data: () => ({
     tab: null,
     text: 'center',
     fill: true,
      padding: 8,
      radius: 10,
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      width: 2,
      lineCap: 'round',
      type: 'trend',
      autoLineWidth: false,
      fills: false,
  })
}
</script>
<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)
  >.v-card__text
    color: #000
</style>
<style scoped>
.border {
  border-right: 1px solid grey
}
</style>

