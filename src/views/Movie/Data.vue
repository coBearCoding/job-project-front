<!--<template>
  <v-data-table :headers="headers" :items="movies" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Movies</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Movie
            </v-btn>
          </template>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{  }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>

    <!-- Modal de Editar 
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
          New Item
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.name"
                  label="Dessert name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.calories"
                  label="Calories"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.fat"
                  label="Fat (g)"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.carbs"
                  label="Carbs (g)"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.protein"
                  label="Protein (g)"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-data-table>
</template>-->
<template>
<v-container>
    <v-btn  @click="openCloseDialog()">New item</v-btn>
    <br>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Movie
            </th>
            <th class="text-left">
              Synopsis
            </th>
            <th class="text-left">
              Year
            </th>
            <th class="text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="movie in movies"
            :key="movie.id"
          >
            <td>{{ movie.title }}</td>
            <td>{{ movie.description }}</td>
            <td>{{ movie.year }}</td>
            <td>
                <v-btn class="warning">Edit</v-btn>
                <v-btn class="error">Delete</v-btn>
              </td>
          </tr>
        </tbody>
      </template>

      <v-dialog
        v-model="dialog"
        scrollable
        max-width="300px"
      >
        <v-card>
          <v-card-title>Select Country</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 300px;">
            
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      
    </v-simple-table>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      search: "",
      movies: [],
      dialog: false,
    };
  },
  methods: {
    async protectedData() {
      axios
        .get("http://localhost:1337/api/movies", {
          headers: {
            "auth-token": this.token,
          },
        })
        .then((response) => {
          console.log(this.token);
          this.movies = response.data.data;
        })
        .catch((error) => console.log(error));
    },
    openCloseDialog(){
      if(this.dialog == false){
        this.dialgo = true;
      }else{
        this.dialog = false;
      }
    }
  },
  created() {
    this.protectedData();
  },
  computed:{
    ...mapState(['token'])
  }
};
</script>