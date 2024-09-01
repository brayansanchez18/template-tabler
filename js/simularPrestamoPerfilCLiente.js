/* -------------------------------------------------------------------------- */
/*                      CALCULAR TABLA DE AMORTIZACIONES                      */
/* -------------------------------------------------------------------------- */

$("#btnCalcularCuota").on("click", function () {
  // console.log("Calcular cuota");
  $("#tablaCalculoCuotas").html("");
  /* -------------------------------------------------------------------------- */
  /*                            CAPTURAMOS LOS DATOS                            */
  /* -------------------------------------------------------------------------- */
  var perfil = $("#perfilClientePrestamo").val();
  var fecha = $(".fechaDesembolso").val();
  var monto = $(".montoPrestamo").val();
  var periodo = $(".periodoPrestamo").val();
  var interes = $(".interesPrestamo").val();
  var plazo = $(".plazoPrestamo").val();
  interes = interes / 100;
  var datostabla = [];
  var fecha2;
  var totalcuotas = 0;
  var interesMulta = $(".interesMulta").val();

  /* -------------------------------------------------------------------------- */
  /*                            CALCULAMOS EL PERIODO                           */
  /* -------------------------------------------------------------------------- */

  /* -------------------------- CALCULAMOS EL PERIODO ------------------------- */

  if (fecha && monto && periodo && interes && plazo && perfil && interesMulta) {
    console.log(interesMulta);
    if (perfil == "cliente") {
      /* -------------------------------------------------------------------------- */
      /*                              CALCULAR LA CUOTA                             */
      /* -------------------------------------------------------------------------- */

      var cuota = (
        monto *
        (interes / (1 - Math.pow(1 + interes, plazo * -1)))
      ).toFixed(2);

      /* ---------------------------- CALCULAR LA CUOTA --------------------------- */

      var saldoinicial = monto;

      /* -------------------------------------------------------------------------- */
      /*                             GENERAMOS EL ARRAY                             */
      /* -------------------------------------------------------------------------- */

      datostabla.push({
        nCutoa: "0",
        montoCuota: "0",
        capital: "0",
        interes: "0",
        saldo: saldoinicial,
        fechaPago: fecha,
      });

      for (let i = 0; i < plazo; i++) {
        /* -------------------------- se calcula el interes ------------------------- */

        var interes_tabla = (saldoinicial * interes).toFixed(2);

        /* ---- el abono a capital es la amortizacion menos el interes del ciclo ---- */

        var abono_capital = (cuota - interes_tabla).toFixed(2);

        var saldo_final = (saldoinicial - abono_capital).toFixed(2);

        fecha2 = moment(fecha).add(periodo, "days").format("YYYY-MM-DD");

        datostabla.push({
          nCutoa: i + 1,
          montoCuota: cuota,
          capital: abono_capital,
          interes: interes_tabla,
          saldo: saldo_final,
          fechaPago: fecha2,
        });

        saldoinicial = saldo_final;
        fecha = fecha2;
      }

      /* --------------------------- GENERAMOS EL ARRAY --------------------------- */
    } else {
      /* -------------------------------------------------------------------------- */
      /*                              CALCULAR LA CUOTA                             */
      /* -------------------------------------------------------------------------- */

      var montointeres = monto * interes;
      var montoConInteres = Number(monto) + montointeres;
      var cuota = montoConInteres / plazo;

      var saldoinicial = montoConInteres;

      /* -------------------------------------------------------------------------- */
      /*                             GENERAMOS EL ARRAY                             */
      /* -------------------------------------------------------------------------- */

      datostabla.push({
        nCutoa: "0",
        montoCuota: "0",
        capital: "0",
        interes: "0",
        saldo: saldoinicial,
        fechaPago: fecha,
      });

      for (let i = 0; i < plazo; i++) {
        /* -------------------------- se calcula el interes ------------------------- */

        var interes_tabla = 0;

        /* ---- el abono a capital es la amortizacion menos el interes del ciclo ---- */

        var abono_capital = (cuota - 0).toFixed(2);

        var saldo_final = (saldoinicial - abono_capital).toFixed(2);

        fecha2 = moment(fecha).add(periodo, "days").format("YYYY-MM-DD");

        datostabla.push({
          nCutoa: i + 1,
          montoCuota: cuota,
          capital: abono_capital,
          interes: interes_tabla,
          saldo: saldo_final,
          fechaPago: fecha2,
        });

        saldoinicial = saldo_final;
        fecha = fecha2;
      }
    }

    /* -------------------------------------------------------------------------- */
    /*                             IMPRIMIMOS LA TABLA                            */
    /* -------------------------------------------------------------------------- */

    datostabla.forEach((element) => {
      totalcuotas = totalcuotas + Number(element["montoCuota"]);
      $("#tablaCalculoCuotas").append(
        "<tr>" +
          '<td class="text-center">' +
          element["nCutoa"] +
          "</td>" +
          '<td class="text-center">$' +
          element["montoCuota"] +
          "</td>" +
          '<td class="text-center">$' +
          element["capital"] +
          "</td>" +
          '<td class="text-center">$' +
          element["interes"] +
          "</td>" +
          '<td class="text-center">$' +
          element["saldo"] +
          "</td>" +
          '<td class="text-center">' +
          element["fechaPago"] +
          "</td>" +
          "</tr>"
      );
    });

    monto = Number(monto);
    var totalInteres = totalcuotas - monto;

    $("#tablaCalculoCuotas").append(
      "<tr>" +
        '<td colspan="5" class="strong text-end">' +
        "Total Prestamo:" +
        "</td>" +
        '<td class="text-end">MX$ ' +
        monto.toFixed(2) +
        "</td>" +
        "</tr>" +
        "<tr>" +
        '<td colspan="5" class="strong text-end">' +
        "Total Interes (" +
        $(".interesPrestamo").val() +
        "%):" +
        "</td>" +
        '<td class="text-end">MX$ ' +
        totalInteres.toFixed(2) +
        "</td>" +
        "</tr>" +
        "<tr>" +
        '<td colspan="5" class="font-weight-bold text-uppercase text-end">' +
        "Total a Pagar:" +
        "</td>" +
        '<td class="font-weight-bold text-end">' +
        "MX$ " +
        totalcuotas.toFixed(2) +
        "</td>" +
        "</tr>" +
        "<tr>" +
        '<td colspan="6" class="strong text-end">' +
        '<div class="btn-group">' +
        '<button class="btn btn-danger">Imprimir Estado <span><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-file-type-pdf" style="margin-left:2px;"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" /><path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" /><path d="M17 18h2" /><path d="M20 15h-3v6" /><path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" /></svg></span></button>' +
        '<button class="btn btn-primary">Crear Prestamo <span><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-checkbox" style="margin-left:2px;"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 11l3 3l8 -8" /><path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" /></svg></span></button>' +
        "</div>" +
        "</td>" +
        "</tr>"
    );

    /* --------------------------- IMPRIMIMOS LA TABLA -------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                           MOSTRAMOS LOS DETALLES                           */
    /* -------------------------------------------------------------------------- */

    /* ------------------------- MOSTRAMOS LOS DETALLES ------------------------- */
  } else {
    toastr.options = {
      closeButton: true,
      newestOnTop: false,
      progressBar: true,
      positionClass: "toast-top-right",
      preventDuplicates: false,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };

    toastr.error("ERROR: Todos los campos son obligatorios");
  }
});
