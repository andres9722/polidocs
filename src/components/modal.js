const d = document, c = console.log

export const createCustomElement = (element,attributes,children) => {
  let customElement = document.createElement(element);
  if (children !== undefined) children.forEach(el => {
    if (el.nodeType) {
      if (el.nodeType === 1 || el.nodeType === 11) customElement.appendChild(el);
    } else {
      customElement.innerHTML += el;
    }
  });
  addAttributes(customElement,attributes);
  return customElement;
};

const addAttributes = (element, attrObj) => {
  for (let attr in attrObj) {
    if (attrObj.hasOwnProperty(attr)) element.setAttribute(attr,attrObj[attr])
  }
}

export const printModal = content => {
  const modalContentEl = createCustomElement('div', {
    id: 'uploader-content',
    class: 'uploader-content'
  }, [content]),
    modalContainerEl = createCustomElement('div', {
      id: 'profile-update__container',
      class: 'profile-update__container'
    }, [modalContentEl])

    d.body.appendChild(modalContainerEl)
}

export const removeModal = () => d.body.removeChild(modalContainerEl);




