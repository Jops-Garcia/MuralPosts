const sectionlogin = document.querySelector('#sectionlogin')

const checklogin = async () => {
    const username = localStorage.getItem('username')
    const token = localStorage.getItem('token')
    if (!username || !token) {
        displayFormLogin()
    } else {
        displayLinkLogout(username)
    }
}

const displayFormLogin = () => {
    sectionlogin.innerHTML = `
        <form class="login-form">
            <input type="text" name="username" placeholder="Usuário" size="6">
            <input type="password" name="password" placeholder="Senha" size="6">
            <button type="submit">logar</button>
        </form>
        <p class="message">Nào possui conta? <a href="#">Criar uma conta</a></p>`
    const formlogin = sectionlogin.querySelector('form')
    formlogin.addEventListener('submit', function (evento) {
        evento.preventDefault()
        const payload = new URLSearchParams(new FormData(this))
        sendLogin(payload)
    })
     const linkcad = sectionlogin.querySelector('a')
     linkcad.addEventListener('click', displayFormCadastro)
}

function displayFormCadastro(evento) {
    evento.preventDefault()
    sectionlogin.innerHTML = `
    <form class="register-form">
        <input type="text" name="username" placeholder="Usuário" size="6">
        <input type="password" name="password" placeholder="Senha" size="6">
        <button type="submit">cadastrar</button>
    </form>
    <p class="message">Já possui conta? <a href="#">Entrar</a></p>`
    const formcadastro = sectionlogin.querySelector('form')
    formcadastro.addEventListener('submit', function (evento) {
        evento.preventDefault()
        const payload = new URLSearchParams(new FormData(this))
        sendCadastro(payload)
    })
     const linkcad2 = sectionlogin.querySelector('a')
     linkcad2.addEventListener('click', displayFormLogin)
}

const sendCadastro = (payload) => {
    console.log(payload)
    fetch('signin', {
        method: 'PUT',
        body: payload,
    })
        .then(res => res.json())
        .then(data => {
            alert("Usuário cadastrado.")
            checklogin()
        })
}

const sendLogin = (payload) => {
    fetch('login', {
        method: 'POST',
        body: payload,
    })
        .then(res => res.json())
        .then(data => {
            const { username, token } = data
            if (username && token) {
                localStorage.setItem('username', username)
                localStorage.setItem('token', token)
            }
            checklogin()
        })
}

const displayLinkLogout = (username) => {
    sectionlogin.innerHTML = `<span>${username}</span> <a href="#">logout</a>`
    const linklogout = sectionlogin.querySelector('a')
    linklogout.addEventListener('click', function (evento) {
        evento.preventDefault()
        sendLogout()
    })
}

const sendLogout = () => {
    fetch('login', { method: 'GET' })
        .then(res => res.json())
        .then(data => {
            const { username, token } = data
            if (!username || !token) {
                localStorage.removeItem('username')
                localStorage.removeItem('token')
            }
            checklogin()
        })
}

checklogin()
