import { route } from './router';

async function postFormDataAsJson({ url, formData }) {
  const plainFormData = Object.fromEntries(formData.entries());
  const formDataJsonString = JSON.stringify(plainFormData);

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: formDataJsonString,
  };

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
}

route('/', 'home', function() {
this.title = 'Example 1';
  this.$on('#form', 'submit', async function (event) {
    event.preventDefault();
    const form = event.currentTarget;
    const url = form.action;

    try {
      const formData = new FormData(form);
      const responseData = await postFormDataAsJson({ url, formData });
      document.location.replace('/#/success')
      console.log({ responseData });
    } catch (error) {
      var el = document.getElementById('id');
      el.style.color = "red";
      el.style.display = "block";
      el.innerHTML = JSON.parse(error.message).message
      console.error(error)
    }
  });
});

route('/success', 'succeed', function () {
  this.$on('.my-button', 'click', () => {
    document.location.replace('/')
  });
});


route('*', '404', function () {});

