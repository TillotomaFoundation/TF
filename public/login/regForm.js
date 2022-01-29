const register = document.getElementById("reg-form");

// prevent default form behavior
register.addEventListener("submit", (event) => {
    event.preventDefault();
    const phoneNumber = phoneInput.getNumber();

});

// add country code in contact number
const phoneInputField = document.querySelector("#reg-phone");
const phoneInput = window.intlTelInput(phoneInputField, {
    utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});


// add country code in whatsapp number
const whatsappInputField = document.querySelector("#reg-whatsapp");
const whatsappInput = window.intlTelInput(whatsappInputField, {
    utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});
// submit registration form
function regForm(userType) {
    const name = document.getElementById("reg-name").value;
    const password = document.getElementById("reg-password").value;
    const email = document.getElementById("reg-email").value;
    const phone = phoneInput.getNumber();
    const whatsapp = whatsappInput.getNumber();
    const dob = document.getElementById("reg-dob").value;
    const country = document.getElementById("reg-country").value;
    const nationality = document.getElementById("reg-nationality").value;

    if (userType === "student")
        url = "http://127.0.0.1:5500/public/student.html"
    else if (userType === "faculty")
        url = "http://127.0.0.1:5500/public/faculty.html"
    else if (userType === "admin")
        url = "http://127.0.0.1:5500/public/admin.html"

    if (userType === "student") {
        const occupation = document.getElementById("reg-occupation").value;
        const education = document.getElementById("reg-education").value;
        var data = {
            name,
            email,
            password,
            phone,
            dob,
            country,
            nationality,
            whatsapp,
            userType,
            occupation,
            education,
        };
    }

    else if (userType === "faculty" || userType === "admin") {
        var data = {
            name,
            email,
            password,
            phone,
            dob,
            country,
            nationality,
            whatsapp,
            userType,
        }
        console.log(data)
    }

    axios
        .post("http://127.0.0.1:8000/api/v1/register", data)
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
            document.querySelector(".err-message-reg").innerHTML = "";
            window.location.href = url;
        })
        .catch((error) => {
            console.log(error.message, "error message");
            console.log(error.response, "error data");
            const errorData = error.response;
            if (errorData.status === 409)
                document.querySelector(".err-message-reg").innerHTML =
                    "user already exist";
            else if (errorData.status === 400)
                document.querySelector(".err-message-reg").innerHTML = errorData.data.message;
            else if (errorData.status === 500)
                document.querySelector(".err-message-reg").innerHTML =
                    "enter valid email address";
            else document.querySelector(".err-message-reg").innerHTML = "";
        });
}
