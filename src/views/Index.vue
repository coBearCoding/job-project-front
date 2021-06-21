<template>
<v-container>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="login(user)"
    >
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

      <span>You do not have an account? <router-link to='/register'>Register</router-link></span>
      <br>
      <br>

      <v-btn
        :disabled="!valid"
        color="info"
        class="mr-4"
        type="submit"
      >
        Login
      </v-btn>
    </v-form>
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
        password: ''
      },
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
      ...mapActions(['login'])
    },
  }
</script>
