$(document).ready(function () {
  $("form:first").submit(async (e) => {
    e.preventDefault();
    let usuario = $("form:first input:first").val();
    let url = $("form:first input:last").val();
    let descripcion = $("form:first textarea").val();
    if(validarDatos(usuario, url, descripcion)){
    const { data } = await axios.post("/post", {
      usuario,
      url,
      descripcion,
    });
    $("#creado").removeClass("d-none");
    getPosts();}
  });
});
// window.onload = getPosts();
async function getPosts() {
  const { data } = await axios.get("/posts");
  $(".posts").html("");
  $.each(data, (i, u) => {
    $(".posts").append(`
      <div class="card col-12 col-sm-4 d-inline mx-0 px-3">
        <div class="card-body  p-0">
          <img
            class="card-img-top"
            src="${u.url}"
            style="width: 100%"
          />
          <div class="p-3">
            <h4 class="card-title">${u.usuario}</h4>
            <p class="card-text">
              ${u.descripcion}
            </p>
            ${
              u.likes
                ? `<svg
              id="Heart"
              style="width: 50px; height: 50px"
              viewBox="0 0 24 24"
              onclick="like(${u.id})"
            >
              <path
                fill="red"
                d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
              />
            </svg>`
                : `
              <svg
              id="heart"
              style="width: 50px; height: 50px"
              viewBox="0 0 24 24"
              onclick="like(${u.id})"
            >
              <path
                fill="currentColor"
                d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z"
              />
            </svg>`
            } 
            <h5 class="d-inline"> ${u.likes || 0} </h6>
          </div>
        </div>
      </div>
    `);
  });
}
getPosts();//PERMITE QUE SE CARGUEN LOS DATOS AL INICIAR

function like(id) {
  axios.put(`/post?id=${id}`).then(() => {
    getPosts();
  });
}
function validarDatos(usuario, url, descripcion) {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  if (usuario.trim() === "" || url.trim() === "" || descripcion.trim() === "") {
    toastAlert("Todos los campos son obligatorios");
    return false;
  } else if (!urlRegex.test(url.trim())) {
    toastAlert("La URL ingresada no es válida");
    return false;
  }
  
  return true;
}
function toastAlert(message) {
  $("#toastContainer").empty();
  const toast = `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="5000">
    <div class="toast-header">
      <strong class="me-auto">Alert</strong>
      <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>  </div>
    <div class="toast-body">
      ${message}
    </div>
    </div>`;
  $("#toastContainer").append(toast);
  $(".toast").toast("show");
  $("#exampleModal").modal("hide");
}