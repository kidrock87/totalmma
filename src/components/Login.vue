/* eslint-disable */
<template>
  <div class="login">

    <v-card>
         <v-card-title primary-title>
            <div>
              <v-form v-model="valid">
               <v-text-field
                 label="Name"
                 v-model="name"
                 :rules="nameRules"
                 :counter="5"
                 required
               ></v-text-field>
               <v-text-field
                 label="Password"
                 v-model="password"
                 :rules="passwordRules"
                 :counter="5"
                 required
               ></v-text-field>

               <v-btn @click="login" style="display:block; margin:auto;" color="error">Войти</v-btn>
             </v-form>
            </div>
          </v-card-title>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import VueLocalStorage from 'vue-localstorage'


export default {
  name: 'login',
  data () {
    return {
      valid: false,
      name: '',
      nameRules: [
        (v) => !!v || 'Это поле должно быть заполнено',
        (v) => v.length >= 5 || 'Это поле не должно быть короче 5 символов'
      ],
      password: '',
      passwordRules: [
        (v) => !!v || 'Это поле должно быть заполнено',
        (v) => v.length >= 5 || 'Это поле не должно быть короче 5 символов'
      ]

    }
  },
  methods: {
    login () {
      var login = this.name
      var pass = this.password

      axios.post(this.$root.server_route+this.$root.server_port+'/check_login', {login: login, password: pass})
        .then(function (response) {

          localStorage.setItem('user_id', response.data._id)
          //console.log(response.data._id)
          //поставить settimeout
          router.push({ path: '/' })
        })
        .catch(function (error) {
          //console.log(error.response)
          //console.log('эррор')
        })
      }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
