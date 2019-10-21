<template>
  <el-container class='layout-default'>
    <el-header height="197px">
      <My-header></My-header>
    </el-header>
    <el-main>
      <div>
        <nuxt />
      </div>
    </el-main>
    <el-footer style='height:100%'>
      <My-footer></My-footer>
    </el-footer>
  </el-container>
  
</template>
<script>
import MyHeader from '@/components/public/header/index.vue'
import MyFooter from "@/components/public/footer/index.vue"
  export default{
    components:{
      MyHeader,
      MyFooter
    }
  };
</script>
<style>

</style>
