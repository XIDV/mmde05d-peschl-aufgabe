document.addEventListener('DOMContentLoaded', dclEvent => {
    console.log('Ready');

    let imgChangeSelection = 1;
    
    // Ausgabe von Begüßung mit aktuellem Datum +++++++++++++++++++++++++++++ +
    
    /*
        Selektierung des Elements mit der ID "greetingContainer" und Manipu-
        lation des Attributs "textContent". Der Rückgabewert der Funktion
        "getFullGreetingText" wird als Wert für dieses Attribut verwendet.
    */
    document.getElementById('greetingContainer').innerHTML = getFullGreetingText();


    // Verarbeitung der Auswahl der "imgChangeSelection" ++++++++++++++++++++ +
    const imgChangeSelectors = document.getElementById('imgChangeSelection').changeVariant;
    for(imgChangeSelctor of imgChangeSelectors) {
        imgChangeSelctor.addEventListener('change', e => {
            imgChangeSelection = parseInt(e.target.value);
            let demoImgs = document.getElementsByClassName('demoImg');
            
            if (imgChangeSelection != 1) {
                if (imgChangeSelection == 2) {
                    //Variante 2 -------------------------------------------- +
                    removeAllImgChangeListener(demoImgs);
                    for(img of demoImgs) {
                        img.addEventListener('mouseover', changeImgOver);
                        img.addEventListener('mouseout', changeImgOut);
                    }
                } else if (imgChangeSelection == 3) {
                    // Variante 3 ------------------------------------------- +
                    /*
                        Für jedes Element mit der Klasse "demoImg" registriere Event-
                        Listener für "mouseover" und "mouseout".
                    */
                        removeAllImgChangeListener(demoImgs);
                    for(img of demoImgs) {
                        img.addEventListener('mouseover', overlayOver);
                        img.addEventListener('mouseout', overlayOut);
                    }
                }
                
            } else {
                //Variante 1 ------------------------------------------------ +
                removeAllImgChangeListener(demoImgs);
            }
        });
    } 
    

    // Validierung von Formulareingaben +++++++++++++++++++++++++++++++++++++ +
    const userDataInputs = document.getElementsByClassName('userDataInput');
    for(userInput of userDataInputs) {
        // Registriere f. beide input-Elemente einen Event-Listener
        userInput.addEventListener('change', e => {
            validateInput(e.target.id, userDataInputs);
        });
    }

    // Verarbeitung der Nutzereingaben ++++++++++++++++++++++++++++++++++++++ +
    document.querySelector('#sendUserData').addEventListener('click', e => {
        e.preventDefault(); // Standardaktion f. default-Aktion deaktiviert!
        let userInputOutput;
        /*
            Prüfe ob bereits ein "userInputOutput"-Container existiert.
            Wenn ja, dann entferne diesen aus dem DOM.
        */
        if(userInputOutput = document.getElementById('userInputOutput')) {
            userInputOutput.remove();
        }
        /*
            Erforderliche HTML-Elemente erzeugen und die Werte aus den Eingabe-
            Elementen in diese einfügen.
            Den ganzen Bums nach dem Formular innerhalb der Sektion "validateForm"
            in den DOM einhängen.
        */
        const uioTitle = document.createElement('h3');
        const nameText = document.createElement('p');
        const emailText = document.createElement('p');
        userInputOutput = document.createElement('div');
        userInputOutput.setAttribute('id', 'userInputOutput');
        uioTitle.textContent = 'Ihre Eingaben ...';
        nameText.textContent = document.getElementById('userName').value;
        emailText.textContent = document.getElementById('userEmail').value;
        userInputOutput.appendChild(uioTitle);
        userInputOutput.appendChild(nameText);
        userInputOutput.appendChild(emailText);
        document.getElementById('validateForm').appendChild(userInputOutput);
    });
});

// Funktionen f. Datumausgabe #################################################
/*
    Erstelle auf Basis eines Date-Objektes einen String bestehend aus Begrüßung
    und Datum. Gebe diesen String zurück.
*/
function getFullGreetingText() {
    let myDate = new Date();
    return `${getGreeting(myDate.getHours())} Es ist 
        ${myDate.toLocaleString('default', { weekday: 'long' })}, der 
        ${myDate.getDate()}. ${myDate.toLocaleString('default', { month: 'long' })} 
        ${myDate.getFullYear()}. <span class="important">Dont´t panic! ;-)</span>`;
}

// Gebe einen tageszeitabhängigen Begrüßungs-String zurück.
function getGreeting(hour) {
    if(hour < 12) {
        return 'Guten Morgen.';
    } else if(hour >= 12 && hour < 18) {
        return'Guten Tag.';
    } else {
        return 'Guten Abend.';
    }
}


// Funktionen f. Bildwechsel ##################################################
/* 
    Entferne alle existierenden Event-Listener bzgl. "mouseover" u. "mouseout" die den 
    Elementen in "demoImgs" zugeordnet sind.
*/
function removeAllImgChangeListener(demoImgs) {
    for(img of demoImgs) {
        img.removeEventListener('mouseover', overlayOver);
        img.removeEventListener('mouseover', changeImgOver);
        img.removeEventListener('mouseout', overlayOut);
        img.removeEventListener('mouseout', changeImgOut);
    }
}



// Funktionen f. Bildwechsel-Variante 1 +++++++++++++++++++++++++++++++++++++ +
function overImgHandler(element) {
    element.src = `src/img/${element.name}_blur.jpg`;
}

function outImgHandler(element) {
    element.src = `src/img/${element.name}.jpg`;
}


// Funktionen für Bildwechsel-Variante 2 ++++++++++++++++++++++++++++++++++++ +

function changeImgOver(e) {
    e.target.style.borderRadius = '1rem';
    e.target.style.transform = 'scale(1.05)';
    e.target.style.opacity = '0';
    setTimeout(() => {
        e.target.src = `src/img/${e.target.name}_blur.jpg`;
    }, 250);
    setTimeout(() => {
        e.target.style.opacity = '1';
    }, 250);
}

function changeImgOut(e) {
    e.target.style.borderRadius = '0';
    e.target.style.transform = 'scale(1)';
    setTimeout(() => {
        e.target.src = `src/img/${e.target.name}.jpg`;
    }, 250);
    setTimeout(() => {
        e.target.style.opacity = '1';
    }, 250);
}

// Funktionen für Bildwechsel-Variante 3 ++++++++++++++++++++++++++++++++++++ +
/*
    Wenn sich der Mauszeiger innerhalb des Elements befindet dann ...
    (a) prüfe ob sich im DOM bereits ein Element mit der ID "oberlay"
    befindet. Wenn das der Fall ist, dann entferne dieses Element.
    (b) Erstelle ein neues Element vom Typ "img".
    (c) Sichere das Eltern-Element in der Variablen "imgParent"
    (d) Setze die Attribute "id" und "src" für das neue "img"-Element.
    (e) Füge dem "imgParent" das neue "img"-Element m. d. ID "overlay"
    hinzu.
    (f) Veringere die Sichtbarkeit des "target"-Elements auf 0.
    (g) Warte 50ms und erhöhe dann die Sichtbarkeit von "overlay" auf 1
    und setze den "borderRadius" auf 1.5rem. Erhöhe außerdem die
    Skallierung des "imgParent" auf 1.05.
*/
function overlayOver(e) {
    if(document.getElementById('overlay')) {
        document.getElementById('overlay').remove();
    }
    let overlay = document.createElement('img');
    let imgParent = e.target.parentElement;
    overlay.setAttribute('id', 'overlay');
    overlay.setAttribute('src',
    `src/img/${e.target.name}_blur.jpg`);
    imgParent.appendChild(overlay);
    e.target.style.opacity = '0';
    setTimeout(() => {
        overlay.style.opacity = '1';
        overlay.style.borderRadius = '1.5rem';
        imgParent.style.transform = 'scale(1.05)';
    }, 50);
}

/*
    Wenn sich der Mauszeiger außerhalb eines der erfassten Elementen
    befindet dann ...
    (a) Erfasse das Element mit der ID "overlay" in der Variablen
    "overlay".
    (b) Erfasse das Eltern-Element des target-Elements.
    (c) Setze die Sichtbarkeit des target-Elements auf 1
    (d) Setze Sichtbarkeit und "borderRadius" von "oberlay" auf 0
    (e) Setze die Skalierung des "imgParent" wieder auf 1 zurück.
    (f) Warte 250ms und entferne "overlay" dann aus dem DOM
*/
function overlayOut(e) {
    let overlay = document.getElementById('overlay');
    let imgParent = e.target.parentElement;
    e.target.style.opacity = '1';
    overlay.style.opacity = '0';
    overlay.style.borderRadius = '0';
    imgParent.style.transform = 'scale(1)';
    setTimeout(() => {
        overlay.remove();
    }, 250);
}


// Funktionen f. Eingabe-Validierung ##########################################
let inputsStatusOK = [false, false];
/*
    Wenn die Eingaben in beide input-Elemente OK sind dann aktiviere den 
    Senden-Button "sendUserData". Wenn nicht beide OK dann setzt disabled
    wieder auf true.
*/
function validateInput(targetID, userDataInputs) {
    const submitButton = document.getElementById('sendUserData');
    if(targetID == userDataInputs[0].name) {
        inputsStatusOK[0] = getCheckResult(userDataInputs[0], 0);
    } else if(targetID == userDataInputs[1].name) {
        inputsStatusOK[1] = getCheckResult(userDataInputs[1], 1);
    }

    if(inputsStatusOK[0] && inputsStatusOK[1]) {
        submitButton.disabled = false;
        submitButton.style.color = 'white';
        submitButton.style.backgroundColor = 'darkgreen';
    } else {
        submitButton.disabled = true;
        submitButton.style.color = 'white';
        submitButton.style.backgroundColor = 'gray';
    }
}

/*
    Überprüfe die jeweilige Eingabe in das input-Element anhand der via. RegEx 
    definierten Parameter und liefere einentsprechendes Ergebnis zurück.
*/
function getCheckResult(inputElement, index) {
    const inputPattern = [
        /*
            RegEx f. Name erlaubt die Eingabe eines Vor- oder Nachnamens, oder
            beides
        */
        /^[A-Z,ÄÜÖ]{1}[a-z,ß-ü]{1,20}\s?([A-Z,ÄÜÖ]{1}?[a-z,ß-ü]{1,20})?$/,
        /*
            RegEx f. eine gültige Email-Adresse
        */
        /^[A-Z,a-z,0-9]{1}[A-Z,a-z,0-9,\.,!,#,$,%,&,',*,+,-,/,=,?,^,_,`,{,|,},~]{0,62}[A-Z,a-z,0-9]{1}@[A-Z,a-z,0-9,-]{2,255}\.[a-z]{2,5}$/
    ];
    const testResult = inputPattern[index].test(inputElement.value);
    setMessageBoxText(testResult, index);
    // Rückgabe d. Prüfungsergebnis als boolscher Wert.
    return testResult;
}

/*
    Konfiguration, wann welche Text ausgabe in welche messageBox,
    als Reaktion auf Benutzereingaben angezeigt werden.
*/
function setMessageBoxText(testResult,index) {
    const messages = [
        'Sorry, wir brauchen deinen Namen.',
        'Sorry, wir brauchen eine korrekte E-Mail-Adresse von dir. (Für Zeugs.)',
        'Eingabe OK'
    ]

    let messageBox;
    if(index == 0) {
        messageBox = document.getElementById('nameMessage');
    } else if(index == 1) {
        messageBox = document.getElementById('emailMessage');
    }

    if(testResult == false) {
        messageBox.textContent = messages[index];
        messageBox.classList.remove('inputOK');
        messageBox.classList.add('inputFalse');
    } else {
        messageBox.textContent = messages[2];
        messageBox.classList.remove('inputFalse');
        messageBox.classList.add('inputOK');
    }

}