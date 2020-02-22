<template>
  <el-container>
    <el-header>
      <div class="blog_title">
        じょんログ
      </div>
      Header
    </el-header>
    <el-main>
      Main
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>

export default {
  components: {

  },
};
</script>

<style scoped lang="scss">
.el-header{
  background-color: #409EFF;
  color: white;
  text-align: left;
  line-height: 60px;
}

.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
