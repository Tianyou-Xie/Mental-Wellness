# Project Title
COMP1800 BBY-02 Mental Wellness

## 1. Project Description
"Mental Wellness" is an app that helps young students and adults to be relieved from stress, anxiety, and depression by giving them an opportunity to speak about their emotions without feeling judged or pressured by another person, and track their emotional changes over time.

## 2. Names of Contributors
List team members and/or short bio's here... 
* Hi, my name is Tianyou. I am excited to start this journey of creating a new app!
* Hi. my name is Gurshaan. I am ready to learn more about Git!
* Hi, my name is Kamal. I was born to do this.
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML 5
* CSS 3
* JavaScript
* Bootstrap v5.3.2 (Frontend  styling library)
* Firebase v8.10.0 (BAAS - Backend as a Service)
* Chart.js v4.4.1 (Graphs library)
* Jquery v3.5.1 (Javascript library)
* Font Awesome v5.3.1 (Icons library)
* Bootstrap icons v1.11.3 (Icons library)
* Adobe Stock (Free image library)

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* Firebase.js file should be included under scripts folder with firebase API implementation
* Open AI secret key must be pasted in script.js file under the function starChat()
* For testing purpose use the following login credentials (Email: sarah@bcit.ca, Password: 123456)

## 5. Known Bugs and Limitations
Here are some known bugs:
* About Page contents is empty
* FAQ's Page contents is empty
* While logged in you can still view the login page
* While no data in emotions the graph may not show correctly
* While updating the edit profile after the first time, the alert message does not show
* Home/Index/Landing pages may look differently in different screen sizes
* User chat doesnt get saved if the brower window get closed unexpectedly

## 6. Features for Future
What we'd like to build in the future:
* Improve user chat experince
* Show user chat data on graphs with emotions
* Use better content related images on index page
* Provide statistics based on age groups and occupation
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore                               # Git ignore file
├── index.html                               # Landing HTML file, this is what users see when you come to url
├── 404.html                                 # Page not found webpage
├── about.html                               # About page (currently empty)
├── ask.html                                 # Virtual therapist online-chat
├── chathistory.html                         # History of all chat conversation
├── custom.html                              # Custom report section (hardcoded)
├── faq.html                                 # Frequeently asked questions (empty)
├── login.html                               # Login Page
├── main.html                                # Dashboard
├── profile.html                             # Porfile and edit profile page
├── recordlist.html                          # Holds list of all previously entered emotions
├── reports.html                             # Page after selecting third option on footer. Holds directory to history pages
├── viewchat.html                            # View all prieviously inputted chats after choosing a specific chat
├── weekly.html                              # Weekly report which includes the weekly chart API
├── README.md                                # Readme File
├── fonts/                                   # Folder for fonts
├── images/                                  # Folder for images
├── scripts/                                 # Folder for javascripts
├── styles/                                  # Folder for CSS styles
└── templates/                               # Folder for navbar and footer template

It has the following subfolders and files:
├── .git                                     # Folder for git repo
├── images                                   # Folder for images
    /AdobeStock_11076905.svg                    # Adobe Stock
    /AdobeStock_465543306.svg                   # Adobe Stock
    /AdobeStock_465543319.svg                   # Adobe Stock
    /AdobeStock_502420483.svg                   # Adobe Stock
    /AdobeStock_562610075.svg                   # Adobe Stock
    /AdobeStock_570871703.svg                   # Adobe Stock
    /AdobeStock_650028610.svg                   # Adobe Stock
    /AdobeStock_724153931.svg                   # Adobe Stock
    /AdobeStock_750245552.svg                   # Adobe Stock
    /AdobeStock_761156551.svg                   # Adobe Stock
    /AdobeStock_766097765.svg                   # Adobe Stock
    /MentalWellnessLogo.png                     # Custom-made logo
├── scripts                                  # Folder for scripts
    /authentication.js                          # Authentication javascript file
    /chart.util.js                              # Javascript file for chart API feature
    /firebaseAPI_TEAM02.js                      # Firebase API keys
    /main.js                                    # Main javascript file
    /profile.js                                 # Javascript file for profile functions
    /recordlist.js                              # Javascript file for record list functions
    /reports.js                                 # Javascript file for report functions
    /script.js                                  # Script Javascript file
    /skeleton.js                                # Skeleton for navbar and footer retrivel
    /weekly.js                                  # Javascript file for weekly chart API
├── styles                                      # Folder for styles
    /history.css                                # CSS styles for history page
    /login.css                                  # CSS styles for login page
    /profile.css                                # CSS styles for profile page
    /style.css                                  # Main CSS stylesheet
    /view.css                                   # CSS style including hover pseudo slectors
└── templates                                # Folder for templates
    /navbar.html                                # navbar file
    /footer.html                                # footer file


```