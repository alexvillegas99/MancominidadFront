import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import $ from "jquery";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Actas } from "app/models/actas.interface";
import { ActasService } from "app/services/actas.service";
import { NotificacionService } from "app/services/notificacion.service";
@Component({
  selector: "app-actas-entrega",
  templateUrl: "./actas-entrega.component.html",
  styleUrls: ["./actas-entrega.component.css"],
})
export class ActasEntregaComponent implements OnInit {
  @ViewChild("pdfTable") pdfTable: ElementRef;
  constructor(
    private _modalService: NgbModal,
    private _actasService: ActasService,
    private _notificacion: NotificacionService
  ) {}
  actas: Actas[];
  actasFiltradas: Actas[] = [];
  actaSeleccionada: Actas = undefined;
  nombre = "";
  cedula = "";
  numero_placa = "";
  numero_acta = "";
  cantidad = "";
  detalle = "";
  mes = "";
  dia = "";
  anio = "";
  usuario = "";
  buscar = "";
  modal: NgbModalRef;
  page = 1;
  pageSize = 10;
  rol = localStorage.getItem("rol");
  encabezados: string[] = [
    "#",
    "Numero acta",
    "Detalle",
    "Placa",
    "Nombre",
    "Cedula",
    "Fecha",
    "Usuario Tramito",
  ];
  ngOnInit(): void {
    this.getActas();
  }
  getActas() {
    this._actasService.getActas().subscribe((result) => {
      this.actasFiltradas = this.actas = result;
    });
  }
  getPDF() {
    const nombre: string = `ACTA N° B0D-${this.mes.toUpperCase()}-${
      this.numero_acta
    }-${this.anio}`;
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

      pdf.save(nombre);
    });
  }

  open(content, acta?: Actas): void {
    this.actaSeleccionada = acta;
    if (this.actaSeleccionada != undefined) {
      this.nombre = this.actaSeleccionada.nombre;
      this.cedula = this.actaSeleccionada.cedula;
      this.numero_placa = this.actaSeleccionada.numero_placa;
      this.cantidad = this.actaSeleccionada.cantidad;
      this.detalle = this.actaSeleccionada.detalle;
      this.mes = this.actaSeleccionada.mes;
      this.dia = this.actaSeleccionada.dia;
      this.anio = this.actaSeleccionada.anio;
      this.usuario = this.actaSeleccionada.user;
      this.numero_acta = this.actaSeleccionada.numero_acta;
    } else {
      const resultado = this.actas.sort((a, b) => {
        return Number.parseInt(b.numero_acta) - Number.parseInt(a.numero_acta);
      });
      this.numero_acta = String(Number(resultado[0].numero_acta) + 1);
      const date = new Date();
      this.anio = date.getFullYear().toString();
      this.dia = date.getDate().toString();
      this.mes = new Intl.DateTimeFormat("es-ES", { month: "long" }).format(
        new Date()
      );
    }
    this.modal = this._modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      size: "lg",
      centered: true,
    });
    this.modal.result.then((result) => {});
  }
  cerrarModal() {
    this.modal.close();
    this.actaSeleccionada = undefined;
    this.nombre = "";
    this.cedula = "";
    this.numero_placa = "";
    this.cantidad = "";
    this.detalle = "";
    this.mes = "";
    this.dia = "";
    this.anio = "";
    this.usuario = "";
    this.numero_acta = "";
  }
  buscarActas() {
    if (this.buscar === "") {
      this.actasFiltradas = this.actas;
      return;
    }
    this._actasService.buscarActa(this.buscar).subscribe((result) => {
      this.actasFiltradas = result;
    });
  }
  guardarActa() {
    if (
      this.nombre != "" &&
      this.cedula != "" &&
      this.numero_acta != "" &&
      this.cantidad != "" &&
      this.detalle != ""
    ) {
      const object = {
        nombre: this.nombre,
        cedula: this.cedula,
        numero_acta: this.numero_acta,
        numero_placa: this.numero_placa,
        cantidad: this.cantidad,
        detalle: this.detalle,
        anio: this.anio,
        mes: this.mes,
        dia: this.dia,
        usuario: localStorage.getItem("userId"),
      };
      this._actasService.saveActa(object).subscribe((result) => {
        this.getActas();
        this.cerrarModal();
      });
    } else {
      this._notificacion.showNotification("Completar los datos", "danger");
    }
  }
}
