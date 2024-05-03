<script setup lang="ts">
import IconFacebook from "~/assets/svg/icon-facebook.svg"
import IconInstagram from "~/assets/svg/icon-instagram.svg"
import IconYoutube from "~/assets/svg/icon-youtube.svg"
</script>

<template>
  <div class="footer-container">
    <div class="location-text">TRENČÍN, SLOVENSKO</div>
    <div class="social-links">
      <NuxtLink to="https://www.instagram.com/playinmove/" target="_blank"
        ><IconInstagram class="icon-social-size" :fontControlled="false" filled
      /></NuxtLink>
      <NuxtLink to="https://www.facebook.com/profile.php?id=100069611048714" target="_blank"
        ><IconFacebook class="icon-social-size" :fontControlled="false"
      /></NuxtLink>
      <NuxtLink to="https://www.youtube.com/channel/UC6IL4oCWK1LVL6VYLiklppQ" target="_blank"
        ><IconYoutube class="icon-social-size" :fontControlled="false"
      /></NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 121px;
  padding: 0 40px;
  box-sizing: border-box;
  background-color: #000;
}

.location-text {
  color: #fff;
  font-size: 29px;
  font-weight: 700;
}

.social-links {
  display: flex;
  gap: 27px;
}
.social-links .icon-social-size {
  width: 68px;
  height: 68px;
}
</style>
