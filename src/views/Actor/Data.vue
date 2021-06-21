<template>
    <div>
    <v-data-table
      :headers="headers"
      :items="actors"
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
        actors: [
        ],
      }
    },
    computed: {
      headers () {
        return [
          {
            text: 'Name',
            value: 'name'
          },
          {
            text: 'LastName',
            value: 'lastName'
          },
        ]
      },
      ...mapState(['token'])
    },
    methods: {
      async protectedData(){
        axios.get('http://localhost:1337/api/actors', {
          headers:{
            'auth-token': this.token,
          }
        }).then(response=>{
          this.actors = response.data.data;
        }).catch(error => console.log(error));
      }
    },
    created(){
    this.protectedData();
  }
}
</script>