<template>
  <div  class="admin_edit_news align-left">
      <v-text-field name="input-1" label="Заголовок" id="title" v-model="news_title"></v-text-field>
      <tinymce id="d1" style="" v-model="news_content"></tinymce>
      <div style="margin-top:20px;" class="cropper_warp">
        <img :src="result" id="result_img" alt="croppedImg" v-if="result"/>
        <vue-cropper v-if="isShow" :img="imgUrl" :ratio="16/9" :result.sync="result" :imgData.sync="imgData" v-on:close="hide"></vue-cropper>
      </div>
      <p style="font-size: 18px; width:50%" class="text-xs-left">
        <v-text-field name="input-1" style="width:50%; float:left"  label="url-адрес картинки" id="url-src"></v-text-field>
        <v-btn style="float:right" @click="show">Загрузить фото</v-btn>
      </p>
      <v-select
        v-bind:items="states"
        v-bind:v-model="razd1"
        label="Раздел"
        single-line
        auto
        prepend-icon="map"
        hide-details
      ></v-select>

      <div style="clear: both; margin-top: 40px;">
        <v-btn style="float: rigth;" @click="add_tag">Добавить тег</v-btn>
        <v-text-field  style="max-width: 450px; float: left;"  name="input-1" label="Тег" id="new_tag" v-model="new_tag" ></v-text-field>
      </div>
      <v-list style="clear: both;">
        <v-list-tile avatar v-for="a_tag in a_tags" v-bind:key="a_tag.title">
          <v-chip outline label @click="choose_tag(a_tag.title)"  color="orange">{{a_tag.title}}</v-chip>
        </v-list-tile>
      </v-list>


      <v-list style="clear: both;" >
        <template v-for="(tag, index) in tags">
            <v-list-tile-content>
              <p style="font-size: 18px;" class="text-xs-left">  {{tag.title}} <v-chip  outline label @click="delete_tag(index)" color="orange">-</v-chip></p>

            </v-list-tile-content>
        </template>
      </v-list>
      <v-btn  @click="edit_news" color="error">Сохранить</v-btn>
      <v-btn  @click="" color="error">Отмена</v-btn>

  </div>

</template>

<script>
import axios from 'axios'
import router from '../router'
import VueCropper from 'vue-cropper-simple'


export default {
  name: 'admin_edit_news',
  data () {
    return {
      news_title: '',
      news_content: '',
      razd: '',
      razd1: '',
      old_img: '',
      tags: [],
      states: ['Главные новости','Девушки','Видео','Кикбоксинг','girls'],
      new_tag: '',
      a_tags: [],
      tags: [],
      isShow: false,
      imgUrl: 'http://188.166.26.223:3334/static/allfight1511445934.jpg',
      result: '',
      imgData: {}
    }
  },
  watch: {
    // эта функция запускается при любом изменении вопроса
    new_tag: function () {
      var croperBg = document.querySelector('#new_tag')
      var new_tag = croperBg.value;
      console.log(new_tag)

          var url = this.$root.server_route+this.$root.server_port+'/tags/'+new_tag;
          axios.get(url)
           .then(response => {
             this.a_tags = response.data
             console.log(response.data)
           })
           .catch(e => {
             this.errors.push(e)
           })

    }
  },
  components: {
    VueCropper
  },
  methods: {
    edit_news(){
      var title = this.news_title
      var content = this.news_content;
      var news_img = this.result;
      var tags = this.tags;
      var razd = this.razd1;
      if(razd == 'Главные новости'){razd = 'main'}
      else if(razd.length < 1){razd = 'main'}
      else if(razd == 'Девушки'){razd = 'girls'}
      else if(razd == 'Видео'){razd = 'video'}
      else if(razd == 'Кикбоксинг'){razd = 'k1'}

      if(title.length > 0){
        var news_id = this.$route.params.id;
        var url = this.$root.server_route+this.$root.server_port+'/update_news/'+news_id;
        if(this.result.length > 0){
                axios.post(this.$root.server_route+this.$root.server_port+'/save_images', {id: news_img})
                .then(function (response) {
                  var img = response.data[0].img;
                  axios.post(url, { title: title, content: content, tags: tags, razd: razd, img: img})
                    .then(function (response) {
                      console.log(response);
                      router.push({ path: '/admin' })
                    })
                    .catch(function (error) {
                      console.log(error)
                  })
                })
                .catch(function (error) {
                  console.log(error)
                })
        }else{
              axios.post(url, { title: title, content: content, tags: tags, razd: razd, img: this.old_img})
                .then(function (response) {
                  console.log(response);
                  router.push({ path: '/admin' })
                })
                .catch(function (error) {
                  console.log(error)
              })
        }
      }
    },
    choose_tag: function (tag) {
      this.new_tag = tag;
    },
    check_tag(){
      console.log(this.new_tag);
    },
    delete_tag(index){
      this.tags.splice(index, 1)
    },
    add_tag(){
      let croperBg = document.querySelector('#new_tag')
      var new_tag = croperBg.value;
      this.tags.push({ title: new_tag })
      this.new_tag = '';
    },
    realTime (data) {
      this.previews = data
    },
    imageuploaded(res) {
      if (res.errcode == 0) {
        this.src = res.data.src;
      }
    },
      show () {
        let croperBg = document.querySelector('#url-src')
        var url = croperBg.value;
        this.imgUrl = url;
        this.isShow = true
      },
      hide () {
        this.isShow = false
      }
  },
  beforeMount(){

    var user_id = localStorage.getItem('user_id');

    axios.post(this.$root.server_route+this.$root.server_port+'/check_login', {login: '123', password: '123'})
      .then(function (response) {
        //console.log('nachalo')
      })
      .catch(function (error) {
        console.log(error)
        router.push({ path: '/' })
      })


      var news_id = this.$route.params.id;
      axios.get(this.$root.server_route+this.$root.server_port+'/news/'+news_id)
       .then(response => {
         this.news_title = response.data.title;
         this.news_content = response.data.content;
         this.tags = response.data.tags;
         this.razd = response.data.razd;
         this.old_img = response.data.img
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
@media screen and (max-width: 700px){
    .article_card img{
        max-height:500px; min-height: 300px;
    }
}
</style>
