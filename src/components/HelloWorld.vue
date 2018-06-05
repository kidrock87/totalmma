<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout >
        <v-flex xs12 sm6 offset-sm0>
          <v-card style="padding: 5%;">
              <h1>{{title}}</h1>
              <img :src="img" alt="Vuetify.js"  style="width: 100%;  height: auto;">
              <div v-html="content"></div>
          </v-card>
        </v-flex>
    <!--    <p style="" v-for="post of content">
            {{post.children[0][1]}}
        </p> -->
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>


<script>
import axios from 'axios'
import router from '../router'


  export default {
    data: () => ({
      content: [],
      title: '',
      img: ''
    }),
    beforeMount(){
      /*
        {"ok":true,"result":{"short_name":"totalmma","author_name":"totalmma","author_url":"","access_token":"1f1f9c982da27cbc770493637a1f6356cf776e2739a02982bf22e6746ca9","auth_url":"https:\/\/edit.telegra.ph\/auth\/U4K5vsd6l18BSyGCT22ZpUn2AWBXqelkg3oLwBRPAY"}}
      */
      const vm = this;


      axios.get('https://api.telegra.ph/getPage/V-ozhidanii--Rashid-Magomedov-zhdet-novye-predlozheniya-ot-UFC-05-17?return_content=true')
        .then(function (response) {
        //  console.log(response.data.result);
          //console.log()


         var ccc = response.data.result.content;
         ccc.shift();



         let content = '';






     for ( var val of ccc ) {
          var el = nodeToDom(val);
          el = el.outerHTML;
          console.log(el)
           content += el;


      }

        vm.content = content;
        //console.log(content.);
         vm.title = response.data.result.title;
         vm.img = response.data.result.image_url;
        })
        .catch(function (error) {
          console.log(error)
          //router.push({ path: '/' })
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  color: #42b983;
}
</style>
