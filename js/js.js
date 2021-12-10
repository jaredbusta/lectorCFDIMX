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
        $("#proveedor").val(data.emisor);
        $("#no_factura").val(data.folio);
        $("#fecha_dia").val(data.fecha);
        $.each(data.productos, (i, v) => {
          $("table tbody").append(`
            <tr>
                <td> <input type='text' class='form-control' value='${v.Descripcion}'/></td>
                <td> <select class='form-control' > <option>categoria aqui</option> </select> </td>
                <td> <input type='text' class='form-control' value='${v.ValorUnitario}'/></td>
                <td> <input type='text' class='form-control' value='${v.Cantidad}'/></td>
                <td> <input type='text' class='form-control' value='${v.Descuento}'/></td>
                <td> 
                  <input type="checkbox" class='chk_iva' data-id='${v.id}'  />
                  <select class='form-control' id='slc_imp_${v.id}'   > <option> 16% </option><option>8%</option> </select>
                </td>
            </tr>
          `);
        });
      },
    });
    e.preventDefault();
  });

});
