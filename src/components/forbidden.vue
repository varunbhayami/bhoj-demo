<template>
    <div>
        <b-container>
            <b-row align-v="center">
                <b-col col-6 md="6" class="mx-auto">
                    <b-row align-v="center">
                        <b-col col-4 md="4">
                            <h1>4</h1>
                        </b-col>
                        <b-col col-4 md="4" class="text-center">
                            <b-img class="img" v-bind:src="logo" fluid alt="logo"/>
                        </b-col>
                        <b-col col-4 md="4">
                            <h1>4</h1>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>


<style lang="scss" scoped>
    h1{
        font-size: 196px;
        align-items: center;
        display: flex;
        height: 400px;
        text-align: center;
        width: 100%;
        justify-content: center;
    }
    .img{
    }
</style>
<script>
    import logo from '../assets/images/bhoj_logo.png';

    export default{
        data() {
            return {
                logo:null,
            }
        },
        mounted(){
            this.logo = logo
        },
        methods: {

        }
    }
</script>
