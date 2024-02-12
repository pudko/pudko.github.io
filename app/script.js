async function auth(email, password) {
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
    setLoginData(email, password)
    renderAdmin()
  }
}

async function checkLogin() {
  let loginData = getLoginData()
  if (loginData) {
    if (await auth(loginData["email"], loginData["password"])) {
      return true
    }
    return false
  }
}

async function renderAdminPanel() {
  if (checkLogin()) {
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

function setLoginData(email, password) {
  localStorage.setItem("email", email)
  localStorage.setItem("password", password)
}

function clearLogin() {
  localStorage.removeItem("email")
  localStorage.removeItem("password")
}

function getUserStatus(member) {
  let prePurchased = false

  for (membership of member) {
    if (membership.isActive) {
      return "active"
    }
    if (membership.isPrePurchased) {
      prePurchased = true
    }
  }
  return prePurchased ? "pre-purchased" : "expired"
}

async function generateMembersList() {
  const membersList = document.getElementById("members-list")
  let allMembers = await getUserList()

  let membershipsWithStatus = {}

  for (memberID of Object.keys(allMembers)) {
    membershipsWithStatus[memberID] = {
      membership: calculateMembershipsStatus(allMembers[memberID]),
    }
  }

  allMembers = membershipsWithStatus

  for (id in allMembers) {
    console.log("ID: " + id)

    const statusClass = getUserStatus(allMembers[id].membership)

    membersList.innerHTML += `
    <li class="member">
      <div class="member-icon-container ${statusClass}">
        <object class="icon" type="image/svg+xml" data="assets/images/person-icon-white.svg"></object>
      </div>
      <div class="member-id">ID: ${id}</div>
      <button onClick='addQueryParam("user", "${id}")' class="member-info-button">Informácie</button>
    </li>
    `
  }
}

async function handleMembershipList(userID) {
  const allMemberships = document.getElementById("all-memberships")
  const userData = await getUser(userID)
  let memberships = userData

  document.getElementById("confirm-participation-button").addEventListener("click", function () {
    incrementTrainingCounter(userID)
  })

  memberships = calculateMembershipsStatus(memberships)
  memberships = sortMembershipsByDate(memberships)
  const statusLabel = document.getElementById("membership-status")

  switch (getUserStatus(memberships)) {
    case "active":
      statusLabel.textContent = "ČLENSTVO AKTÍVNE"
      statusLabel.style.backgroundColor = "#66b0a9"
      break
    case "pre-purchased":
      statusLabel.textContent = "ČLENSTVO KÚPENÉ"
      statusLabel.style.backgroundColor = "#486dae"
      break
    case "expired":
      statusLabel.textContent = "ČLENSTVO NEAKTÍVNE"
      statusLabel.style.backgroundColor = "#dc765a"
      break
    default:
      statusLabel.textContent = "ČLENSTVO NEAKTÍVNE"
      statusLabel.style.backgroundColor = "#dc765a"
  }
  statusLabel.style.display = "flex"

  memberships.forEach((membership) => {
    const isPrePurchased = membership.isPrePurchased ? "pre-purchased" : ""
    const isActiveClass = membership.isActive ? "active" : ""
    const isExpiredClass = membership.isExpired ? "expired" : ""

    const membershipClass = `membership ${isPrePurchased}${isActiveClass}${isExpiredClass}`

    allMemberships.innerHTML += `
    <li class="${membershipClass}">
      <ul class="customer-membership-start">
        <li class="title">Dátum začatia predplatného</li>
        <li class="value">${membership.startDate}</li>
      </ul>
      <ul class="customer-membership-end">
        <li class="title">Predplatné uplynie</li>
        <li class="value">${membership.endDate}</li>
      </ul>
      <ul class="customer-training-count">
        <li class="title">Počet absolbovaných tréningov</li>
        <li class="value">${membership.trainingCounter}</li>
      </ul>
    </li>
    `
  })
}

function renderAdmin() {
  const currentURL = new URL(window.location.href)
  const currentParams = new URLSearchParams(currentURL.search)
  const memberID = currentURL.searchParams.get("user")
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
        <button onClick="login()">PRIHLÁSIŤ SA</button>
      </div>
    </div>
  </div>`

  const usersListTemplate = `
  <div class="container-main">
    <div class="container-content-small">
        <ul id="members-list"></ul>
        <div class="add-member">
          <button class="add-member-button" onClick='addQueryParam("action", "newUser")' >
            <img src="assets/images/add-member-icon.svg"/>
          </button>
        </div>
    </div>
  </div>`

  const userDetailTemplate = `
  <div class="container-main">
    <div class="container-content-small">
      <header class="member-header">
        <div class="member-icon-container">
          <object class="icon" type="image/svg+xml" data="assets/images/person-icon.svg"></object>
        </div>
        <div id="member-id">${memberID}</div>
        <div id="membership-status"></div>
      </header>
      <div class="member-detail">
        <ul id="all-memberships" class="memberships-container"></ul>
        <div class="action-buttons">
          <button id="confirm-participation-button">POTVRDIŤ ÚČASŤ</button>
          <button onClick='addQueryParam("action", "renew")'>PREDĹŽENIE PREDPLATNÉHO</button>
        </div>
      </div>
    </div
  </div>
    `

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
        <div class="member-id">ID: ${memberID}</div>
      </div>
      <div class="renew-membership-form">
        <div class="input-container">
          <object class="icon input-icon" type="image/svg+xml" data="assets/images/calendar-icon.svg"></object>
          <input
            onfocus="(this.type='date'); this.showPicker()"
            onBlur="(!this.value ? this.type='text' : null)"
            type="text"
            placeholder="Začiatočný dátum členstva"
            id="renew-membership-start-date"
          />
        </div>
        <div class="input-container">
          <object class="icon input-icon" type="image/svg+xml" data="assets/images/calendar-icon.svg"></object>
          <input
            onfocus="(this.type='date'); this.showPicker()"
            onBlur="(!this.value ? this.type='text' : null)"
            type="text"
            placeholder="Konečný dátum členstva"
            id="renew-membership-end-date"
          />
        </div>
        <button onClick="handleRenewMembership()">POTVRDIŤ</button>
        <div id="renew-membership-validation-info"></div>
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
              onfocus="(this.type='date'); this.showPicker()"
              onBlur="(!this.value ? this.type='text' : null)"
              type="text"
              placeholder="Začiatočný dátum členstva"
              id="member-membership-start-date"
            />
          </div>
          <div class="input-container">
            <object class="icon input-icon" type="image/svg+xml" data="assets/images/calendar-icon.svg"></object>
            <input
              onfocus="(this.type='date'); this.showPicker()"
              onBlur="(!this.value ? this.type='text' : null)"
              type="text"
              placeholder="Konečný dátum členstva"
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
  let paramsCount = 0
  const loginData = getLoginData()

  if (loginData) {
    if (memberID !== null) {
      paramsCount++
      if (action === "renew") {
        paramsCount++
        content.innerHTML = userRenewTemplate
      } else if (currentParams.size > paramsCount) {
        window.location.href = "https://playinmove.sk"
      } else {
        content.innerHTML = userDetailTemplate
        handleMembershipList(memberID)
      }
    } else if (action === "newUser") {
      paramsCount++
      content.innerHTML = userRegistrationTemplate
    } else {
      content.innerHTML = usersListTemplate
      generateMembersList()
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

  // Format memberID - delete spaces, toUpperCase()
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

  // Focus input FIRST, make it NULL and then BLUR.
  // Because in html input, onBlur is set to change input type=text when
  // there is no value so placeholder can be shown. We need first to focus
  // to make onBlur work.
  startDateInput.focus()
  startDateInput.value = null
  startDateInput.blur()
  endDateInput.focus()
  endDateInput.value = null
  endDateInput.blur()
}

async function handleRenewMembership() {
  const memberID = getUserIDFromParams()
  const startDateInput = document.getElementById("renew-membership-start-date")
  const endDateInput = document.getElementById("renew-membership-end-date")

  const validationLabel = document.getElementById("renew-membership-validation-info")

  // Create date
  const startDate = new Date(startDateInput.value)
  const endDate = new Date(endDateInput.value)

  // Format startDateInput && endDateInput - (dd.MM.yyyy)
  const memberStartDateFormatted = formatDateWithDots(startDate)
  const memberEndDateFormatted = formatDateWithDots(endDate)

  // Get Member object
  const member = await getUser(memberID)

  const validationError = validateRenewMembership(member, startDate, endDate)

  if (validationError) {
    validationLabel.style.color = "red"
    validationLabel.textContent = validationError
    return
  }

  if (!member) {
    validationLabel.style.color = "red"
    validationLabel.textContent = "ID neexistuje"
    return
  }

  renew(memberID, member, memberStartDateFormatted, memberEndDateFormatted)

  validationLabel.style.color = "green"
  validationLabel.textContent = "Nové predplatné pre: " + memberID
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

async function incrementTrainingCounter(memberID) {
  console.log("sme tu")
  const userData = await getUser(memberID)
  const memberships = userData
  const membershipsWithStatus = calculateMembershipsStatus(memberships)

  const newMemberships = {
    membership: membershipsWithStatus.map((membership) => ({
      endDate: membership.endDate,
      startDate: membership.startDate,
      trainingCounter: membership.isActive
        ? (membership.trainingCounter += 1)
        : membership.trainingCounter,
    })),
  }

  await callRenew(memberID, newMemberships)

  renderAdmin()
}

// function getActiveMembership(memberships) {
//   const membershipsWithStatus = calculateMembershipsStatus(memberships)

//   for (const membership of membershipsWithStatus) {
//     if (membership.isActive === true)
//       return {
//         endDate: membership.endDate,
//         startDate: membership.startDate,
//         trainingCounter: membership.trainingCounter,
//       }
//   }
//   return null
// }

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

async function validateNewMemberInputs(memberID, startDate, endDate) {
  // Check if any input is empty
  if (!memberID) {
    return "ID nesmie byť prázdne!"
  }

  const dateValidationResult = validateMembershipDates(startDate, endDate)
  if (dateValidationResult) {
    return dateValidationResult
  }

  const isUnique = await isIDUnique(memberID)
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

function validateRenewMembership(member, startDate, endDate) {
  const dateValidationResult = validateMembershipDates(startDate, endDate)
  // Check if date is in the future and is not empty
  if (dateValidationResult) {
    return dateValidationResult
  }

  const membershipOverlapResult = checkMembershipOverlap(member.membership, startDate, endDate)
  // Check if new membership is not overlaping with different already existing memberships.
  if (membershipOverlapResult) {
    return membershipOverlapResult
  }
  return null // Return null when no error
}

function sortMembershipsByDate(memberships) {
  return memberships.sort((a, b) => {
    const dateA = new Date(a.startDate.split(".").reverse().join("-"))
    const dateB = new Date(b.startDate.split(".").reverse().join("-"))
    return dateB - dateA
  })
}

function calculateMembershipsStatus(member) {
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

  return member.membership.map((membership) => ({
    endDate: membership.endDate,
    startDate: membership.startDate,
    trainingCounter: membership.trainingCounter,
    isPrePurchased: currentDate < formatDateToISO(membership.startDate),
    isActive:
      currentDate >= formatDateToISO(membership.startDate) &&
      currentDate <= formatDateToISO(membership.endDate),
    isExpired: currentDate > formatDateToISO(membership.endDate),
  }))
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
  const formattedDate = new Date(date.split(".").reverse().join("-"))
  formattedDate.setHours(0, 0, 0, 0)
  return formattedDate
}

function formatMemberID(memberID) {
  return removeWhiteSpacesFromString(memberID).toUpperCase()
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
