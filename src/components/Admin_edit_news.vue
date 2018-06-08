<template>
  <div  class="admin_edit_news align-left">
      <v-text-field name="input-1" label="url" id="title" v-model="post_url"></v-text-field>
      <a :href="post_url" target="_blank"><v-btn  color="error">Открыть</v-btn></a>



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

function nodeToDom(node) {
  if (typeof node === 'string' || node instanceof String) {
    return document.createTextNode(node);
  }
  if (node.tag) {
    var domNode = document.createElement(node.tag);
    if (node.attrs) {
      for (var name in node.attrs) {
        var value = node.attrs[name];
        domNode.setAttribute(name, value);
      }
    }
  } else {
    var domNode = document.createDocumentFragment();
  }
  if (node.children) {
    for (var i = 0; i < node.children.length; i++) {
      var child = node.children[i];
      domNode.appendChild(nodeToDom(child));
    }
  }
  return domNode;
}

export default {
  name: 'admin_edit_news',
  data () {
    return {
      news_title: '',
      news_content: '',
      post_url: '',
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
      let post_url = this.post_url;
      let original_post_url  = this.post_url;
      console.log(original_post_url);
      let news_id =  this.$route.params.id;
      //http://telegra.ph/V-ozhidanii--Rashid-Magomedov-zhdet-novye-predlozheniya-ot-UFC-05-17
      //https://api.telegra.ph/getPage/V-ozhidanii--Rashid-Magomedov-zhdet-novye-predlozheniya-ot-UFC-05-17?return_content=true
      post_url =post_url.slice(17);
      post_url = 'https://api.telegra.ph/getPage' + post_url + '?return_content=true';

      let tags = this.tags;
      let insert_date = Date.now();


      const vm = this;

      //'https://api.telegra.ph/getPage/V-ozhidanii--Rashid-Magomedov-zhdet-novye-predlozheniya-ot-UFC-05-17?return_content=true'

      axios.get(post_url)
        .then(function (response) {
        //  console.log(response.data.result);
          //console.log()


         var ccc = response.data.result.content;
         ccc.shift();



         let content = '';






         for ( var val of ccc ) {
              var el = nodeToDom(val);
              el = el.outerHTML;
              //console.log(el)
               content += el;


          }

         var title = response.data.result.title;
         var img = response.data.result.image_url;
         var url = vm.$root.server_route+vm.$root.server_port+'/update_news/'+news_id;


         if(post_url.length > 0){
               axios.post(url, { title: title, content: content, tags: tags, img: img, post_url: original_post_url})
                .then(function (response) {
                  console.log(response);
                  router.push({ path: '/admin' })
                })
                .catch(function (error) {
                  console.log(error)
                })

        }

        })
        .catch(function (error) {
          console.log(error)
          //router.push({ path: '/' })
        })

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
         this.post_url = response.data.post_url;

         //this.old_img = response.data.img
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
