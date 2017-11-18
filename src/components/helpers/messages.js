export const errorMsg = (msg, err) => {
  return `
    <div class="message-error">
        <p class="message-error__text"> Error: <b> ${msg} </b> </p>
    </div>
  `;
};

export const successMsg = msg => {
  return `
    <div class="message-success">
        <p class="message-success__text"> Éxito: <b> ${msg} </b> </p>
    </div>
  `;
};
