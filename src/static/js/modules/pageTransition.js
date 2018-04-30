// need to add a polyfill

const url = new URL(window.location.href);

document.addEventListener('DOMContentLoaded', function() {
    getHashUrl();
});

var delaysLink = document.querySelectorAll('a.delay');

delaysLink.forEach((link, index) => {
    link.addEventListener('click', event => {
        event.preventDefault();

        let path = link.getAttribute('href');

        // Check if any anchor already exists and if the path isn't the same
        if (path != url.pathname && link.hash == "") {
            document.querySelector('body').classList.add('transitionOut');
            setTimeout(() => {
                url.pathname = path;
                url.hash = "delay";
                window.location.href = url.href;
            }, 1000);
        }
        else {
            window.location.href = path;
        }

    })
})

function getHashUrl() {
    if (url.hash == '#delay')
        pageTransitionIn();
}

function pageTransitionIn() {
    document.querySelector('body').classList.add('transitionIn');
    setTimeout(() => {
        document.querySelector('body').classList.remove('transitionIn');
        refreshState();
    }, 1000);
}

function refreshState() {
    url.hash = ""
    history.replaceState(null, null, url.href);
}