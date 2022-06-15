let config = {
    azServerUrl: "https://auth.pingone.com/cbe83512-3062-4ec9-bb35-1b6abc351173/as",
    tokenEndpoint: "/token",
    azEndpoint: "/authorize",
    logoutEndpoint: "/signoff",
    clientId: "ecfd9455-2c46-4582-b23b-d6f60c2ec178",
    redirectUri: "https://shell-recharge-web-portal.glitch.me"
}

const oidcClient = createClient (config); 


window.onload = async () => {
    console.log ("Runnig window.onload");
    
    document.getElementById ("login-button").addEventListener ("click", (e)=> login ());
    document.getElementById ("logout-button").addEventListener ("click", (e) => logout ());
    if (window.location.search.includes ("code=")) {
        console.log ("Redirect from OIDC authorization");
        await oidcClient.handleRedirectBack ();
        console.log (oidcClient.getOidcClaims ());
        console.log (oidcClient.getAccessToken());
        window.history.replaceState({}, document.title, window.location.pathname);
        updateUI ();
    }
}

function login () {
    console.log ("Login");
    oidcClient.loginWithRedirect ({scope: "openid profile email"});
}

function logout () {
    console.log ("Logout");
    oidcClient.logoutWithRedirect ();
    
}

function updateUI () {
    console.log ("updateUI");
    if (oidcClient.isUserAuthenticated) {
        document.getElementById ("firstname").innerText = oidcClient.getOidcClaims ().given_name;
        hideElement ("login-button");
        hideElement ("index");
        displayElement ("logout-button");
        displayElement ("firstname");
        displayElement ("home");

    } else {
        hideElement ("firstname");
        hideElement ("logout-button");
        hideElement ("home");
        displayElement ("landing");
        displayElement ("login-button");
        displayElement ("index");
    }
}

function displayElement(id) {
    document.getElementById(id).classList.remove("hidden");
}

function hideElement(id) {
    document.getElementById(id).classList.add("hidden");
}


