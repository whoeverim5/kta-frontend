<script setup lang="ts">
import { useRouter } from 'vue-router';
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

import useUserStore from '@/store/user';
import crypto from '@/utils/md5';
import api from '@/api';

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
const disabled = ref<boolean>(false);
const isSending = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const userStore = useUserStore();
const sendButtonContent = ref<string>('发 送');
const registerInfoFormRef = ref<FormInstance>();
const registerInfo = reactive<RegisterType>({
  account: '',
  password: '',
  reenteredPassword: '',
  email: '',
  code: '',
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
  if (!value.match(pattern)) return callback(new Error('请填写正确的邮箱地址'));
  return callback();
};

const validateCode = (rule: any, value: string, callback: any) => {
  if (!value || value === '') return callback(new Error('验证码不能为空'));
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
      const user = {
        account: registerInfo.account,
        password: crypto(registerInfo.password),
        email: registerInfo.email,
      };
      const resp = {
        state: false,
        message: '',
      };
      const jsonInfo = JSON.stringify(user);
      api
        .register(jsonInfo, registerInfo.code)
        .then(
          () => {
            userStore.$patch({
              account: registerInfo.account,
              password: registerInfo.password,
              email: registerInfo.email,
            });
            resp.state = true;
          },
          (fail) => {
            // 网络及状态码异常
            resp.message = fail.message;
          }
        )
        .finally(() => {
          setTimeout(() => {
            // 按钮状态切换
            isLoading.value = false;
            switch (resp.state) {
              case true:
                ElMessage({
                  message: '注册成功',
                  type: 'success',
                });
                // 跳转到主页
                router.push('/login');
                break;
              case false:
                ElMessage({
                  message: resp.message,
                  type: 'error',
                });
                break;
              default:
                ElMessage({
                  message: '系统出错了...',
                  type: 'error',
                });
                break;
            }
          }, 500);
        });
      return true;
    }
    ElMessage({
      message: '请填写正确的注册信息',
      type: 'error',
    });
    return false;
  });
};

const handleSendCode = (registerInfoRef: FormInstance | undefined) => {
  registerInfoRef.validateField('email', (valid) => {
    if (valid) {
      let countTime: number = 60;
      isSending.value = true;
      sendButtonContent.value = `发 送 中（${countTime}s）`;
      api.code(registerInfo.email).then(
        () => {
          ElMessage({
            message: '发送成功',
            type: 'success',
          });
          sendButtonContent.value = `已 发 送（${countTime}s）`;
          const timer = setInterval(() => {
            countTime -= 1;
            sendButtonContent.value = `已 发 送（${countTime}s）`;
          }, 1000);
          setTimeout(() => {
            clearInterval(timer);
            disabled.value = false;
            isSending.value = false;
            sendButtonContent.value = '发 送';
          }, countTime * 1000);
        },
        (fail) => {
          disabled.value = false;
          isSending.value = false;
          sendButtonContent.value = '发 送';
          ElMessage({
            message: fail.message,
            type: 'error',
          });
        }
      );
      return true;
    }
    ElMessage({
      message: '请填写正确的邮件地址',
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
        ref="registerInfoFormRef"
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
                  @clear="clearValidation(registerInfoFormRef, 'account')"
                  @focus="clearValidation(registerInfoFormRef, 'account')"
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
                  @clear="clearValidation(registerInfoFormRef, 'password')"
                  @focus="clearValidation(registerInfoFormRef, 'password')"
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
                    clearValidation(registerInfoFormRef, 'reenteredPassword')
                  "
                  @focus="
                    clearValidation(registerInfoFormRef, 'reenteredPassword')
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
                  @clear="clearValidation(registerInfoFormRef, 'email')"
                  @focus="clearValidation(registerInfoFormRef, 'email')"
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
                @clear="clearValidation(registerInfoFormRef, 'code')"
                @focus="clearValidation(registerInfoFormRef, 'code')"
              >
                <template #prefix>
                  <el-icon><Key /></el-icon>
                </template>
              </el-input>
              <el-button
                class="send"
                type="primary"
                :disabled="disabled"
                :loading="isSending"
                @click="handleSendCode(registerInfoFormRef)"
              >
                {{ sendButtonContent }}
              </el-button>
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
        @click="handleRegister(registerInfoFormRef)"
      >
        注 册
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$grey: rgb(60 64 67 / 60%);
$blue-shadow: 0 0 5px 1px rgb(64 158 255 / 25%);

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
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 10px;
    box-shadow: $blue-shadow;
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
      margin: 0 0 3%;
    }
  }
}
</style>
