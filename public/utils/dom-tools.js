function makeElementWithText(tag, textContent) {
    const el = document.createElement(tag)
    el.textContent = textContent;
    return el;
}


export {makeElementWithText}