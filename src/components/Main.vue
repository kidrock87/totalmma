<template>
  <div  class="main ">

    <v-layout>
      <v-flex xs12 sm8 offset-sm1>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <v-card style="margin-bottom:20px;"  v-for="item in news">
              <div>
                <a :href="'/#/news/'+ item._id"><img :src="choose_item(item.insert_date)"  style="width: 100%;  height: auto;" /></a>
              </div>
              <v-list-tile  avatar v-for="tag in item.tags" v-bind:key="tag.title">
                <div v-if="tag.title === 'Новости'"></div>
               <v-chip v-else  outline hidden='true' label color="error"><b> <a style="color: black; margin:0px;" :href="'/#/tags/'+ tag.title">#{{tag.title}}</a></b></v-chip>
              </v-list-tile>
              <v-card-title primary-title>
                <div>

                  <a style="text-decoration: none; color: black; font-weight: bold;" :href="'/#/news/'+ item._id"><h3 class="headline mb-0"><b>{{item.title}}</b></h3></a>

                </div>
              </v-card-title>
            </v-card>
        </div>
        <v-progress-linear v-bind:hidden="hid" class="hidden" color="error" v-bind:indeterminate="indet"></v-progress-linear>
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
      isActive: false,
      news: [],
      indet: true,
      hid: false,
      page: 1
    }
  },
  components: {

  },
  watch: {

  },
  methods: {
    choose_item: function (item) {
      return 'http://localhost:9000/img/'+item+'.jpg'

    },
    loadMore: function() {
        this.busy = true;
        this.page = 1+this.page;
        setTimeout(() => {

            axios.get(this.$root.server_route+this.$root.server_port+'/news/'+this.page)
           .then(response => {
             var kkk  = response.data;
             if(kkk.length == 0){
               this.indet = false;
               this.hid = true;
             }
               //console.log(response.data);
             for (var i = 0; i < kkk.length; i++) {
                //  console.log(kkk[i].title);
                  this.news.push({ _id: kkk[i]._id, img: kkk[i].img, head: kkk[i].head });
             }
             /*
             for (var i = 0, j = 10; i < j; i++) {
               this.news.push({ _id: this.page, img: '1512054934779.png', title: 'UFC on FOX 24. Наши итоги' });
             }
             */
           })
           .catch(e => {
             this.errors.push(e)
           })

          this.busy = false;
        }, 1000);
      }
  },
  beforeMount(){
    var user_id = localStorage.getItem('user_id');
    this.$root.AppTitle = "MMA2DAY";
    window.document.title = "MMA2DAY";
    axios.post(this.$root.server_route+this.$root.server_port+'/check_login', {login: '123', password: '123'})
      .then(function (response) {
        //console.log('nachalo')
      })
      .catch(function (error) {
        console.log(error)
        //router.push({ path: '/' })
      })
      axios.get(this.$root.server_route+this.$root.server_port+'/get_news/10/0')

       .then(response => {
         this.news = response.data;
         console.log(response.data)
         //this.posts = response.data
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
