// TODO : add a polyfill for URL API

const slingshot = () => {

    const url = new URL(window.location.href) // using URL API : https://developer.mozilla.org/en-US/docs/Web/API/URL

    let classNames = {
        transitionIn: 'transitionIn', 
        transitionOut: 'transitionOut',
    }

    let animationDuration = 1000  // Animation duration (ms)
    let targetSelector = '.delay' // Target description

    // Check if we're coming from a current 
    // Add correct description
    document.addEventListener('DOMContentLoaded', () => {
        getHashUrl()
        init()
    });

    // Check if we're coming from a slingshot link 
    function getHashUrl() {
        if (url.hash == '#delay')
            pageTransitionIn()
    }

    // Launching the transition when the page enters
    // Refreshing the state after the animation ends
    function pageTransitionIn() {
        document.querySelector('body').classList.add(classNames.transitionIn)
        setTimeout(() => {
            document.querySelector('body').classList.remove(classNames.transitionIn)
            refreshState()
        }, animationDuration)
    }

    // Removing the #delay to correctly reload the state after the animation
    function refreshState() {
        url.hash = ""
        history.replaceState(null, null, url.href)
    }

    function goToUrl(href) {
        window.location.href = href
    }

    // Main description 

    function init() {
        let links = document.querySelectorAll(targetSelector);

        links.forEach(link => {
            link.addEventListener('click', event => {
                event.preventDefault();

                // Retreiving the href attribute of the link
                let path = link.getAttribute('href');

                // Check if the clicked link has an anchor
                // or is the current page
                if (path != url.pathname && link.hash == "") {

                    // Launching the transition when the page enters
                    document.querySelector('body').classList.add(classNames.transitionOut);

                    setTimeout(() => {

                        // It adds a #delay at the end of path
                        url.pathname = path;
                        url.hash = "delay";

                        // The new contructed url to go to
                        goToUrl(url.href);

                    }, animationDuration);
                } else {
                    goToUrl(path);
                }
            })
        })
    }

    return init
}

// export singleton
const singleton = slingshot()

export default singleton