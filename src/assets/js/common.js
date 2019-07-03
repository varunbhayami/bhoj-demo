
import $ from 'jquery/dist/jquery.min';

export default {
  toggleAddress() {
    if ($('.overlay').hasClass('active')) {
      $('.overlay').removeClass('active');
    } else {
      $('.overlay').addClass('active');
    }
    this.$parent.$emit('toggleNav');
    this.isOpenToggle = !this.isOpenToggle;
    if (this.isOpenToggle) {
      $('#sidemenu').toggle('slide');
    } else {
      $('#sidemenu').toggle('slide');
    }
  },
};
