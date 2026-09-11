document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =====================================================
           🐒 MONKEY CURSOR
        ====================================================== */

        const monkeyCursor =
            document.getElementById(
                "monkeyCursor"
            );


        document.addEventListener(
            "mousemove",
            function (event) {

                if (!monkeyCursor) {
                    return;
                }


                monkeyCursor.style.transform =
                    `translate(
                        ${event.clientX - 5}px,
                        ${event.clientY - 5}px
                    )`;

            },
            {
                passive: true
            }
        );


        /* =====================================================
           HTML ELEMENTS
        ====================================================== */

        const fromDistrict =
            document.getElementById(
                "fromDistrict"
            );


        const toDistrict =
            document.getElementById(
                "toDistrict"
            );


        const toPreference =
            document.getElementById(
                "toPreference"
            );


        const toPlace =
            document.getElementById(
                "toPlace"
            );


        const toApiStatus =
            document.getElementById(
                "toApiStatus"
            );


        const bananaSelect =
            document.getElementById(
                "bananaSelect"
            );


        const priceDisplay =
            document.getElementById(
                "priceDisplay"
            );


        const calculateBtn =
            document.getElementById(
                "calculateBtn"
            );


        const swapBtn =
            document.getElementById(
                "swapBtn"
            );


        const errorMessage =
            document.getElementById(
                "errorMessage"
            );


        const inputPage =
            document.getElementById(
                "inputPage"
            );


        const outputPage =
            document.getElementById(
                "outputPage"
            );


        const routeDisplay =
            document.getElementById(
                "routeDisplay"
            );


        const resultFrom =
            document.getElementById(
                "resultFrom"
            );


        const resultTo =
            document.getElementById(
                "resultTo"
            );


        const distanceDisplay =
            document.getElementById(
                "distanceDisplay"
            );


        const bananaCountDisplay =
            document.getElementById(
                "bananaCountDisplay"
            );


        const bananaTypeDisplay =
            document.getElementById(
                "bananaTypeDisplay"
            );


        const totalPriceDisplay =
            document.getElementById(
                "totalPriceDisplay"
            );


        const funnyMessage =
            document.getElementById(
                "funnyMessage"
            );


        const backBtn =
            document.getElementById(
                "backBtn"
            );


        /* =====================================================
           DISTRICT CENTRES

           FROM will use these coordinates automatically.
        ====================================================== */

        const districtCenters = {

            "Thiruvananthapuram": {
                lat: 8.5241,
                lon: 76.9366
            },

            "Kollam": {
                lat: 8.8932,
                lon: 76.6141
            },

            "Pathanamthitta": {
                lat: 9.2648,
                lon: 76.7870
            },

            "Alappuzha": {
                lat: 9.4981,
                lon: 76.3388
            },

            "Kottayam": {
                lat: 9.5916,
                lon: 76.5222
            },

            "Idukki": {
                lat: 9.8497,
                lon: 76.9720
            },

            "Ernakulam": {
                lat: 9.9816,
                lon: 76.2999
            },

            "Thrissur": {
                lat: 10.5276,
                lon: 76.2144
            },

            "Palakkad": {
                lat: 10.7867,
                lon: 76.6548
            },

            "Malappuram": {
                lat: 11.0510,
                lon: 76.0711
            },

            "Kozhikode": {
                lat: 11.2588,
                lon: 75.7804
            },

            "Wayanad": {
                lat: 11.6854,
                lon: 76.1320
            },

            "Kannur": {
                lat: 11.8745,
                lon: 75.3704
            },

            "Kasaragod": {
                lat: 12.5102,
                lon: 74.9852
            }

        };


        /* =====================================================
           SELECTED FROM LOCATION

           This is automatically created from the district.
        ====================================================== */

        let selectedFromLocation =
            null;


        /* =====================================================
           SELECTED TO LOCATION
        ====================================================== */

        let selectedToLocation =
            null;


        /* =====================================================
           API TO LOCATIONS
        ====================================================== */

        let toLocations =
            [];


        /* =====================================================
           BANANA DATA
        ====================================================== */

        const bananaTypes = {

            nendran: {

                name:
                    "Nendran",

                sizeCm:
                    28,

                pricePerDozen:
                    58

            },

            palayamkodan: {

                name:
                    "Palayamkodan",

                sizeCm:
                    15,

                pricePerDozen:
                    42

            },

            robusta: {

                name:
                    "Robusta",

                sizeCm:
                    22,

                pricePerDozen:
                    48

            },

            ethakka: {

                name:
                    "Ethakka",

                sizeCm:
                    12,

                pricePerDozen:
                    36

            },

            poovan: {

                name:
                    "Poovan",

                sizeCm:
                    18,

                pricePerDozen:
                    45

            },

            redbanana: {

                name:
                    "Chenkadali",

                sizeCm:
                    20,

                pricePerDozen:
                    70

            },

            mysore: {

                name:
                    "Mysore Banana",

                sizeCm:
                    17,

                pricePerDozen:
                    50

            },

            njalipoovan: {

                name:
                    "Njalipoovan",

                sizeCm:
                    13,

                pricePerDozen:
                    38

            }

        };


        /* =====================================================
           PLACE PREFERENCES
        ====================================================== */

        const preferenceWords = {

            "":
                "",

            beach:
                "beach",

            temple:
                "temple",

            waterfall:
                "waterfall",

            fort:
                "fort",

            lake:
                "lake",

            museum:
                "museum",

            dam:
                "dam",

            park:
                "park",

            viewpoint:
                "viewpoint",

            wildlife:
                "wildlife"

        };


        /* =====================================================
           FALLBACK LOCATIONS

           Used when the public API is unavailable.
        ====================================================== */

        const fallbackLocations = {

            "Thiruvananthapuram": [

                {
                    name:
                        "Sree Padmanabhaswamy Temple",
                    lat:
                        8.4823,
                    lon:
                        76.9430
                },

                {
                    name:
                        "Kovalam",
                    lat:
                        8.4004,
                    lon:
                        76.9787
                },

                {
                    name:
                        "Napier Museum",
                    lat:
                        8.5075,
                    lon:
                        76.9525
                },

                {
                    name:
                        "Neyyar Dam",
                    lat:
                        8.5326,
                    lon:
                        77.1480
                }

            ],


            "Kollam": [

                {
                    name:
                        "Kollam Beach",
                    lat:
                        8.8798,
                    lon:
                        76.5880
                },

                {
                    name:
                        "Ashtamudi Lake",
                    lat:
                        8.9550,
                    lon:
                        76.5950
                },

                {
                    name:
                        "Thenmala",
                    lat:
                        8.9617,
                    lon:
                        77.0450
                },

                {
                    name:
                        "Palaruvi Waterfalls",
                    lat:
                        8.8943,
                    lon:
                        77.1178
                }

            ],


            "Pathanamthitta": [

                {
                    name:
                        "Sabarimala",
                    lat:
                        9.4326,
                    lon:
                        77.0839
                },

                {
                    name:
                        "Aranmula",
                    lat:
                        9.3276,
                    lon:
                        76.6850
                },

                {
                    name:
                        "Konni",
                    lat:
                        9.2250,
                    lon:
                        76.8574
                },

                {
                    name:
                        "Gavi",
                    lat:
                        9.3820,
                    lon:
                        77.2120
                }

            ],


            "Alappuzha": [

                {
                    name:
                        "Alappuzha Beach",
                    lat:
                        9.4981,
                    lon:
                        76.3388
                },

                {
                    name:
                        "Alappuzha Backwaters",
                    lat:
                        9.5120,
                    lon:
                        76.3270
                },

                {
                    name:
                        "Kuttanad",
                    lat:
                        9.3420,
                    lon:
                        76.4900
                },

                {
                    name:
                        "Marari Beach",
                    lat:
                        9.6025,
                    lon:
                        76.2930
                }

            ],


            "Kottayam": [

                {
                    name:
                        "Kumarakom",
                    lat:
                        9.6175,
                    lon:
                        76.4305
                },

                {
                    name:
                        "Illikkal Kallu",
                    lat:
                        9.6960,
                    lon:
                        76.8140
                },

                {
                    name:
                        "Vaikom",
                    lat:
                        9.7480,
                    lon:
                        76.3970
                },

                {
                    name:
                        "Thirunakkara Temple",
                    lat:
                        9.5920,
                    lon:
                        76.5220
                }

            ],


            "Idukki": [

                {
                    name:
                        "Munnar",
                    lat:
                        10.0889,
                    lon:
                        77.0595
                },

                {
                    name:
                        "Thekkady",
                    lat:
                        9.6031,
                    lon:
                        77.1618
                },

                {
                    name:
                        "Idukki Dam",
                    lat:
                        9.8497,
                    lon:
                        76.9764
                },

                {
                    name:
                        "Ramakkalmedu",
                    lat:
                        9.8780,
                    lon:
                        77.1200
                }

            ],


            "Ernakulam": [

                {
                    name:
                        "Fort Kochi",
                    lat:
                        9.9658,
                    lon:
                        76.2423
                },

                {
                    name:
                        "Mattancherry",
                    lat:
                        9.9616,
                    lon:
                        76.2586
                },

                {
                    name:
                        "Marine Drive Kochi",
                    lat:
                        9.9816,
                    lon:
                        76.2750
                },

                {
                    name:
                        "Aluva",
                    lat:
                        10.1076,
                    lon:
                        76.3516
                }

            ],


            "Thrissur": [

                {
                    name:
                        "Vadakkunnathan Temple",
                    lat:
                        10.5240,
                    lon:
                        76.2140
                },

                {
                    name:
                        "Guruvayur Temple",
                    lat:
                        10.5954,
                    lon:
                        76.0419
                },

                {
                    name:
                        "Athirappilly Waterfalls",
                    lat:
                        10.2853,
                    lon:
                        76.5690
                },

                {
                    name:
                        "Thrissur Zoo",
                    lat:
                        10.5300,
                    lon:
                        76.2110
                }

            ],


            "Palakkad": [

                {
                    name:
                        "Palakkad Fort",
                    lat:
                        10.7719,
                    lon:
                        76.6821
                },

                {
                    name:
                        "Malampuzha Dam",
                    lat:
                        10.8330,
                    lon:
                        76.6840
                },

                {
                    name:
                        "Silent Valley",
                    lat:
                        11.1300,
                    lon:
                        76.4300
                },

                {
                    name:
                        "Nelliyampathy",
                    lat:
                        10.5340,
                    lon:
                        76.6860
                }

            ],


            "Malappuram": [

                {
                    name:
                        "Kottakkunnu",
                    lat:
                        11.0620,
                    lon:
                        76.0830
                },

                {
                    name:
                        "Nilambur",
                    lat:
                        11.2780,
                    lon:
                        76.2250
                },

                {
                    name:
                        "Tirur",
                    lat:
                        10.9130,
                    lon:
                        75.9220
                },

                {
                    name:
                        "Thirunavaya",
                    lat:
                        10.8850,
                    lon:
                        75.9930
                }

            ],


            "Kozhikode": [

                {
                    name:
                        "Kozhikode Beach",
                    lat:
                        11.2588,
                    lon:
                        75.7804
                },

                {
                    name:
                        "Kappad",
                    lat:
                        11.3830,
                    lon:
                        75.7030
                },

                {
                    name:
                        "Beypore",
                    lat:
                        11.1710,
                    lon:
                        75.8060
                },

                {
                    name:
                        "Mananchira Square",
                    lat:
                        11.2580,
                    lon:
                        75.7820
                }

            ],


            "Wayanad": [

                {
                    name:
                        "Edakkal Caves",
                    lat:
                        11.6260,
                    lon:
                        76.2850
                },

                {
                    name:
                        "Pookode Lake",
                    lat:
                        11.5560,
                    lon:
                        76.0110
                },

                {
                    name:
                        "Banasura Sagar Dam",
                    lat:
                        11.6790,
                    lon:
                        75.9880
                },

                {
                    name:
                        "Soochipara Waterfalls",
                    lat:
                        11.5120,
                    lon:
                        76.1390
                }

            ],


            "Kannur": [

                {
                    name:
                        "St. Angelo Fort",
                    lat:
                        11.8590,
                    lon:
                        75.3600
                },

                {
                    name:
                        "Muzhappilangad Beach",
                    lat:
                        11.8040,
                    lon:
                        75.4390
                },

                {
                    name:
                        "Payyambalam Beach",
                    lat:
                        11.8740,
                    lon:
                        75.3690
                },

                {
                    name:
                        "Parassinikadavu",
                    lat:
                        11.9740,
                    lon:
                        75.4510
                }

            ],


            "Kasaragod": [

                {
                    name:
                        "Bekal Fort",
                    lat:
                        12.3920,
                    lon:
                        75.0320
                },

                {
                    name:
                        "Ranipuram",
                    lat:
                        12.3130,
                    lon:
                        75.3900
                },

                {
                    name:
                        "Ananthapura Lake Temple",
                    lat:
                        12.5480,
                    lon:
                        75.0960
                },

                {
                    name:
                        "Madhur Temple",
                    lat:
                        12.5440,
                    lon:
                        74.9860
                }

            ]

        };


        /* =====================================================
           FUNNY MESSAGES
        ====================================================== */

        const funnyMessages = [

            "That's one seriously banana-normous journey! 🍌",

            "If life gives you this many bananas, make banana chips! 😂🍌",

            "A monkey somewhere just got very excited! 🐒",

            "Bro... that's not a trip, that's a banana expedition! 🚀🍌",

            "Even Google Maps wasn't ready for this many bananas! 😂🗺️",

            "That's enough bananas to open your own fruit shop! 🏪🍌",

            "Someone call the banana wholesalers! 📦🍌",

            "Your journey has officially gone BANANAS! 🤯🍌",

            "That's a whole banana army! 🪖🍌",

            "Forget kilometres. Bananas are the superior unit! 😎🍌",

            "Your potassium levels are about to be legendary! 💪🍌",

            "A monkey CEO would approve this journey! 🐒👑",

            "That's enough bananas to feed a village of monkeys! 🐒🍌",

            "This trip is peeling away from normal measurements! 😂🍌",

            "Banana calculator says: TOO MANY! 🚨🍌",

            "You didn't travel kilometres. You travelled bunches! 🍌😂",

            "At this point, you ARE the banana distributor! 🍌👑",

            "The monkeys are already planning a celebration! 🐒🎉",

            "This journey needs a banana truck! 🚛🍌",

            "That's potassium-powered travelling! ⚡🍌"

        ];


        /* =====================================================
           ERROR
        ====================================================== */

        function showError(message) {

            errorMessage.textContent =
                message;


            errorMessage.style.display =
                "block";

        }


        function hideError() {

            errorMessage.textContent =
                "";


            errorMessage.style.display =
                "none";

        }


        /* =====================================================
           UPDATE BANANA PRICE
        ====================================================== */

        function updatePrice() {

            const bananaKey =
                bananaSelect.value;


            if (!bananaKey) {

                priceDisplay.textContent =
                    "Select a banana 🍌";

                return;

            }


            const banana =
                bananaTypes[
                    bananaKey
                ];


            priceDisplay.textContent =
                `₹ ${banana.pricePerDozen} / dozen`;

        }


        /* =====================================================
           TIMEOUT FETCH
        ====================================================== */

        async function fetchWithTimeout(
            url,
            timeout = 10000
        ) {

            const controller =
                new AbortController();


            const timer =
                setTimeout(
                    function () {

                        controller.abort();

                    },
                    timeout
                );


            try {

                return await fetch(
                    url,
                    {
                        signal:
                            controller.signal
                    }
                );

            }

            finally {

                clearTimeout(
                    timer
                );

            }

        }


        /* =====================================================
           PHOTON SEARCH
        ====================================================== */

        async function searchPhoton(
            district,
            preference
        ) {


            const center =
                districtCenters[
                    district
                ];


            const preferenceWord =
                preferenceWords[
                    preference
                ] || "";


            const queryParts = [

                preferenceWord,

                district,

                "Kerala",

                "India"

            ].filter(Boolean);


            const query =
                queryParts.join(
                    ", "
                );


            const params =
                new URLSearchParams();


            params.set(
                "q",
                query
            );


            params.set(
                "limit",
                "25"
            );


            params.set(
                "lang",
                "en"
            );


            /*
             Kerala bounding box:
             minLon,minLat,maxLon,maxLat
            */

            params.set(
                "bbox",
                "74.8,8.1,77.6,12.9"
            );


            /*
             Bias toward selected district.
            */

            if (center) {

                params.set(
                    "lon",
                    String(
                        center.lon
                    )
                );


                params.set(
                    "lat",
                    String(
                        center.lat
                    )
                );


                params.set(
                    "zoom",
                    "11"
                );

            }


            const url =
                "https://photon.komoot.io/api/?" +
                params.toString();


            const response =
                await fetchWithTimeout(
                    url
                );


            if (!response.ok) {

                throw new Error(
                    "Photon request failed"
                );

            }


            const data =
                await response.json();


            return Array.isArray(
                data.features
            )
                ? data.features
                : [];

        }


        /* =====================================================
           CONVERT PHOTON RESULT
        ====================================================== */

        function convertFeature(
            feature,
            district
        ) {

            if (
                !feature ||
                !feature.geometry ||
                !Array.isArray(
                    feature.geometry.coordinates
                )
            ) {

                return null;

            }


            const coordinates =
                feature.geometry.coordinates;


            if (
                coordinates.length < 2
            ) {

                return null;

            }


            const lon =
                Number(
                    coordinates[0]
                );


            const lat =
                Number(
                    coordinates[1]
                );


            if (
                !Number.isFinite(lat) ||
                !Number.isFinite(lon)
            ) {

                return null;

            }


            const properties =
                feature.properties ||
                {};


            const name =
                properties.name ||
                properties.street ||
                properties.locality ||
                "Unnamed place";


            const addressParts = [

                properties.locality,

                properties.district,

                properties.city,

                properties.county,

                properties.state

            ]
                .filter(Boolean)
                .filter(
                    function (
                        value,
                        index,
                        array
                    ) {

                        return (
                            array.indexOf(
                                value
                            ) === index
                        );

                    }
                );


            return {

                name:
                    name,

                lat:
                    lat,

                lon:
                    lon,

                address:
                    addressParts.join(
                        ", "
                    ),

                district:
                    district

            };

        }


        /* =====================================================
           DUPLICATE REMOVAL
        ====================================================== */

        function removeDuplicates(
            locations
        ) {

            const seen =
                new Set();


            return locations.filter(
                function (location) {

                    const key =
                        location.name
                            .toLowerCase()
                            .trim();


                    if (
                        seen.has(key)
                    ) {

                        return false;

                    }


                    seen.add(key);

                    return true;

                }
            );

        }


        /* =====================================================
           SCORE RESULTS
        ====================================================== */

        function scoreLocation(
            location,
            district,
            preference
        ) {

            let score =
                0;


            const text =
                (
                    location.name +
                    " " +
                    location.address
                ).toLowerCase();


            if (
                text.includes(
                    district.toLowerCase()
                )
            ) {

                score +=
                    10;

            }


            const word =
                preferenceWords[
                    preference
                ];


            if (
                word
            ) {

                word
                    .toLowerCase()
                    .split(" ")
                    .forEach(
                        function (item) {

                            if (
                                text.includes(
                                    item
                                )
                            ) {

                                score +=
                                    5;

                            }

                        }
                    );

            }


            return score;

        }


        /* =====================================================
           GET FALLBACK LOCATIONS
        ====================================================== */

        function getFallbackLocations(
            district,
            preference
        ) {

            let locations =
                (
                    fallbackLocations[
                        district
                    ] || []
                ).map(
                    function (location) {

                        return {
                            ...location,
                            district:
                                district
                        };

                    }
                );


            const word =
                preferenceWords[
                    preference
                ];


            if (
                word
            ) {

                const filtered =
                    locations.filter(
                        function (
                            location
                        ) {

                            return (
                                location.name
                                    .toLowerCase()
                                    .includes(
                                        word.toLowerCase()
                                    )
                            );

                        }
                    );


                if (
                    filtered.length
                ) {

                    locations =
                        filtered;

                }

            }


            return locations;

        }


        /* =====================================================
           LOAD DESTINATION PLACES
        ====================================================== */

        async function loadToPlaces() {

            const district =
                toDistrict.value;


            const preference =
                toPreference.value;


            selectedToLocation =
                null;


            toLocations =
                [];


            toPlace.innerHTML = `

                <option
                    value=""
                    selected
                >
                    🔎 Finding places...
                </option>

            `;


            toPlace.disabled =
                true;


            toApiStatus.textContent =
                "🔎 Searching OpenStreetMap...";


            if (!district) {

                toPlace.innerHTML = `

                    <option
                        value=""
                    >
                        Select district first
                    </option>

                `;


                toApiStatus.textContent =
                    "";


                return;

            }


            try {

                let locations =
                    await searchPhoton(
                        district,
                        preference
                    );


                locations =
                    locations
                        .map(
                            function (
                                feature
                            ) {

                                return convertFeature(
                                    feature,
                                    district
                                );

                            }
                        )
                        .filter(Boolean);


                locations =
                    removeDuplicates(
                        locations
                    );


                locations.sort(
                    function (
                        a,
                        b
                    ) {

                        return (
                            scoreLocation(
                                b,
                                district,
                                preference
                            )
                            -
                            scoreLocation(
                                a,
                                district,
                                preference
                            )
                        );

                    }
                );


                /*
                 If API does not give results,
                 use saved fallback places.
                */

                if (
                    locations.length === 0
                ) {

                    locations =
                        getFallbackLocations(
                            district,
                            preference
                        );


                    toApiStatus.textContent =
                        "📋 Showing saved places";

                }

                else {

                    toApiStatus.textContent =
                        `🌍 ${Math.min(
                            locations.length,
                            15
                        )} places found from OpenStreetMap`;

                }


                toLocations =
                    locations.slice(
                        0,
                        15
                    );


                populateToDropdown();

            }

            catch (error) {

                console.warn(
                    "Photon failed:",
                    error
                );


                const fallback =
                    getFallbackLocations(
                        district,
                        preference
                    );


                toLocations =
                    fallback.slice(
                        0,
                        15
                    );


                populateToDropdown();


                if (
                    toLocations.length
                ) {

                    toApiStatus.textContent =
                        "📋 API unavailable — saved places shown";

                }

                else {

                    toApiStatus.textContent =
                        "❌ No places available";

                }

            }

        }


        /* =====================================================
           POPULATE TO DROPDOWN
        ====================================================== */

        function populateToDropdown() {

            toPlace.innerHTML = `

                <option
                    value=""
                    selected
                    disabled
                >
                    Select a famous place
                </option>

            `;


            if (
                toLocations.length === 0
            ) {

                toPlace.disabled =
                    true;

                return;

            }


            toLocations.forEach(
                function (
                    location,
                    index
                ) {

                    const option =
                        document.createElement(
                            "option"
                        );


                    option.value =
                        String(
                            index
                        );


                    option.textContent =
                        location.name;


                    toPlace.appendChild(
                        option
                    );

                }
            );


            toPlace.disabled =
                false;

        }


        /* =====================================================
           FROM DISTRICT CHANGE
        ====================================================== */

        fromDistrict.addEventListener(
            "change",
            function () {

                const district =
                    fromDistrict.value;


                const centre =
                    districtCenters[
                        district
                    ];


                if (
                    centre
                ) {

                    selectedFromLocation = {

                        name:
                            `${district} District Centre`,

                        lat:
                            centre.lat,

                        lon:
                            centre.lon,

                        district:
                            district

                    };

                }

                else {

                    selectedFromLocation =
                        null;

                }


                hideError();

            }
        );


        /* =====================================================
           TO DISTRICT CHANGE
        ====================================================== */

        toDistrict.addEventListener(
            "change",
            async function () {

                hideError();

                await loadToPlaces();

            }
        );


        /* =====================================================
           TO PREFERENCE CHANGE
        ====================================================== */

        toPreference.addEventListener(
            "change",
            async function () {

                hideError();


                if (
                    toDistrict.value
                ) {

                    await loadToPlaces();

                }

            }
        );


        /* =====================================================
           TO PLACE CHANGE
        ====================================================== */

        toPlace.addEventListener(
            "change",
            function () {

                const index =
                    Number(
                        toPlace.value
                    );


                if (
                    Number.isInteger(index) &&
                    toLocations[index]
                ) {

                    selectedToLocation =
                        toLocations[index];

                }

                else {

                    selectedToLocation =
                        null;

                }


                hideError();

            }
        );


        /* =====================================================
           BANANA CHANGE
        ====================================================== */

        bananaSelect.addEventListener(
            "change",
            function () {

                updatePrice();

                hideError();

            }
        );


        /* =====================================================
           HAVERSINE DISTANCE
        ====================================================== */

        function haversineDistance(
            point1,
            point2
        ) {

            const R =
                6371;


            const lat1 =
                point1.lat *
                Math.PI /
                180;


            const lat2 =
                point2.lat *
                Math.PI /
                180;


            const dLat =
                (
                    point2.lat -
                    point1.lat
                ) *
                Math.PI /
                180;


            const dLon =
                (
                    point2.lon -
                    point1.lon
                ) *
                Math.PI /
                180;


            const a =
                Math.sin(
                    dLat / 2
                ) ** 2
                +
                Math.cos(lat1) *
                Math.cos(lat2) *
                Math.sin(
                    dLon / 2
                ) ** 2;


            const c =
                2 *
                Math.atan2(
                    Math.sqrt(a),
                    Math.sqrt(
                        1 - a
                    )
                );


            return (
                R *
                c
            );

        }


        /* =====================================================
           OSRM ROAD DISTANCE
        ====================================================== */

        async function getRoadDistance(
            from,
            to
        ) {

            const coordinates =

                `${from.lon},${from.lat};` +
                `${to.lon},${to.lat}`;


            const url =

                "https://router.project-osrm.org/" +
                "route/v1/driving/" +
                coordinates +
                "?overview=false";


            const response =
                await fetchWithTimeout(
                    url,
                    10000
                );


            if (
                !response.ok
            ) {

                throw new Error(
                    "OSRM request failed"
                );

            }


            const data =
                await response.json();


            if (
                data.code !== "Ok" ||
                !data.routes ||
                data.routes.length === 0
            ) {

                throw new Error(
                    "No route found"
                );

            }


            /*
             OSRM returns distance in metres.
             */

            return (
                data.routes[0].distance /
                1000
            );

        }


        /* =====================================================
           CALCULATE
        ====================================================== */

        calculateBtn.addEventListener(
            "click",
            async function () {


                /* ---------------------------------------------
                   BANANA CHECK
                ---------------------------------------------- */

                const bananaKey =
                    bananaSelect.value;


                if (!bananaKey) {

                    showError(
                        "🍌 Pazham pinne aar edukkum?Edukkadoo pazhammmmm! 😂"
                    );

                    return;

                }


                /* ---------------------------------------------
                   FROM DISTRICT CHECK
                ---------------------------------------------- */

                if (
                    !fromDistrict.value
                ) {

                    showError(
                        "📍 Evidennaaaa povane pazhame... 🍌"
                    );

                    return;

                }


                /* ---------------------------------------------
                   TO DISTRICT CHECK
                ---------------------------------------------- */

                if (
                    !toDistrict.value
                ) {

                    showError(
                        "🎯Evidekkaaano aaveeeeee 🍌"
                    );

                    return;

                }


                /* ---------------------------------------------
                   FROM LOCATION
                ---------------------------------------------- */

                selectedFromLocation = {

                    name:
                        `${fromDistrict.value} District Centre`,

                    lat:
                        districtCenters[
                            fromDistrict.value
                        ].lat,

                    lon:
                        districtCenters[
                            fromDistrict.value
                        ].lon,

                    district:
                        fromDistrict.value

                };


                /* ---------------------------------------------
                   TO LOCATION CHECK
                ---------------------------------------------- */

                if (
                    !selectedToLocation
                ) {

                    showError(
                        "🎯 Please select a destination place! 🍌"
                    );

                    return;

                }


                /* ---------------------------------------------
                   GET BANANA
                ---------------------------------------------- */

                const banana =
                    bananaTypes[
                        bananaKey
                    ];


                /* ---------------------------------------------
                   LOADING
                ---------------------------------------------- */

                calculateBtn.disabled =
                    true;


                calculateBtn.innerHTML = `

                    🍌

                    CALCULATING...

                    🍌

                `;


                try {

                    let distanceKm;


                    /* -----------------------------------------
                       TRY OSRM
                    ------------------------------------------ */

                    try {

                        distanceKm =
                            await getRoadDistance(

                                selectedFromLocation,

                                selectedToLocation

                            );

                    }

                    catch (error) {

                        console.warn(
                            "OSRM failed. Using straight-line fallback.",
                            error
                        );


                        distanceKm =
                            haversineDistance(

                                selectedFromLocation,

                                selectedToLocation

                            );

                    }


                    distanceKm =
                        Number(
                            distanceKm.toFixed(
                                1
                            )
                        );


                    /* -----------------------------------------
                       BANANA COUNT
                    ------------------------------------------ */

                    const distanceCm =
                        distanceKm *
                        100000;


                    const bananaCount =
                        distanceKm === 0

                            ? 0

                            : Math.max(

                                1,

                                Math.round(
                                    distanceCm /
                                    banana.sizeCm
                                )

                            );


                    /* -----------------------------------------
                       PRICE
                    ------------------------------------------ */

                    const pricePerBanana =
                        banana.pricePerDozen /
                        12;


                    const totalPrice =
                        bananaCount *
                        pricePerBanana;


                    /* -----------------------------------------
                       OUTPUT ROUTE
                    ------------------------------------------ */

                    routeDisplay.textContent =
                        `${fromDistrict.value} → ${toDistrict.value}`;


                    /* -----------------------------------------
                       OUTPUT PLACE NAMES
                    ------------------------------------------ */

                    resultFrom.textContent =
                        selectedFromLocation.name;


                    resultTo.textContent =
                        selectedToLocation.name;


                    /* -----------------------------------------
                       OUTPUT DISTANCE
                    ------------------------------------------ */

                    distanceDisplay.textContent =
                        `${distanceKm} km`;


                    /* -----------------------------------------
                       OUTPUT BANANA COUNT
                    ------------------------------------------ */

                    bananaCountDisplay.textContent =
                        bananaCount.toLocaleString(
                            "en-IN"
                        );


                    /* -----------------------------------------
                       OUTPUT BANANA TYPE
                    ------------------------------------------ */

                    bananaTypeDisplay.textContent =
                        banana.name;


                    /* -----------------------------------------
                       OUTPUT PRICE
                    ------------------------------------------ */

                    totalPriceDisplay.textContent =
                        `₹${totalPrice.toLocaleString(
                            "en-IN",
                            {
                                maximumFractionDigits:
                                    0
                            }
                        )}`;


                    /* -----------------------------------------
                       FUNNY MESSAGE
                    ------------------------------------------ */

                    if (
                        distanceKm === 0
                    ) {

                        funnyMessage.textContent =
                            "😂 Same place! Not even one banana needed! 🍌";

                    }

                    else if (
                        fromDistrict.value ===
                        toDistrict.value
                    ) {

                        funnyMessage.textContent =
                            "Same district, different spot! Mini banana adventure! 🍌😂";

                    }

                    else {

                        const randomIndex =
                            Math.floor(
                                Math.random() *
                                funnyMessages.length
                            );


                        funnyMessage.textContent =
                            funnyMessages[
                                randomIndex
                            ];

                    }


                    /* -----------------------------------------
                       SHOW OUTPUT
                    ------------------------------------------ */

                    hideError();


                    inputPage.style.display =
                        "none";


                    outputPage.style.display =
                        "block";


                    outputPage.style.animation =
                        "none";


                    void outputPage.offsetWidth;


                    outputPage.style.animation =
                        "outputAppear 0.5s ease";


                    window.scrollTo({

                        top:
                            0,

                        behavior:
                            "smooth"

                    });

                }

                catch (error) {

                    console.error(
                        error
                    );


                    showError(
                        "❌ Couldn't calculate this route. Please try again! 🍌"
                    );

                }

                finally {

                    calculateBtn.disabled =
                        false;


                    calculateBtn.innerHTML = `

                        <span>🍌</span>

                        CALCULATE BANANAS

                        <span>🍌</span>

                    `;

                }

            }
        );


        /* =====================================================
           SWAP JOURNEY
        ====================================================== */

        swapBtn.addEventListener(
            "click",
            async function () {


                const oldFrom =
                    fromDistrict.value;


                const oldTo =
                    toDistrict.value;


                const oldPreference =
                    toPreference.value;


                const oldToLocation =
                    selectedToLocation;


                /*
                 Swap district.
                */

                fromDistrict.value =
                    oldTo;


                toDistrict.value =
                    oldFrom;


                /*
                 FROM gets the new district centre.
                */

                if (
                    fromDistrict.value &&
                    districtCenters[
                        fromDistrict.value
                    ]
                ) {

                    selectedFromLocation = {

                        name:
                            `${fromDistrict.value} District Centre`,

                        lat:
                            districtCenters[
                                fromDistrict.value
                            ].lat,

                        lon:
                            districtCenters[
                                fromDistrict.value
                            ].lon,

                        district:
                            fromDistrict.value

                    };

                }

                else {

                    selectedFromLocation =
                        null;

                }


                /*
                 Save old destination before
                 loading the new destination.
                */

                selectedToLocation =
                    null;


                toPlace.innerHTML = `

                    <option
                        value=""
                    >
                        🔎 Finding places...
                    </option>

                `;


                toPlace.disabled =
                    true;


                /*
                 Keep preference if possible.
                */

                toPreference.value =
                    oldPreference;


                await loadToPlaces();


                hideError();

            }
        );


        /* =====================================================
           BACK BUTTON
        ====================================================== */

        backBtn.addEventListener(
            "click",
            function () {

                outputPage.style.display =
                    "none";


                inputPage.style.display =
                    "block";


                hideError();


                window.scrollTo({

                    top:
                        0,

                    behavior:
                        "smooth"

                });

            }
        );


        /* =====================================================
           ENTER KEY
        ====================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" &&
                    inputPage.style.display !== "none"
                ) {

                    calculateBtn.click();

                }

            }
        );


        /* =====================================================
           INITIAL STATE
        ====================================================== */

        fromDistrict.value =
            "";


        toDistrict.value =
            "";


        toPlace.innerHTML = `

            <option value="">
                Select district first
            </option>

        `;


        toPlace.disabled =
            true;


        updatePrice();


    }
);