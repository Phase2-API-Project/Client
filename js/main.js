<<<<<<< HEAD


=======
>>>>>>> d8edf11af468eedcd2f8633d7cb728af3b4eb26e
$('document').ready(function () {

    if (localStorage.getItem('token')) {
        isLogin()
    }else {
    $('#REGISTER').hide()
    $('#NAVBAR').hide()
    $('#logout-button').hide()
<<<<<<< HEAD
    $('#MAIN').hide()
    $('#FINDDOCTOR').hide()
    $('#DOCTORS').hide()
=======
    $('#MAINPAGE').hide()
>>>>>>> d8edf11af468eedcd2f8633d7cb728af3b4eb26e
    }

    $('#register-page').click(registerShow)
    $('#login-page').click(loginShow)
    $('#button-login').click(login)
    $('#logout-button').click(logout)
    $('#button-register').click(register)
<<<<<<< HEAD
    $('#finddoctor-btn').click(findDoctor)
    $('#search-doctor').click(findDoctorForm)
=======
    
>>>>>>> d8edf11af468eedcd2f8633d7cb728af3b4eb26e
})

function registerShow () {
$('#REGISTER').show()
$('#LOGIN').slideUp(800, function () {
    $('#REGISTER').show(800)
})
};

function loginShow () {
$('#REGISTER').slideDown(800, function () {
    $('#LOGIN').slideToggle(800,function () {
        $('#REGISTER').hide()
    })
})
}

<<<<<<< HEAD
function login () {
=======
function login () {panda
>>>>>>> d8edf11af468eedcd2f8633d7cb728af3b4eb26e

event.preventDefault()
const email = $('#email-login').val()
const password = $('#password-login').val()

$.ajax({
        url: 'http://localhost:3000/users/login',
        method: 'POST',
        data: { email, password }
    })
    .done(response => {
<<<<<<< HEAD
        $('#FINDDOCTOR').hide()
        $('#DOCTORS').hide()
=======
>>>>>>> d8edf11af468eedcd2f8633d7cb728af3b4eb26e
        $('#LOGIN').slideToggle(1000, function () {
            $('#NAVBAR').show(800, function () {
                $('#logout-button').show(1000,function () {
                     localStorage.setItem('token', response.token)
<<<<<<< HEAD
                    $('#MAIN').show('slow')
=======
                    $('#MAINPAGE').show('slow')
>>>>>>> d8edf11af468eedcd2f8633d7cb728af3b4eb26e
                })
            })

        })
        $('#username-login').val('')
        $('#email-login').val('')
        $('#password-login').val('')
    })
    .fail((err) => {
        let error = JSON.stringify(err)
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: error.responseText,
            footer: '<a href>Why do I have this issue?</a>'
          })
    })
}

function isLogin () {

$('#LOGIN').hide()
$('#REGISTER').hide()
$('#NAVBAR').show()
$('#MAIN').show()
$('#logout-button').show()

}

function isLogout () {
$('#MAIN').hide()
$('#NAVBAR').hide()
$('#LOGIN').show()
$('#REGISTER').hide()
$('#FINDDOCTOR').hide()
$('#DOCTORS').hide()
}

function logout() {
$('#logout-button').hide('slow', function () {
    localStorage.removeItem('token')
    $('#NAVBAR').hide('slow',function () {
        $('#MAIN').hide('slow', function () {
            $('#REGISTER').hide()
            $('#MAIN').hide()
            $('#FINDDOCTOR').hide()
            $('#DOCTORS').hide()
            $('#LOGIN').show('slow')
        })
    })
})
}

function register () {
event.preventDefault()
let username = $('#username-register').val()
let email = $('#email-register').val()
let password = $('#password-register').val()

$.ajax({
    url: 'http://localhost:3000/users/create',
    method: 'POST',
    data: {username, email, password}
})
.done(function (data) {
    Swal.fire({
        title: 'Thank You for Registering :)',
        imageUrl: 'https://media.giphy.com/media/l0MYJnJQ4EiYLxvQ4/giphy.gif',
        imageHeight: 350,
        imageAlt: 'A tall image',
        showCancelButton: false
      })
      $('#username-register').val('')
      $('#email-register').val('')
      $('#password-register').val('')
      
    loginShow()
})
.fail(function (err) {
    let error = JSON.stringify(err)
    Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: error.responseText,
        footer: '<a href>Why do I have this issue?</a>'
      })
})

}

function findDoctor () {
    $('#MAIN').slideToggle('slow', function () {
        $('#MAIN').hide('slow', function () {
            $("#FINDDOCTOR").show('slow')
        })
    })
}

function findDoctorForm () {
    event.preventDefault()
    console.log('masuk form')
    let location = $('#add-location').val()
    console.log("-"+location+"-")
    console.log(localStorage.getItem('token'))
    $.ajax({
        url: 'http://localhost:3000/loc/get',
        method: 'POST',
        data: {
            place: location
        },
        headers: {
            token : localStorage.getItem('token')
        }
    })
    .done ( (data) => {
        
        getDoctor(data)
    })
    .fail (function(err) {
       
        let error = JSON.stringify(err)
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: error.responseText,
            footer: '<a href>Why do I have this issue?</a>'
          })
    })
}   


function getDoctor (location) {
    
    let speciality = $('#add-spesiality').val()
    console.log(speciality)
    let gender = $('#add-gender').val()
    console.log(gender)
    console.log(location.lat);
    console.log(location.lng);

    
    $.ajax({
        url: `http://localhost:3000/doctor/get`,
        method: 'POST',
        data: {
            lat: location.lat,
            long: location.lng,
            speciality_uid: speciality,
            gender: gender
        },
        headers: {
            token : localStorage.getItem('token')
        }
    })
    .done(function (data) {
        getDoctorList(data)
    })
    .fail(function (err) {
        let error = JSON.stringify(err)
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: error.responseText,
            footer: '<a href>Why do I have this issue?</a>'
          })
    })
}


function getDoctorList(doctors) {
    console.log(doctors)
    $('#FINDDOCTOR').hide('slow')
    $('#DOCTORS').show('slow')

    let avatar = ["elliot", "helen", "jenny", "veronika", "stevie", "steve", "elliot", "helen", "jenny", "veronika", "stevie", "steve"]
    
    doctors.forEach((doctor, index) => {
        console.log(doctor)
        let talent = doctor.specialties.map(el => {
            return el.name
        })
        talent.join(' ,')
        $("#doctors-list").append(`
            <h3>biar keliatan</h3>
            <div class="ui card" style=" width:200px">
                <div class="image">
                    <img src="https://semantic-ui.com/images/avatar/large/${avatar[index]}.jpg">
                </div>
                <div class="content" style=" height:100px">
                    <a class="header" style=" width:200px">${doctor.name}</a>
                    <div class="meta">
                        <span class="phone">${doctor.gender}</span>
                    </div>
                    <div class="description" name="bio">
                        ${doctor.bio}
                    </div>
                </div>
                <div class="extra content">
                    ${talent}
                </div>
            </div>
            `)
    })
}


function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    const config = {
        host: 'http://localhost:3000'
    }
    const googleToken = googleUser.getAuthResponse().id_token;

    $.ajax({
            method: 'POST',
            url: `${config.host}/users/googlelogin`,
            data: {
                token: googleToken
            }
        })
        .done(response => {
        $('#FINDDOCTOR').hide()
        $('#DOCTORS').hide()
        $('#LOGIN').slideToggle(1000, function () {
            $('#NAVBAR').show(800, function () {
                $('#logout-button').show(1000,function () {
                     localStorage.setItem('token', response.token)
                    $('#MAIN').show('slow')
                })
            })

        })
        $('#username-login').val('')
        $('#email-login').val('')
        $('#password-login').val('')
        })
        .fail(err => {
            let error = JSON.stringify(err)
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: error.responseText,
                footer: '<a href>Why do I have this issue?</a>'
              })
        })

} //
