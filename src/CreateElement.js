const CreateElement = (element, options, parent = '#player') => {
    const el = document.createElement(element);
    if (options) {
        for(let o in options) {
            el[o] = options[o];
        }
    }
    let root = document.querySelector(parent);
    root.appendChild(el);
    return;
}

export default CreateElement;