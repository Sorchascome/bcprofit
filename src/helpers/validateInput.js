export const checkInput = (e) => {

    var input = e.target.value;

    let forms = [...document.querySelectorAll('.two')];
    
    forms.map(form => {

        var siblings = [];
        var sibling = form.querySelector('ul').firstChild;

        // Loop through each sibling and push to the array
        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== e.target) {
                siblings.push(sibling);
            }
            sibling = sibling.nextSibling;
        }
    
        // Check if between 8 and 12 letters
        if (checkLength(input)) {
            siblings[0].classList.add('ok');
        } else {
            siblings[0].classList.remove('ok');
        }
    
        // Check if contains special characters
        if (checkSpecial(input)) {
            siblings[1].classList.add('ok');
        } else {
            siblings[1].classList.remove('ok');
        }
    
        // Check if has at least 1 letter
        if (checkLetter(input)) {
            siblings[2].classList.add('ok');
        } else {
            siblings[2].classList.remove('ok');
        }
    
        // Check if has at least 1 capital
        if (checkCap(input)) {
            siblings[3].classList.add('ok');
        } else {
            siblings[3].classList.remove('ok');
        }
    
        // Check if contains a number
        if (checkNumber(input)) {
            siblings[4].classList.add('ok');
        } else {
            siblings[4].classList.remove('ok');
        }
    
    })

  
}

export const checkLength = (input) => {

    if ((input.length >= 8) &&  (input.length <= 12)) {
        return true;
    } else {
        return false;
    }

}

export const checkSpecial = (input) => {

    return (input.length > 0 && (!/[^a-zA-Z0-9\-\/]/.test(input)));

}

export const checkLetter = (input) => {

    let bool = false;
    
    if (input.length > 0) {
        for (let i = 0; i <= input.length; i++) {
            if (!/[^a-zA-Z\-\/]/.test(input[i])) {
                bool = true;
            }
        }
    }

    return bool;
}

export const checkOnlyLetters = (input) => {
    return !/[^a-zA-Z\-\/]/.test(input);
}

export const checkCap = (input) => {

    let bool = false;
    
    if (input.length > 0) {
        for (let i = 0; i <= input.length; i++) {
            if (!/[^A-Z\-\/]/.test(input[i])) {
                bool = true;
            }
        }
    }

    return bool;
}

export const checkOnlyNumbers = (input) => {

    return !/[^0-9\-\/]/.test(input);

}

export const checkNumber = (input) => {

    let bool = false;
    
    if (input.length > 0) {
        for (let i = 0; i <= input.length; i++) {
            if (!/[^0-9\-\/]/.test(input[i])) {
                bool = true;
            }
        }
    }

    return bool;

}

export const validateEmail = (email) => {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}