function openHamburgerMenu() {
  const hamburgerMenuButton = document.getElementById("hamburger-menu-button")
  const hamburgerMenuItems = document.getElementById("menu-items")
  const hamburgerMenuFooter = document.getElementById("hamburger-menu-footer")
  const hamburgerMenuBackground = document.getElementById("hamburger-menu-background")
  console.log("open")
  if (hamburgerMenuItems.classList.contains("menu-items")) {
    hamburgerMenuItems.classList.remove("menu-items")
    hamburgerMenuItems.classList.add("hamburger-menu")
    hamburgerMenuFooter.style.display = "block"
    hamburgerMenuBackground.style.display = "block"
    hamburgerMenuButton.src = "/assets/svg/hamburger-menu-close-icon.svg"
  } else {
    hamburgerMenuItems.classList.remove("hamburger-menu")
    hamburgerMenuItems.classList.add("menu-items")
    hamburgerMenuButton.src = "/assets/svg/hamburger-menu-icon.svg"
    hamburgerMenuFooter.style.display = "none"
    hamburgerMenuBackground.style.display = "none"
  }
}
