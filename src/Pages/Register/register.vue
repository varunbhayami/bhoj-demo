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

                            <b-form @submit.prevent="submit">
                                <b-row>
                                    <b-col md="12" offset-xl="1" xl="10">
                                        <b-row>
                                            <b-col md="5" xl="5">
                                                <div :class="$v.username.$error? 'custom-box mb-4' :'custom-box'">
                                                    <label :class="{invalidlabel:$v.username.$error}">Name</label>
                                                    <b-input-group :class="{invalid:$v.username.$error}">
                                                        <b-form-input @input="$v.username.$touch()"
                                                                      id="inlinefromusername" placeholder="Name"
                                                                      tabindex="1" v-model="username"></b-form-input>
                                                    </b-input-group>
                                                    <div v-if="$v.username.$error">
                                                        <span v-if="!$v.username.required" class="invalid-message">Please enter a name.</span>
                                                    </div>
                                                </div>
                                                <div :class="$v.email.$error? 'custom-box mb-4' :'custom-box'">
                                                    <label :class="{invalidlabel:$v.email.$error}">Email</label>
                                                    <b-input-group :class="{invalid:$v.email.$error}">
                                                        <b-form-input :disabled="isEmailDisabled" @input="$v.email.$touch()"
                                                                      id="inlinefromemail" placeholder="Email"
                                                                      tabindex="2" type="email"
                                                                      v-model="email"></b-form-input>
                                                    </b-input-group>
                                                    <div v-if="$v.email.$error">
                                                        <span v-if="!$v.email.required" class="invalid-message">Please enter an email address.</span>
                                                        <span v-if="!$v.email.email" class="invalid-message">Please enter a valid email address.</span>
                                                    </div>
                                                </div>
                                                <div :class="$v.password.$error? 'custom-box mb-4' :'custom-box'"
                                                     v-if="type==null">
                                                    <label :class="{invalidlabel:$v.password.$error}">Password</label>
                                                    <b-input-group :class="{invalid:$v.password.$error}">
                                                        <b-form-input @input="$v.password.$touch()" id="inlinefrompassword"
                                                                      placeholder="Password" tabindex="3"
                                                                      type="password"
                                                                      v-model="password"></b-form-input>
                                                    </b-input-group>
                                                    <div v-if="$v.password.$error">
                                                        <span v-if="$v.password.$error" class="invalid-message">Password must contain at least 6 or more characters.</span>
                                                    </div>
                                                </div>
                                                <div :class="$v.confirmpassword.$error? 'custom-box mb-4' :'custom-box'"
                                                     v-if="type==null">
                                                    <label :class="{invalidlabel:$v.confirmpassword.$error}">Confirm
                                                        password</label>
                                                    <b-input-group :class="{invalid:$v.confirmpassword.$error}">
                                                        <b-form-input @input="$v.confirmpassword.$touch()" id="inlinefromconfpassword"
                                                                      placeholder="Confirm Password" tabindex="4"
                                                                      type="password"
                                                                      v-model="confirmpassword"></b-form-input>
                                                    </b-input-group>
                                                    <div v-if="$v.confirmpassword.$error">
                                                        <span class="invalid-message"
                                                              v-if="!$v.confirmpassword.required && $v.confirmpassword.sameAs">Please enter a confirm password.</span>
                                                        <span v-if="!$v.confirmpassword.sameAs" class="invalid-message">Password do not match. please try again</span>
                                                    </div>
                                                </div>
                                                <div :class="$v.country.$error? 'custom-box mb-4' :'custom-box'">
                                                    <label :class="{invalidlabel:$v.country.$error}">Country</label>
                                                    <b-form-select @input="getUsersCountry" class="mb-2 mr-sm-2 mb-sm-0"
                                                                   tabindex="5" v-model="country">
                                                        <option slot="first" :value="null" selected disabled>Select
                                                            Country
                                                        </option>
                                                        <option :value="country.country_name"
                                                                v-for="country in countryList">{{country.country_name}}
                                                        </option>
                                                    </b-form-select>

                                                    <div v-if="$v.country.$error">
                                                        <span v-if="!$v.country.required" class="invalid-message">Please select country.</span>
                                                    </div>
                                                </div>
                                                <div :class="$v.mobile.$error? 'custom-box mb-4' :'custom-box'">
                                                    <label :class="{invalidlabel:$v.mobile.$error}">Mobile
                                                        number</label>
                                                    <div :class="{invalid:$v.mobile.$error}"
                                                         class="input-group input-group-custom">
                                                        <div class="input-group-prepend">
                                                            <div class="input-group-text">
                                                                <b-form-select class="mb-2 mr-sm-2 mb-sm-0" disabled
                                                                               tabindex="6" v-model="country_code">
                                                                    <option :value="country.country_name"
                                                                            v-for="country in countryList">
                                                                        {{country.country_code}}
                                                                    </option>
                                                                </b-form-select>
                                                            </div>
                                                        </div>
                                                        <input @input="$v.mobile.$touch()" class="form-control"
                                                               id="inlineFormInputGroup" placeholder="Enter number"
                                                               type="text" v-model="mobile">
                                                    </div>
                                                    <div v-if="$v.mobile.$error">
                                                        <span v-if="!$v.mobile.required" class="invalid-message">Please enter a mobile number.</span>
                                                        <span v-if="!$v.mobile.numeric" class="invalid-message">Please enter a valid mobile number.</span>
                                                    </div>
                                                </div>
                                                <div :class="$v.dob.$error? 'custom-box mb-4' :'custom-box'">
                                                    <label :class="{invalidlabel:$v.dob.$error}">Date of birth</label>
                                                    <datepicker :class="{invalid:$v.dob.$error}" :disabledDates="state.disabledDates"
                                                                :open-date="state.date"
                                                                @input="$v.dob.$touch()" placeholder="Select date"
                                                                v-model="dob"></datepicker>
                                                    <div v-if="$v.dob.$error">
                                                        <span v-if="!$v.dob.required" class="invalid-message">Please select date of birth.</span>
                                                    </div>
                                                </div>
                                                <div :class="$v.gender.$error? 'custom-box mb-4' :'custom-box'">
                                                    <label :class="{invalidlabel:$v.gender.$error}">Gender</label>
                                                    <b-form-select class="mb-2 mr-sm-2 mb-sm-0"
                                                                   :value="null"
                                                                   :options="{ 'Male': 'Male', 'Female': 'Female'}"
                                                                   id="inlineFormCustomSelectPref"
                                                                   @input="$v.gender.$touch()" v-model="gender"
                                                                   :class="{invalid:$v.gender.$error}">
                                                        <option slot="first" :value="null" selected disabled>Select
                                                            Gender
                                                        </option>
                                                    </b-form-select>
                                                    <div v-if="$v.gender.$error">
                                                        <span v-if="!$v.gender.required" class="invalid-message">Please select gender.</span>
                                                    </div>
                                                </div>
                                                <div class="custom-box">
                                                    <div class="mb-2 mr-sm-2 mb-sm-0 custom-control custom-checkbox custom-control-inline"
                                                         data-v-2c1b0afb="">
                                                        <input :value="null" @input="$v.agree.$touch()"
                                                               autocomplete="off" class="custom-control-input"
                                                               id="__BVID__26" type="checkbox"
                                                               v-model="agree">
                                                        <label class="custom-control-label" for="__BVID__26">Please
                                                            Agrees to all the
                                                            <b-link href=""
                                                                    target="_blank">
                                                                Terms & Conditions
                                                            </b-link>
                                                        </label></div>
                                                    <div v-if="$v.agree.$error">
                                                        <span v-if="!$v.agree.sameAs" class="invalid-message">Please accept the Terms & Condition to create an account.</span>
                                                    </div>
                                                </div>

                                                <b-button :disabled="$v.$invalid" @input="$v.password.$touch()" type="submit"
                                                          variant="primary">Sign Up
                                                </b-button>
                                            </b-col>
                                            <b-col class="d-none d-md-block" md="2" xl="2">
                                                <div class="or-title">
                                                    <h2>OR</h2>
                                                </div>
                                            </b-col>
                                            <b-col class="mt-5 mt-sm-0" md="5" xl="5">
                                                <h3><span>Sign up using</span></h3>
                                                <div class="social-login">
                                                    <button @click="buttonClicked" class="fb social-common">
                                                        <div class="spinner"
                                                             v-if="isWorking"></div>
                                                        <b-img :src="require('@/assets/images/facebook-login.png')" alt="User"
                                                               fluid/>
                                                        Facebook
                                                    </button>
                                                    <g-signin-button class="go social-common"
                                                                     :params="googleSignInParams"
                                                                     @success="onSignInSuccessGoogle"
                                                                     @error="onSignInErrorGoogle">
                                                        <b-img :src="require('@/assets/images/google+.png')" alt="Google" fluid/>
                                                        Google
                                                    </g-signin-button>
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
    @import 'register';
</style>
<script>
    import loader from '../../assets/images/loader.gif'
    import {required, email, numeric, sameAs, minLength} from 'vuelidate/lib/validators'
    import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
    import {loadFbSdk, getLoginStatus, fbLogout, fbLogin} from '../../helper'

    export default {
        components: {
            Datepicker
        },
        metaInfo: {
            title: 'Sign UP',
            titleTemplate: '%s | Bhojdeals'
        },
        data() {
            return {
                prevPath: "/delivery",
                showAlertMsg: 0,
                notifyMessage: "",
                state: {
                    disabledDates: {
                        from: new Date(new Date().getFullYear() - 5, new Date().getMonth(), new Date().getDate()),
                    },
                    date: new Date(1995, 0, new Date().getDate())
                },
                username: '',
                password: '',
                email: '',
                country: null,
                gender: null,
                confirmpassword: '',
                mobile: '',
                dob: '',
                agree: '',
                country_code: 'Nepal',
                format: "d MMMM yyyy",
                type: null,
                sid: '',
                countryList: [],
                personalID: '',
                FB: undefined,
                googleSignInParams: {
                    client_id: ''
                },
                appId: "",
                version: "",
                isWorking: false,
                isEmailDisabled: false,
                loader: {
                    msg: '',
                    url: loader,
                    show: false,
                },
                isConnected: false,
            }
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
        props: {
            useremail: '',
            logintype: '',
            fbsid: '',
            fullName: ''
        },
        created: function () {
            Object.assign(this.$data, this.$options.data.call(this));
            this.email = this.$props.useremail;
            this.type = this.$props.logintype;
            this.sid = this.$props.fbsid;
            this.username = this.$props.fullName;
        },
        mounted() {
            if (this.email != '') {
                this.isEmailDisabled = true;
            }
            this.$nextTick(() => {
                this.$v.$reset();
            });
            this.getCountryList();
            this.isEmailDisabled = false;
        },
        validations() {
            if (this.type == null) {
                return {
                    username: {
                        required
                    },
                    password: {
                        required,
                        minLength: minLength(6)
                    },
                    confirmpassword: {
                        required,
                        sameAs: sameAs('password')
                    },
                    email: {
                        required, email
                    },
                    country: {
                        required
                    },
                    gender: {
                        required
                    },
                    mobile: {
                        required, numeric
                    },
                    dob: {
                        required
                    },
                    agree: {
                        sameAs: sameAs(() => true)
                    }
                }
            } else {
                return {
                    username: {
                        required
                    },
                    email: {
                        required, email
                    },
                    country: {
                        required
                    },
                    gender: {
                        required
                    },
                    mobile: {
                        required, numeric
                    },
                    dob: {
                        required
                    },
                    agree: {
                        sameAs: sameAs(() => true)
                    }
                }
            }

        },
        methods: {
            tokenRegister(user_id) {
                const web_token = window.localStorage.getItem('web_token');
                let formData = {
                    user_id: user_id,
                    device_type: 'Web',
                    token: web_token
                };
                this.$store.dispatch('userDeviceInfo', formData).then(res => {
                });
            },
            submit() {
                this.$v.$touch();
                if (!this.$v.$invalid && !this.$v.$error) {
                    this.loader.show = true;
                    let formData = {
                        user_email: this.email,
                        user_pass: this.password,
                        user_name: this.username,
                        country_code: this.country_code,
                        user_country: this.country,
                        user_phone_no: this.mobile,
                        user_gender: this.gender,
                        dob: this.dob,
                        type: (this.type != '' && this.type != undefined) ? this.type : 'regular',
                        sid: this.sid != '' ? this.sid : '',
                    };
                    this.$store.dispatch('signUp', formData).then(res => {
                        this.loader.show = false;
                        const response = res;
                        if (response.status == 0) {
                            this.isConnected = false;
                            this.notifyMessage = response.message
                            this.showAlertMsg = 5
                        } else {
                            this.tokenRegister(response.data.user_id);
                            this.$router.push(this.prevPath);
                        }
                    });
                }
            },
            getCountryList() {
                this.$store.dispatch('getCountryList').then(res => {
                    const response = res;
                    if (response.status == 1) {
                        this.countryList = response.data;
                    }
                })
            },
            getUsersCountry() {
                this.country_code = this.country;
            },
            buttonClicked() {
                this.$emit('click')
                this.login();
            },
            login() {
            }
        }
    }
</script>
