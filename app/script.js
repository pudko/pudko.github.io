async function auth(email, password) {
  console.log("AUTH")
  try {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0RBAJGcbtDP32Oof2sJ5B-HfGRcs3azY",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
    let serializedResponse = await response.json()
    if (response.ok) {
      return serializedResponse.idToken
    } else {
      throw response
    }
  } catch (response) {
    if (response.status == 400) {
      clearLogin()
      renderAdmin()
    }
    return null
  }
}

async function login() {
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const idToken = await auth(email, password)
  if (idToken) {
    setLoginData(email, password, idToken)
    renderAdmin()
  }
}

async function checkLogin() {
  let loginData = getLoginData()
  if (loginData) {
    // if (await auth(loginData["email"], loginData["password"])) {
    return true
    // }
    // return false
  }
  return false
}

async function renderAdminPanel(userData) {
  const idToken = localStorage.getItem("idToken")
  if (idToken) {
    const userDetail = document.getElementById("member-detail")
    const userID = getUserIDFromParams()
    document.getElementById("member-header").style.paddingTop = "58px"

    userDetail.innerHTML += `
    <div class="admin-navbar">
      <a href="admin.html" class="back-button"><object style="width:18px;pointer-events:none;" type="image/svg+xml" data="assets/images/list-icon.svg"></object></a>
      <a href="admin.html?user=${userID}&action=renew" class="renew-button"><object style="width:20px;pointer-events:none;" type="image/svg+xml" data="assets/images/renew-membership-icon.svg"></object></a>
    </div>
    <button disabled id="confirm-participation-button" class="confirm-participation-button disabled">POTVRDIŤ ÚČASŤ</button>

  `
    const confirmButton = document.getElementById("confirm-participation-button")
    if (getActiveMembership(userData) !== null) {
      confirmButton.disabled = false
      confirmButton.classList.remove("disabled")
    }

    document.getElementById("confirm-participation-button").addEventListener("click", function () {
      incrementTrainingCounter(userID)
    })
    //getelementyid
    //getelementitd.innnerhtml = templatePanel
  }
}

function getLoginData() {
  const email = localStorage.getItem("email")
  const password = localStorage.getItem("password")
  if (email && password) {
    return {
      email: email,
      password: password,
    }
  } else {
    return null
  }
}

function setLoginData(email, password, idToken) {
  localStorage.setItem("email", email)
  localStorage.setItem("password", password)
  localStorage.setItem("idToken", idToken)
}

function clearLogin() {
  localStorage.removeItem("email")
  localStorage.removeItem("password")
}

function getUserStatus(memberships) {
  let isActive = false
  let isPrePurchased = false
  let isSoonExpiring = false
  let index = 0

  for (const membership of memberships) {
    if (membership.isSoonExpiring && membership.isActive) {
      if (
        !memberships[index - 1] ||
        getDateDifferenceInDays(
          formatDateToISO(membership.endDate),
          formatDateToISO(memberships[index - 1].startDate)
        ) > 1
      ) {
        isSoonExpiring = true
      }
    }
    if (membership.isActive) {
      isActive = true
    }
    if (membership.isPrePurchased) {
      isPrePurchased = true
    }
    index++
  }
  if (isSoonExpiring) {
    return "expire-soon"
  } else if (isActive) {
    return "active"
  } else if (isPrePurchased) {
    return "pre-purchased"
  } else {
    return "expired"
  }
}

async function generateUserList() {
  const userList = document.getElementById("members-list")
  let allUsers = await getUserList()

  let membershipsWithStatus = {}

  for (userID of Object.keys(allUsers)) {
    membershipsWithStatus[userID] = {
      membership: sortMembershipsByDate(calculateMembershipsStatus(allUsers[userID])),
    }
  }

  allUsers = membershipsWithStatus
  console.log(allUsers)

  for (id in allUsers) {
    const userStatus = getUserStatus(allUsers[id].membership)

    switch (userStatus) {
      case "expire-soon":
        userStatusProfileImage = "assets/images/membership-expire-soon-icon.svg"
        membershipStatusTitle = "Členstvo zakúpené"
        break
      case "active":
        userStatusProfileImage = "assets/images/membership-in-progress-icon.svg"
        membershipStatusTitle = "Prebiehajúce členstvo"
        break
      case "pre-purchased":
        userStatusProfileImage = "assets/images/membership-purchased-icon.svg"
        membershipStatusTitle = "Členstvo zakúpené"
        break
      case "expired":
      default:
        userStatusProfileImage = "assets/images/membership-end-icon.svg"
        membershipStatusTitle = "Členstvo uplynulo"
    }

    console.log(userStatus)

    userList.innerHTML += `
    <li class="member">
      <div class="member-icon-container ${userStatus}">
        <object style="width:30px;" type="image/svg+xml" data="${userStatusProfileImage}"></object>
      </div>
      <div class="member-id">ID: ${id}</div>
      <a href="user.html?user=${id}" class="member-info-button">Informácie</a>
    </li>
    `
    //onClick='addQueryParam("user", "${id}")'
  }
}

async function handleMembershipList(userData) {
  const allMemberships = document.getElementById("all-memberships")
  const activeMembership = getActiveMembership(userData)
  let membershipDaysLeft = 0
  let membershipDaysLeftText = ""
  const getNewMembershipInfoText =
    "O nové členstvo môžete zažiadať tu: <a href='mailto:michal.pudela@gmail.com'>michal.pudela@gmail.com</a> | <a href='tel:+421949129155'>+421 949 129 155</a>"

  if (activeMembership) {
    membershipDaysLeft =
      getDateDifferenceInDays(formatDateToISO(activeMembership.endDate), new Date()) + 1
    switch (membershipDaysLeft) {
      case 0:
        membershipDaysLeftText = "Uplynie dnes!"
        break
      case 1:
        membershipDaysLeftText = `Uplynie za ${membershipDaysLeft} deň`
        break
      case 2:
      case 3:
      case 4:
        membershipDaysLeftText = `Uplynie za ${membershipDaysLeft} dni`
        break
      default:
        membershipDaysLeftText = `Uplynie za ${membershipDaysLeft} dní`
        break
    }
  }

  userData = sortMembershipsByDate(calculateMembershipsStatus(userData))
  const statusLabel = document.getElementById("membership-status")
  const memberHeader = document.getElementById("member-header")
  const memberID = document.getElementById("member-id")
  const iconContainer = document.getElementById("member-status-icon-container")
  const notificationContainer = document.getElementById("membership-notification")
  const notificationText = document.getElementById("notification-text")

  console.log(userData)

  switch (getUserStatus(userData)) {
    case "active":
    case "expire-soon":
      statusLabel.textContent = "Prebiehajúce členstvo"
      if (membershipDaysLeft <= 7) {
        notificationText.innerHTML = membershipDaysLeftText + "<br>" + getNewMembershipInfoText
        notificationContainer.style.visibility = "visible"
      }
      statusLabel.style.color = "#fecc84"
      memberHeader.style.backgroundColor = "#fff8d6"
      iconContainer.style.backgroundColor = "#fcb223"
      iconContainer.innerHTML = `<object class="member-status-icon" width="79px" type="image/svg+xml" data="assets/images/membership-in-progress-icon.svg"></object>`
      memberID.style.color = "#fecc84"

      break
    case "pre-purchased":
      statusLabel.textContent = "Členstvo zakúpené"
      statusLabel.style.color = "#486dae"
      memberHeader.style.backgroundColor = "#def1ee"
      iconContainer.style.backgroundColor = "#63acdf"
      iconContainer.innerHTML = `<object class="member-status-icon" width="74px" type="image/svg+xml" data="assets/images/membership-purchased-icon.svg"></object>`
      memberID.style.color = "#486dae"
      break
    case "expired":
    default:
      statusLabel.textContent = "Členstvo uplynulo"
      notificationText.innerHTML = getNewMembershipInfoText
      notificationContainer.style.visibility = "visible"
      statusLabel.style.color = "#F05D77"
      memberHeader.style.backgroundColor = "#fdeaf2"
      iconContainer.style.backgroundColor = "#f05d77"
      iconContainer.innerHTML = `<object class="member-status-icon" width="78px" type="image/svg+xml" data="assets/images/membership-end-icon.svg"></object>`
      memberID.style.color = "#F05D77"
      break
  }
  statusLabel.style.display = "flex"

  allMemberships.innerHTML = ""

  userData.forEach((membership) => {
    let membershipClass = ""
    let membershipImage = ""
    let membershipStatusTitle = ""

    if (membership.isExpired) {
      if (membership.trainingCounter > 7) {
        membershipClass = "expired-success"
        membershipImage = "assets/images/membership-end-success-icon.svg"
        membershipStatusTitle = "Členstvo uplynulo"
      } else {
        membershipClass = "expired"
        membershipImage = "assets/images/membership-end-icon.svg"
        membershipStatusTitle = "Členstvo uplynulo"
      }
    } else if (membership.isPrePurchased) {
      membershipClass = "pre-purchased"
      membershipImage = "assets/images/membership-purchased-icon.svg"
      membershipStatusTitle = "Členstvo zakúpené"
    } else if (membership.isActive) {
      membershipClass = "active"
      membershipImage = "assets/images/membership-in-progress-icon.svg"
      membershipStatusTitle = "Prebiehajúce členstvo"
    }

    allMemberships.innerHTML += `
    <li class="membership ${membershipClass}">
      <div class="membership-image-container">
        <object class="membership-image" type="image/svg+xml" data="${membershipImage}"></object>
      </div>
      <div class="membership-info">
        <ul class="customer-membership-dates">
          <li class="title">${membershipStatusTitle}</li>
          <li class="value">${membership.startDate} - ${membership.endDate}</li>
        </ul>
        <ul class="customer-training-count">
          <li class="title">Abslovované tréningy</li>
          <li class="value">${membership.trainingCounter}</li>
        </ul>
      </div>
    </li>
    `
  })
}

async function renderUser() {
  console.log("Render USER")
  const currentURL = new URL(window.location.href)
  const userID = currentURL.searchParams.get("user")

  const userContent = document.getElementById("user-content")

  const userDetailTemplate = `
  <header id="member-header">
    <div class="membership-info-container">
      <div id="member-id">ID: ${userID}</div>
      <div id="member-status-icon-container"></div>
      <div id="membership-status"></div>
      <div class="container-main" style="position:absolute; top:100%;">
        <div class="container-content-small">
          <div id="membership-notification">
            <object class="notification-icon" width="16px" height="16px" type="image/svg+xml" data="assets/images/notification-icon.svg"></object>
            <div id="notification-text"></div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div class="container-main">
    <div class="container-content-small">
      <div id="member-detail">
        <ul id="all-memberships" class="memberships-container"></ul>
        <div id="confirmation-modal"></div>
        <div id="modal-background"></div>
      </div>
    </div
  </div>
    `

  const userData = await getUser(userID)

  if (userData) {
    userContent.innerHTML = userDetailTemplate
    await handleMembershipList(userData)
    renderAdminPanel(userData)
  } else {
    window.location.href = "https://playinmove.sk"
  }
}

async function renderAdmin() {
  const currentURL = new URL(window.location.href)
  const userID = currentURL.searchParams.get("user")
  const action = currentURL.searchParams.get("action")

  const content = document.getElementById("content")
  const loginTemplate = `
  <div class="container-main">
    <div class="container-content-big">
      <div class="login-form">
        <img src="assets/images/pudko.png" alt="Admin" />
        <div class="input-container">
          <object class="icon input-icon" type="image/svg+xml" data="assets/images/person-icon.svg"></object>
          <input type="text" id="email" placeholder="Meno" />
        </div>
        <div class="input-container">
          <object class="icon input-icon" type="image/svg+xml" data="assets/images/lock-icon.svg"></object>
          <input type="password" id="password" placeholder="Heslo" />
        </div>
        <button class="login-button" onClick="login()">PRIHLÁSIŤ SA</button>
      </div>
    </div>
  </div>`

  const userListTemplate = `
  <div class="container-main">
    <div class="container-content-small">
        <ul id="members-list"></ul>
        <div class="add-member">
          <button class="add-member-button" onClick='addQueryParam("action", "newUser")' >
            <object class="add-member-icon" type="image/svg+xml" data="assets/images/add-member-icon.svg"></object>
          </button>
        </div>
    </div>
  </div>`

  const userRenewTemplate = `
  <div class="container-main">
    <div class="container-content-big">
      <header class="header">
        <div class="header-info-text">Nové predplatné</div>
      </header>
      <div class="member-info">
        <div class="member-icon-container">
          <object class="icon" type="image/svg+xml" data="assets/images/person-icon.svg"></object>
        </div>
        <div class="member-id">ID: ${userID}</div>
      </div>
      <div class="renew-membership-form">
        <div class="input-container">
          <object class="icon input-icon" type="image/svg+xml" data="assets/images/calendar-icon.svg"></object>
          <input
            onfocus="this.showPicker()"
            type="date"
            id="renew-membership-start-date"
          />
        </div>
        <div class="input-container">
          <object class="icon input-icon" type="image/svg+xml" data="assets/images/calendar-icon.svg"></object>
          <input
            onfocus="this.showPicker()"
            type="date"
            id="renew-membership-end-date"
          />
        </div>
        <button onClick="handleRenewMembership()">POTVRDIŤ</button>
        <div id="renew-membership-validation-info"></div>
        <div id="confirmation-modal"></div>
        <div id="modal-background"></div>
      </div>
    </div>
  </div>
    `

  const userRegistrationTemplate = `
  <div class="container-main">
    <div class="container-content-big">
      <header class="header">
        <div class="header-info-text">Nový uživateľ a predplatné</div>
      </header>
      <div class="user-registration">
        <div class="person-icon-container">
          <object class="person-icon" type="image/svg+xml" data="assets/images/person-icon.svg"></object>
        </div>
        <div class="form">
          <div class="input-container">
            <object class="icon input-icon" type="image/svg+xml" data="assets/images/person-icon.svg"></object>
            <input type="text" placeholder="ID uživateľa" name="" id="new-member-id" />
          </div>
          <div class="input-container">
            <object class="icon input-icon" type="image/svg+xml" data="assets/images/calendar-icon.svg"></object>
            <input
              onfocus="this.showPicker()"
              type="date"
              placeholder="Začiatočný dátum členstva"
              id="member-membership-start-date"
            />
          </div>
          <div class="input-container">
            <object class="icon input-icon" type="image/svg+xml" data="assets/images/calendar-icon.svg"></object>
            <input
              onfocus="this.showPicker()"
              type="date"
              id="member-membership-end-date"
            />
          </div>
          <button onClick="handleCreateNewMember()" class="create-user-button" id="create-user-button">VYTVORIŤ UŽIVATEĽA</button>
          <div id="new-member-validation-info"></div>
        </div>
      </div>
    </div>  
  </div>
  `
  const loginData = getLoginData()
  console.log("RenderAdmin")

  if (loginData) {
    if (userID !== null && action === "renew") {
      if (await getUser(userID)) {
        content.innerHTML = userRenewTemplate
      } else {
        window.location.href = "https://playinmove.sk"
      }
    } else if (action === "newUser") {
      content.innerHTML = userRegistrationTemplate
    } else {
      content.innerHTML = userListTemplate
      generateUserList()
      clearQueryParams()
    }
  } else {
    content.innerHTML = loginTemplate
  }
}

function addQueryParam(key, value) {
  // Get the current URL and parameters
  // TODO CRITICAL - CHange currentURL
  const currentURL = new URL(window.location.href)
  const currentParams = new URLSearchParams(currentURL.search)

  // Add or update the query parameter
  currentParams.set(key, value)

  // Update the URL with the new parameter
  currentURL.search = currentParams.toString()

  // Use replaceState to modify the current state in the browser's history
  history.pushState({}, "", currentURL.toString())

  renderAdmin()
}

function clearQueryParams() {
  const currentURL = new URL(window.location.href)
  currentURL.search = ""
  history.pushState({}, "", currentURL.toString())
}

async function handleCreateNewMember() {
  // Get user Inputs
  const memberIDInput = document.getElementById("new-member-id")
  const startDateInput = document.getElementById("member-membership-start-date")
  const endDateInput = document.getElementById("member-membership-end-date")

  // Validation info text <div> (shows value if there is a validation errror or success)
  const validationLabel = document.getElementById("new-member-validation-info")

  // Create date
  const startDate = new Date(startDateInput.value)
  const endDate = new Date(endDateInput.value)

  // Format userID - delete spaces, toUpperCase()
  // Format startDateInput && endDateInput - (dd.MM.yyyy)
  const memberIDFormatted = formatMemberID(memberIDInput.value)
  const memberStartDateFormatted = formatDateWithDots(startDate)
  const memberEndDateFormatted = formatDateWithDots(endDate)

  // Validate inputs - return error string or null
  const validationError = await validateNewMemberInputs(memberIDFormatted, startDate, endDate)

  // Set textContent to error.
  if (validationError) {
    validationLabel.style.color = "red"
    validationLabel.textContent = validationError
    return
  }

  newMember(memberIDFormatted, memberStartDateFormatted, memberEndDateFormatted)

  // TODO HIGH - Add succes info to PATCH - response.ok instead.
  validationLabel.style.color = "green"
  validationLabel.textContent = memberIDFormatted + " úspešne pridaný!"

  // Reset inputs to null
  memberIDInput.value = null

  setTimeout(function () {
    window.location.href = "admin.html"
  }, 2000)
}

async function handleRenewMembership() {
  const userID = getUserIDFromParams()
  const startDateInput = document.getElementById("renew-membership-start-date")
  const endDateInput = document.getElementById("renew-membership-end-date")

  const validationLabel = document.getElementById("renew-membership-validation-info")

  // Create date
  const startDate = new Date(startDateInput.value)
  const endDate = new Date(endDateInput.value)

  // Format startDateInput && endDateInput - (dd.MM.yyyy)
  const memberStartDateFormatted = formatDateWithDots(startDate)
  const memberEndDateFormatted = formatDateWithDots(endDate)

  // Get User object
  const userData = await getUser(userID)

  const validationError = validateRenewMembership(userData, startDate, endDate)

  if (validationError) {
    validationLabel.style.color = "red"
    validationLabel.textContent = validationError
    return
  }

  if (!userData) {
    validationLabel.style.color = "red"
    validationLabel.textContent = "ID neexistuje"
    return
  }

  const isConfirmed = await openConfimationModal(
    "Potvrdiť predplatné?",
    `${memberStartDateFormatted} - ${memberEndDateFormatted}`
  )

  if (isConfirmed) {
    renew(userID, userData, memberStartDateFormatted, memberEndDateFormatted)

    validationLabel.style.color = "green"
    validationLabel.textContent = "Nové predplatné pre: " + userID
  } else {
    console.log("Renew aborded...")
    // Perform actions when the user clicks No
  }
}

function renew(id, memberships, startDate, endDate) {
  let newMemberships = memberships
  newMemberships.membership.push({
    startDate: startDate,
    endDate: endDate,
    trainingCounter: 0,
  })
  callRenew(id, newMemberships)
}

async function callRenew(id, newData) {
  const loginData = getLoginData()
  if (loginData) {
    const idToken = await auth(loginData.email, loginData.password)
    try {
      const response = await fetch(
        `https://playinmove-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json?auth=${idToken}`,
        {
          method: "PATCH",
          body: JSON.stringify(newData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
      if (response.ok) {
        console.log("Membership added")
      } else {
        console.log("Something went wrong")
      }
    } catch (error) {
      console.error("Error:", error.message)
    }
  }
  //call auth - get idToken
  // PATH method
  //https://playinmove-default-rtdb.europe-west1.firebasedatabase.app/users/USER_ID.json?auth=ADD_ID_TOKEN
  //body newData
}

function openConfimationModal(title, description) {
  return new Promise((resolve) => {
    const modal = document.getElementById("confirmation-modal")
    const modalBackground = document.getElementById("modal-background")

    modalBackground.style.display = "block"

    modal.innerHTML = `
    <div class="title">${title}</div>
    <div class="description">${description}</div>
    <div class="modal-action-buttons">
      <button id="modal-no">NIE</button>
      <button id="modal-yes">ÁNO</button>
    </div>
    `
    modal.style.display = "flex"

    const buttonModalYes = document.getElementById("modal-yes")
    const buttonModalNo = document.getElementById("modal-no")

    function hideModal() {
      modal.style.display = "none"
      modal.innerHTML = `` // Hide the modal
      modalBackground.style.display = "none"
    }

    // Event listener for the Yes button
    buttonModalYes.addEventListener("click", () => {
      hideModal()
      resolve(true) // Resolve the promise with true
    })

    // Event listener for the No button
    buttonModalNo.addEventListener("click", () => {
      hideModal()
      resolve(false) // Resolve the promise with false
    })
  })
}

async function incrementTrainingCounter(userID) {
  const isConfirmed = await openConfimationModal(
    "Potvrdiť účasť?",
    "Účasť bude nenávratne potvrdená."
  )

  if (isConfirmed) {
    const userData = await getUser(userID)
    const membershipsWithStatus = calculateMembershipsStatus(userData)
    const newMemberships = {
      membership: membershipsWithStatus.map((membership) => ({
        endDate: membership.endDate,
        startDate: membership.startDate,
        trainingCounter: membership.isActive
          ? (membership.trainingCounter += 1)
          : membership.trainingCounter,
      })),
    }

    await callRenew(userID, newMemberships)

    handleMembershipList(newMemberships)
    // Perform actions when the user clicks Yes
  } else {
    console.log("User clicked No. Aborting...")
    // Perform actions when the user clicks No
  }
}

function getActiveMembership(memberships) {
  const membershipsWithStatus = calculateMembershipsStatus(memberships)

  for (const membership of membershipsWithStatus) {
    if (membership.isActive === true)
      return {
        endDate: membership.endDate,
        startDate: membership.startDate,
        trainingCounter: membership.trainingCounter,
      }
  }
  return null
}

function newMember(id, startDate, endDate) {
  let newMembership = {}
  newMembership[id] = {
    membership: [
      {
        startDate: startDate,
        endDate: endDate,
        trainingCounter: 0,
      },
    ],
  }
  callNewMembership(newMembership)
  console.log(newMembership)
}

async function callNewMembership(newMembership) {
  const loginData = getLoginData()
  if (loginData) {
    const idToken = await auth(loginData.email, loginData.password)
    try {
      const response = await fetch(
        `https://playinmove-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=${idToken}`,
        {
          method: "PATCH",
          body: JSON.stringify(newMembership),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
      if (response.ok) {
        console.log("member added")
      } else {
        console.log("Something went wrong")
      }
    } catch (error) {
      console.error("Error:", error.message)
    }
  }
  // PATH method
  //https://playinmove-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=ADD_ID_TOKEN
  // body newMembership
}

async function getUser(id) {
  try {
    const response = await fetch(
      `https://playinmove-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`,
      {
        method: "GET",
      }
    )
    if (response.ok) {
      const data = await response.json()
      console.log("Customer is fetched")
      return data
    } else {
      console.log("Customer - Failed to fetch")
      return null
    }
  } catch (error) {
    console.error("Error:", error.message)
    return null
  }
  // GET method
  // https://playinmove-default-rtdb.europe-west1.firebasedatabase.app/users/ID.json
}

async function getUserList() {
  try {
    const response = await fetch(
      "https://playinmove-default-rtdb.europe-west1.firebasedatabase.app/users.json",
      {
        method: "GET",
      }
    )
    if (response.ok) {
      const data = await response.json()
      console.log("Customers are fetched")
      return data
    } else {
      console.log("Failed to fetch")
      return null
    }
  } catch (error) {
    console.error("Error:", error.message)
    return null
  }

  // GET method
  //https://playinmove-default-rtdb.europe-west1.firebasedatabase.app/users.json
}

// COMPOSABLES
//
async function getUserIDsList() {
  const users = await getUserList()
  const userIDsList = []
  for (id in users) {
    userIDsList.push(id.toUpperCase())
  }
  return userIDsList
}

async function isIDUnique(id) {
  const userIDsList = await getUserIDsList()
  return !userIDsList.includes(formatMemberID(id))
}

function getUserIDFromParams() {
  const currentURL = new URL(window.location.href)
  return currentURL.searchParams.get("user") || null
}

function isDate(date) {
  return date instanceof Date && !isNaN(date) && date.toString() !== "Invalid Date"
}

function validateMembershipDates(startDate, endDate) {
  currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)
  startDate.setHours(0, 0, 0, 0)
  endDate.setHours(0, 0, 0, 0)
  console.log(startDate)
  console.log(endDate)
  // Check if endDate is later than startDate
  if (startDate > endDate) {
    return "Konečný dátum musí byť väčší."
  }
  // Check if endDate is in the future
  if (currentDate > endDate) {
    return "Konečný dátum musí byť v budúcnosti."
  }

  if (!isDate(startDate) || !isDate(endDate)) {
    return "Dátum nesmie byť prázdny."
  }

  return null
}

async function validateNewMemberInputs(userID, startDate, endDate) {
  // Check if any input is empty
  if (!userID) {
    return "ID nesmie byť prázdne!"
  }

  const dateValidationErrors = validateMembershipDates(startDate, endDate)
  if (dateValidationErrors) {
    return dateValidationErrors
  }

  const isUnique = await isIDUnique(userID)
  if (!isUnique) {
    return "Používateľ s rovnakým ID už existuje!"
  }

  return null // Return null when no error
}

function checkMembershipOverlap(memberships, newStartDate, newEndDate) {
  for (const membership of memberships) {
    if (
      newStartDate <= formatDateToISO(membership.endDate) &&
      newEndDate >= formatDateToISO(membership.startDate)
    ) {
      return `V tomto období už je evidované predplatné: ${membership.startDate} - ${membership.endDate}`
    }
  }
  return null // Return null when no error
}

function validateRenewMembership(userData, startDate, endDate) {
  const dateValidationErrors = validateMembershipDates(startDate, endDate)
  // Check if date is in the future and is not empty
  if (dateValidationErrors) {
    return dateValidationErrors
  }

  const membershipOverlapErrors = checkMembershipOverlap(userData.membership, startDate, endDate)
  // Check if new membership is not overlaping with different already existing memberships.
  if (membershipOverlapErrors) {
    return membershipOverlapErrors
  }
  return null // Return null when no error
}

function sortMembershipsByDate(memberships) {
  return memberships.sort((a, b) => {
    const dateA = new Date(formatDateToISO(a.startDate))
    const dateB = new Date(formatDateToISO(b.startDate))
    return dateB - dateA
  })
}

function calculateMembershipsStatus(userData) {
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

  return userData.membership.map((currentMembership) => ({
    endDate: currentMembership.endDate,
    startDate: currentMembership.startDate,
    trainingCounter: currentMembership.trainingCounter,
    isPrePurchased: currentDate < formatDateToISO(currentMembership.startDate),
    isActive:
      currentDate >= formatDateToISO(currentMembership.startDate) &&
      currentDate <= formatDateToISO(currentMembership.endDate),
    isSoonExpiring:
      currentDate >= formatDateToISO(currentMembership.startDate) &&
      currentDate <= formatDateToISO(currentMembership.endDate) &&
      getDateDifferenceInDays(currentDate, formatDateToISO(currentMembership.endDate)) <= 7,
    isExpired: currentDate > formatDateToISO(currentMembership.endDate),
  }))
}

// Function to calculate the difference between two dates
function getDateDifferenceInDays(date1, date2) {
  const millisecondsPerDay = 24 * 60 * 60 * 1000
  const differenceInMillis = Math.abs(date1 - date2)
  return Math.floor(differenceInMillis / millisecondsPerDay)
}

function formatDateWithDots(inputDate) {
  // Parse the input date string and create a Date object
  const date = new Date(inputDate)
  // Check if the date is valid
  if (isNaN(date.getDate())) {
    return null
  }
  // Extract day, month, and year components
  const day = date.getDate()
  const month = date.getMonth() + 1 // Note: months are zero-based
  const year = date.getFullYear()
  // Format the date string with dots
  const formattedDate = `${day}.${month}.${year}`

  return formattedDate
}

function formatDateToISO(date) {
  const parts = date.split(".")

  // Ensure the parts array has at least three elements
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10)
    const month = parseInt(parts[1] - 1, 10)
    const year = parseInt(parts[2], 10)

    // Check if the extracted values are valid
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      const formattedDate = new Date(Date.UTC(year, month, day))
      formattedDate.setHours(0, 0, 0, 0)
      return formattedDate
    }
  }

  // Return null or handle the error in your application logic
  return null
}

function formatMemberID(userID) {
  return removeWhiteSpacesFromString(userID).toUpperCase()
}

function removeWhiteSpacesFromString(input) {
  return input.replace(/\s/g, "")
}
//
// /COMPOSABLES

// LISTENERS
//
function listenPopState() {
  window.addEventListener("popstate", function () {
    // Call the renderAdmin() function when the back button is clicked
    renderAdmin()
  })

  // document.addEventListener("click", (event) => {
  //   const currentURL = new URL(window.location.href)
  //   const action = currentURL.searchParams.get("action")

  //   const newMemberValidationInfo = document.getElementById("new-member-validation-info")
  //   const createUserButton = document.getElementById("create-user-button")

  //   // Clear the newMemberValidationInfo to null when click anywhere expect createUserButton
  //   if (event.target !== createUserButton && action === "newUser") {
  //     newMemberValidationInfo.textContent = null
  //   }
  // })
}
//
// /LISTERS
