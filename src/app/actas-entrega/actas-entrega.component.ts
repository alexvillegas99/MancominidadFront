import { Component, OnInit } from "@angular/core";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import $ from "jquery";
@Component({
  selector: "app-actas-entrega",
  templateUrl: "./actas-entrega.component.html",
  styleUrls: ["./actas-entrega.component.css"],
})
export class ActasEntregaComponent implements OnInit {
  constructor() {}
  nombre = "";
  cedula = "";
  numero_placa = "";
  cantidad = "";
  detalle = "";
  ngOnInit(): void {}
  getPDF() {
    var HTML_Width = $(".canvas_div_pdf").width();
    var HTML_Height = $(".canvas_div_pdf").height();
    var top_left_margin = 0;
    var PDF_Width = HTML_Width + top_left_margin * 2;
    var PDF_Height = PDF_Width * 1.5 + top_left_margin * 2;
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

    html2canvas($(".canvas_div_pdf")[0], { allowTaint: true }).then(function (
      canvas
    ) {
      canvas.getContext("2d");

      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      var pdf = new jsPDF("p", "pt", [PDF_Width, PDF_Height]);
      pdf.addImage(
        imgData,
        "JPG",
        top_left_margin,
        top_left_margin,
        canvas_image_width,
        canvas_image_height
      );

      for (var i = 1; i <= totalPDFPages; i++) {
        pdf.addPage(PDF_Width, PDF_Height);
        pdf.addImage(
          imgData,
          "JPG",
          top_left_margin,
          -(PDF_Height * i) + top_left_margin * 4,
          canvas_image_width,
          canvas_image_height
        );
      }

      pdf.save("HTML-Document.pdf");
    });
  }
 
}
