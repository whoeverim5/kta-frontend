<script setup lang="ts">
import { reactive, ref } from 'vue';
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
import {
  Lock,
  User,
  ArrowLeft,
  Refresh,
  Message,
  Key,
} from '@element-plus/icons-vue';
import type { FormInstance } from 'element-plus';
import { useRouter } from 'vue-router';

type RegisterType = {
  account: string;
  password: string;
  reenteredPassword: string;
  email: string;
  code: string;
};
type RegisterValidationType = {
  account: [{}];
  password: [{}];
  reenteredPassword: [{}];
  email: [{}];
  code: [{}];
};

const router = useRouter();
const sendButtonContent = ref<string>('发送');
const registerInfo = reactive<RegisterType>({
  account: '',
  password: '',
  reenteredPassword: '',
  email: '',
  code: '',
});
const isLoading = ref<boolean>(false);
const loginInfoFormRef = ref<FormInstance>();
const validateAccount = (rule: any, value: string, callback: any): void => {
  if (!value || value === '') return callback(new Error('账号不能为空'));
  if (value.length < 8) return callback(new Error('账号长度不能小于8位'));
  return callback();
};
const validatePassword = (rule: any, value: string, callback: any) => {
  if (!value || value === '') return callback(new Error('密码不能为空'));
  return callback();
};
const validateReenteredPassword = (rule: any, value: string, callback: any) => {
  if (!value || value === '') return callback(new Error('请再输入一次密码'));
  if (registerInfo.password !== value)
    return callback(new Error('两次密码不相同'));
  return callback();
};
const validateEmail = (rule: any, value: string, callback: any) => {
  if (!value || value === '') return callback(new Error('邮箱不能为空'));
  const pattern =
    /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
  if (!value.match(pattern)) return callback(new Error('请输入正确的邮箱格式'));
  return callback();
};
const validateCode = (rule: any, value: string, callback: any) => {
  if (!value || value === '') return callback(new Error('密码不能为空'));
  return callback();
};
const registerInfoRules = reactive<RegisterValidationType>({
  account: [{ validator: validateAccount, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
  reenteredPassword: [
    { validator: validateReenteredPassword, trigger: 'blur' },
  ],
  email: [{ validator: validateEmail, trigger: 'blur' }],
  code: [{ validator: validateCode, trigger: 'blur' }],
});

const handleRegister = (registerInfoRef: FormInstance | undefined) => {
  if (!registerInfoRef) return;
  registerInfoRef.validate((valid: boolean) => {
    if (valid) {
      isLoading.value = true;
      const jsonInfo = JSON.stringify(registerInfo);
      setTimeout(() => {
        isLoading.value = false;
        ElMessage({
          message: '注册成功',
          type: 'success',
        });
      }, 2000);
      return true;
    }
    ElMessage({
      message: '请填写正确的注册信息',
      type: 'error',
    });
    return false;
  });
};

const hanleBack = () => {
  router.back();
};

const clearValidation = (
  registerInfoRef: FormInstance | undefined,
  prop: string
) => {
  if (!registerInfoRef) return;
  registerInfoRef.clearValidate(prop);
};
</script>

<template>
  <div class="register-container">
    <div class="box">
      <div class="back">
        <el-button link class="back-link" type="primary" @click="hanleBack">
          <el-icon style="vertical-align: middle">
            <ArrowLeft />
          </el-icon>
          <span style="vertical-align: middle">返 回</span>
        </el-button>
      </div>
      <div class="title">
        <h1>用 户 注 册</h1>
      </div>
      <el-form
        ref="loginInfoFormRef"
        label-position="left"
        label-width="auto"
        size="large"
        class="form"
        :inline="false"
        :model="registerInfo"
        :rules="registerInfoRules"
      >
        <el-space direction="vertical" :size="24">
          <el-form-item label="账号" prop="account">
            <div class="input account">
              <el-col :span="24">
                <el-input
                  clearable
                  size="large"
                  placeholder="请输入账号"
                  v-model="registerInfo.account"
                  @clear="clearValidation(loginInfoFormRef, 'account')"
                  @focus="clearValidation(loginInfoFormRef, 'account')"
                >
                  <template #prefix>
                    <el-icon><User /></el-icon>
                  </template>
                </el-input>
              </el-col>
            </div>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <div class="input password">
              <el-col :span="24">
                <el-input
                  clearable
                  show-password
                  size="large"
                  placeholder="请输入密码"
                  v-model="registerInfo.password"
                  @clear="clearValidation(loginInfoFormRef, 'password')"
                  @focus="clearValidation(loginInfoFormRef, 'password')"
                >
                  <template #prefix>
                    <el-icon><Lock /></el-icon>
                  </template>
                </el-input>
              </el-col>
            </div>
          </el-form-item>
          <el-form-item label="重复密码" prop="reenteredPassword">
            <div class="input reenteredPassword">
              <el-col :span="24">
                <el-input
                  clearable
                  show-password
                  size="large"
                  placeholder="请再输入一次密码"
                  v-model="registerInfo.reenteredPassword"
                  @clear="
                    clearValidation(loginInfoFormRef, 'reenteredPassword')
                  "
                  @focus="
                    clearValidation(loginInfoFormRef, 'reenteredPassword')
                  "
                >
                  <template #prefix>
                    <el-icon><Refresh /></el-icon>
                  </template>
                </el-input>
              </el-col>
            </div>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <div class="input email">
              <el-col :span="24">
                <el-input
                  clearable
                  size="large"
                  placeholder="请输入邮箱"
                  v-model="registerInfo.email"
                  @clear="clearValidation(loginInfoFormRef, 'email')"
                  @focus="clearValidation(loginInfoFormRef, 'email')"
                >
                  <template #prefix>
                    <el-icon><Message /></el-icon>
                  </template>
                </el-input>
              </el-col>
            </div>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <div class="input code">
              <el-input
                clearable
                size="large"
                class="input-code"
                placeholder="请输入验证码"
                v-model="registerInfo.code"
                @clear="clearValidation(loginInfoFormRef, 'code')"
                @focus="clearValidation(loginInfoFormRef, 'code')"
              >
                <template #prefix>
                  <el-icon><Key /></el-icon>
                </template>
              </el-input>
              <el-button class="send" type="primary">
                {{ sendButtonContent }}</el-button
              >
            </div>
          </el-form-item>
        </el-space>
      </el-form>
      <el-button
        round
        size="large"
        class="register"
        type="primary"
        :loading="isLoading"
        @click="handleRegister(loginInfoFormRef)"
      >
        注 册
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$grey: rgb(60 64 67 / 60%);

.register-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .box {
    width: 35%;
    height: 75%;
    background-color: rgb(237 245 255 / 40%);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 0 5px 1px rgb(0 0 0 / 10%);
    overflow: hidden;
    position: relative;

    .back {
      position: absolute;
      top: 4%;
      left: 4%;

      .back-link {
        font-size: 16px;
      }
    }

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

      .code {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        & .input-code {
          width: 280px;
        }

        & .send {
          flex-grow: 1;
          font-size: 16px;
        }
      }
    }

    .register {
      width: 20%;
      font-size: 22px;
      margin: -5% 0 5%;
    }
  }
}
</style>
