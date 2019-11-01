$('document').ready(function () {

    if (localStorage.getItem('token')) {
        isLogin()
    } else {
        $('#REGISTER').hide()
        $('#NAVBAR').hide()
        $('#logout-button').hide()
        $('#MAINPAGE').hide()
    }

    $('#register-page').click(registerShow)
    $('#login-page').click(loginShow)
    $('#button-login').click(login)
    $('#logout-button').click(logout)
    $('#button-register').click(register)

})

function registerShow() {
    $('#REGISTER').show()
    $('#LOGIN').slideUp(800, function () {
        $('#REGISTER').show(800)
    })
};

function loginShow() {
    $('#REGISTER').slideDown(800, function () {
        $('#LOGIN').slideToggle(800, function () {
            $('#REGISTER').hide()
        })
    })
}

function login() {
    panda

    event.preventDefault()
    const email = $('#email-login').val()
    const password = $('#password-login').val()

    $.ajax({
        url: 'http://localhost:3000/users/login',
        method: 'POST',
        data: { email, password }
    })
        .done(response => {
            $('#LOGIN').slideToggle(1000, function () {
                $('#NAVBAR').show(800, function () {
                    $('#logout-button').show(1000, function () {
                        localStorage.setItem('token', response.token)
                        $('#MAINPAGE').show('slow')
                    })
                })

            })
            $('#username-login').val('')
            $('#email-login').val('')
            $('#password-login').val('')
        })
        .fail((jqXHR, textstatus) => {
            // swal("Good job!", "Invalid Email / Password", "error");
            alert(textstatus)
        })
}

function isLogin() {

    $('#LOGIN').hide()
    $('#REGISTER').hide()
    $('#NAVBAR').show()
    $('#MAINPAGE').show()
    $('#logout-button').show()
}

function isLogout() {
    $('#MAINPAGE').hide()
    $('#NAVBAR').hide()
    $('#LOGIN').show()
    $('#REGISTER').hide()
}

function logout() {
    $('#logout-button').hide('slow', function () {
        localStorage.removeItem('token')
        $('#NAVBAR').hide('slow', function () {
            $('#MAINPAGE').hide('slow', function () {
                $('#REGISTER').hide()
                $('#LOGIN').show('slow')
            })
        })
    })
}

function register() {
    event.preventDefault()
    let username = $('#username-register').val()
    let email = $('#email-register').val()
    let password = $('#password-register').val()

    $.ajax({
        url: 'http://localhost:3000/users/create',
        method: 'POST',
        data: { username, email, password }
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
            console.log(err)
        })

}

function getDoctor(doctors) {

    let avatar = ["elliot", "helen", "jenny", "veronika", "stevie", "steve", "elliot", "helen", "jenny", "veronika", "stevie", "steve"]

    doctors.foreach((doctor, index) => {
        let talent = doctor.specialties.map(el => {
            return el.name
        })
        talent.join(' ,')
        $("#doctors").append(`
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
