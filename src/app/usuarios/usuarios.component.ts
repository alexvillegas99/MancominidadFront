import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  NgbModal,
  NgbModalConfig,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { Roles } from "app/models/roles.interface";
import { Usuario } from "app/models/usuario.interface";
import { NotificacionService } from "app/services/notificacion.service";
import { RolesService } from "app/services/roles.service";
import { UsuariosService } from "app/services/usuarios.service";
import Swal from "sweetalert2";
declare var $: any;
@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.css"],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  modal: NgbModalRef;
  usuarioSeleccionado: Usuario = undefined;
  page = 1;
  pageSize = 10;
  roles: Roles[] = [];
  buscar: string = "";
  rol = localStorage.getItem("rol");
  constructor(
    private config: NgbModalConfig,
    private _usuariosService: UsuariosService,
    private _modalService: NgbModal,
    private fb: FormBuilder,
    private _notificacion: NotificacionService,
    private _rolesServices: RolesService
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }
  usuarioForm = this.fb.group(
    {
      user: ["", [Validators.required, Validators.minLength(6)]],
      pass: ["", [Validators.required, Validators.minLength(6)]],
      id_rol: ["", [Validators.required]],
      estado: ["", [Validators.required]],
    }
  
  );
  encabezados: string[] = [
    "#",
    "Usuario",
    "Rol",
    "Estado"
  ];

  ngOnInit(): void {
    this.getUsuarios();
    this.getRoles();
  }
  getRoles() {
    this._rolesServices.getRoles().subscribe((result) => {
      this.roles = result;
    });
  }
  getUsuarios() {
    this._usuariosService.getUsuarios().subscribe((result) => {
      this.usuariosFiltrados = this.usuarios = result;
    });
  }
  open(content, usuario?: Usuario): void {
    this.usuarioSeleccionado = usuario;
    if (this.usuarioSeleccionado != null) {
      let posicion;
      for (let index = 0; index < this.roles.length; index++) {
        this.roles[index].rol === this.usuarioSeleccionado.rol
          ? (posicion = index)
          : "";
      }
      this.usuarioForm.controls.id_rol.setValue(this.roles[posicion].id);
      this.usuarioForm.controls.estado.setValue(
        this.usuarioSeleccionado.estado ? true : false
      );
      this.usuarioForm.controls.user.setValue(
        this.usuarioSeleccionado.user
      );
      this.usuarioForm.controls.pass.setValue(this.usuarioSeleccionado.pass);
    } else {
      this.usuarioForm.controls.estado.setValue(true);
      this.usuarioForm.controls.id_rol.setValue(this.roles[0].id);
    }
    this.modal = this._modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      size: "lg",
      centered: true,
    });
    this.modal.result.then((result) => {
      this.usuarioForm.reset();
    });
  }
  cerrarModal() {
    this.modal.close();
    this.usuarioForm.reset();
    this.usuarioSeleccionado = undefined;
  }

  async cambiarEstado(id: number, estado: boolean) {
    estado = !estado;
    const modificar = {
      estado: estado,
    };
    Swal.fire({
      title: estado ? "Habilitar Usuario?" : "Deshabilitar  Usuario?",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        this._usuariosService.editUsuario(id, modificar).subscribe(
          (result) => {
            this.getUsuarios();
            //Mostrando alerta de eliminación
            this._notificacion.showNotification(
              "Usuario modificado",
              "success"
            );
            this.cerrarModal();
          },
          (err) => {
            this._notificacion.mensajeError(err);
          }
        );
      }
    });
  }
  saveUsuario() {
    if (this.usuarioSeleccionado === undefined) {
      this._usuariosService.saveUsuario(this.usuarioForm.value).subscribe(
        (result) => {
          this.getUsuarios();
          if (result.message === "Ok") {
            this._notificacion.showNotification(
              "El usuario a sido agregado correctamente",
              "success"
            );
            this.cerrarModal();
            return;
          }
        },
        (err) => {
          this._notificacion.mensajeError(err);
        }
      );
    } else {
      this._usuariosService
        .editUsuario(this.usuarioSeleccionado.id, this.usuarioForm.value)
        .subscribe(
          (result) => {
            this.getUsuarios();
            if (result.message === "Ok") {
              this._notificacion.showNotification(
                "El usuario a sido actualizado correctamente",
                "success"
              );
              this.cerrarModal();
              return;
            }
          },
          (err) => {
            this._notificacion.mensajeError(err);
          }
        );
    }
  }
  
  buscarUsuarios() {
    if (this.buscar === "") {
      this.usuariosFiltrados = this.usuarios;
      return;
    }
    this._usuariosService.buscarUsuario(this.buscar).subscribe((result) => {
      this.usuariosFiltrados = result;
    });
  }
}
