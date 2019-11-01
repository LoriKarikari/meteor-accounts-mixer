# Meteor Acccounts Mixer

### Mixer account login for Meteor

## Install

`cd <your-meteor-project>`

`meteor add service-configuration`

`meteor add lorikarikari:accounts-mixer`

## Setup and Usage

1. Register your app at the Mixer Developer Lab website - https://mixer.com/lab/oauth

2. Fill out the given form, for e.g. localhost :

   - website: `http://localhost:3000`
   - hosts: `localhost`

3. After registration add your client id and client secret to settings.json.

4. Create `accounts.js` in the server folder and add the following code:

```
ServiceConfiguration.configurations.remove({
	service: "mixer"
});

ServiceConfiguration.configurations.insert({
	service: "mixer",
	clientId: "Meteor.settings.private.<your-client-id>",
	redirectUri: Meteor.absoluteUrl() + '_oauth/mixer?close',
	secret: "Meteor.settings.private.<your-client-secret>",
	loginStyle: "redirect"
});
```

5. Add this function to the click event of your button.

```
Meteor.loginWithMixer(function (err) {
	if (err) console.log('login failed: ' + err)
});
```

6. If you want specific permissions, add the scope as an option.
   You can find a list of all scopes at https://dev.mixer.com/reference/oauth/scopes.

```
const scope = ["user:details:self", "user:update:self", "user:analytics:self"];

Meteor.loginWithMixer({requestPermissions: scope}, function (err) {
	if (err) console.log("login failed: " + err)
});
```
