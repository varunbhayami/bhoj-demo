<template>
    <aside :class="{ active: active}" id="sidemenu">
        <h2>
            <b-link href="">
                <b-img :src="require('@/assets/images/capa.png')" @click="toggleNav()" alt="cross" fluid/>
            </b-link>
            Save delivery address
        </h2>
        <div class="address-map">

            <label>
                <gmap-autocomplete @place_changed="setPlace"></gmap-autocomplete>
            </label>

            <GmapMap :center="center" :zoom="17" style="height: 420px;">
                <gmap-marker :clickable="true" :draggable="true" :key="i" :position="m.position"
                             @dragend="updateCoordinates" @place_changed="setPlace" position_changed="positionChanged"
                             v-for="(m,i) in markers"></gmap-marker>
            </GmapMap>

        </div>
        <b-form @submit.prevent="onSubmit">
            <div class="from-group">
                <label :class="{invalidlabel:$v.address.$error}">Address (Auto defined based on Google Map Pin
                    above)</label>
                <b-form-input :class="{invalid:$v.address.$error}" @input="$v.address.$touch()" disabled
                              placeholder="Enter Address" v-model="address"></b-form-input>
                <span v-if="$v.address.$error" class="invalid-message">Please enter a valid address.</span>
            </div>
            <div class="from-group">
                <label :class="{invalidlabel:$v.house.$error}">House No / Building name / Office Name (Put NA if not
                    available)</label>
                <b-form-input :class="{invalid:$v.house.$error}" @input="$v.house.$touch()" placeholder="Enter details"
                              v-model="house"></b-form-input>
                <span v-if="$v.house.$error" class="invalid-message">Please enter address details.</span>
            </div>
            <div class="from-group">
                <label :class="{invalidlabel:$v.landmark.$error}">Addition address description (e.g. Landmarck
                    etc)</label>
                <b-form-input :class="{invalid:$v.landmark.$error}" @input="$v.landmark.$touch()"
                              placeholder="Enter details"
                              v-model="landmark"></b-form-input>
                <span v-if="$v.landmark.$error" class="invalid-message">Please enter address details.</span>
            </div>
            <b-button :disabled="$v.$invalid && clicked" type="submit">Save Address</b-button>
        </b-form>
    </aside>
</template>

<style scoped>
    .invalid {
        border: 1px solid #ff6666;
        border-radius: 3px;
    }

    .invalidlabel {
        color: #ff6666;
    }

    .invalid-message {
        color: #ff6666;
        font-size: small;
        margin-left: 6px;
    }
</style>

<style scoped>
    @import '../assets/css/toast.css';
</style>
<script>
    import toggleAddress from '../../src/assets/js/common'
    import {required} from 'vuelidate/lib/validators';
    import axios from 'axios'
    import {eventBus} from '../main';

    export default {
        data() {
            return {
                user_id: null,
                isOpenToggle: false,
                place: null,
                active: false,
                center: {
                    lat: 0,
                    lng: 0
                },
                markers: [{
                    position: {lat: 0, lng: 0},
                }],
                address: '',
                house: '',
                landmark: '',
                lat: '',
                lng: '',
                coordinates: null,
                clicked: true
            }
        },
        validations: {
            address: {
                required
            },
            house: {
                required
            },
            landmark: {
                required
            },
        },
        methods: {
            setDescription(description) {
                this.description = description;
            },
            updateCoordinates(location) {
                this.lat = location.latLng.lat();
                this.lng = location.latLng.lng();
                axios.defaults.headers.common = {}
                axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + this.lat + "," + this.lng + "&key=AIzaSyBfef5-VBSme65FJRQce1PXF0Ncw3fzSZw").then((response) => {
                    if (response.status == 200) {
                        if (response.data.results.length) {
                            this.address = response.data.results[0].formatted_address;
                        }
                    }
                })
                axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
                axios.defaults.headers.common['token'] = 'w%Lf7DoI*9Pu*Amm^*64g08VRQyjZ_QG';
            },
            setPlace(place) {
                this.place = place;
                this.markers[0].position.lat = this.lat = this.place.geometry.location.lat();
                this.markers[0].position.lng = this.lng = this.place.geometry.location.lng();
                this.center.lat = this.place.geometry.location.lat();
                this.center.lng = this.place.geometry.location.lng();
                this.address = this.place.formatted_address;
            },
            geolocate: function () {
                this.center = {
                    lat: 27.7172,
                    lng: 85.3240
                };
                this.markers[0].position.lat = this.lat = 27.7172
                this.markers[0].position.lng = this.lng = 85.3240;
                navigator.geolocation.getCurrentPosition(position => {
                    this.center = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    this.markers[0].position.lat = this.lat = position.coords.latitude;
                    this.markers[0].position.lng = this.lng = position.coords.longitude;
                });
            },
            onSubmit() {
                if (!this.clicked) {
                    return;
                }
                this.clicked = false;
                const userInfo = JSON.parse(localStorage.getItem('bhoj_userData'));
                let formData = {
                    user_id: userInfo.user_id,
                    building_name: this.house,
                    address: this.address,
                    additional_address: this.landmark,
                    latitude: this.lat,
                    longitude: this.lng
                };
                this.$store.dispatch('saveAddress', formData).then(res => {
                    const response = res;
                    if (response.status == 1) {
                        Object.assign(this.$data, this.$options.data.call(this));
                        this.$nextTick(() => {
                            this.$v.$reset();
                        })
                        eventBus.$emit('new_address_added', response.data);
                        this.$notify({
                            group: 'app',
                            type: 'success',
                            title: 'Success',
                            text: response.message,
                            duration: 10000
                        });

                        this.toggleNav();
                        this.geolocate();
                        this.place = null;
                        this.clicked = true;
                    } else if (response.status == 0) {
                        this.$notify({
                            group: 'app',
                            type: 'error',
                            title: 'Error',
                            text: response.message,
                            duration: 10000
                        });
                    }
                });
            },
        },
        mounted() {
            this.geolocate();
            this.toggleNav = toggleAddress.toggleAddress;
        }
    }
</script>
