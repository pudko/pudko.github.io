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

async function generateMembersList() {
  const membersList = document.getElementById("members-list")
  const allMembers = await getUserList()
  for (id in allMembers) {
    membersList.innerHTML += `
    <li class="member">
      <div class="member-icon-container">
        <object class="icon" type="image/svg+xml" data="assets/images/person-icon.svg"></object>
      </div>
      <div class="member-id">ID: ${id}</div>
      <button onClick='addQueryParam("user", "${id}")' class="member-info-button">Informácie</button>
    </li>
    `
  }
}

async function generateMembershipList(userID) {
  const allMemberships = document.getElementById("all-memberships")
  const userData = await getUser(userID)
  const memberships = userData.membership
  for (i in memberships) {
    allMemberships.innerHTML += `
    <li class="membership">
      <ul class="customer-membership-start">
        <li class="title">Dátum začatia predplatného</li>
        <li class="value">${memberships[i].startDate}</li>
      </ul>
      <ul class="customer-membership-end">
        <li class="title">Predplatné uplynie</li>
        <li class="value">${memberships[i].endDate}</li>
      </ul>
      <ul class="customer-training-count">
        <li class="title">Počet absolbovaných tréningov</li>
        <li class="value">${memberships[i].trainingCounter}</li>
      </ul>
    </li>
    `
    console.log(memberships[i])
  }
}

function renderAdmin() {
  const currentURL = new URL(window.location.href)
  const currentParams = new URLSearchParams(currentURL.search)
  const userParam = currentURL.searchParams.get("user")
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
        <div id="member-id">${userParam}</div>
        <div class="membership-status">ČLENSTVO AKTÍVNE</div>
      </header>
      <div class="member-detail">
        <ul id="all-memberships" class="memberships-container"></ul>
        <div class="action-buttons">
          <button class="confirm-participation-button">POTVRDIŤ ÚČASŤ</button>
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
        <div class="member-id">ID: ${userParam}</div>
      </div>
      <div class="renew-membership-form">
        <div class="input-container">
          <object class="icon input-icon" type="image/svg+xml" data="assets/images/calendar-icon.svg"></object>
          <input
            onfocus="(this.type='date'); this.showPicker()"
            onBlur="(!this.value ? this.type='text' : null)"
            type="text"
            placeholder="Začiatočný dátum členstva"
            id="member-renew-membership-start-date"
          />
        </div>
        <div class="input-container">
          <object class="icon input-icon" type="image/svg+xml" data="assets/images/calendar-icon.svg"></object>
          <input
            onfocus="(this.type='date'); this.showPicker()"
            onBlur="(!this.value ? this.type='text' : null)"
            type="text"
            placeholder="Konečný dátum členstva"
            id="member-renew-membership-end-date"
          />
        </div>
        <button type="submit">POTVRDIŤ</button>
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
    if (userParam !== null) {
      paramsCount++
      if (action === "renew") {
        paramsCount++
        content.innerHTML = userRenewTemplate
      } else if (currentParams.size > paramsCount) {
        window.location.href = "https://playinmove.sk"
      } else {
        content.innerHTML = userDetailTemplate
        generateMembershipList(userParam)
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

function handleCreateNewMember() {
  // Get user Inputs
  const memberIDInput = document.getElementById("new-member-id")
  const memberStartDateInput = document.getElementById("member-membership-start-date")
  const memberEndDateInput = document.getElementById("member-membership-end-date")

  // Validation info text <div> (shows value if there is a validation errror or success)
  const newCustomerValidationInfo = document.getElementById("new-member-validation-info")

  // Create date
  const memberStartDate = new Date(memberStartDateInput.value)
  const memberEndDate = new Date(memberEndDateInput.value)

  // Format memberID - delete spaces
  // Format memberStartDateInput && memberEndDateInput - (dd.MM.yyyy)
  const memberIDFormatted = removeWhiteSpacesFromString(memberIDInput.value)
  const memberStartDateFormatted = formatDateWithDots(memberStartDate)
  const memberEndDateFormatted = formatDateWithDots(memberEndDate)

  // Validate inputs - return error string or null
  const validationError = validateNewMemberInputs(memberIDFormatted, memberStartDate, memberEndDate)

  if (validationError) {
    newCustomerValidationInfo.style.color = "red"
    newCustomerValidationInfo.textContent = validationError
    return
  }
  // TODO CRITICAL - Check if memberIDFormatted is unique amongs all users
  newMember(memberIDFormatted, memberStartDateFormatted, memberEndDateFormatted)

  // TODO HIGH - Add succes info to PATCH - response.ok instead.
  newCustomerValidationInfo.style.color = "green"
  newCustomerValidationInfo.textContent = memberIDFormatted + " úspešne pridaný!"

  // Reset inputs to null
  memberIDInput.value = null

  // Focus input FIRST, make it NULL and then BLUR.
  // Because in html input, onBlur is set to change input type=text when
  // there is no value so placeholder can be shown. We need first to focus
  // to make onBlur work.
  memberStartDateInput.focus()
  memberStartDateInput.value = null
  memberStartDateInput.blur()
  memberEndDateInput.focus()
  memberEndDateInput.value = null
  memberEndDateInput.blur()
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

function renew(id, current, startDate, endDate) {
  let newMembership = current
  newMembership.membership.push({
    startDate: startDate,
    endDate: endDate,
    trainingCounter: 0,
  })

  callRenew(id, newMembership)
}

function callRenew(id, newData) {
  const loginData = getLoginData()
  if (loginData) {
  }
  //call auth - get idToken
  // PATH method
  //https://playinmove-default-rtdb.europe-west1.firebasedatabase.app/users/USER_ID.json?auth=ADD_ID_TOKEN
  //body newData
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
function isValidDate(date) {
  return date instanceof Date && !isNaN(date) && date.toString() !== "Invalid Date"
}

function validateNewMemberInputs(memberID, startDate, endDate) {
  // Check if any input is empty
  if (!memberID || !isValidDate(startDate) || !isValidDate(endDate)) {
    return "Vyplň všetky polia."
  }

  const startDateTimestamp = startDate.getTime()
  const endDateTimestamp = endDate.getTime()

  // Check if endDate is later than startDate
  if (startDateTimestamp > endDateTimestamp) {
    return "Konečný dátum musí byť väčší."
  }

  // Check if endDate is in the future
  // TODO MEDIUM - Make endDate to not have to be +1 day from today
  if (new Date().getTime() > endDateTimestamp) {
    return "Konečný dátum musí byť v budúcnosti."
  }

  return null
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

  document.addEventListener("click", (event) => {
    const currentURL = new URL(window.location.href)
    const action = currentURL.searchParams.get("action")

    const newCustomerValidationInfo = document.getElementById("new-member-validation-info")
    const createUserButton = document.getElementById("create-user-button")

    // Clear the newCustomerValidationInfo to null when click anywhere expect createUserButton
    if (event.target !== createUserButton && action === "newUser") {
      newCustomerValidationInfo.textContent = null
    }
  })
}
//
// /LISTERS
