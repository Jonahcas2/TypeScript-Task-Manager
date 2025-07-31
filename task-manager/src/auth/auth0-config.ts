export const auth0Config = {
    domain: process.env.REACT_APP_AUTH0_DOMAIN || 'dev-0sdyvelpn2w4yv6c.us.auth0.com',
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || 'CJaZ5IWyYUL9OOnn22IHUAujSnIlsiUE',
    redirectUri: window.location.origin,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
};