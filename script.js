const container = document.querySelector('.text-container');
const items = document.querySelectorAll('.text-item');
let scrollPosition = 0;


function updateItems() {
    const centerIndex = Math.floor((items.length / 2)); 

    items.forEach((item, index) => {
        let offset = index - centerIndex + scrollPosition;

        if (offset > centerIndex) {
            offset -= items.length;
        } else if (offset < -centerIndex) {
            offset += items.length;
        }

        if (Math.abs(offset) <= 4) {
            item.style.opacity = 1 - Math.abs(offset) * 0.25;
            item.style.transform = `translateY(${offset * 100}px)`; 

            if (Math.abs(offset) < 0.5) { 
                item.style.fontSize = '8vw';
                item.setAttribute('data-center', 'true');
                item.style.fontWeight = 'bold'; 
                item.style.fontStyle = 'normal'; 
            } else { 
                item.style.fontSize = '5vw'; 
                item.style.fontWeight = 'italic'; 
                item.style.fontStyle = 'normal'; 

                
            }
        } else {
            item.style.opacity = 0;
            item.removeAttribute('data-center');
            item.style.fontWeight = 'normal'; 
            item.style.fontStyle = 'normal'; 
        }
    });
}

updateItems();

document.addEventListener('wheel', (event) => {
    const delta = Math.sign(event.deltaY); 
    scrollPosition -= delta;

    if (scrollPosition < -items.length / 2) {
        scrollPosition = items.length / 2;
    } else if (scrollPosition > items.length / 2) {
        scrollPosition = -items.length / 2;
    }

    updateItems();
});
