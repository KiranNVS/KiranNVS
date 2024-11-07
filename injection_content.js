window.addEventListener("message", (event) => {
    if (event.origin !== window.location.origin) return;

    if (event.data.message === "load") {
        const USER = new URLSearchParams(window.location.search).getAll(
            "isiTesting"
        )[0];

        const SESSION = new URLSearchParams(window.location.search).getAll(
            "isiTesting"
        )[1];

        const ENGINE_URL = new URLSearchParams(window.location.search).getAll(
            "isiTesting"
        )[2];
        const SERVER_ENDPOINT = `${ENGINE_URL}/user/${USER}/event`;

        const NOTEBOOK_SESSION = self.crypto.randomUUID();

        const SECTION_AND_ENTITY_TYPE_MAPPING = {
            person: "People",
            pathogen: "Biological Materials",
            lab: "Divisions",
            biotechmethod: "Biotech Methods",
            equipment: "Equipment",
            biotechtopic: "Biotech Topics",
            institution: "Institutions",
        };

        const SECTION_AND_ENTITY_MAPPING = {
            people: "People",
            person: "Person",
            biological_materials: "Biological Materials",
            biological_material: "Biological Material",
            divisions: "Divisions",
            division: "Division",
            biotech_methods: "Biotech Methods",
            biotech_method: "Biotech Method",
            equipment: "Equipment",
            biotech_topics: "Biotech Topics",
            institutions: "Institutions",
            institution: "Institution",
        };

        const COLOR_TO_NAME_MAPPING = {
            "rgb(29, 78, 216)": "Blue",
            "rgb(4, 120, 87)": "Emerald",
            "rgb(190, 24, 93)": "Pink",
            "rgb(109, 40, 217)": "Violet",
            "rgb(180, 83, 9)": "Amber",
            "rgb(14, 116, 144)": "Sky Blue",
        };

        let ENUMERATION = 0;

        // LOADED EVENT
        if (ENUMERATION === 0) {
            let data = {
                user: USER,
                session: SESSION,
                notebook_session: NOTEBOOK_SESSION,
                timestamp: new Date().toISOString(),
                eventName: "JUPYTER_LOADED",
                enumeration: ENUMERATION++,
                eventData: {
                    location: window.location.href,
                },
            };

            // sendEventToEngine(SERVER_ENDPOINT, data);
            justLogToConsole(data);
        };

        // OPENED EVENT
        if (ENUMERATION === 1) {
            let data = {
                user: USER,
                session: SESSION,
                notebook_session: NOTEBOOK_SESSION,
                timestamp: new Date().toISOString(),
                eventName: "NOTEBOOK_OPENED",
                enumeration: ENUMERATION++,
                eventData: {
                    notebookName: `bioddex_${NOTEBOOK_SESSION}`,
                    location: window.location.href,
                },
            };

            // sendEventToEngine(SERVER_ENDPOINT, data);
            justLogToConsole(data);
        };


    } else if (event.data.message === "pageUpdated") {
        console.log(event.target.tagName)
    }
});

function sendEventToEngine(url, eventData) {
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: encodeURI(JSON.stringify(eventData)),
    });
}

function justLogToConsole(eventData) {
    console.log(eventData);
}
