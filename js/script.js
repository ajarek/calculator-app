const radioInputs = document.querySelectorAll('input[type="radio"]')
const css = document.querySelector('#thema')
const displayResult = document.querySelector('.display-result')
const btnCalc = document.querySelectorAll('.btn-calc')
let arr = []
let arr1 = []
let sign = []

function changeThema(e) {
    if (e.target.id !== 'one') {
        const adress = e.target.dataset.thema
        css.href = "css/thema" + adress + ".css"
    } else {
        css.href = "css/thema1.css"
    }
}

function calc(e) {
    let val = e.target.textContent

    if (val === '+' || val === '-' || val === 'x' || val === '/') {
        if (val === 'x') {
            val = '*'
        }
        sign.splice(0, 1, val)
        if (arr.length < 1) {
            sign = []
        }
    }

    if (val === 'reset') {
        arr = []
        arr1 = []
        sign = []
        displayResult.innerHTML = ''
    }

    if (val === 'del') {
        if (arr.length > 0 && sign.length === 0) {
            arr.pop()
            displayResult.innerHTML = arr.join("")
        }
        if (arr1.length > 0) {
            arr1.pop()
            displayResult.innerHTML = arr1.join("")
        }
    }

    if (val === '=') {
        if (arr.filter(fl => fl == '.').length > 1 || arr1.filter(fl1 => fl1 == '.').length > 1) {
            displayResult.innerHTML = 'error'
            arr = []
            arr1 = []
            sign = []
            return
        }

        let allArr = arr.concat(sign, arr1)
        let result = eval(allArr.join(''))
        arr = []
        displayResult.innerHTML = result
        arr.push(result)
        arr1 = []
        sign = []

    }
    if (val === '.' || val === '0' || val === '1' || val === '2' || val === '3' || val === '4' || val === '5' || val === '6' || val === '7' || val === '8' || val === '9') {
        if (sign.length === 0) {
            arr.push(val)
            displayResult.innerHTML = arr.join("")
        } else {
            arr1.push(val)
            displayResult.innerHTML = arr1.join("")
        }
    }
}

radioInputs.forEach(radioInput => {
    radioInput.addEventListener('change', changeThema)
})

btnCalc.forEach(btnCalc => {
    btnCalc.addEventListener('click', calc)
})