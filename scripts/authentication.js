// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        var user = authResult.user; 

        db.collection("users")
            .where("email", "==", user.email)
            .get()
            .then((querySnapshot) => {
                if(!querySnapshot.empty) {
                    //const user = querySnapshot.docs[0].data()
                    window.location.href = '/main.html';
                } else {
                    db.collection("users").doc(user.uid).set({
                        name: user.displayName,
                        email: user.email,
                        status: true,
                        gender: null,
                        age: null,
                        occupation: null
                    }).then(() => {
                        window.location.href = '/main.html';
                    }).catch((error) => {
                        console.error("Error creating user: ", error);
                        alert('Error signing in, check console')
                    });
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return false;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    // signInSuccessUrl: 'main.html',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
    //   firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //   firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //   firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

  ui.start('#firebaseui-auth-container', uiConfig);