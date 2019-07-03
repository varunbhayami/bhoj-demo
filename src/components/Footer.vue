<template>
    <div>
        <section class="footer-main">
            <b-container>
                <b-row>
                    <b-col xl="3" cols="6" lg="3">
                        <h6>OUR COMPANY</h6>
                        <b-link target="_blank" to="/about">about us</b-link>
                        <b-link href="#">careers</b-link>
                        <b-link target="_blank" to="/faq">FAQs</b-link>
                    </b-col>
                    <b-col xl="3" cols="6" lg="3">
                        <h6>CONTACT</h6>
                        <b-link target="_blank" to="/about#contact">Help & Support</b-link>
                        <b-link href="https://bhojdeals.com/partner/index.php?rel=login" target="_blank">Become our Restaurant Partner</b-link>
                    </b-col>
                    <b-col xl="3" cols="12" lg="3">
                        <h6>LEGAL</h6>
                        <b-link target="_blank" to="/termcondition">
                            Terms & Conditions
                        </b-link>
                        <b-link href="#">
                            Privacy Policy
                        </b-link>
                    </b-col>
                    <b-col xl="3" cols="12" lg="3">
                        <h6 class="get-title">Nepal's Favourite Foodie App</h6>
                        <b-link class="mt-lg-4 mt-3" href="https://play.google.com/store/apps/details?id=com.app.bhojdeals" target="_blank"><b-img :src="require('@/assets/images/google-store.png')" alt="No minimum order" fluid /></b-link>
                        <b-link class="mt-lg-4 mt-3" href="https://itunes.apple.com/us/app/bhojdeals/id1038039473" target="_blank"><b-img :src="require('@/assets/images/app-store.png')" alt="No minimum order" fluid /></b-link>
                    </b-col>
                </b-row>
                <div class="sub-footer">
                    <b-row>
                        <b-col xl="6" sm="6"><p>© 2018 bhoj</p></b-col>
                        <b-col xl="6" sm="6">
                            <div class="social-icon">
                                <b-link href="https://www.facebook.com/pages/Bhojdealscom/1388482661469925" target="_blank"><b-img :src="require('@/assets/images/facebook.png')" alt="Facebook" fluid /></b-link>
                                <b-link href="https://twitter.com/BhojDeals" target="_blank"><b-img :src="require('@/assets/images/twitter.png')" alt="Twitter" fluid /></b-link>
                                <b-link href="https://www.instagram.com/bhojdeals/" target="_blank"><b-img :src="require('@/assets/images/instagram.png')" alt="Instagram" fluid /></b-link>
                            </div>
                        </b-col>
                    </b-row>
                </div>
            </b-container>
        </section>
    </div>
</template>

<style lang="scss" scoped>
    @import './footer';
</style>
