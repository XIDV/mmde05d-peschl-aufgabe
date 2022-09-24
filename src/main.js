document.addEventListener('DOMContentLoaded', dclEvent => {
    console.log('Ready');


    
    // Ausgabe von Begüßung mit aktuellem Datum +++++++++++++++++++++++++++++ +
    
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
    let demoImgs = document.getElementsByClassName('demoImg');
    for(img of demoImgs) {
        img.addEventListener('mouseover', e => {
            if(document.getElementById('overlay')) {
                document.getElementById('overlay').remove();
            }
            let overlay = document.createElement('img');
            let imgParent = e.target.parentElement;
            overlay.setAttribute('id', 'overlay');
            overlay.setAttribute('src',`src/img/${e.target.name}_blur.jpg`);
            imgParent.appendChild(overlay);
            e.target.style.opacity = '0';
            setTimeout(() => {
                overlay.style.opacity = '1';
                overlay.style.borderRadius = '1.5rem';
                imgParent.style.transform = 'scale(1.05)';
            }, 50);
        });

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




/* Erstelle auf Basis eines Date-Objektes einen String bestehend aus Begrüßung und Datum.
   Gebe diesen String zurück. */
function getFullGreetingText() {
    let myDate = new Date();

    return `${getGreeting(myDate.getHours())} Es ist ${myDate.toLocaleString('default', { weekday: 'long' })}, der ${myDate.getDate()}. ${myDate.toLocaleString('default', { month: 'long' })} ${myDate.getFullYear()}. Dont´t panic! ;-)`;

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
