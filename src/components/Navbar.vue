<template>
  <div>
    <v-toolbar dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-toolbar-title to='/'>Job Test</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on" icon>
              <v-icon>mdi-account-circle-outline</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-if="token != null || token != '' ">
            <v-btn plain @click="logOut">Logout</v-btn>
          </v-list-item>

          <v-list-item v-if="token == null || token == ''">
            <v-btn plain>Login</v-btn>
          </v-list-item>
          <v-list-item v-if="token == null || token == ''">
            <v-btn plain>Register</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item  to='/movies'>
            <v-list-item-title>Movies</v-list-item-title>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item to="/actors">
              <v-list-item-title>Actors</v-list-item-title>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item to='/film-crew'>
            <v-list-item-title >Film Crew</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
export default {
  name: "Navbar",
  data: () => ({
    drawer: false,
    group: null,
    token: null
  }),

  methods: {
   ...mapActions(['getToken', 'logOut']),
  },

  created(){
    this.getToken();
    this.token = this.getToken();
    console.log(this.getToken());
  },

  watch: {
    group() {
      this.drawer = false;
    },
    token(){
      if (this.getToken() == null){
        this.token = null;
        console.log(this.token);
      }
    }
  },
};
</script>

