<script setup lang="ts">
import LogoIcon from "~/assets/svg/logo-playInMove.svg"
</script>

<template>
  <div class="container">
    <div class="navbar">
      <NuxtLink to="/"><LogoIcon style="width: 216px" :fontControlled="false" /></NuxtLink>
      <NuxtLink to="/parkour-treningy" class="navbar-item" active-class="active">
        Parkour tréningy
      </NuxtLink>
      <NuxtLink to="/trener" class="navbar-item" active-class="active"> Trenér </NuxtLink>
      <NuxtLink to="/parkour-tutorialy" class="navbar-item" active-class="active">
        Parkour tutoriály a umenie parkouru
      </NuxtLink>
      <NuxtLink to="/kontakt" class="navbar-item" active-class="active"> Kontakt </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.container {
  z-index: 999;
  background-color: #fff;
  display: flex;
  justify-content: left;
  border-bottom: 1px solid grey;
}

.navbar {
  width: 100%;
  height: 106px;
  display: flex;
  align-items: center;
  gap: 65px;
  margin-left: 32px;
  margin-right: 32px;
}

.navbar-item {
  font-weight: 600;
  font-style: italic;
  font-size: 23px;
  color: #000000;
}

.active {
  color: #fcb223;
  position: relative;
}
.active::after {
  content: "";
  position: absolute;
  border-bottom: 3px solid #fcb223;
  width: 115%;
  left: 50%;
  margin-top: 5px;
  transform: translateX(-50%);
  display: block;
}
</style>
