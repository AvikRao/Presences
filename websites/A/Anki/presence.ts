const presence = new Presence({
    clientId: "795150603642470420"
    }),
    startTimestamp = Math.floor(Date.now() / 1000);


presence.on("UpdateData", async () => {

    const presenceData: PresenceData = {
        largeImageKey:
            "anki" /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/,
        details: "Browsing Page Name", //The upper section of the presence text
        state: "Reading section A", //The lower section of the presence text,
        startTimestamp
    }; /*Optionally you can set a largeImageKey here and change the rest as variable subproperties, for example presenceSata.type = "blahblah"; type examples: details, state, etc.*/

    const {pathname, hostname}: {pathname: string, hostname: string} = window.location;
    presenceData.details = pathname;

    switch (hostname) {
        case "apps.ankiweb.net":
            presenceData.details = "Viewing homepage";
            delete presenceData.state;
            break;
        case "docs.ankiweb.net" :
            break;
        case "faqs.ankiweb.net" :
            break;
        default :
            presenceData.details = "Reviewing flashcards";
            presenceData.smallImageKey = "reviewing";
            break;

    }

    if (presenceData.details == null) {
        //This will fire if you do not set presence details
        presence.setTrayTitle(); //Clears the tray title for mac users
        presence.setActivity(); /*Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name*/
    } else {
        //This will fire if you set presence details
        presence.setActivity(presenceData); //Update the presence with all the values from the presenceData object
    }
});
