function getNoUISliderValue(_, e) { _.noUiSlider.on("update", function () { var a = _.noUiSlider.get(); e && (a = parseInt(a), a += "%"), $(_).parent().find("span.js-nouislider-value").text(a) }) } $(function () { $(".colorpicker").colorpicker(), Dropzone.options.frmFileUpload = { paramName: "file", maxFilesize: 2 }; var _ = $(".demo-masked-input"); _.find(".date").inputmask("dd/mm/yyyy", { placeholder: "__/__/____" }), _.find(".time12").inputmask("hh:mm t", { placeholder: "__:__ _m", alias: "time12", hourFormat: "12" }), _.find(".time24").inputmask("hh:mm", { placeholder: "__:__ _m", alias: "time24", hourFormat: "24" }), _.find(".datetime").inputmask("d/m/y h:s", { placeholder: "__/__/____ __:__", alias: "datetime", hourFormat: "24" }), _.find(".mobile-phone-number").inputmask("+99 (999) 999-99-99", { placeholder: "+__ (___) ___-__-__" }), _.find(".phone-number").inputmask("+99 (999) 999-99-99", { placeholder: "+__ (___) ___-__-__" }), _.find(".money-dollar").inputmask("99,99 $", { placeholder: "__,__ $" }), _.find(".money-euro").inputmask("99,99 €", { placeholder: "__,__ €" }), _.find(".ip").inputmask("999.999.999.999", { placeholder: "___.___.___.___" }), _.find(".credit-card").inputmask("9999 9999 9999 9999", { placeholder: "____ ____ ____ ____" }), _.find(".email").inputmask({ alias: "email" }), _.find(".key").inputmask("****-****-****-****", { placeholder: "____-____-____-____" }), $("#optgroup").multiSelect({ selectableOptgroup: !0 }); var e = document.getElementById("nouislider_basic_example"); noUiSlider.create(e, { start: [30], connect: "lower", step: 1, range: { min: [0], max: [100] } }), getNoUISliderValue(e, !0); var a = document.getElementById("nouislider_range_example"); noUiSlider.create(a, { start: [32500, 62500], connect: !0, range: { min: 25e3, max: 1e5 } }), getNoUISliderValue(a, !1) });