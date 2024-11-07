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
        window.addEventListener("click", (click_event) => {
            let data;
            if (click_event.target.tagName === "A" || click_event.target.tagName === "DIV") {
                if (click_event.target.href) {
                    url_pathnames = new URL(click_event.target.href).pathname.split("/");
                    if (
                        url_pathnames[url_pathnames.length - 1].match(/\b[A-Za-z_-]+\b/g)
                    ) {
                        if (url_pathnames[url_pathnames.length - 4] === "entities") {
                            belongs_to =
                                SECTION_AND_ENTITY_MAPPING[
                                url_pathnames[url_pathnames.length - 3]
                                ];
                        } else {
                            belongs_to =
                                SECTION_AND_ENTITY_MAPPING[
                                url_pathnames[url_pathnames.length - 4]
                                ];
                        }
                        element_alt = url_pathnames[url_pathnames.length - 1];
                    } else if (url_pathnames[url_pathnames.length - 1].match(/\d/)) {
                        belongs_to =
                            SECTION_AND_ENTITY_MAPPING[
                            url_pathnames[url_pathnames.length - 4]
                            ];
                        element_alt = null;
                    } else if (url_pathnames[url_pathnames.length - 3].match(/\d/)) {
                        belongs_to = `${SECTION_AND_ENTITY_MAPPING[
                            url_pathnames[url_pathnames.length - 4]
                        ]
                            } (ID: ${url_pathnames[url_pathnames.length - 3]})`;
                        element_alt = url_pathnames[url_pathnames.length - 1];
                    }
                    data = {
                        user: USER,
                        session: SESSION,
                        notebook_session: NOTEBOOK_SESSION,
                        timestamp: new Date().toISOString(),
                        eventName: "CLICK",
                        enumeration: ENUMERATION,
                        eventData: {
                            notebookName: `bioddex_${NOTEBOOK_SESSION}`,
                            cell: {
                                cellId: self.crypto.randomUUID(),
                                type: "code",
                                value: "",
                                metadata: {
                                    html_tag: click_event.target.tagName,
                                    belongs_to: belongs_to,
                                    element_alt: element_alt,
                                    element_background_color: window.getComputedStyle(click_event.target)
                                        .color,
                                    element_text_content: click_event.target.innerText,
                                }
                            },
                            output: "",
                            errors: [],
                            location: click_event.target.href,
                        },
                    };
                }
            } else if (click_event.target.tagName === "BUTTON") {
                if (
                    document.querySelector("input") &&
                    document.querySelector("input").value &&
                    document.querySelector("select") &&
                    document.querySelector("select").value
                ) {
                    data = {
                        user: USER,
                        session: SESSION,
                        notebook_session: NOTEBOOK_SESSION,
                        timestamp: new Date().toISOString(),
                        eventName: "CLICK",
                        enumeration: ENUMERATION++,
                        eventData: {
                            notebookName: `bioddex_${NOTEBOOK_SESSION}`,
                            cell: {
                                cellId: self.crypto.randomUUID(),
                                type: "code",
                                value: "",
                                metadata: {
                                    html_tag: click_event.target.tagName,
                                    belongs_to: "",
                                    element_background_color: window.getComputedStyle(click_event.target)
                                        .color,
                                    element_text_content: click_event.target.innerText,
                                    query_string: document.querySelector("input").value,
                                    query_select: document.querySelector("select").value,
                                }
                            },
                            output: "",
                            errors: [],
                            location: "",
                        },
                    };
                } else {
                    data = {
                        user: USER,
                        session: SESSION,
                        notebook_session: NOTEBOOK_SESSION,
                        timestamp: new Date().toISOString(),
                        eventName: "CLICK",
                        enumeration: ENUMERATION++,
                        eventData: {
                            notebookName: `bioddex_${NOTEBOOK_SESSION}`,
                            cell: {
                                cellId: self.crypto.randomUUID(),
                                type: "code",
                                value: "",
                                metadata: {
                                    html_tag: click_event.target.tagName,
                                    belongs_to: "",
                                    element_background_color: window.getComputedStyle(click_event.target)
                                        .color,
                                    element_text_content: click_event.target.innerText,
                                }
                            },
                            output: "",
                            errors: [],
                            location: "",
                        },
                    };
                }
            } else if (click_event.target.tagName === "STRONG") {
                element_alt = new URL(click_event.target.parentElement.href).pathname
                    .split("/")
                    .splice(-1)[0];
                data = {
                    user: USER,
                    session: SESSION,
                    notebook_session: NOTEBOOK_SESSION,
                    timestamp: new Date().toISOString(),
                    eventName: "CLICK",
                    enumeration: ENUMERATION++,
                    eventData: {
                        notebookName: `bioddex_${NOTEBOOK_SESSION}`,
                        cell: {
                            cellId: self.crypto.randomUUID(),
                            type: "code",
                            value: "",
                            metadata: {
                                html_tag: click_event.target.tagName,
                                belongs_to:
                                    SECTION_AND_ENTITY_TYPE_MAPPING[
                                    new URLSearchParams(click_event.target.parentElement.href).get(
                                        "entityType"
                                    )
                                    ],
                                element_alt: element_alt,
                                element_background_color: window.getComputedStyle(
                                    click_event.target.parentElement
                                ).color,
                                element_text_content: click_event.target.parentElement.innerText,
                                query_string: new URLSearchParams(
                                    click_event.target.parentElement.href
                                ).get("entityName"),
                            }
                        },
                        output: "",
                        errors: [],
                        location: click_event.target.parentElement.href,
                    },
                };
            } else if (click_event.target.tagName === "SELECT") {
                data = {
                    user: USER,
                    session: SESSION,
                    notebook_session: NOTEBOOK_SESSION,
                    timestamp: new Date().toISOString(),
                    eventName: "CLICK",
                    enumeration: ENUMERATION++,
                    eventData: {
                        notebookName: `bioddex_${NOTEBOOK_SESSION}`,
                        cell: {
                            cellId: self.crypto.randomUUID(),
                            type: "code",
                            value: "",
                            metadata: {
                                html_tag: click_event.target.tagName,
                                belongs_to: "",
                                element_background_color: window.getComputedStyle(click_event.target)
                                    .color,
                                element_text_content: click_event.target.value,
                            }
                        },
                        output: "",
                        errors: [],

                        location: "",
                    },
                };
            }

            if (data) {
                if (data.eventName === "CLICK") {
                    let cell_value;
                    if (data.eventData.cell.metadata.html_tag === "BUTTON") {
                        if (
                            data.eventData.cell.metadata.query_string ||
                            !data.eventData.cell.metadata.element_text_content.includes("×")
                        ) {
                            cell_value = `Clicked on '${data.eventData.cell.metadata.element_text_content}' button with query as '${data.eventData.cell.metadata.query_string}' and with filter '${data.eventData.cell.metadata.query_select}'`;
                        } else {
                            cell_value = `Clicked on '${data.eventData.cell.metadata.element_text_content}' button`;
                        }
                    } else if (data.eventData.cell.metadata.html_tag === "STRONG") {
                        cell_value = `Clicked on '${data.eventData.cell.metadata.element_alt
                            }' in '${COLOR_TO_NAME_MAPPING[data.eventData.element_background_color]
                            }' bubble with text '${data.eventData.cell.metadata.element_text_content
                            }' right of '${data.eventData.cell.metadata.query_string}' under '${data.eventData.cell.metadata.belongs_to
                            }' section`;
                    } else {
                        if (data.eventData.location) {
                            if (data.eventData.cell.metadata.element_alt) {
                                cell_value = `Clicked on '${data.eventData.cell.metadata.element_text_content}' under the '${data.eventData.cell.metadata.belongs_to}' to view '${data.eventData.cell.metadata.element_alt}'`;
                            } else if (data.eventData.cell.metadata.belongs_to) {
                                cell_value = `Clicked on '${data.eventData.cell.metadata.element_text_content}' under the '${data.eventData.cell.metadata.belongs_to}' section`;
                            } else {
                                cell_value = `Clicked on '${data.eventData.cell.metadata.element_text_content}'`;
                            }
                        }
                    }

                    data.eventData.cell.value = cell_value;

                    let data_for_cell_selected = JSON.parse(JSON.stringify(data));
                    data_for_cell_selected.eventName = "CELL_SELECTED";
                    justLogToConsole(data_for_cell_selected);
                    // sendEventToEngine(SERVER_ENDPOINT, data_for_cell_selected);

                    ENUMERATION++;

                    let data_for_cell_execution_start = JSON.parse(JSON.stringify(data));
                    data_for_cell_execution_start.eventName = "CELL_EXECUTION_BEGIN";
                    data_for_cell_execution_start.enumeration = ENUMERATION;
                    data_for_cell_execution_start.eventData.executionCount = ENUMERATION;
                    justLogToConsole(data_for_cell_execution_start);
                    // sendEventToEngine(SERVER_ENDPOINT, data_for_cell_execution_start);

                    ENUMERATION++;

                    let data_for_cell_execution_end = JSON.parse(JSON.stringify(data));
                    data_for_cell_execution_end.eventName = "CELL_EXECUTION_END";
                    data_for_cell_execution_end.enumeration = ENUMERATION;
                    data_for_cell_execution_end.eventData.executionCount = ENUMERATION;
                    justLogToConsole(data_for_cell_execution_end);
                    // sendEventToEngine(SERVER_ENDPOINT, data_for_cell_execution_end);
                }
            }
            ENUMERATION++;
        });
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
