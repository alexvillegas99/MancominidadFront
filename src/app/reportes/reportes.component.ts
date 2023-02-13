import { Component, OnInit } from "@angular/core";
import {
  NgbModalConfig,
  NgbModal,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import $ from "jquery";
import { PlacaService } from "app/services/placa.service";
import { TipoPlacaService } from "app/services/tipo-placa.service";
import { TipoVehiculoService } from "app/services/tipo-vehiculo.service";
import { TipoPlaca } from "app/models/tipo_placa.interface";
import { TipoVehiculo } from "app/models/tipo_vehiculo.interface";
import { Placa } from "app/models/placa.interface";
import { elementAt } from "rxjs/operators";
import { ActasService } from "app/services/actas.service";
import { ReporteActas } from "app/models/actas.interface";

@Component({
  selector: "app-reportes",
  templateUrl: "./reportes.component.html",
  styleUrls: ["./reportes.component.css"],
})
export class ReportesComponent implements OnInit {
  tiposPlacas: TipoPlaca[] = [];
  tipoVehiculos: TipoVehiculo[] = [];
  fecha: any;
  usuario = localStorage.getItem("userName");
  fechaInicio = undefined;
  fechaFin = undefined;
  estadoPlaca: string = "";
  //////////
  actas: ReporteActas[] = [];
  actasFiltradas: ReporteActas[] = [];
  constructor(
    config: NgbModalConfig,
    private _modalService: NgbModal,
    private _placasService: PlacaService,
    private _tipoPlacaService: TipoPlacaService,
    private _tipoVehiculoService: TipoVehiculoService,
    private _actasService: ActasService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = "static";
    config.keyboard = false;
  }
  modal: NgbModalRef;
  tipoVehiculo: string = "";
  tipoPlaca: string = "";
  placas: Placa[] = [];
  placasFiltradas: Placa[] = [];
  ngOnInit(): void {
    this.getTipoPlaca();
    this.getTipoVehiculo();
    this.getPlacas();
    this.getActas();
  }
  open(content): void {
    this.getFecha();
    this.getPlacas();
    this.modal = this._modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      size: "lg",
      centered: true,
    });
    this.modal.result.then((result) => {});
  }
  cerrarModal() {
    this.modal.close();
    this.resetVariablesPlacas();
  }
  resetPlacas() {
    this.resetVariablesPlacas();
    this.placasFiltradas = this.placas;
  }
  resetVariablesPlacas() {
    this.tipoVehiculo = "";
    this.tipoPlaca = "";
    this.fechaInicio = undefined;
    this.fechaFin = undefined;
    this.estadoPlaca = "";
  }
  getTipoVehiculo() {
    this._tipoVehiculoService.getTipoVehiculo().subscribe((result) => {
      this.tipoVehiculos = result;
    });
  }
  getTipoPlaca() {
    this._tipoPlacaService.getTipoPlaca().subscribe((result) => {
      this.tiposPlacas = result;
    });
  }
  getPlacas() {
    this._placasService.getPlacas().subscribe((result) => {
      this.placasFiltradas = this.placas = result;
    });
  }
  getFecha() {
    this.fecha = new Date();
  }
  encabezadoPlacas: string[] = [
    "#",
    "Placa",
    "Usario modifico",
    "Fecha ingreso",
    "Fecha modificación",
  ];
  encabezadoActas: string[] = [
    "#",
    "Acta",
    "Cedula",
    "Nombre",
    "Placa",
    "Detalle",
    "Fecha",
  ];
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

      var imgData = canvas.toDataURL("image/png", 1);
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

      pdf.save("document");
    });
  }
  filtroPlacas() {
    this.placasFiltradas = this.placas;
    this.tipoVehiculo != "" ? this.filtroTipoVehiculoPlacas() : "";
    this.tipoPlaca != "" ? this.filtroTipoPlacaPlacas() : "";
    this.estadoPlaca != "" ? this.filtroEstadoPlacas() : "";
    this.buscarPlacasPorFechas();
  }
  filtroTipoPlacaPlacas() {
  
    this.placasFiltradas = this.placasFiltradas.filter(
      (element) => element.tipo_placa === this.tipoPlaca
    );
  }
  filtroTipoVehiculoPlacas() {
    this.placasFiltradas = this.placasFiltradas.filter(
      (element) => element.tipo_vehiculo === this.tipoVehiculo
    );
  }
  filtroEstadoPlacas() {
    const estado = this.estadoPlaca === "Entregada" ? 1 : 0;
    this.placasFiltradas = this.placasFiltradas.filter(
      (element) => Number(element.estado) === estado
    );
  }
  buscarPlacasPorFechas() {
    if (this.fechaInicio != undefined && this.fechaFin != undefined) {
      this.placasFiltradas = this.placasFiltradas.filter(
        (element) =>
          new Date(element.fecha_ingreso.toString().substring(0, 10)) >=
            new Date(this.fechaInicio) &&
          new Date(element.fecha_ingreso.toString().substring(0, 10)) <=
            new Date(this.fechaFin) && 
            new Date(element.fecha_modificacion.toString().substring(0, 10)) >=
            new Date(this.fechaInicio) &&
          new Date(element.fecha_modificacion.toString().substring(0, 10)) <=
            new Date(this.fechaFin)
      );
    } else if (this.fechaInicio != undefined) {
      this.placasFiltradas = this.placasFiltradas.filter(
        (element) =>
          new Date(element.fecha_ingreso.toString().substring(0, 10)) >=
          new Date(this.fechaInicio) &&
          new Date(element.fecha_modificacion.toString().substring(0, 10)) >=
          new Date(this.fechaInicio)
      );
    }
  }
  getActas() {
    this._actasService.getActasReportes().subscribe((result) => {
      this.actas = this.actasFiltradas = result;
     
    });
  }

  filtroActas() {
    this.actasFiltradas = this.actas;
    this.tipoVehiculo != "" ? this.filtroTipoVehiculoActas() : "";
    this.tipoPlaca != "" ? this.filtroTipoPlacaActas() : "";
    this.buscarActasPorFechas();
  }
  filtroTipoPlacaActas() {
    this.actasFiltradas = this.actasFiltradas.filter(
      (element) => element.tipo_placa === this.tipoPlaca
    );
  }
  filtroTipoVehiculoActas() {
    this.actasFiltradas = this.actasFiltradas.filter(
      (element) => element.tipo_vehiculo === this.tipoVehiculo
    );
  }

  buscarActasPorFechas() {
    if (this.fechaInicio != undefined && this.fechaFin != undefined) {
      this.actasFiltradas = this.actasFiltradas.filter(
        (element) =>
          new Date(element.fecha_modificacion.toString().substring(0, 10)) >=
            new Date(this.fechaInicio) &&
          new Date(element.fecha_modificacion.toString().substring(0, 10)) <=
            new Date(this.fechaFin) 
            
      );
    } else if (this.fechaInicio != undefined) {
      this.actasFiltradas = this.actasFiltradas.filter(
        (element) =>
          new Date(element.fecha_modificacion.toString().substring(0, 10)) >=
          new Date(this.fechaInicio)
      );
    }
  }
}
