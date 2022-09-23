document.addEventListener('DOMContentLoaded', dclEvent => {
    console.log('Ready');

    // Ausgabe von Begüßung mit aktuellem Datum
    document.getElementById('greetingContainer').textContent = getFullGreetingText();
});


/* Erstelle auf Basis eines Date-Objektes einen String bestehend aus Begrüßung und Datum.
   Gebe diesen String zurück. */
function getFullGreetingText() {
    let myDate = new Date();

    return `${getGreeting(myDate.getHours())} Es ist ${myDate.toLocaleString('default', { weekday: 'long' })}, der ${myDate.getDay()}. ${myDate.toLocaleString('default', { month: 'long' })} ${myDate.getFullYear()}. Dont´t panic! ;-)`;

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
