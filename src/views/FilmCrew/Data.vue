<template>
    <div>
    <v-data-table
      :headers="headers"
      :items="filmCrew"
      item-key="name"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search (UPPER CASE ONLY)"
          class="mx-4"
        ></v-text-field>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios';
import {mapState} from 'vuex';
export default {
  name: 'Home',
  data () {
      return {
        search: '',
        calories: '',
        filmCrew: [
        ],
      }
    },
    computed: {
      headers () {
        return [
          {
            text: 'Movie',
            sortable: false,
            value: 'title',
          },
          {
            text: 'Actor',
            value: 'name'
          },
          {
            text: 'Year',
            value: 'year'
          },
        ]
      },
      ...mapState(['token'])
    },
    methods: {
      async protectedData(){
        axios.get('http://localhost:1337/api/actors-movies', {
          headers:{
            'auth-token': this.token,
          }
        }).then(response=>{
          console.log(response.data.message);
          response.message
          this.filmCrew = response.data.message.rows;
        }).catch(error => console.log(error));
      }
    },
    created(){
    this.protectedData();
  }
}
</script>