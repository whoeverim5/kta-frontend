<script setup lang="ts">
import { ElButton } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="notfound-container">
    <div class="gif">
      <p>404</p>
      <h2>看起来你迷路了</h2>
      <div class="link">
        <h5>你所寻找的页面已丢失！</h5>
        <el-button link class="back" type="primary" @click="router.back">
          返回上一页
        </el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.notfound-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #fff;

  .gif {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: url('@/assets/images/404.gif') no-repeat center;

    p {
      position: absolute;
      top: 3rem;
      color: #333;
      font-size: 7rem;
    }

    h2 {
      position: absolute;
      bottom: 8rem;
      font-size: 34px;
    }

    .link {
      position: absolute;
      display: flex;
      bottom: 6rem;
      flex-direction: row;
      justify-content: space-between;

      h5 {
        color: #9c9c9c;
      }

      .back {
        font-weight: 700;
      }
    }
  }
}
</style>
