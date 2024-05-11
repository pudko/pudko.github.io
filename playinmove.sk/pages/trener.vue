<script setup lang="ts">
import SvgBackground from "~/assets/svg/trainer-page-background.svg"
import BorderImage from "~/assets/svg/border-image-trainer.svg"
</script>

<template>
  <section>
    <div class="trainer-info">
      <div class="container">
        <div class="trainer-info-header">
          <h1>Michal Púdela</h1>
          <div class="title">V POHYBE: 20 ROKOV</div>
          <div class="certificate">OSVEDČENIE</div>
        </div>
        <div class="trainer-info-content">
          <div class="description">
            <p>
              Michal Púdela je vaším sprievodcom vo svete parkouru. S bohatými skúsenosťami v
              oblasti parkouru, freerunnigu a workoutu vedie tréningy s vášňou a odbornosťou. Michal
              je certifikovaný ako funkčný tréner so zdravotným zameraním.
            </p>

            <p>
              Pohybu sa aktívne venuje od svojich 6 rokov. Začal ako zápasník v gréckorímskom a
              voľnom štýle, kde sa mu podarilo získať 7x titul majstra Slovenska.
            </p>

            <p>
              Následne sa začal venovať parkouru a freerunnigu v ktorom pôsobí už 13 rokov. Na tejto
              ceste začal šíriť svoje skúsenosti odovzdávať radosť z pohybu. Zamieriava sa primárne
              na deti a mládež.
            </p>
          </div>
        </div>
      </div>
      <div class="wrapper">
        <SvgBackground class="background" :fontControlled="false" />
      </div>
      <div class="trainer-image">
        <BorderImage class="border-image" stroke="#000" :fontControlled="false" />
        <img src="~/assets/images/trainer-image.png" alt="" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.trainer-info {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  position: absolute;
  text-align: center;
  max-width: 1760px;
  width: 100%;
}

.trainer-info-header {
  border-bottom: 2px solid #fff;
}

.trainer-info-header h1 {
  font-size: 59px;
  font-weight: 700;
  margin-top: 156px;
  margin-bottom: 32px;
}

.trainer-info-content {
  display: flex;
  justify-content: center;
  margin: 0 50px;
}

.title {
  margin-bottom: 22px;
}
.certificate {
  text-decoration: underline;
  padding-bottom: 73px;
}

.title,
.certificate {
  font-size: 32px;
  font-weight: 700;
}

.wrapper {
  position: relative;
  width: 100%;
  height: 1316px;
  overflow: hidden;
  z-index: -1;
}

.background {
  width: 1920px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.description {
  font-size: 26px;
  font-weight: 500;
  max-width: 1716px;
  letter-spacing: 1.6px;
  padding-top: 70px;
}

.border-image {
  position: absolute;
  width: 1299px;
  margin-top: -18px;
  margin-left: -30px;
}

.trainer-image {
  position: relative;
  transform: translateY(-60%);
}
</style>
