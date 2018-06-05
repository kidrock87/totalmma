<template>
  <div  class="admin_create_news align-left">
    <v-text-field name="input-1" label="Заголовок" id="title" v-model="news_title"></v-text-field>
    <v-text-field name="input-1" label="src" id="post_url" v-model="news_url"></v-text-field>
<!--    <tinymce id="d1" style="" v-model="news_content"></tinymce>

    <v-layout style="margin-top:10px;" row wrap>
      <v-flex xs6 >
           <v-card-text class="px-0">
               <v-select
                 v-bind:items="states"
                 v-model="razd"
                 label="Раздел"
                 single-line
                 auto
                 prepend-icon="map"
                 hide-details
               ></v-select>
           </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6 >
        <v-card >

        </v-card>
      </v-flex>
    </v-layout>

    <div>
      <h2 style="margin: 0;">Vue CropperJS</h2>
              <hr />
              <input type="file" name="image" accept="image/*"
                  style="font-size: 1.2em; padding: 10px 0;"
                  on-change={this.setImage}
              />
              <br />
              <div style="max-width: 900px; display: inline-block;">
                  <vue-cropper
                      ref='cropper'
                      guides={true}
                      view-mode={2}
                      drag-mode="crop"
                      auto-crop-area={0.5}
                      min-container-width={250}
                      min-container-height={180}
                      background={true}
                      rotatable={true}
                      src={this.imgSrc}
                      alt="Source Image"
                      img-style={{ width: '400px', 'height': '300px' }}
                      cropmove={this.cropImage}>
                  </vue-cropper>
              </div>
              <img
                  src={this.cropImg}
                  style="width: 200px; height: 150px; border: 1px solid gray"
                  alt="Cropped Image"
              />
              <br />

    </div>
  -->
    <h4>Теги:</h4>
    <div style="clear: both; width:80%;">
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

    <v-btn  @click="save_news" color="error">Сохранить</v-btn>
    <v-btn  @click="" color="error">Отмена</v-btn>
    <br>

  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

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

//var ImageUploader = VueImageUploadResize.ImageUploader;
///#/admin

export default {
  name: 'admin_create_news',
  data () {
    return {
      news_content: '',
      news_title: '',
      news_url: 'https://api.telegra.ph/getPage/V-ozhidanii--Rashid-Magomedov-zhdet-novye-predlozheniya-ot-UFC-05-17',
      states: ['Главные новости','Девушки','Видео','Кикбоксинг'],
      new_tag: '',
      a_tags: [],
      tags: [],
      razd: '',
      isShow: false,
      imgUrl: 'http://188.166.26.223:3334/static/allfight1511445934.jpg',
      result: '',
      imgSrc: '',
      cropImg: '',
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
  methods: {

    setImage (e) {
            const file = e.target.files[0];

            if (!file.type.includes('image/')) {
                alert('Please select an image file');
                return;
            }

            if (typeof FileReader === 'function') {
                const reader = new FileReader();

                reader.onload = (event) => {
                    this.imgSrc = event.target.result;
                    // rebuild cropperjs with the updated source
                    this.$refs.cropper.replace(event.target.result);
                };

                reader.readAsDataURL(file);
            } else {
                alert('Sorry, FileReader API not supported');
            }
        },
        cropImage () {
            // get image data for post processing, e.g. upload or setting image src
            this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
        },
        rotate () {
            // guess what this does :)
            this.$refs.cropper.rotate(90);
        },


    choose_tag: function (tag) {
      this.new_tag = tag;
    },
    change_img(){
      vue-cropper-simple.init();
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
    save_news() {

      let post_url = this.news_url + '?return_content=true';
      let tags = this.tags;
      let insert_date = Date.now();

      console.log(post_url);

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

         console.log(post_url.length)

         if(post_url.length > 0){
              console.log(vm.$root.server_route);

              axios.post(vm.$root.server_route+vm.$root.server_port+'/save_news', {img: img, title: title, content: content, tags: tags, insert_date: insert_date})
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
    console.log(user_id);
    axios.post(this.$root.server_route+this.$root.server_port+'/check_login', {login: '123', password: '123'})
      .then(function (response) {
        //console.log('nachalo')
      })
      .catch(function (error) {
        console.log(error)
        router.push({ path: '/' })
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

.admin_create_news{
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
