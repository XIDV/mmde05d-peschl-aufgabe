document.addEventListener('DOMContentLoaded', dclEvent => {
    console.log('Ready');


    
    // Ausgabe von Begüßung mit aktuellem Datum +++++++++++++++++++++++++++++ +
    
    /*
        Selektierung des Elements mit der ID "greetingContainer" und Manipu-
        lation des Attributs "textContent". Der Rückgabewert der Funktion
        "getFullGreetingText" wird als Wert für dieses Attribut verwendet.
    */
    document.getElementById('greetingContainer').textContent = getFullGreetingText();

    
    // Mouseover-Effekt f. Demo-Bilder ++++++++++++++++++++++++++++++++++++++ +

    // Variante 1 ----------------------------------------------------------- +
    // let demoImgs = document.getElementsByClassName('demoImg');
    // for(img of demoImgs) {
    //     img.addEventListener('mouseover', e => {
    //         e.target.style.borderRadius = '1rem';
    //         e.target.style.transform = 'scale(1.05)';
    //         e.target.style.opacity = '0';
    //         setTimeout(() => {
    //             e.target.src = `src/img/${e.target.name}_blur.jpg`;
    //         }, 250);
    //         setTimeout(() => {
    //             e.target.style.opacity = '1';
    //         }, 250);
    //     });

    //     img.addEventListener('mouseleave', e => {
    //         e.target.style.borderRadius = '0';
    //         e.target.style.transform = 'scale(1)';
    //         setTimeout(() => {
    //             e.target.src = `src/img/${e.target.name}.jpg`;
    //         }, 250);
    //         setTimeout(() => {
    //             e.target.style.opacity = '1';
    //         }, 250);
    //     });
    // }
    
    // Variante 2 ----------------------------------------------------------- +
    /*
        (1) Erfasse alle Elemente mit der Klasse "demoImg" und sichere diese
        Elmente in die Element-Liste "demoImgs"
        (2) Für jedes Element mit der Klasse "demoImg" registriere Event-
        Listener für "mouseover" und "mouseout".
    */
    let demoImgs = document.getElementsByClassName('demoImg');
    for(img of demoImgs) {
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
        img.addEventListener('mouseover', e => {
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
        });

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
        img.addEventListener('mouseout', e => {
            let overlay = document.getElementById('overlay');
            let imgParent = e.target.parentElement;
            e.target.style.opacity = '1';
            overlay.style.opacity = '0';
            overlay.style.borderRadius = '0';
            imgParent.style.transform = 'scale(1)';
            setTimeout(() => {
                overlay.remove();
            }, 250);
        });
    }
    
});




/*
    Erstelle auf Basis eines Date-Objektes einen String bestehend aus Begrüßung
    und Datum. Gebe diesen String zurück.
*/
function getFullGreetingText() {
    let myDate = new Date();
    return `${getGreeting(myDate.getHours())} Es ist 
        ${myDate.toLocaleString('default', { weekday: 'long' })}, der 
        ${myDate.getDate()}. ${myDate.toLocaleString('default', { month: 'long' })} 
        ${myDate.getFullYear()}. Dont´t panic! ;-)`;
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
