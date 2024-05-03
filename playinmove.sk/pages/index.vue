<script setup lang="ts">
import Pattern from "~/assets/svg/pattern-color.svg"
import PatternNoColor from "~/assets/svg/pattern-index-no-color.svg"
import IconJoinUs from "~/assets/svg/icon-join-us.svg"
import BorderImage from "~/assets/svg/border-image-index.svg"
import SvgGuys from "~/assets/svg/svg-group-training-guys.svg"
import SvgGroupTrainingBackground from "~/assets/svg/svg-group-training-background.svg"
</script>
<template>
  <section id="section-welcome">
    <div class="pattern">
      <Pattern style="height: 100%" :fontControlled="false" />
    </div>
    <div class="right-background">
      <div class="description-container">
        <h1>PLAYINMOVE - MIESTO KDE POHYB ZAČÍNA!</h1>
        <div class="description">
          Pohyb vnímame ako formu sebarealizácie. Od budovania disciplíny a posilňovania psychiky,
          cez sebapoznávanie až po naplnenie našich potrieb či pochopenie nášho tela za pomoci
          tréningu a jeho štúdia.<br /><br />
          Tímové hry nás učia spolupráci. Pády nás učia zniesť ranu a znova sa postaviť. Parkourové
          prvky nás učia prekonávať prekážky. Posilňovanie nás učí, že s dobrou prípravou je všetko
          možné. A to je jeden z hlavných cieľov Playinmove. Reflektovať rôzne smery a posúvať sa
          vpred bezpečne a systematicky.
        </div>
      </div>
    </div>
    <div class="join-us">
      <h1>PRIDAJ SA K NÁM</h1>
      <IconJoinUs class="button-join-us" :fontControlled="false" />
    </div>
  </section>
  <div class="pattern-no-color">
    <PatternNoColor :fontControlled="false" />

    <section id="section-group-training">
      <div class="group-training-content">
        <div class="image-group-training-container">
          <div class="image-group-training">
            <BorderImage class="border-image" :fontControlled="false" />
            <img src="~/assets/images/image-group-training.png" alt="" />
          </div>
          <SvgGuys class="guys-image" :fontControlled="false" />
        </div>
        <div class="content-container">
          <h1>SKUPINOVÝ TRÉNING</h1>
          <span class="title-description">PARKOUR, TRAMPOLÍNY, WORKOUT, HRY</span>
          <div class="description">
            <p>
              Na našich tréningoch Playinmove vytvárame pre deti základy zdravého životného štýlu
              plného pohybu a radosti. Vedené tréningy, rozvíjajúce všestranný pohyb, kondíciu a
              psychiku, s cieľom bezpečne sa naučiť parkourové kúsky či saltá.
            </p>
            <p>
              Tréningy prebiehajú každý pondelok, útorok, stredu a štvrtok v časoch 17:00 - 18:00 v
              Jumpcentru v Drietomej. Playinmove tréning je určený pre deti a mládež vo veku 5 - 15
              rokov. Registrácie a viac informácii: <b>+ 421 949 129 155</b>
            </p>
          </div>
        </div>
      </div>
      <div class="group-training-background">
        <SvgGroupTrainingBackground
          style="width: 1920px; position: absolute; left: 50%; transform: translateX(-50%)"
          :fontControlled="false"
        />
      </div>
      <div class="subscriptions">
        <div class="subscription-card">fweewef</div>
        <div class="subscription-card">fewefew</div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.pattern {
  z-index: -1;
  position: absolute;
  height: 946px;
  width: 100%;
  overflow: hidden;
  top: 0;
  left: -8px;
}
.pattern-no-color {
  position: relative;
}

.right-background {
  height: 840px;
  width: 941px;
  display: flex;
  justify-content: center;
  margin-left: auto;
  background-image: url("~/assets/svg/right-bg.svg");
  background-repeat: no-repeat;
}

.right-background h1 {
  position: relative;
  text-align: center;
  margin-top: 160px;
  margin-bottom: 100px;
  font-size: 49px;
  font-weight: 700;
  width: 537px;
}

.right-background h1::after {
  content: "";
  display: block;
  position: absolute;
  border-bottom: 2px solid #fff;
  width: 844px;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 40px;
}
.right-background .description-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.right-background .description {
  font-size: 28px;
  font-weight: 500;
  text-align: center;
  width: 740px;
}

.join-us {
  z-index: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 219px;
  background-color: #233548;
}
.join-us h1 {
  font-size: 49px;
  font-weight: 700;
  color: #fff;
}

.join-us .button-join-us {
  position: absolute;
  width: 103px;
  bottom: 0;
  transform: translateY(50%);
}

#section-group-training {
  position: absolute;
  top: 0;
  width: 100%;
  margin-top: 222px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-weight: 700;
  font-size: 59px;
}

#section-group-training .title-description {
  font-size: 32px;
  font-weight: 700;
}

#section-group-training .description {
  max-width: 1609px;
  width: 100%;
  margin-top: 40px;
  font-size: 30px;
  font-weight: 500;
  border-top: 2px solid #fff;
}

.border-image {
  position: absolute;
  width: 1001px;
  margin-top: -30px;
  margin-left: -20px;
}

.group-training-content {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-group-training-container {
  z-index: 1;
  display: flex;
  position: relative;
}

.guys-image {
  position: absolute;
  left: 105%;
  top: 50%;
  transform: translateY(-50%);
  width: 318px;
  height: auto;
}

.content-container {
  z-index: 1;
  text-align: center;
}

.group-training-background {
  position: relative;
  margin-top: 280px;
  width: 100%;
  height: 1005px;
  overflow: hidden;
}

.subscriptions {
  display: flex;
  gap: 88px;
}

.subscription-card {
  width: 370px;
  height: 100px;
  border: 1px solid #000;
  border-radius: 15px;
}
</style>
