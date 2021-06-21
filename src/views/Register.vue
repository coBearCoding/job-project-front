<template>
<v-container>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="register(user)"
    >
    <v-text-field
        v-model="user.name"
        :rules="NameRules"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.password"
        :rules="passwordRules"
        label="Password"
        type="password"
        required
      ></v-text-field>

      <span>Do you already have an account? <router-link to='/'>Login</router-link></span>
      <br>
      <br>

      <v-btn
        :disabled="!valid"
        color="info"
        class="mr-4"
        type="submit"
      >
        Register
      </v-btn>
    </v-form>

    <div class="text-center ma-2">
    <v-snackbar
      v-model="snackbar"
    >
      {{ registered }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
  </v-container>
</template>

<script>
import {mapActions} from 'vuex';
 
  export default {
    name: 'Index',

    components: {
     
    },

    data: () => ({
      valid: true,
      user:{
        email: '',
        password: '',
        name: ''
      },
      registered: '',
       snackbar: false,
       text: '',
      NameRules:[
        v => !!v || 'Name is required',
        v => (v && v.length >= 6) || 'Name must at least than 6 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules:[
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must at least than 6 characters',
      ]
    }),

    methods: {
      ...mapActions(['register'])
    },
    watch: {
        registered(){
            this.registered = this.register()
            if(this.registed != null){
                this.snackbar = true;
                this.text = 'Registered';
            }
        }
    }
  }
</script>
