<template>
  <el-container>
    <el-header>
      <div class="blog_title">
        <el-row>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              title
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <a class="icon">
                <fa-icon :icon="['fab', 'github-square']" />
              </a>
              <a class="icon">
                <fa-icon :icon="['fab', 'twitter']" />
              </a>
              <a class="icon">
                <fa-icon :icon="['fab', 'facebook']" />
              </a>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-header>
  </el-container>
</template>

<script>
</script>
<style scoped lang="scss">
.el-header {
  background-color: #409eff;
  color: white;
  text-align: left;
  line-height: 60px;
  font-size: 24px;
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .blog_title {
    font-family: "Quicksand", "Avenir", "Arial", "Hiragino Kaku Gothic ProN", YuGothic, "Yu Gothic", "Hiragino Sans", "ヒラギノ角ゴシック", "メイリオ", Meiryo, sans-serif;
    font-weight: bold;
    .icon:hover {
      color: black;
    }
  }
}
</style>
