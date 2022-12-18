<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue';
import {
  ElButton,
  ElIcon,
  ElInput,
  ElForm,
  ElFormItem,
  ElCol,
  ElMessage,
  ElSpace,
} from 'element-plus';
import { Lock, User } from '@element-plus/icons-vue';
import type { FormInstance } from 'element-plus';
import { useRouter } from 'vue-router';
import api from '@/api';
import crypto from '@/utils/md5';

type LoginType = {
  account: string;
  password: string;
};
type LoginValidationType = {
  account: [{}];
  password: [{}];
};

const router = useRouter();
const isLoading = ref<boolean>(false);
const loginInfoFormRef = ref<FormInstance>();
const loginInfo = reactive<LoginType>({
  account: '',
  password: '',
});

const validateAccount = (rule: any, value: string, callback: any): void => {
  if (!value || value === '') return callback(new Error('账号不能为空'));
  if (value.length < 8) return callback(new Error('账号长度不能小于8位'));
  return callback();
};

const validatePassword = (rule: any, value: string, callback: any) => {
  if (!value || value === '') return callback(new Error('密码不能为空'));
  return callback();
};

const loginInfoRules = reactive<LoginValidationType>({
  account: [{ validator: validateAccount, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
});

const handleLogin = (loginInfoRef: FormInstance | undefined) => {
  if (!loginInfoRef) return;
  loginInfoRef.validate((valid: boolean) => {
    if (valid) {
      isLoading.value = true;
      const user = {
        account: loginInfo.account,
        password: crypto(loginInfo.password),
      };
      const jsonInfo = JSON.stringify(user);
      // 登录请求
      api
        .login(jsonInfo)
        .then(
          (success) => {
            sessionStorage.setItem('token', success.data.token);
            ElMessage({
              message: '登录成功',
              type: 'success',
            });
            // 跳转到主页
            router.push('/home');
          },
          (fail) => {
            ElMessage({
              message: fail.message,
              type: 'error',
            });
          }
        )
        .finally(() => {
          isLoading.value = false;
        });
      return true;
    }
    ElMessage({
      message: '请填写正确的登录信息',
      type: 'error',
    });
    return false;
  });
};

const clearValidation = (
  loginInfoRef: FormInstance | undefined,
  prop: string
) => {
  if (!loginInfoRef) return;
  loginInfoRef.clearValidate(prop);
};

const handleNewUser = () => {
  router.push('/register');
};

const handleForget = () => {};

const handleUserPolicy = () => {
  const url = router.resolve({
    path: '/user-policy',
  });
  window.open(url.href, '_blank');
};

const handlePrivacy = () => {
  const url = router.resolve({
    path: '/privacy',
  });
  window.open(url.href, '_blank');
};
</script>

<template>
  <div class="login-container">
    <div class="box">
      <div class="title">
        <h1>用 户 登 录</h1>
      </div>
      <el-form
        ref="loginInfoFormRef"
        label-position="left"
        label-width="auto"
        size="large"
        class="form"
        :inline="false"
        :model="loginInfo"
        :rules="loginInfoRules"
      >
        <el-space direction="vertical" :size="24">
          <el-form-item label="账号" prop="account">
            <div class="input account">
              <el-input
                clearable
                size="large"
                placeholder="请输入账号"
                v-model="loginInfo.account"
                @clear="clearValidation(loginInfoFormRef, 'account')"
                @focus="clearValidation(loginInfoFormRef, 'account')"
              >
                <template #prefix>
                  <el-icon><User /></el-icon>
                </template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <div class="input password">
              <el-input
                clearable
                show-password
                size="large"
                placeholder="请输入密码"
                v-model="loginInfo.password"
                @clear="clearValidation(loginInfoFormRef, 'password')"
                @focus="clearValidation(loginInfoFormRef, 'password')"
              >
                <template #prefix>
                  <el-icon><Lock /></el-icon>
                </template>
              </el-input>
              <div class="links">
                <el-button
                  link
                  class="register"
                  type="primary"
                  @click="handleNewUser"
                >
                  注册新用户
                </el-button>
                <el-button
                  link
                  class="forget"
                  type="primary"
                  @click="handleForget"
                >
                  忘记密码？
                </el-button>
              </div>
            </div>
          </el-form-item>
        </el-space>
      </el-form>
      <el-button
        round
        size="large"
        class="login"
        type="primary"
        :loading="isLoading"
        @click="handleLogin(loginInfoFormRef)"
      >
        登 录
      </el-button>
      <div class="term">
        <span class="text">登录即表示同意平台</span>
        <el-button link type="primary" @click="handleUserPolicy">
          《用户协议》
        </el-button>
        <span class="text">和</span>
        <el-button link type="primary" @click="handlePrivacy">
          《隐私政策》
        </el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$grey: rgb(60 64 67 / 60%);
$blue-shadow: 0 0 5px 1px rgb(237 245 255 / 100%);

.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .box {
    width: 50%;
    height: 55%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 10px;
    box-shadow: $blue-shadow;
    overflow: hidden;

    .title > h1 {
      margin: 20px 0 30px;
      font-weight: normal;
      color: $grey;
    }

    .form {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;

      /* stylelint-disable-next-line selector-class-pattern */
      :deep(.el-form-item__label) {
        color: $grey;
      }

      .input {
        width: 400px;
      }

      .password {
        height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      }
    }

    .login {
      width: 20%;
      font-size: 22px;
    }

    .links {
      width: 100%;
      display: flex;
      justify-content: space-between;
      overflow: hidden;
    }

    .term {
      display: flex;
      overflow: hidden;
      font-size: 12px;
      color: $grey;
    }
  }
}
</style>
