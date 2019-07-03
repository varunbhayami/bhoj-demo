<template>
    <div>
        <section class="common-header">
            <b-container>
                <b-row align-v="center">
                    <b-col md="4" xl="3">
                        <b-navbar toggleable="md">
                            <b-navbar-brand to="/"
                                            v-if="$route.path == '/login' || $route.path == '/register' || $route.path == '/forgotpassword' || $route.path == '/resetpassword'">
                                <b-img :src="require('@/assets/images/logo.png')" alt="Logo" fluid/>
                            </b-navbar-brand>
                            <b-navbar-brand v-else to="/">
                                <b-img :src="require('@/assets/images/inner-logo.png')" alt="Logo" class="inner-logo" fluid/>
                            </b-navbar-brand>
                            <b-col class="pl-md-0 d-md-none custom-cart-res">
                                <b-nav>
                                    <b-nav-item
                                            v-if="($route.path != '/myorder' && $route.path != '/editprofile' && $route.path != '/changepassword' && $route.path != '/orderconfirm' && $route.path != '/wallet' && $route.path != '/loadmoney' && $route.path != '/transfermoney' && $route.path != '/notification' && $route.path != '/orderconfirm' && $route.path != '/register' && $route.path != '/forgotpassword' && $route.path != '/resetpassword' && $route.path != '/login' && $route.path != '/orderstatus' && $route.path != '/shoppingcartlogin' && $route.path != '/shoppingcartaddress') && !isAuthenticated"
                                            to="/login">Login
                                    </b-nav-item>
                                    <b-nav-item
                                            v-if="($route.path != '/myorder' && $route.path != '/editprofile' && $route.path != '/changepassword' && $route.path != '/orderconfirm' && $route.path != '/wallet' && $route.path != '/loadmoney' && $route.path != '/transfermoney' && $route.path != '/notification' && $route.path != '/orderconfirm' && $route.path != '/register' && $route.path != '/forgotpassword' && $route.path != '/resetpassword' && $route.path != '/login' && $route.path != '/orderstatus' && $route.path != '/shoppingcartlogin' && $route.path != '/shoppingcartaddress') && !isAuthenticated"
                                            to="/register">Sign Up
                                    </b-nav-item>
                                    <b-nav-item :class="$route.name == 'changepassword' || $route.name == 'editprofile' || $route.name == 'myorder' || $route.name == 'notification' || $route.name == 'transfermoney' || $route.name == 'wallet' ||
                            $route.name == 'orderStatus' ? 'active' : ''"
                                                v-if="($route.path != '/register' && $route.path != '/forgotpassword' && $route.path != '/resetpassword' && $route.path != '/login') && isAuthenticated"
                                                to="/myorder">
                                        <b-img :src="require('@/assets/images/myaccount.png')" alt="Account" class="account-img" fluid/>
                                        My Account
                                    </b-nav-item>
                                    <b-nav-item
                                            v-if="$route.path != '/register' && $route.path != '/forgotpassword' && $route.path != '/resetpassword' && $route.path != '/login'">
                                        <div class="dropdown">
                                            <button class="dropbtn">
                                                <svg width="30" height="30" version="1.1" id="Capa_1" x="0px" y="0px"viewBox="0 0 291.8 238" style="enable-background:new 0 0 291.8 238;" xml:space="preserve">
                                            <path d="M202,0H91H77H31.3c-3.6,0-6.8,2.8-7.2,6.4L0.1,230c-0.4,1.8,0.3,3.7,1.3,5.2c1.1,1.6,3.6,2.8,5.5,2.8h278
	                                                c1.9,0,4.4-1.2,5.5-2.8c1-1.5,1.7-3.4,1.3-5.2l-24-223.6c-0.4-3.6-3.6-6.4-7.2-6.4H216L202,0z M214,14h41.2l22.4,209H15.4L37.8,14 H77h14h110H214z"/>
                                        </svg>
                                                <span>{{ totalItems }}</span>
                                            </button>
                                            <div class="dropdown-content">
                                                <div class="addcart-product" v-if="totalItems == 0">
                                                    <h5>Card empty</h5>
                                                    <p>Good food is always cooking! Go ahead, order some yummy items from
                                                        the menu.</p>
                                                </div>
                                                <div class="addcart-product" v-if="totalItems > 0">
                                                    <b-row>
                                                        <b-col class="col-xl-4" cols="12">
                                                            <b-img thumbnail width="75" height="75" blank-color="#777"
                                                                   :src="restThumbImg" fluid :alt="resDetail.name"/>
                                                        </b-col>
                                                        <b-col class="col-xl-8 pl-0" cols="12">
                                                            <h2>{{resDetail.name}}</h2>
                                                            <p class="mb-0">{{resDetail.city}}</p>
                                                            <b-link href=""
                                                                    :to="{name:'deliveryrestaurant',params:{resId:resDetail.id}}">
                                                                VIEW FULL MENU
                                                            </b-link>
                                                        </b-col>
                                                    </b-row>
                                                    <b-row class="cart-item-list">
                                                        <b-row class="w-100 ml-0 mr-0 align-items-center"
                                                               v-for="(data,i) in itemList" :key="i">
                                                            <b-col class="col-xl-8 pr-1">
                                                                <h3>{{data.item_name}} x {{data.item_quantity}}</h3>
                                                            </b-col>
                                                            <b-col class="col-xl-4 text-right pr-1 pl-1">
                                                                Rs. {{amountValFloat(amountFloat(data.item_price * data.item_quantity))}}
                                                            </b-col>
                                                        </b-row>
                                                    </b-row>

                                                    <b-row class="align-items-center">
                                                        <b-col class="col-xl-8 subtotal">
                                                            <h3 class="pb-0">Sub total</h3>
                                                            <h4>(Extra charges may apply)</h4>
                                                        </b-col>
                                                        <b-col class="col-xl-4 text-right pl-1">
                                                            Rs. {{ amountValFloat(amountFloat(cartTotal)) }}
                                                        </b-col>
                                                    </b-row>
                                                    <b-row>
                                                        <button v-on:click="goToCart">Checkout</button>
                                                    </b-row>
                                                </div>
                                            </div>
                                        </div>
                                    </b-nav-item>
                                </b-nav>
                            </b-col>
                            <b-navbar-toggle target="nav_collapse" v-if="$route.path != '/register' && $route.path != '/forgotpassword' && $route.path != '/resetpassword' && $route.path != '/login'"></b-navbar-toggle>
                            <b-collapse is-nav id="nav_collapse">
                                <b-navbar-nav>
                                    <b-nav-item
                                            v-if="$route.path != '/register' && $route.path != '/forgotpassword' && $route.path != '/resetpassword' && $route.path != '/login'"
                                            :class="$route.path == '/dealhome' || $route.name == 'dealrestaurant'  ? 'active':''"
                                            to="/dealhome">Deal
                                    </b-nav-item>
                                    <b-nav-item
                                            v-if="$route.path != '/register' && $route.path != '/forgotpassword' && $route.path != '/resetpassword' && $route.path != '/login'"
                                            :class="$route.path == '/delivery' || $route.name == 'deliveryrestaurant' || $route.name == 'shoppingcart' ? 'active':''"
                                            to="/delivery">Delivery
                                    </b-nav-item>
                                </b-navbar-nav>
                            </b-collapse>
                        </b-navbar>
                    </b-col>
                    <b-col md="4" cols="12" xl="6">
                        <div class="search-bar"
                             v-if="$route.path=='/dealhome' || $route.name=='delivery'">
                            <div v-if="$route.path=='/dealhome'">
                                <b-form-input id="exampleInput12" autocomplete="off" v-model="searchVal"
                                              type="text" @input="getDealSearch()"
                                              placeholder="Deal Search">
                                </b-form-input>
                                <div class="main-auto-suggestion">
                                    <ul v-if="searchStatus">
                                        <li v-for="(val,i) in searchData">
                                            <div @click="filterRecord(val.res_name,'','deal')">
                                                <span>{{val.res_name}}</span></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div v-else>
                                <b-form-input id="exampleInput1" autocomplete="off" v-model="searchVal"
                                              type="text" @input="getSearch()"
                                              placeholder="Search">
                                </b-form-input>
                                <div class="main-auto-suggestion">
                                    <ul v-if="searchStatus">
                                        <li v-for="(val,i) in searchData">
                                            <div @click="filterRecord(val.item_name,val.type,'')"><span>{{val.item_name}}</span>
                                                <p v-if="val.type">{{val.type}}</p></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </section>
    </div>
</template>

<style lang="scss" scoped>
    @import './header';
</style>

<script>
    import {eventBus} from '../main'

    export default {
        data() {
            return {
                activeClass: 'active',
                searchVal: null,
                searchData: null,
                searchStatus: false,
                headerSearch: false,
                deliverylist: [],
                totalItems: 0,
                itemList: [],
                resDetail: null,
                cartTotal: 0,
                restThumbImg: '',
                currentUser: ''
            }
        },
        computed: {
            isAuthenticated() {
                return this.$store.getters.getAuthenticationStatus;
            }
        },
        watch:{
            $route (to, from){
                this.searchData = null
                this.searchVal = []
                this.searchStatus = false
            }
        },
        beforeMount() {
            let userData = JSON.parse(window.localStorage.getItem('bhoj_userData'));
            if(userData) {
                this.currentUser = userData.user_name
            }


            let items = JSON.parse(window.localStorage.getItem('items'))
            let restaurantDetail = JSON.parse(window.localStorage.getItem('restaurant'))

            if (restaurantDetail) {
                this.resDetail = restaurantDetail
                if (restaurantDetail.image) {
                    this.restThumbImg = restaurantDetail.image + "?w=60&h=40&fit=fit";
                }
            }

            if (items) {
                this.totalItems = parseInt(items.length)
                this.itemList = items

                let total = 0
                items.filter(function (item) {
                    total += item.item_price * item.item_quantity
                    return total;
                })
                this.cartTotal = total
            } else {
                this.totalItems = 0
            }
        },
        created() {
            const self = this
            eventBus.$on('updated', function (totalItems) {
                self.totalItems = totalItems
            })
            eventBus.$on('items', function (items) {
                self.itemList = items
                let total = 0
                if (items.length > 0) {
                    items.filter(function (item) {
                        total += parseInt(item.item_price) * parseInt(item.item_quantity)
                        return total;
                    })
                }
                self.cartTotal = total
            })
            eventBus.$on('restaurant', function (data) {
                self.restThumbImg = data.image;
                self.resDetail = data
            })
        },
        methods: {
            amountFloat(value) {
                if (!isNaN(value)) {
                    return +(Math.round(value + "e+2") + "e-2");
                }
                return 0;
            },
            amountValFloat(value) {
                if (!isNaN(value)) {
                    return value.toFixed(2);
                }
                return 0;
            },
            goToCart() {
                this.$router.push({name: 'shoppingcart', params: {resId: this.resDetail.id}})
            },
            onLogout() {
                this.$store.dispatch('logout')
                this.isConnected = false;
            },

            getSearch: function () {
                let formData = {
                    keyword: this.searchVal
                };
                this.searchStatus = true;
                if (this.searchVal.length > 2) {
                    this.$store.dispatch('searchRestaurant', formData).then(res => {
                        this.searchData = res.data;
                    });
                } else {
                    this.searchStatus = false;
                    this.searchData = null;
                }
            },
            getDealSearch: function () {
                let formData = {
                    res_name: this.searchVal
                };
                this.searchStatus = true;
                if (this.searchVal.length > 2) {
                    this.$store.dispatch('restaurantName', formData).then(res => {
                        this.searchData = res.data;
                    });
                } else {
                    this.searchStatus = false;
                    this.searchData = null;
                }
            },
            filterRecord: function (val, type, page) {
                const self = this;
                self.searchData = null;
                self.searchVal = val;
                let formData = {
                    item_name: val,
                    type: type,
                    offset: 0,
                    limit: 9
                };
            }
        }
    }
</script>
