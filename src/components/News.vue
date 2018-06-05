<template>
  <div  class="main ">

    <v-layout>
      <v-flex xs12 sm8 offset-sm1>
        <v-card>
          <div>
            <img :src="news_img" style="width: 100%;  height: auto;" />
            <div style="align-self: flex-end;">
              <v-list-tile avatar v-for="tag in tags" v-bind:key="tag.title">
               <div v-if="tag.title === 'Новости'"></div>
               <v-chip v-else outline label color="orange"><b> <a style="color: black" :href="'/#/tags/'+ tag.title">#{{tag.title}}</a></b></v-chip>
              </v-list-tile>
            </div>
          </div>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0"><b>{{news_title}}</b></h3>
              <div style="font-size: 20px; margin-top:10px;" v-html="news_content"></div>
            </div>
          </v-card-title>
            <v-progress-linear color="error"  v-bind:indeterminate="indet"></v-progress-linear>
        </v-card>
      </v-flex>
    </v-layout>




  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'



export default {
  name: 'main',
  data () {
    return {
      news_title: '',
      news_content: null,
      news_img: '',
      news_date: '',
      razd: '',
      tags: [],
      indet: true

    }
  },
  components: {

  },
  watch: {

  },
  methods: {

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
        //router.push({ path: '/' })
      })
      var news_id = this.$route.params.id;
      this.$root.AppTitle = "MMA2DAY";
      axios.get(this.$root.server_route+this.$root.server_port+'/get_news_item/'+news_id)
       .then(response => {
         this.news_title = response.data.head;
         window.document.title = this.news_title;
         this.news_content = response.data.content;
         this.tags = response.data.tags;
         this.razd = response.data.site;
         this.news_img = this.$root.news_img_serv + response.data.img;
         this.news_date = response.data.insert_date;
         this.indet = false;
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

.main{
  width: 100%;

}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
#news_content{
  min-width: 600px;
}
a {
  color: #35495E;
}


</style>
