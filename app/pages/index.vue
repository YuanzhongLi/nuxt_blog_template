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
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">
        Processing Center
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          Workspace
        </template>
        <el-menu-item index="2-1">
          item one
        </el-menu-item>
        <el-menu-item index="2-2">
          item two
        </el-menu-item>
        <el-menu-item index="2-3">
          item three
        </el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">
            item four
          </template>
          <el-menu-item index="2-4-1">
            item one
          </el-menu-item>
          <el-menu-item index="2-4-2">
            item two
          </el-menu-item>
          <el-menu-item index="2-4-3">
            item three
          </el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item
        index="3"
      >
        Info
      </el-menu-item>
      <el-menu-item index="4">
        <a
          href="https://www.ele.me"
          target="_blank"
        >
          Orders
        </a>
      </el-menu-item>
    </el-menu>

    <el-main>
      Main
      <fa-icon :icon="['fab', 'github-square']" />
      <fa-icon :icon="['fab', 'facebook']" />
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>

export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped lang="scss">
.el-header{
  background-color: #409EFF;
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
