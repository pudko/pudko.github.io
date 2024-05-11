<script setup lang="ts">
import Pattern from "~/assets/svg/pattern-color.svg"
import PatternNoColor from "~/assets/svg/pattern-index-no-color.svg"
import IconJoinUs from "~/assets/svg/icon-join-us.svg"
import BorderImage from "~/assets/svg/border-image-index.svg"
import SvgGuysIcon from "~/assets/svg/svg-group-training-guys.svg"
import SvgTargetIcon from "~/assets/svg/svg-individual-training-icon.svg"
import SvgWorkshopIcon from "~/assets/svg/svg-workshop-training-icon.svg"
import SvgGroupTrainingBackground from "~/assets/svg/svg-group-training-background.svg"
import SvgIndividualTrainingBackground from "~/assets/svg/svg-individual-training-background.svg"
import SvgWorkshopTrainingBackground from "~/assets/svg/svg-workshop-training-background.svg"
import SvgMonthlySubscription from "~/assets/svg/icon-monthly-subscription.svg"
import SvgOneAccess from "~/assets/svg/icon-one-access.svg"
import SubscriptionCard from "~/assets/svg/subscription-card.svg"
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
  <!-- <div class="pattern-no-color">
    <PatternNoColor :fontControlled="false" /> -->

  <section id="section-group-training">
    <div class="training">
      <div class="training-header">
        <div class="training-header-image">
          <BorderImage class="border-image group" :fontControlled="false" />
          <img src="~/assets/images/image-group-training.png" alt="" />
        </div>
        <SvgGuysIcon class="guys-icon" :fontControlled="false" />
      </div>
      <div class="content-container">
        <h1>SKUPINOVÝ TRÉNING</h1>
        <span class="training-title-description">PARKOUR, TRAMPOLÍNY, WORKOUT, HRY</span>
        <div class="training-description">
          <p>
            Na našich tréningoch Playinmove vytvárame pre deti základy zdravého životného štýlu
            plného pohybu a radosti. Vedené tréningy, rozvíjajúce všestranný pohyb, kondíciu a
            psychiku, s cieľom bezpečne sa naučiť parkourové kúsky či saltá.
          </p>
          <p>
            Tréningy prebiehajú každý pondelok, útorok, stredu a štvrtok v časoch 17:00 - 18:00 v
            Jumpcentru v Drietomej. Playinmove tréning je určený pre deti a mládež vo veku 5 - 15
            rokov. Registrácie a viac informácii:
            <a href="tel:004219491291557890" class="phone-number">+ 421 949 129 155</a>
          </p>
        </div>
      </div>
    </div>
    <div class="training-background group">
      <SvgGroupTrainingBackground
        style="width: 1920px; position: absolute; left: 50%; transform: translateX(-50%)"
        :fontControlled="false"
      />
    </div>
    <div class="subscriptions">
      <div class="subscription-card group">
        <div class="subscription-card-header-container">
          <div class="wrapper">
            <div class="subscription-card-header">
              <SvgMonthlySubscription style="width: 52px; height: auto" :fontcontrolled="false" />
              <span class="subscription-card-title">ČLENSTVO NA MESIAC </span>
            </div>
            <div class="subscription-card-header-description">
              2 tréningy / týždeň<br />
              <span style="font-weight: 600">minimálne 8 tréningov / mesiac</span>
            </div>
          </div>
        </div>
        <div class="info-content-container">
          <div class="info-content">
            <div class="info-content-header">
              <div class="info-content-title">Začiatočníci</div>
              <div class="info-content-age-range">zväčša 5-9 rokov</div>
            </div>
            <div class="info-content-description">
              <div class="info-content-date">Po a St</div>
              <div class="info-content-time">16:45 - 17:45</div>
            </div>
          </div>
          <div class="info-content">
            <div class="info-content-header">
              <div class="info-content-title">Pokročilý</div>
              <div class="info-content-age-range">zväčša 9-16 rokov</div>
            </div>
            <div class="info-content-description">
              <div class="info-content-date">Po a St</div>
              <div class="info-content-time">18:00 - 19:00</div>
            </div>
          </div>
        </div>
        <div class="subscription-card-bottom">
          <div class="subscription-card-bottom-price-container">
            <div class="subscription-card-bottom-price">
              59,9 <span style="font-size: 15px">€</span>
            </div>
            <div class="subscription-card-bottom-price-description">
              cena je uvedená<br />
              vrátane vstupu
            </div>
          </div>
          <div class="subscription-card-bottom-card-image">
            <SubscriptionCard style="width: 119px; height: auto" :fontcontrolled="false" />
          </div>
        </div>
      </div>
      <div class="subscription-card group">
        <div class="subscription-card-header-container">
          <div class="wrapper">
            <div class="subscription-card-header">
              <SvgOneAccess style="width: 44px; height: auto" :fontcontrolled="false" />
              <span class="subscription-card-title">JEDNORÁZOVÝ VSTUP</span>
            </div>
          </div>
        </div>
        <div class="info-content-container">
          <div class="info-content">
            <div class="info-content-header">
              <div class="info-content-title">Začiatočníci</div>
              <div class="info-content-age-range">zväčša 5-9 rokov</div>
            </div>
            <div class="info-content-description">
              <div class="info-content-date">Po a St</div>
              <div class="info-content-time">16:45 - 17:45</div>
            </div>
          </div>
          <div class="info-content">
            <div class="info-content-header">
              <div class="info-content-title">Pokročilý</div>
              <div class="info-content-age-range">zväčša 9-16 rokov</div>
            </div>
            <div class="info-content-description">
              <div class="info-content-date">Po a St</div>
              <div class="info-content-time">18:00 - 19:00</div>
            </div>
          </div>
        </div>
        <div class="subscription-card-bottom">
          <div class="subscription-card-bottom-price-container one-time-access">
            <span style="font-size: 40px">10 <span style="font-size: 23px">€</span></span>
            <div class="subscription-card-bottom-price-description">
              cena je uvedená<br />
              vrátane vstupu
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="section-individual-training">
    <div class="training">
      <div class="training-header">
        <div class="training-header-image">
          <BorderImage class="border-image individual" stroke="#80CDC2" :fontControlled="false" />
          <img src="~/assets/images/image-individual-training.png" alt="" />
        </div>
        <SvgTargetIcon class="target-icon" :fontControlled="false" />
      </div>
      <div class="content-container">
        <h1>INDIVIDUÁLNY TRÉNING</h1>
        <span class="training-title-description">PARKOUR, WORKOUT, TRAMPOLÍNY </span>
        <div class="training-description individual">
          <p>
            Tréning je prispôsobený potrebám a cieľom účastínka a preto je vhodný pre každého
            záujemcu o pohyb bez ohľadu na vek, úroveň či pohľavie. Tréning môže byť zameraný na
            stojky, rozvoj flexibility, posilňovanie tela či na parkourové kúsky. Registrácie a viac
            informácii: <a href="tel:004219491291557890" class="phone-number">+ 421 949 129 155</a>
          </p>
        </div>
      </div>
    </div>
    <div class="training-background individual">
      <SvgIndividualTrainingBackground
        style="width: 1920px; position: absolute; left: 50%; transform: translateX(-50%)"
        :fontControlled="false"
      />
    </div>
    <div class="subscription-card individual">
      <div class="subscription-card-header-container">
        <div class="wrapper">
          <div class="subscription-card-title">1 - 4 OSOBY</div>
          <div class="subscription-description">bez limitácie veku a schopností</div>
        </div>
      </div>
      <div class="info-content-container">
        <div class="info-content">
          <div><span style="font-size: 26px">60 </span>minút</div>
          <div><span style="font-size: 26px">Čas </span>dohodou</div>
        </div>
      </div>
      <div class="subscription-card-bottom">
        <div class="price-list">
          <div><span class="price">24</span> € / os</div>
          <div><span class="price">40</span> € / 2 os</div>
          <div><span class="price">48</span> € / 3 os</div>
          <div><span class="price">56</span> € / 4 os</div>
        </div>
        <div class="price-info-text">cena je uvedená vrátane vstupu</div>
      </div>
    </div>
  </section>

  <section id="section-parkour-workshop">
    <div class="training">
      <div class="training-header">
        <div class="training-header-image">
          <BorderImage class="border-image workshop" stroke="#FACBDA" :fontControlled="false" />
          <img src="~/assets/images/image-workshop-training.png" alt="" />
        </div>
        <SvgWorkshopIcon class="workshop-icon" :fontControlled="false" />
      </div>
      <div class="content-container">
        <h1>PARKOUR WORKSHOP</h1>
        <span class="training-title-description">PARKOUR, HRY, SÚŤAŽE </span>
        <div class="training-description workshop">
          <p>
            Skupinová akcia určená pre každého kto má rád pohyb. Súčasťou programu je vysvetlenie a
            tréning parkourových prvkov, ktorých náročnosť je prispôsobená úrovni účastníkov.
            Program zahŕňa zábavné hry a súťaže.
          </p>
          <p>
            Workshop môže slúžiť ako teambuilding, narodeninová oslava, školský výlet či ako doplnok
            pre vašu akciu.<br />
            S možnosťou zajednania priestoru. Cena závysí od počtu ľudí a dĺžky akcie. Viac
            informácii:
            <a href="tel:004219491291557890" class="phone-number">+ 421 949 129 155</a>
          </p>
        </div>
      </div>
    </div>
    <div class="training-background workshop">
      <SvgWorkshopTrainingBackground
        style="width: 1920px; position: absolute; left: 50%; transform: translateX(-50%)"
        :fontControlled="false"
      />
    </div>
    <div class="subscription-card workshop">
      <div class="subscription-card-header-container">
        <div class="wrapper">
          <div class="subscription-card-title">1 OSOBA</div>
          <div class="subscription-description">minimálny počet osôb je 8</div>
        </div>
      </div>
      <div class="info-content-container">
        <div class="info-content"><span style="font-size: 22px">60 </span>minút</div>
        <div class="info-content"><span style="font-size: 22px">Čas </span>dohodou</div>
      </div>
      <div class="subscription-card-bottom">
        <div class="price-list">
          <div><span class="price">9</span> €</div>
        </div>
        <div class="price-info-text">
          cena sa môže líšiť<br />
          v závyslosti od počtu osôb, miesta a dĺžky
        </div>
      </div>
    </div>
  </section>
  <!-- </div> -->
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

#section-group-training,
#section-individual-training,
#section-parkour-workshop {
  /* position: absolute;
  top: 0; */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#section-group-training {
  margin-top: 222px;
}

#section-individual-training {
  margin-top: 232px;
}

#section-parkour-workshop {
  margin-top: 200px;
}

h1 {
  font-weight: 700;
  font-size: 59px;
}

.training-title-description {
  font-size: 32px;
  font-weight: 700;
}

.training-description {
  max-width: 1609px;
  width: 100%;
  margin-top: 40px;
  font-size: 30px;
  font-weight: 500;
  border-top: 2px solid #fff;
}

.training-description.individual,
.training-description.workshop {
  max-width: 1625px;
}

.border-image {
  position: absolute;
  width: 1001px;
  margin-top: -30px;
  margin-left: -20px;
}

.border-image.group {
  margin-top: -30px;
  margin-left: -20px;
}

.border-image.individual,
.border-image.workshop {
  margin-top: -25px;
  margin-left: -25px;
}
.training {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.training-header {
  z-index: 1;
  display: flex;
  position: relative;
}

.guys-icon {
  position: absolute;
  left: 105%;
  top: 50%;
  transform: translateY(-50%);
  width: 318px;
  height: auto;
}

.target-icon {
  position: absolute;
  right: 110%;
  top: 60%;
  transform: translateY(-50%);
  width: 223px;
  height: auto;
}

.workshop-icon {
  position: absolute;
  left: 110%;
  top: 50%;
  transform: translateY(-50%);
  width: 264px;
  height: auto;
}

.content-container {
  z-index: 1;
  text-align: center;
}

.training-background {
  position: relative;
  margin-top: 280px;
  width: 100%;
  overflow: hidden;
}

.training-background.group {
  height: 1005px;
}

.training-background.individual {
  height: 889px;
}

.training-background.workshop {
  height: 945px;
}

.subscriptions {
  display: flex;
  gap: 88px;
  margin-top: 52px;
}

.subscription-card {
  width: 370px;
  border: 1px solid #000;
  border-radius: 15px;
  overflow: hidden;
}

.subscription-card-header-container {
  height: 132px;
  border-bottom: 2px solid #d4dadd;
}

.subscription-card-header {
  display: flex;
  gap: 14px;
  justify-content: center;
  align-items: center;
}

.subscription-card-header-description {
  font-size: 15px;
  font-weight: 500;
  margin-left: 27px;
  margin-top: 15px;
}

.subscription-card-title {
  font-size: 23px;
  font-weight: 600;
}

.subscription-card.group .wrapper {
  position: relative;
  top: 29px;
}

.subscription-card.group .info-content-container {
  display: flex;
  flex-direction: column;
}

.subscription-card.group .info-content {
  display: flex;
  justify-content: space-between;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 17px;
  padding-bottom: 17px;
}

.subscription-card.group .info-content:not(:last-child) {
  border-bottom: 1px solid #d4dadd;
}

.subscription-card.group .info-content-title {
  font-size: 26px;
}

.subscription-card.group .info-content-title,
.subscription-card.group .info-content-age-range,
.subscription-card.group .info-content-date,
.subscription-card.group .info-content-time {
  font-weight: 500;
}

.subscription-card.group .info-content-age-range,
.subscription-card.group .info-content-time {
  font-size: 15px;
}

.subscription-card.group .info-content-title,
.subscription-card.group .info-content-date {
  font-size: 26px;
}

.subscription-card.group .subscription-card-bottom {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 115px;
  padding-left: 27px;
  padding-right: 27px;
  background-color: #233548;
}

.subscription-card.group .subscription-card-bottom-price-container {
  color: #fff;
}

.subscription-card.group .subscription-card-bottom-price-container.one-time-access {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.subscription-card.group .subscription-card-bottom-price {
  font-size: 26px;
  font-weight: 600;
}

.subscription-card.group .subscription-card-bottom-price-description {
  font-size: 15px;
  font-weight: 300;
}

.subscription-card.individual {
  margin-top: 74px;
}

.subscription-card.individual .subscription-card-header-container {
  display: flex;
  align-items: center;
}

.subscription-card.individual .wrapper {
  display: flex;
  flex-direction: column;
  gap: 13px;
  margin-left: 26px;
}

.subscription-card.individual .info-content-container {
  display: flex;
  align-items: center;
  min-height: 80px;
}

.subscription-card.individual .info-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 24px;
  padding-right: 62px;
  padding-top: 17px;
  padding-bottom: 17px;
}

.subscription-card.individual .subscription-card-bottom {
  color: #fff;
  font-size: 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 24px;
  padding-right: 24px;
  background-color: #233548;
}

.subscription-card.individual .price-list {
  font-weight: 600;
  letter-spacing: 0.4px;
}

.subscription-card.individual .price-list .price {
  font-size: 26px;
}

.subscription-card.individual .price-info-text {
  max-width: 110px;
  width: 100%;
  font-weight: 300;
}

.subscription-card.workshop {
  margin-top: 85px;
  margin-bottom: 85px;
}

.subscription-card.workshop .subscription-card-header-container {
  display: flex;
  align-items: center;
}

.subscription-card.workshop .wrapper {
  display: flex;
  flex-direction: column;
  gap: 13px;
  margin-left: 26px;
}

.subscription-card.workshop .info-content {
  font-weight: 500;
  font-size: 13px;
  padding-left: 24px;
  padding-right: 62px;
  padding-top: 22px;
  padding-bottom: 22px;
}

.subscription-card.workshop .info-content:not(:last-child) {
  border-bottom: 1px solid #d4dadd;
}

.subscription-card.workshop .subscription-card-bottom {
  color: #fff;
  font-size: 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 24px;
  padding-right: 24px;
  background-color: #233548;
}

.subscription-card.workshop .price-list {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.4px;
}

.subscription-card.workshop .price-list .price {
  font-size: 35px;
}

.subscription-card.workshop .price-info-text {
  font-size: 13px;
  font-weight: 300;
  max-width: 130px;
  width: 100%;
}

.phone-number {
  color: #000;
  font-weight: 600;
}
</style>
