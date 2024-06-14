let menu = document.querySelector('.menu');

document.addEventListener('mousemove', (e) => {
    if (e.clientY < 50 || menu.matches(':hover')) {
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
    }
});

