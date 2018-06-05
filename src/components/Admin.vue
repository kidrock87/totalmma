<template>
  <div class="admin align-left">


      <v-flex >
        <v-btn  @click="admin_open" color="error">Добавить новость</v-btn>
        <ul class="newsul" v-if="posts && posts.length">
          <li style="" v-for="post of posts">
            <p>
              <strong style="float: left; margin-right: 10px;">{{post.title}}</strong>
              <span style="float: right">
                  <a :href="'/#/admin/edit/'+ post._id">Редактировать</a>
                  <a :href="'/admin/remove/'+ post._id">Удалить</a>
              </span>
            </p>


          </li>
        </ul>
      </v-flex>

  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
export default {
  name: 'admin',
  data() {
      return {
        posts: [],
        errors: []
      }
    },
  methods: {
    admin_open() {
      router.push({ path: '/admin/create_news' })
    }
  },
  beforeMount(){
        var user_id = localStorage.getItem('user_id');
        console.log(user_id);
        axios.post(this.$root.server_route+this.$root.server_port+'/check_login', {login: '123', password: '123'})
          .then(function (response) {
            //console.log('nachalo')
          })
          .catch(function (error) {
            console.log(error)
            router.push({ path: '/' })
          })

          axios.get(this.$root.server_route+this.$root.server_port+'/get_news/100/0')
           .then(response => {
             // JSON responses are automatically parsed.
             this.posts = response.data
             console.log(this.posts)
           })
           .catch(e => {
             this.errors.push(e)
           })
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
.article_card {
    min-height: 500px;


}
.newsul li{
  display: block;
}
@media screen and (max-width: 700px){
    .article_card img{
        max-height:500px; min-height: 300px;
    }
}
</style>
