<template>
    <div id="mybhojapp" :class="{toggleOpen: isOpenToggle}">
        <div class="overlay"></div>
        <app-header v-if="$route.path != '/' && $route.path != '/sidebar'"></app-header>
        <notifications class="custom-vue-notify" group="app" position="top center"/>
        <notifications @click.native="onPushClick" class="custom-vue-notify" group="pushnotify" position="top center"/>
        <vue-progress-bar></vue-progress-bar>
        <transition appear mode="out-in" name="slide-fade">
            <router-view class="view"></router-view>
        </transition>
        <app-footer></app-footer>
        <b-modal centered hide-header ref="showappstore">
            <b-container fluid>
                <b-row class="mb-1 text-center">
                    <b-col><h5 class="my-4">If you are on your mobile, you will get much better experience using our mobile app, please download the BHOJ App.</h5></b-col>
                </b-row>
            </b-container>
            <div slot="modal-footer">
                <b-button @click="hideModal" variant="secondary">No</b-button>
                <b-button @click="storeRedirect" variant="success">Yes</b-button>
            </div>

        </b-modal>
    </div>
</template>

<style scoped lang="css">
    @import './assets/css/style.css';
</style>

<script>
    export default {
        name: 'mybhojapp',
        data() {
            return {
                storeLnik:"",
                pushPayload: "",
                isOpenToggle: false,
                position: []
            }
        }
    }
</script>
