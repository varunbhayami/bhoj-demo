<template>
    <div>
        <section class="myorder-main">
            <BlockUI :message="loader.msg" :url="loader.url" v-if="loader.show"></BlockUI>
            <b-container>
                <b-row>
                    <b-col xl="12">
                        <div class="order-detail">
                            <b-alert :show="showAlertMsg" fade dismissible
                                     variant="danger"
                                     @dismissed="showAlertMsg=0">
                                {{ notifyMessage }}
                            </b-alert>
                            <b-form @submit.prevent="onSubmit">
                                <b-row>
                                    <b-col md="12"  xl="10" offset-xl="1">
                                        <b-row>
                                            <b-col md="5" xl="5">
                                                <div class="custom-box">
                                                    <label :class="{invalidlabel:$v.username.$error}">Email</label>
                                                    <b-input-group :class="{invalid:$v.username.$error}">
                                                        <b-form-input @input="$v.username.$touch()" autocomplete="off" v-model="username" placeholder="Email"></b-form-input>
                                                    </b-input-group>
                                                    <div v-if="$v.username.$error">
                                                        <span v-if="!$v.username.required" class="invalid-message">Please enter email address.</span>
                                                        <span v-if="!$v.username.email" class="invalid-message">Please enter valid email address.</span>
                                                    </div>
                                                </div>

                                                <div class="custom-box">
                                                    <label :class="{invalidlabel:$v.password.$error}">Password</label>
                                                    <b-input-group :class="{invalid:$v.password.$error}">
                                                        <b-form-input @input="$v.password.$touch()" autocomplete="off" v-model="password" placeholder="Password" type="password"></b-form-input>
                                                    </b-input-group>
                                                    <span v-if="$v.password.$error" class="invalid-message">Please enter password.</span>
                                                </div>

                                                <b-link class="forgot" to="/forgotpassword">Forgot Password?</b-link>
                                                <b-button :disabled="$v.$invalid" type="submit" variant="primary">Login</b-button>
                                                <b-link class="account-create" to="/register">Don’t have an account? <span>SIGN UP</span></b-link>
                                            </b-col>
                                            <b-col class="d-none d-md-block" md="2" xl="2">
                                                <div class="or-title">
                                                    <h2>OR</h2>
                                                </div>
                                            </b-col>
                                            <b-col align-self="center" class="mt-5 mt-sm-0" md="5" xl="5">
                                                <h3><span>Sign in using</span></h3>
                                                <div class="social-login">
                                                        <button class="fb social-common" @click="buttonClicked">
                                                            <div class="spinner"
                                                                 v-if="isWorking"> </div>
                                                            <b-img :src="require('@/assets/images/facebook-login.png')" alt="User" fluid/>
                                                             Facebook
                                                        </button>
                                                    <g-signin-button class="go social-common"
                                                            :params="googleSignInParams"
                                                            @success="onSignInSuccessGoogle"
                                                            @error="onSignInErrorGoogle">
                                                        <b-img :src="require('@/assets/images/google+.png')" alt="Google" fluid/> Google
                                                    </g-signin-button>
                                                        <!--<button class="tw social-common" @click="authTwitter('twitter')" >
                                                            <div class="spinner"></div>
                                                            <b-img :src="require('@/assets/images/twitter.png')" alt="Twitter" fluid/>
                                                            Twitter
                                                        </button>-->
                                                </div>
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </section>
    </div>
</template>

<style lang="scss" scoped>
    @import 'login';
</style>

<script>
    import loader from '../../assets/images/loader.gif'
    import { required,email } from 'vuelidate/lib/validators'
    import { loadFbSdk, getLoginStatus, fbLogout, fbLogin } from '../../helper'

    export default {
        metaInfo: {
            title: 'Login',
            titleTemplate: '%s | Bhojdeals'
        },
        beforeRouteEnter(to, from, next) {
            try {
                next(vm => {
                    vm.prevPath = from.path
                })
            } catch (err) {
                next(false)
            }
        },
        mounted(){
              if (window.localStorage.getItem('bhoj_userData')){
                  this.$router.push('/')
              }

            this.isWorking = true;
        },
        data(){
            return {
                prevPath: "/delivery",
                showAlertMsg:0,
                notifyMessage:"",
                appId: "",
                version: "",
                isWorking: false,
                username:'',
                password:'',
                isConnected: false,
                name: '',
                email: '',
                personalID: '',
                FB: undefined,
                googleSignInParams: {
                    client_id: ''
                },
                loginOptions: null,
                loader:{
                    msg:'',
                    url:loader,
                    show:false,
                }
            }
        },
        computed:{
          isAuthenticated(){
              return this.$store.getters.getAuthenticationStatus;
          }
        },
        validations:{
            username: {
                required,email
            },
            password: {
                required
            }
        },
        methods: {
            buttonClicked() {
                this.$emit('click')
                this.login();
            },
            tokenRegister(user_id){
                const web_token = window.localStorage.getItem('web_token');
                let formData = {
                    user_id:user_id,
                    device_type :'Web',
                    token: web_token
                };
                this.$store.dispatch('userDeviceInfo', formData).then(res => {
                });
            },
            logout() {
            },
            login() {
                this.isWorking = true;
            },
            onSubmit () {
                if (!this.$v.$invalid && !this.$v.$error){
                    this.loader.show = true;
                    let formData = {
                        email:this.username,
                        password:this.password,
                        type:'regular'
                    };
                    this.$store.dispatch('login', formData).then(res => {
                        const response = res;
                        this.loader.show = false;
                        if (response.status == 0){
                            if (response.type == 'facebook') {
                                this.$router.push({ name: 'register', params: {useremail: response.email }})
                            } else if (response.type == 'regular'){
                                this.notifyMessage = response.message
                                this.showAlertMsg = 5
                            }
                        } else if (response.status == 1) {
                            this.tokenRegister(response.data.user_id);
                            if (this.prevPath != '/resetpassword' && this.prevPath != '/order-confirm') {
                                this.$router.push(this.prevPath);
                            } else {
                                this.$router.push({name:'delivery'});
                            }
                        }

                    });
                }
            }
        }
    }
</script>
