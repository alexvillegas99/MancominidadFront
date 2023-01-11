import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import {
  NgbModal,
  NgbModalConfig,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { NotificacionService } from "app/services/notificacion.service";
import $ from "jquery";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Swal from "sweetalert2";
import { Placa } from "app/models/placa.interface";
import { PlacaService } from "app/services/placa.service";
import { TipoVehiculoService } from "app/services/tipo-vehiculo.service";
import { TipoPlacaService } from "app/services/tipo-placa.service";
import { TipoPlaca } from "app/models/tipo_placa.interface";
import { TipoVehiculo } from "app/models/tipo_vehiculo.interface";
@Component({
  selector: "app-placas",
  templateUrl: "./placas.component.html",
  styleUrls: ["./placas.component.css"],
})
export class PlacasComponent implements OnInit {
  modal: NgbModalRef;
  page = 1;
  pageSize = 10;
  placaSeleccionada: Placa = undefined;
  placas: Placa[] = [];
  placasFiltradas: Placa[] = [];
  idPlaca = null;
  buscar: string = "";
  tipoPlacas: TipoPlaca[] = [];
  tipoVehiculos: TipoVehiculo[] = [];
  constructor(
    private config: NgbModalConfig,
    private _modalService: NgbModal,
    private fb: FormBuilder,
    private _notificacion: NotificacionService,
    private _placaService: PlacaService,
    private _tipoVehiculoService: TipoVehiculoService,
    private _tipoPlacaService: TipoPlacaService
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }
  seleccion="Seleccione...";
  ngOnInit(): void {
    this.getPlacas();
    this.getTipoPlacas();
    this.getTipoVehiculo();
  }
  getTipoVehiculo() {
    this._tipoVehiculoService.getTipoVehiculo().subscribe((result) => {
      this.tipoVehiculos = result;
    });
  }
  getTipoPlacas() {
    this._tipoPlacaService.getTipoPlaca().subscribe((result) => {
      this.tipoPlacas = result;
    });
  }
  getPlacas() {
    this._placaService.getPlacas().subscribe((result) => {
      this.placasFiltradas = this.placas = result;
    });
  }
  buscarPlaca() {}
  imprimir() {
  }
  rol = localStorage.getItem("rol");
  placaForm = this.fb.group({
    placa: ["", Validators.required],
    id_tipo_placa: ["", Validators.required],
    id_tipo_vehiculo: ["", [Validators.required]],
    id_usuario_modifico: [""],
    estado: [""],
  });
  encabezados: string[] = [
    "#",
    "Placa",
    "Tipo de placa",
    "Tipo Vehículo",
    "estado",
    "Usario modifico",
    "Fecha ingreso",
    "Fecha modificación"
  ];
  open(content, placa?: Placa): void {
    this.placaSeleccionada = placa;
    if (this.placaSeleccionada != null) {
      this.idPlaca = this.placaSeleccionada.id;
      this.placaForm.controls.placa.setValue(this.placaSeleccionada.placa);

      this.tipoPlacas.forEach((element) => {
        if (element.tipo === this.placaSeleccionada.tipo_placa) {
          this.placaForm.controls.id_tipo_placa.setValue(element.id);

          return;
        }
      });

      this.tipoVehiculos.forEach((element) => {
        if (element.tipo === this.placaSeleccionada.tipo_vehiculo) {
          this.placaForm.controls.id_tipo_vehiculo.setValue(element.id);
          return;
        }
      });
      this.placaForm.controls.estado.setValue(
        this.placaSeleccionada.estado ? true : false
      );
      
    } else {
      this.placaForm.controls.estado.setValue(false);
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
    this.placaForm.reset();
    this.placaSeleccionada = undefined;
  }

  eliminarPlaca(id: number) {
    Swal.fire({
      title: "Eliminar placa",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        this,
          this._placaService.deletePlaca(id).subscribe((result) => {
            if (result.message === "Ok") {
              this._notificacion.showNotification(
                "Placa eliminada exitosamente",
                "success"
              );

              this.getPlacas();
              this.cerrarModal();
              return;
            }
          });
      }
    });
  }
  guardar() {
    this.placaForm.controls.id_usuario_modifico.setValue(
      localStorage.getItem("userId")
    );
    if (this.placaSeleccionada === undefined) {
      this._placaService.savePlaca(this.placaForm.value).subscribe((result) => {
        if (result.message === "Ok") {
          this._notificacion.showNotification(
            "Placa guardada exitosamente",
            "success"
          );
          this.cerrarModal();
          this.getPlacas();
          return;
        }
      });
    } else {
      this._placaService
        .editPlaca(this.placaSeleccionada.id, this.placaForm.value)
        .subscribe((result) => {
          if (result.message === "Ok") {
            this._notificacion.showNotification(
              "Placa editada exitosamente",
              "success"
            );
            this.cerrarModal();
            this.getPlacas();
            return;
          }
        });
    }
  }
  buscarPlacas() {
    if (this.buscar === "") {
      this.placasFiltradas = this.placas;
      return;
    }
    this._placaService.buscarPlaca(this.buscar).subscribe((result) => {
      this.placasFiltradas = result;
    });
  }
}
