$(function () { autosize($("textarea.auto-growth")), $(".datetimepicker").bootstrapMaterialDatePicker({ format: "dddd DD MMMM YYYY - HH:mm", clearButton: !0, weekStart: 1 }), $(".datepicker").bootstrapMaterialDatePicker({ format: "dddd DD MMMM YYYY", clearButton: !0, weekStart: 1, time: !1 }), $(".timepicker").bootstrapMaterialDatePicker({ format: "HH:mm", clearButton: !0, date: !1 }) });