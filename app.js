const inputsColor = document.querySelectorAll('.inp-color');
const inputRange = document.querySelector('.inp-range');
const btns = document.querySelectorAll('button');
const background = document.body;
let index = 3;
const containerColor = document.querySelector('.container-color');
const span = document.querySelector('span');
const btnRandom = document.querySelector('.random');

//Initialization
let valColor = ['#BA5370', '#F4E2D8'];
let tilt = 45;
inputsColor[0].value = valColor[0];
inputsColor[1].value = valColor[1];
inputsColor[0].style.background = valColor[0];
inputsColor[1].style.background = valColor[1];
background.style.background = `linear-gradient(${tilt}deg, ${valColor})`; //${valColor} = ['#BA5370', '#F4E208'];

//Tilt
inputRange.addEventListener('input', (e) => {

    tilt = e.target.value * 3.6 // The max range is 100 but max degrees is 360.
    background.style.background = `linear-gradient(${tilt}deg, ${valColor})`; //${valColor} = ['#BA5370', '#F4E208'];
})

// Add & Remove
btns.forEach(btn => {
    btn.addEventListener('click', addRemove);
})

function addRemove(e) {

    const allInputs = document.querySelectorAll('.inp-color');
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    // console.log(randomColor);
    if(e.target.className === "plus") {

        span.innerText = '';

        if(allInputs.length > 8) {
            return;
        }

        const newColor = document.createElement('input');

        newColor.setAttribute('class', 'inp-color');
        newColor.setAttribute('data-index', index);
        newColor.setAttribute('maxlength', 7);
        newColor.value = `#${randomColor.toUpperCase()}`;
        newColor.style.background = `#${randomColor}`;

        containerColor.appendChild(newColor);

        valColor.push(`#${randomColor.toUpperCase()}`);

        //Update of the background
        background.style.background = `linear-gradient(${tilt}deg, ${valColor})`;
        index++;
    }
    else if(e.target.className === 'moins') {

        if(allInputs.length <= 2) {
            span.innerText = 'We need at least 2 colors!'
        }
        else {
            valColor.pop();
            allInputs[allInputs.length - 1].remove();
            background.style.background = `linear-gradient(${tilt}deg, ${valColor})`;
            index--;
        }

    }

    //New input
    allInputs.forEach( inp => {
        inp.addEventListener('input', MAJCOLORS);
    })

}

//For the 2 first inputs
inputsColor.forEach( inp => {
    inp.addEventListener('input', MAJCOLORS);
})

//Update Color
function MAJCOLORS(e) {

    let currentIndex = e.target.getAttribute('data-index');
    e.target.value = e.target.value.toUpperCase();
    valColor[currentIndex - 1] = e.target.value.toUpperCase();
    e.target.style.background = valColor[currentIndex - 1];
    background.style.background = `linear-gradient(${tilt}deg, ${valColor})`;

}

//Random Color
btnRandom.addEventListener('click', () => {

    const inputs = document.querySelectorAll('.inp-color');

    for(let i = 0; i < valColor.length; i++) {

        valColor[i] = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        inputs[i].value = valColor[i].toUpperCase();
        inputs[i].style.background = inputs[i].value;
            
    }
    
    background.style.background = `linear-gradient(${tilt}deg, ${valColor})`;

})