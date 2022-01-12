var search = document.querySelector("#search")
var inputSearch = document.querySelector("#inputSearch")
var sButton = document.querySelector("#submitButton")
var currentGeo;
var currentCity;
var geo;
var headerL;
getGeoLocation()

function getCurrentCity() {


    if (currentCity != null) {
        console.log('i have city-' + currentCity + 'with GEO ' + geo.latitude + ',' + geo.longitude)

        const propertyNames = Object.keys(geo);
        console.log(propertyNames);
        let localGeo = propertyNames.toString();

        headerL = {
            "client": "PERS_103",
            "x-api-key": "0hUVmKVwTG63JE1aEUUht6QGZ41W9noO63yBEMIA",
            "authorization": "Basic UEVSU18xMDNfWFg6aENhaUFTY3pUVDd5",
            "territory": "XX",
            "api-version": "v200",
            "geolocation": '-38.09,145.28',
            "device-datetime": moment().format()


            //limited call -75

            //   "client":"PERS_103",
            //   "x-api-key":"Ub09KvJlIF9GWy4qcltVZ4wM7KqV9hul3HFOleim",
            //   "authorization":"Basic UEVSU18xMDM6OEIxVWJudGJsOHhM",
            //   "territory":"AU",
            //    "api-version":"v200",
            //    "geolocation":'-38.09,145.28',
            //    "device-datetime":moment().format()  

        }

        apiCall('Raiders of the Lost Ark')

    } else {
        console.log('i need to wait')
        setTimeout(getCurrentCity, 300); // try again in 300 milliseconds
    }
}

getCurrentCity();

function getGeoLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            geo = position.coords
            geoToAddress(position.coords.latitude, position.coords.longitude)

        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function geoToAddress(lat, lon) {

    var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&key=AIzaSyBi2s5puIfi0U5S0NRdR4NiprHdtQf2JFA'
    const fetchme = fetch(url)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    if (data != null) {

                        for (var i = 0; i < data.results[0].address_components.length; i++) {
                            for (var b = 0; b < data.results[0].address_components[i].types.length; b++) {

                                if (data.results[0].address_components[i].types[b] == "locality") {
                                    //this is the object you are looking for 
                                    city = data.results[0].address_components[i];

                                    break;
                                }

                            }
                        }

                        currentCity = city.long_name

                    }
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to google API');
        });


}

//this function is to fet feo codes from address
function addressToGeoCode(city) {
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + city + '&key=AIzaSyBi2s5puIfi0U5S0NRdR4NiprHdtQf2JFA'
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    if (data != null) {

                        geo = data.results[0].geometry.location




                    }
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to google API');
        });

}

//first call to get film id

//https://api-gate2.movieglu.com/filmLiveSearch/?query=Raiders+of+the+Lost+Ark&n=6


//second call to get show time nearby(required film id from previous call)
//https://api-gate2.movieglu.com/filmShowTimes/?film_id=7772&date=2022-01-11&n=10


function apiCall(movieName) {

    axios.get('https://api-gate2.movieglu.com/filmLiveSearch/?query=' + movieName + '&n=10', {
        headers: headerL
    }).then((response) => {

        const { film_id, film_name } = response.data.films[0]
        console.log(response.data)
        console.log(film_id + '-' + film_name)
        // axios.get('https://api-gate2.movieglu.com/filmShowTimes/?film_id='+film_id+'&date='+moment().format("YYYY-MM-DD")+'&n=10',{headers:headerL}).then((response)=>{
        //         console.log(response.data)
        // }).catch()

    })

}

sButton.addEventListener('click', (event) => {

    event.preventDefault()
    apiCall(inputSearch.value.replaceAll(" ", '+'))
})

// About Us

$(document).on('click', '#aboutUs', function (event) {
    event.preventDefault();
    $('#aboutUsContentParent').attr('style', 'display:block');

});

function aboutUsContentCreation() {
    // about US content holder appended just above footer element
    var footer = $('footer')
    var aboutUsContentParent = $('<div>');
    aboutUsContentParent.attr('class', 'ui segment');
    aboutUsContentParent.attr('id', 'aboutUsContentParent');
    aboutUsContentParent.attr('style', 'display:none');

    // aboutUsContent.text("Hello we are here.");

    // Adding Header for About US
    var aboutUsHeader = $('h1');
    aboutUsHeader.attr('class', 'aboutUsContentChild');
    aboutUsHeader.text('Project : Go to your Movie');
    aboutUsContentParent.append(aboutUsHeader);


    // Adding project member profile image
    var aboutUsGroupImage = $('<img>');
    aboutUsGroupImage.attr('class', 'aboutUsContentChild');
    aboutUsGroupImage.attr('src', './assets/Images/AlanCherian.png');
    aboutUsGroupImage.attr('style', 'width:30px; height:30px; border-radius: 50%;');
    aboutUsGroupImage.attr('alt','Alan Cherian : Developer');
    aboutUsContentParent.append(aboutUsGroupImage);

    // Adding project member in apphabetical order
    var aboutUsGroup = $('<h4>');
    aboutUsGroup.attr('class', 'aboutUsContentChild');
    aboutUsGroup.text('Alan Cherian : Developer');
    aboutUsContentParent.append(aboutUsGroup);

    // Adding project member profile image
    var aboutUsGroupImage = $('<img>');
    aboutUsGroupImage.attr('class', 'aboutUsContentChild');
    aboutUsGroupImage.attr('src', './assets/Images/ErinHatherell.png');
    aboutUsGroupImage.attr('style', 'width:30px; height:30px; border-radius: 50%;');
    aboutUsGroupImage.attr('alt', 'Hatherell : Developer');
    aboutUsContentParent.append(aboutUsGroupImage);

    // Adding project member in apphabetical order
    var aboutUsGroup = $('<h4>');
    aboutUsGroup.attr('class', 'aboutUsContentChild');
    aboutUsGroup.text('Erin Hatherell : Developer');
    aboutUsContentParent.append(aboutUsGroup);

    // Adding project member profile image
    var aboutUsGroupImage = $('<img>');
    aboutUsGroupImage.attr('class', 'aboutUsContentChild');
    aboutUsGroupImage.attr('src', './assets/Images/MohammedMazahim.png');
    aboutUsGroupImage.attr('style', 'width:30px; height:30px; border-radius: 50%;');
    aboutUsGroupImage.attr('alt', 'Mohammed Mazahim : Developer');
    aboutUsContentParent.append(aboutUsGroupImage);

    // Adding project member in apphabetical order
    var aboutUsGroup = $('<h4>');
    aboutUsGroup.attr('class', 'aboutUsContentChild');
    aboutUsGroup.text('Mohammed Mazahim : Developer');
    aboutUsContentParent.append(aboutUsGroup);

    // Adding project member profile image
    var aboutUsGroupImage = $('<img>');
    aboutUsGroupImage.attr('class', 'aboutUsContentChild');
    aboutUsGroupImage.attr('src', './assets/Images/SanjeevKumar.png');
    aboutUsGroupImage.attr('style', 'width:30px; height:30px; border-radius: 50%;');
    aboutUsGroupImage.attr('alt', 'Sanjeev Kumar : Developer');
    aboutUsContentParent.append(aboutUsGroupImage);

    // Adding project member in apphabetical order
    var aboutUsGroup = $('<h4>');
    aboutUsGroup.attr('class', 'aboutUsContentChild');
    aboutUsGroup.text('Sanjeev Kumar : Developer');
    aboutUsContentParent.append(aboutUsGroup);

    // Adding project member in apphabetical order
    var aboutUsWork = $('<h3>');
    aboutUsWork.attr('class', 'aboutUsContentChild');
    aboutUsWork.text('Work');
    aboutUsContentParent.append(aboutUsWork);

    // Adding project project description
    var aboutUsProjectDesc = $('<p>');
    aboutUsProjectDesc.attr('class', 'aboutUsContentChild');
    aboutUsProjectDesc.text('We are group of four developers collaborating on project "Go to your Movies". We intend to make end user life simple by providing a web application which takes minimum input and help him/her go its favourite movie to its nearest choice of theatre.');
    aboutUsContentParent.append(aboutUsProjectDesc);

    // Adding project project appliaction URL and Repository URL 
    var aboutUsProjectRepositoryURL = $('<a>');
    aboutUsProjectRepositoryURL.attr('class', 'aboutUsContentChild');
    aboutUsProjectRepositoryURL.attr('href', 'https://github.com/Black-Mandarin/Go-to-your-Movie');
    aboutUsProjectRepositoryURL.text('Repository URL');
    aboutUsContentParent.append(aboutUsProjectRepositoryURL);

    footer.before(aboutUsContentParent);
};


// Create time scheduler on the fly at when initial page load finished. 
$(document).ready(function (event) {
    aboutUsContentCreation();
});