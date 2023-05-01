(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    class DynamicAdapt {
        constructor(type) {
            this.type = type;
        }
        init() {
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = [ ...document.querySelectorAll("[data-da]") ];
            this.nodes.forEach((node => {
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }));
            this.arraySort(this.оbjects);
            this.mediaQueries = this.оbjects.map((({breakpoint}) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)).filter(((item, index, self) => self.indexOf(item) === index));
            this.mediaQueries.forEach((media => {
                const mediaSplit = media.split(",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = this.оbjects.filter((({breakpoint}) => breakpoint === mediaBreakpoint));
                matchMedia.addEventListener("change", (() => {
                    this.mediaHandler(matchMedia, оbjectsFilter);
                }));
                this.mediaHandler(matchMedia, оbjectsFilter);
            }));
        }
        mediaHandler(matchMedia, оbjects) {
            if (matchMedia.matches) оbjects.forEach((оbject => {
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            })); else оbjects.forEach((({parent, element, index}) => {
                if (element.classList.contains(this.daClassname)) this.moveBack(parent, element, index);
            }));
        }
        moveTo(place, element, destination) {
            element.classList.add(this.daClassname);
            if (place === "last" || place >= destination.children.length) {
                destination.append(element);
                return;
            }
            if (place === "first") {
                destination.prepend(element);
                return;
            }
            destination.children[place].before(element);
        }
        moveBack(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (parent.children[index] !== void 0) parent.children[index].before(element); else parent.append(element);
        }
        indexInParent(parent, element) {
            return [ ...parent.children ].indexOf(element);
        }
        arraySort(arr) {
            if (this.type === "min") arr.sort(((a, b) => {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if (a.place === "first" || b.place === "last") return -1;
                    if (a.place === "last" || b.place === "first") return 1;
                    return 0;
                }
                return a.breakpoint - b.breakpoint;
            })); else {
                arr.sort(((a, b) => {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if (a.place === "first" || b.place === "last") return 1;
                        if (a.place === "last" || b.place === "first") return -1;
                        return 0;
                    }
                    return b.breakpoint - a.breakpoint;
                }));
                return;
            }
        }
    }
    const da = new DynamicAdapt("max");
    da.init();
    const currentUrl = "https://ipapi.co/json";
    const position = document.getElementById("position");
    async function getPosition() {
        const response = await fetch(currentUrl);
        const data = await response.json();
        data["regionName"];
        const cityName = data["city"];
        position.innerText = cityName;
        console.log(cityName);
    }
    getPosition();
    const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=49.80&longitude=24.78&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,weathercode,cloudcover_low,cloudcover_mid,cloudcover_high&models=best_match&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,precipitation_hours,precipitation_probability_max&current_weather=true&timezone=auto";
    const currentWheatherinHtml = document.getElementById("current_wheather");
    const htmlCurrentTemp = document.getElementById("current_temp");
    const currentWheatherImageinHtml = document.getElementById("image_wheather");
    const htmlwindspeed = document.getElementById("wind");
    const htmlhum = document.getElementById("hum");
    const htmlrain = document.getElementById("rain");
    const htmlNumberDate = document.getElementById("number-date");
    const htmlMonthDate = document.getElementById("month-date");
    const htmlDayDate = document.getElementById("day-date");
    const htmlTimeDate = document.getElementById("time-date");
    async function getWeather() {
        const response = await fetch(apiUrl);
        const getData = await response.json();
        const currentWheather = getData["current_weather"]["weathercode"];
        const windspeed = getData["current_weather"]["windspeed"];
        htmlwindspeed.innerText = windspeed;
        const CurrentTemp = getData["current_weather"]["temperature"];
        htmlCurrentTemp.innerText = CurrentTemp;
        const precipitationProbability = getData["hourly"]["precipitation_probability"];
        let newPrecipitationProbability = [];
        for (let i = 0; i <= 24; i++) newPrecipitationProbability.push(precipitationProbability[i]);
        let sumPrecipitationProbability = 0;
        let averagePrecipitationProbability = 0;
        for (let j = 0; j < newPrecipitationProbability.length; j++) sumPrecipitationProbability += newPrecipitationProbability[j];
        averagePrecipitationProbability = sumPrecipitationProbability / newPrecipitationProbability.length;
        let precipitationProbabilityString = "-";
        if (averagePrecipitationProbability !== void 0 && !isNaN(averagePrecipitationProbability)) precipitationProbabilityString = averagePrecipitationProbability + "%";
        console.log(precipitationProbabilityString);
        htmlrain.innerText = precipitationProbabilityString;
        console.log(averagePrecipitationProbability);
        const humProbability = getData["hourly"]["relativehumidity_2m"];
        let newRelativehumidity = [];
        for (let i = 0; i <= 24; i++) newRelativehumidity.push(humProbability[i]);
        let sumRelativehumidity = 0;
        let aveRelativehumidity = 0;
        for (let j = 0; j < newRelativehumidity.length; j++) sumRelativehumidity += newRelativehumidity[j];
        aveRelativehumidity = sumRelativehumidity / newRelativehumidity.length;
        console.log(aveRelativehumidity);
        let humProbabilityString = "-";
        if (aveRelativehumidity !== void 0 && !isNaN(aveRelativehumidity)) humProbabilityString = aveRelativehumidity + "%";
        htmlhum.innerText = humProbabilityString;
        const currentDate = getData["current_weather"]["time"];
        const dateObj = new Date(currentDate);
        const daysOfWeek = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
        const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        const dayOfWeek = daysOfWeek[dateObj.getDay()];
        const month = monthNames[dateObj.getMonth()];
        const dayOfMonth = dateObj.getDate();
        const now = new Date;
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, "0");
        console.log(hours);
        htmlNumberDate.innerText = dayOfMonth;
        htmlMonthDate.innerText = month;
        htmlDayDate.innerText = dayOfWeek;
        htmlTimeDate.innerText = `${hours}:${minutes}`;
        console.log(currentWheather);
        let weather_description = "";
        let weather_image = "";
        if (currentWheather === 0 || currentWheather === 1) {
            weather_description = "Clear sky";
            weather_image = "img/image/Sun.svg";
        } else if (currentWheather === 2) {
            if (hours >= 6 && hours < 21) {
                weather_description = "Partly cloudy";
                weather_image = "img/image/sun small-clouds.svg";
            }
            if (hours === 21 || hours === 22 || hours === 23 || hours === 24 || hours === 0 || hours === 1 || hours === 2 || hours === 3 || hours === 4 || hours === 5) {
                weather_description = "Moon cloudy";
                weather_image = "img/image/halfmoonclouds.svg";
            }
        } else if (currentWheather >= 3 && currentWheather <= 44) {
            weather_description = "Overcast";
            weather_image = "img/image/sun clouds.svg";
        } else if (currentWheather >= 45 && currentWheather <= 48) {
            weather_description = "Fog";
            weather_image = "img/image/Fog.png";
        } else if (currentWheather > 48 && currentWheather <= 55) {
            weather_description = "Drizzle: Light, moderate, and dense intensity";
            weather_image = "img/image/sun rain.svg";
        } else if (currentWheather > 55 && currentWheather <= 66) {
            weather_description = "Rain";
            weather_image = "img/image/rain.svg";
        } else {
            weather_description = "Thunder";
            weather_image = "img/image/Thunder.svg";
        }
        currentWheatherinHtml.innerText = weather_description;
        currentWheatherImageinHtml.setAttribute("src", weather_image);
        console.log(weather_description);
        const htmlSecondDay = document.getElementById("day2");
        const secondDay = getData["daily"]["time"][1];
        const getSecondDay = new Date(secondDay);
        const seconddayOfWeek = daysOfWeek[getSecondDay.getDay()];
        htmlSecondDay.innerText = seconddayOfWeek;
        const htmlSecondTemp = document.getElementById("temp2");
        const secondTemp = getData["daily"]["temperature_2m_max"][1];
        htmlSecondTemp.innerText = secondTemp;
        const htmlSecondImage = document.getElementById("image2");
        const secondImage = getData["daily"]["weathercode"][1];
        let weather_imageSecond = "";
        if (secondImage === 0 || secondImage === 1) weather_imageSecond = "img/image/Sun.svg"; else if (secondImage === 2) weather_imageSecond = "img/image/sun small-clouds.svg"; else if (secondImage >= 3 && secondImage <= 44) weather_imageSecond = "img/image/sun clouds.svg"; else if (secondImage >= 45 && secondImage <= 48) weather_imageSecond = "img/image/Fog.png"; else if (secondImage > 48 && secondImage <= 55) weather_imageSecond = "img/image/sun rain.svg"; else if (secondImage > 55 && secondImage <= 66) weather_imageSecond = "img/image/rain.svg"; else weather_imageSecond = "img/image/Thunder.svg";
        htmlSecondImage.setAttribute("src", weather_imageSecond);
        const htmlThirdDay = document.getElementById("day3");
        const thirdDay = getData["daily"]["time"][2];
        const getThirdDay = new Date(thirdDay);
        const ThirddayOfWeek = daysOfWeek[getThirdDay.getDay()];
        htmlThirdDay.innerText = ThirddayOfWeek;
        const htmlThirdTemp = document.getElementById("temp3");
        const thirdTemp = getData["daily"]["temperature_2m_max"][2];
        htmlThirdTemp.innerText = thirdTemp;
        const htmlThirdImage = document.getElementById("image3");
        const thirdImage = getData["daily"]["weathercode"][2];
        let weather_imageThird = "";
        if (thirdImage === 0 || thirdImage === 1) weather_imageThird = "img/image/Sun.svg"; else if (thirdImage === 2) weather_imageThird = "img/image/sun small-clouds.svg"; else if (thirdImage >= 3 && thirdImage <= 44) weather_imageThird = "img/image/sun clouds.svg"; else if (thirdImage >= 45 && thirdImage <= 48) weather_imageThird = "img/image/Fog.png"; else if (thirdImage > 48 && thirdImage <= 55) weather_imageThird = "img/image/sun rain.svg"; else if (thirdImage > 55 && thirdImage <= 66) weather_imageThird = "img/image/rain.svg"; else weather_imageThird = "img/image/Thunder.svg";
        htmlThirdImage.setAttribute("src", weather_imageThird);
        const htmlFourthDay = document.getElementById("day4");
        const fourthDay = getData["daily"]["time"][3];
        const getFourthDay = new Date(fourthDay);
        const FourthdayOfWeek = daysOfWeek[getFourthDay.getDay()];
        htmlFourthDay.innerText = FourthdayOfWeek;
        const htmlFourthTemp = document.getElementById("temp4");
        const fourthTemp = getData["daily"]["temperature_2m_max"][3];
        htmlFourthTemp.innerText = fourthTemp;
        const htmlFourthImage = document.getElementById("image4");
        const fourthImage = getData["daily"]["weathercode"][3];
        let weather_imageFourth = "";
        if (fourthImage === 0 || fourthImage === 1) weather_imageFourth = "img/image/Sun.svg"; else if (fourthImage === 2) weather_imageFourth = "img/image/sun small-clouds.svg"; else if (fourthImage >= 3 && fourthImage <= 44) weather_imageFourth = "img/image/sun clouds.svg"; else if (fourthImage >= 45 && fourthImage <= 48) weather_imageFourth = "img/image/Fog.png"; else if (fourthImage > 48 && fourthImage <= 55) weather_imageFourth = "img/image/sun rain.svg"; else if (fourthImage > 55 && fourthImage <= 66) weather_imageFourth = "img/image/rain.svg"; else weather_imageFourth = "img/image/Thunder.svg";
        htmlFourthImage.setAttribute("src", weather_imageFourth);
        const htmlFifthhDay = document.getElementById("day5");
        const fifthDay = getData["daily"]["time"][4];
        const getfifthDay = new Date(fifthDay);
        const FifthdayOfWeek = daysOfWeek[getfifthDay.getDay()];
        htmlFifthhDay.innerText = FifthdayOfWeek;
        console.log(FifthdayOfWeek + " this");
        const htmlFifthTemp = document.getElementById("temp5");
        const fifthTemp = getData["daily"]["temperature_2m_max"][4];
        htmlFifthTemp.innerText = fifthTemp;
        const htmlFifthImage = document.getElementById("image5");
        const fifthImage = getData["daily"]["weathercode"][4];
        let weather_imageFifth = "";
        if (fifthImage === 0 || fifthImage === 1) weather_imageFifth = "img/image/Sun.svg"; else if (fifthImage === 2) weather_imageFifth = "img/image/sun small-clouds.svg"; else if (fifthImage >= 3 && fifthImage <= 44) weather_imageFifth = "img/image/sun clouds.svg"; else if (fifthImage >= 45 && fifthImage <= 48) weather_imageFifth = "img/image/Fog.png"; else if (fifthImage > 48 && fifthImage <= 55) weather_imageFifth = "img/image/sun rain.svg"; else if (fifthImage > 55 && fifthImage <= 66) weather_imageFifth = "img/image/rain.svg"; else weather_imageFifth = "img/image/Thunder.svg";
        htmlFifthImage.setAttribute("src", weather_imageFifth);
        const htmlSixthDay = document.getElementById("day6");
        const sixthDay = getData["daily"]["time"][5];
        const getsixthDay = new Date(sixthDay);
        const SixthdayOfWeek = daysOfWeek[getsixthDay.getDay()];
        htmlSixthDay.innerText = SixthdayOfWeek;
        const htmlSixthTemp = document.getElementById("temp6");
        const sixthTemp = getData["daily"]["temperature_2m_max"][5];
        htmlSixthTemp.innerText = sixthTemp;
        const htmlSixthImage = document.getElementById("image6");
        const sixthImage = getData["daily"]["weathercode"][5];
        let weather_imageSixth = "";
        if (sixthImage === 0 || sixthImage === 1) weather_imageSixth = "img/image/Sun.svg"; else if (sixthImage === 2) weather_imageSixth = "img/image/sun small-clouds.svg"; else if (sixthImage >= 3 && sixthImage <= 44) weather_imageSixth = "img/image/sun clouds.svg"; else if (sixthImage >= 45 && sixthImage <= 48) weather_imageSixth = "img/image/Fog.png"; else if (sixthImage > 48 && sixthImage <= 55) weather_imageSixth = "img/image/sun rain.svg"; else if (sixthImage > 55 && sixthImage <= 66) weather_imageSixth = "img/image/rain.svg"; else weather_imageSixth = "img/image/Thunder.svg";
        htmlSixthImage.setAttribute("src", weather_imageSixth);
        const htmlSeventhDay = document.getElementById("day7");
        const seventhDay = getData["daily"]["time"][6];
        const getseventhDay = new Date(seventhDay);
        const SeventhdayOfWeek = daysOfWeek[getseventhDay.getDay()];
        htmlSeventhDay.innerText = SeventhdayOfWeek;
        const htmlSeventhTemp = document.getElementById("temp7");
        const seventhTemp = getData["daily"]["temperature_2m_max"][6];
        htmlSeventhTemp.innerText = seventhTemp;
        const htmlSeventhImage = document.getElementById("image7");
        const seventhImage = getData["daily"]["weathercode"][6];
        let weather_imageSeventh = "";
        if (seventhImage === 0 || seventhImage === 1) weather_imageSeventh = "img/image/Sun.svg"; else if (seventhImage === 2) weather_imageSeventh = "img/image/sun small-clouds.svg"; else if (seventhImage >= 3 && seventhImage <= 44) weather_imageSeventh = "img/image/sun clouds.svg"; else if (seventhImage >= 45 && seventhImage <= 48) weather_imageSeventh = "img/image/Fog.png"; else if (seventhImage > 48 && seventhImage <= 55) weather_imageSeventh = "img/image/sun rain.svg"; else if (seventhImage > 55 && seventhImage <= 66) weather_imageSeventh = "img/image/rain.svg"; else weather_imageSeventh = "img/image/Thunder.svg";
        htmlSeventhImage.setAttribute("src", weather_imageSeventh);
        console.log(seconddayOfWeek);
    }
    getWeather();
    window["FLS"] = true;
    isWebp();
})();