$(document).ready(function () {
  $("#form").submit(function (e) {
    $.ajax({
      url: $(this).attr("action"),
      type: "POST",
      dataType: "json",
      data: new FormData(this),
      processData: false,
      contentType: false,
      success: function (data) {
        $("#emisor").val(data.emisor);
        $("#folio").val(data.folio);
        $.each(data.productos, (i, v) => {
          $("table tbody").append(`
            <tr>
                <td> <input type='text' class='form-control' value='${v.Descripcion}'/></td>
                <td> <input type='text' class='form-control' value='${v.ValorUnitario}'/></td>
                <td> <input type='text' class='form-control' value='${v.Cantidad}'/></td>
                <td> <input type='text' class='form-control' value='${v.Descuento}'/></td>
            </tr>
          `);
        });
      },
    });
    e.preventDefault();
  });
});
