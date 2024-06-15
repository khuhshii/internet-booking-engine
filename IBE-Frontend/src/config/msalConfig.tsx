export const msalConfig = {
    auth: {
      clientId: '51317739-2bca-4c82-9ada-08cb2c65cc8b', // This is the ONLY mandatory field that you need to supply.
      // authority: 'https://ibe24.onmicrosoft.com.b2clogin.com/ibe24.onmicrosoft.com.onmicrosoft.com/b2c_1_susi', // Choose SUSI as your default authority.
      // authority: 'https://ibe24.onmicrosoft.com.b2clogin.com/ibe24.onmicrosoft.com.onmicrosoft.com/B2C_1_signin_signup_15', // Choose SUSI as your default authority.
      // knownAuthorities: ['ibe24.onmicrosoft.com.b2clogin.com'], // Mark your B2C tenant's domain as trusted.
      authority: 'https://ibe24.b2clogin.com/ibe24.onmicrosoft.com/B2C_1_signin_signup_15', // Update authority URL
      knownAuthorities: ['ibe24.b2clogin.com'], 
      // redirectUri: 'https://calm-bay-0d02db810.4.azurestaticapps.net/', // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
      // postLogoutRedirectUri: 'https://calm-bay-0d02db810.4.azurestaticapps.net/', // Indicates the page to navigate after logout.-
      // redirectUri: 'http://localhost:5173', // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
      // postLogoutRedirectUri:'http://localhost:5173', // Indicates the page to navigate after logout.-
      redirectUri: 'https://team-15-ibe-b5averevakhagghw.z02.azurefd.net', // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
      postLogoutRedirectUri:'https://team-15-ibe-b5averevakhagghw.z02.azurefd.net', // Indicates the page to navigate after logout.-
      navigateToLoginRequestUrl: false, // If 'true', will navigate back to the original request location before processing the auth code response.
    },
    cache: {
      cacheLocation: 'sessionStorage', // Configures cache location. 'sessionStorage' is more secure, but 'localStorage' gives you SSO between tabs.
      storeAuthStateInCookie: false, // Set this to 'true' if you are having issues on IE11 or Edge
    }
  }