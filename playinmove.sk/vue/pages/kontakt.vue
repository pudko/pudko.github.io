<script setup lang="ts">
import SvgBackground from "~/assets/svg/svg-contact-page-background.svg"
import SvgContactIcon from "~/assets/svg/svg-contact-title-icon.svg"
import SvgPhoneIcon from "~/assets/svg/phone-icon.svg"
import SvgLocationIcon from "~/assets/svg/location-icon.svg"
import SvgMailIcon from "~/assets/svg/mail-icon.svg"
import IconFacebook from "~/assets/svg/icon-facebook.svg"
import IconInstagram from "~/assets/svg/icon-instagram.svg"
import IconYoutube from "~/assets/svg/icon-youtube.svg"
</script>
<template>
  <section>
    <div class="contact-header">
      <div class="contact-header-content">
        <h1>HĽADÁTE PARKOUROVÝ TRÉNING? SME TU PRE VÁS</h1>
        <div class="description">
          Registrujte sa a pripojte sa k našim skupinovým alebo individuálnym tréningom.
        </div>
        <div class="motto">PLAYINMOVE - MIESTO KDE POHYB ZAČÍNA!</div>
      </div>
      <div class="wrapper">
        <SvgBackground class="background" :fontControlled="false" />
      </div>
    </div>
    <div class="contact-info">
      <div class="contact-card">
        <div class="contact-card-header">
          <div class="contact-card-header-icon">
            <SvgContactIcon style="width: 116px" :fontControlled="false" />
          </div>
          <div class="contact-card-header-title">KONTAKT</div>
        </div>
        <div class="contact-card-content">
          <div class="contact-card-content-item">
            <div class="contact-card-content-item-icon">
              <SvgMailIcon style="width: 58px" :fontControlled="false" />
            </div>
            <div class="contact-card-content-item-value">michal.pudela@gmail.com</div>
          </div>
          <div class="contact-card-content-item">
            <div class="contact-card-content-item-icon">
              <SvgPhoneIcon style="width: 43px" :fontControlled="false" />
            </div>
            <div class="contact-card-content-item-value">+ 421 949 129 155</div>
          </div>
          <div class="contact-card-content-item">
            <div class="contact-card-content-item-icon">
              <SvgLocationIcon style="width: 52px" :fontControlled="false" />
            </div>
            <div class="contact-card-content-item-value">Trenčín, Slovensko</div>
          </div>
          <div class="contact-card-content-item">
            <div class="contact-card-content-item-icon">
              <SvgLocationIcon style="width: 52px" :fontControlled="false" />
            </div>
            <div class="contact-card-content-item-value">
              Jump Centrum, Drietoma 703, 913 03, Drietoma, Slovensko (Skupinové tréningy)
            </div>
          </div>
        </div>
        <div class="contact-card-footer">
          <NuxtLink to="https://www.instagram.com/playinmove/" target="_blank">
            <IconInstagram class="social-icon" filled :fontControlled="false" />
          </NuxtLink>
          <NuxtLink to="https://www.facebook.com/profile.php?id=100069611048714" target="_blank">
            <IconFacebook class="social-icon" :fontControlled="false" />
          </NuxtLink>
          <NuxtLink to="https://www.youtube.com/channel/UC6IL4oCWK1LVL6VYLiklppQ" target="_blank">
            <IconYoutube class="social-icon" :fontControlled="false" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-header {
  position: relative;
  display: flex;
  justify-content: center;
}

.contact-header-content {
  position: absolute;
  text-align: center;
  max-width: 1616px;
  width: 100%;
}

.contact-header-content .description {
  font-size: 26px;
  font-weight: 500;
  padding-bottom: 62px;
  border-bottom: 2px solid #fff;
}

.contact-header-content h1 {
  margin-top: 130px;
}

.contact-header-content .motto {
  margin-top: 64px;
}

.contact-header-content h1,
.contact-header-content .motto {
  font-size: 32px;
  font-weight: 700;
}

.wrapper {
  position: relative;
  width: 100%;
  height: 525px;
  overflow: hidden;
  z-index: -1;
}

.background {
  width: 1920px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.contact-info {
  display: flex;
  justify-content: center;
}

.contact-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #000;
  border-radius: 25px;
  overflow: hidden;
  max-width: 692px;
  width: 100%;
  margin-top: 116px;
  margin-bottom: 174px;
}

.contact-card-header {
  display: flex;
  align-items: center;
  gap: 58px;
  padding-left: 70px;
  padding-top: 40px;
  padding-bottom: 35px;
  border-bottom: 1px solid #d5dbde;
}

.contact-card-header-title {
  font-size: 44px;
  font-weight: 700;
  color: #233548;
}

.contact-card-content {
  display: flex;
  flex-direction: column;
  max-width: 505px;
  width: 100%;
  gap: 55px;
  margin-left: 70px;
  margin-top: 60px;
  margin-bottom: 70px;
}

.contact-card-content-item {
  display: flex;
  align-items: center;
  gap: 32px;
}

.contact-card-content-item-value {
  font-size: 30px;
  font-weight: 500;
  color: #5d748b;
}

.contact-card-footer {
  display: flex;
  align-items: center;
  gap: 36px;
  height: 185px;
  padding-left: 73px;
  background-color: #233548;
}

.social-icon {
  width: 90px;
}
</style>
