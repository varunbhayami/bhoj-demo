<template>
    <div>
        <section class="delivered-main">
            <b-container>
                <b-row>
                    <b-col xl="6" cols="12" md="6">
                        <b-row align-v="center">
                            <b-col align-self="center" xl="12" cols="12" md="12">
                                <b-navbar toggleable="xl">
                                    <b-navbar-brand to="/"><b-img :src="require('@/assets/images/logo.png')" alt="Logo" fluid /></b-navbar-brand>
                                    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
                                    <b-collapse is-nav id="nav_collapse">
                                        <b-navbar-nav class="ml-auto">
                                            <b-navbar-nav v-if="!isAuthenticated">
                                                <b-nav-item to="login" href="#">login</b-nav-item>
                                                <b-nav-item to="register" href="#">sign up</b-nav-item>
                                            </b-navbar-nav>
                                            <b-navbar-nav v-else="isAuthenticated">
                                                <b-nav-item to="/myorder"><b-img :src="require('@/assets/images/myaccount.png')" alt="Account" class="account-img" fluid/> My Account</b-nav-item>
                                                <b-nav-item @click="onLogout">logout</b-nav-item>
                                            </b-navbar-nav>
                                        </b-navbar-nav>
                                    </b-collapse>
                                </b-navbar>
                            </b-col>
                        </b-row>
                        <h1>What do you feel like today? </h1>
                        <b-row class="food-delivered">
                            <b-col class="border-right" xl="6" cols="6">
                                <b-link to="delivery" href="#">
                                    <span>
                                        <b-img :src="require('@/assets/images/food-delivered.png')" alt="Get Food Delivered" fluid />
                                    </span>
                                    <h2>Get Food Delivered </h2>
                                </b-link>
                            </b-col>
                            <b-col xl="6" cols="6">
                                <b-link to="dealhome" href="#">
                                    <span>
                                        <b-img :src="require('@/assets/images/restaurant-deals.png')" alt="Get Food Delivered" fluid />
                                    </span>
                                    <h2>Grab Free Restaurant Deals</h2>
                                </b-link>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-container>
        </section>
        <section class="order-delivered">
            <b-container>
                <b-row>
                    <div class="common-title w-100">
                        <h3 >Get Food <b-link to="delivery" href="#">Delivered</b-link></h3>
                    </div>
                </b-row>
                <b-row class="order-type">
                    <b-col xl="3" sm="6" lg="3">
                        <b-img :src="require('@/assets/images/min-order.png')" alt="No minimum order" fluid />
                        <h4>No minimum order</h4>
                    </b-col>
                    <b-col xl="3" sm="6" lg="3">
                        <b-img :src="require('@/assets/images/free-order.png')" alt="No minimum order" fluid />
                        <h4>Free Delivery for orders more than Rs.1000</h4>
                    </b-col>
                    <b-col xl="3" sm="6" lg="3">
                        <b-img :src="require('@/assets/images/every-order.png')" alt="No minimum order" fluid />
                        <h4>Cash back with every order</h4>
                    </b-col>
                    <b-col xl="3" sm="6" lg="3">
                        <b-img :src="require('@/assets/images/online-order.png')" alt="No minimum order" fluid />
                        <h4>Pay online or cash on delivery</h4>
                    </b-col>
                </b-row>
            </b-container>
        </section>
        <section class="restaurant-main">
            <b-container>
                <b-row >
                    <div class="common-title w-100">
                        <h3 >Grab Free Restaurant <b-link to="dealhome" href="#">Deals</b-link></h3>
                    </div>
                </b-row>
                <b-row class="order-type">
                    <b-col xl="3" sm="6" lg="3">
                        <span>
                            <b-img :src="require('@/assets/images/app-download.png')" alt="No minimum order" fluid />
                        </span>
                        <h4>Install the BHOJ
                            App on your phone</h4>
                    </b-col>
                    <b-col xl="3" sm="6" lg="3">
                        <span>
                            <b-img :src="require('@/assets/images/search-res.png')" alt="No minimum order" fluid />
                        </span>
                        <h4>Search for Restaurants.
                            Filter using cuisine
                            or location</h4>
                    </b-col>
                    <b-col xl="3" sm="6" lg="3">
                        <span>
                            <b-img :src="require('@/assets/images/deal-grab.png')" alt="No minimum order" fluid />
                        </span>
                        <h4>Grab your Free
                            Deal</h4>
                    </b-col>
                    <b-col xl="3" sm="6" lg="3">
                        <span>
                            <b-img :src="require('@/assets/images/deal-restaurant.png')" alt="No minimum order" fluid />
                        </span>
                        <h4>Show Deal to the
                            Restaurant and get
                            discounts</h4>
                    </b-col>
                </b-row>
            </b-container>
        </section>
        <section class="app-store">
            <b-container>
                <b-row>
                    <b-col xl="5" sm="6" align-self="center">
                        <h6>Nepal’s one stop
                            foodie app</h6>
                        <p>    Grab Free Deals. Get Food delivered.
                            Read restaurant reviews. Browse Menus.
                            <span>Get your Free Bhoj App today. </span></p>
                        <b-link href="https://play.google.com/store/apps/details?id=com.app.bhojdeals"><b-img :src="require('@/assets/images/google-store.png')" alt="No minimum order" fluid /></b-link>
                        <b-link href="https://itunes.apple.com/us/app/bhojdeals/id1038039473"><b-img :src="require('@/assets/images/app-store.png')" alt="No minimum order" fluid /></b-link>
                    </b-col>
                    <b-col xl="7" sm="6">
                        <b-img :src="require('@/assets/images/app-screen.png')" alt="No minimum order" fluid />
                    </b-col>
                </b-row>
            </b-container>
        </section>
    </div>
</template>

<style lang="scss" scoped>
    @import 'home';
</style>

<script>
    export default {
        metaInfo: {
            title: 'Get food delivered to your home or office in Kathmandu',
            titleTemplate: '%s | Bhojdeals',
            meta: [
                { name: 'keywords', content: 'food, restaurants, kathmandu, online, delivery, home' },
                { name: 'description', content: 'Order food online from more than 250 restaurants in Kathmandu and Lalitpur, fast delivery straight to your home or office.' }
            ]
        },
        computed:{
            isAuthenticated(){
                return this.$store.getters.getAuthenticationStatus;
            }
        },
        methods:{
            onLogout(){
                this.$store.dispatch('logout')
            }
        }
    }
</script>
