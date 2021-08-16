<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">登录</h2>
        <div class="login_header_title">
          <a
            href="javascript:;"
            :class="{ on: phoneOrAcount }"
            @click="phoneOrAcount = true"
            >短信登录</a
          >
          <a
            href="javascript:;"
            :class="{ on: !phoneOrAcount }"
            @click="phoneOrAcount = false"
            >账号登录</a
          >
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{ on: phoneOrAcount }">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phoneNumber"
              />
              <button
                v-if="!countDown"
                :disabled="!rightPhone"
                class="get_verification"
                :class="{ right_phone: rightPhone }"
                @click.prevent="getVerificationCode()"
              >
                获取验证码
              </button>
              <button v-else disabled="disabled" class="get_verification">
                已发送({{ countDown }}s)
              </button>
            </section>
            <section class="login_verification">
              <input
                type="number"
                maxlength="6"
                placeholder="验证码"
                v-model="phoneVerificationCode"
                oninput="if(value.length>6)value=value.slice(0,6)"
              />
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{ on: !phoneOrAcount }">
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="account"
                />
              </section>
              <section class="login_verification">
                <input
                  :type="showPwd ? 'text' : 'password'"
                  maxlength="16"
                  placeholder="密码"
                  v-model="pwd"
                />
                <div
                  class="switch_button"
                  @click="showPwd = !showPwd"
                  :class="showPwd ? 'off' : 'on'"
                >
                  <div class="switch_circle"></div>
                </div>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="accountVerificationCode"
                />
                <img
                  ref="captcha"
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                  @click="getCaptcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-iconarrowl"></i>
      </a>
    </div>
    <AlertTip
      :alertText="alertText"
      @confirmTip="confirmTip"
      v-if="isShowAlert"
    />
  </section>
</template>

<script>
import AlertTip from '@/components/AlertTip/AlertTip'
import { reqUsernameLogin, reqVerificationCode, reqSmsLogin } from '@/api'
export default {
  components: { AlertTip },
  data() {
    return {
      phoneOrAcount: true,
      phoneNumber: '',
      countDown: 0,
      phoneVerificationCode: '',
      account: '',
      pwd: '',
      showPwd: false,
      accountVerificationCode: '',
      isShowAlert: false,
      alertText: ''
    }
  },
  computed: {
    rightPhone() {
      return /^1\d{10}$/.test(this.phoneNumber)
    }
  },
  methods: {
    // 获取手机验证码
    async getVerificationCode() {
      if (!this.countDown) {
        this.countDown = 30
        this.countDownInterval = setInterval(() => {
          this.countDown--
          if (this.countDown <= 0) {
            clearInterval(this.countDownInterval)
          }
        }, 1000)
        const result = await reqVerificationCode(this.phoneNumber)
        if (result.code === 1) {
          this.showAlert(result.msg)
          this.countDown = 0
          clearInterval(this.countDownInterval)
          this.countDownInterval = null
        }
      }
    },
    // 取消弹窗
    confirmTip() {
      this.isShowAlert = false
      this.alertText = ''
    },
    // 显示弹窗
    showAlert(text) {
      this.isShowAlert = true
      this.alertText = text
    },
    // 登录
    async login() {
      const { showAlert } = this
      let result
      if (this.phoneOrAcount) {
        const { rightPhone, phoneVerificationCode, phoneNumber } = this
        if (!rightPhone) {
          showAlert('手机号码不正确')
          return
        } else if (!/^\d{6}$/.test(phoneVerificationCode)) {
          showAlert('验证码为6位数字')
          return
        }
        result = await reqSmsLogin(phoneNumber, phoneVerificationCode)
      } else {
        const { account, pwd, accountVerificationCode } = this
        if (!account) {
          showAlert('用户名不能为空')
          return
        } else if (!pwd) {
          showAlert('密码不能为空')
          return
        } else if (!accountVerificationCode) {
          showAlert('验证码不能为空')
          return
        }
        result = await reqUsernameLogin({
          account,
          pwd,
          accountVerificationCode
        })
      }
      if (result.code === 1) {
        showAlert(result.msg)
        this.getCaptcha()
        return
      }
      if (this.countDown) {
        this.countDown = 0
        clearInterval(this.countDownInterval)
        this.countDownInterval = null
      }
      this.$store.dispatch('recordUser', result.data)
      this.$router.back()
    },
    // 获取验证码
    getCaptcha() {
      this.$refs.captcha.src = `http://localhost:4000/captcha?time=${Date.now()}`
    }
  }
}
</script>

<style lang="less" scope>
@import '~@/assets/less/mixins.less';
.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;
  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;
    .login_header {
      .login_logo {
        font-size: 30px;
        font-weight: bold;
        color: @red;
        text-align: center;
      }
      .login_header_title {
        padding-top: 40px;
        text-align: center;
        > a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;
          display: inline-block;
          &:first-child {
            margin-right: 40px;
          }
          &.on {
            color: @red;
            font-weight: 700;
            border-bottom: 2px solid @red;
          }
        }
      }
    }
    .login_content {
      > form {
        > div {
          display: none;
          &.on {
            display: block;
          }
          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;
            &:focus {
              border: 1px solid @red;
            }
          }
          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;
            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;
              &.right_phone {
                color: black;
              }
            }
          }
          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;
            .switch_button {
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding-left: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              &.off {
                background: #fff;
                > .switch_circle {
                  transform: translateX(0px);
                }
              }
              &.on {
                background: @red;
                > .switch_circle {
                  transform: translateX(14px);
                }
              }
              > .switch_circle {
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;
              }
            }
          }
          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;
            > a {
              color: @red;
            }
          }
        }
        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }
      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }
    .go_back {
      position: absolute;
      top: 8px;
      left: 6px;
      width: 30px;
      height: 30px;
      > .iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>
