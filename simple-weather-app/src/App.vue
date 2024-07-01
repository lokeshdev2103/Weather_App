<template>
  <q-layout view="lHh Lpr lFf">
   <q-header elevated class="bg-dark salmon">
     <q-toolbar class="nav">
       <q-toolbar-title>
         WEATHER APPLICATION
       </q-toolbar-title>
     </q-toolbar>
     <q-tabs class="tab">
         <q-route-tab
           :to="{name:'Home'}"
           replace
           label="DashBoard"
           />
           <q-route-tab
           :to="{name:'About'}"
           replace
           label="App Info"
           />
       </q-tabs>
   </q-header>

   <q-page-container>
     <router-view />
   </q-page-container>
 </q-layout>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent ({
 name: 'LayoutDefault',
})
</script>
<style scoped>
.nav{
 height: 50px;
 text-align: center;
 font-size: 25;
}
</style>
