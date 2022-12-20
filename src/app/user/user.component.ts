import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Usuario } from "app/models/usuario.interface";
import { UsuariosService } from "app/services/usuarios.service";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalConfig,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { NotificacionService } from "app/services/notificacion.service";
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  modal: NgbModalRef;
  constructor(
    private fb: FormBuilder,
    private _usuarioService: UsuariosService,
    private _modalService: NgbModal,
    private _notificacion: NotificacionService
  ) {}
  activar: boolean = true;
  perfilForm = this.fb.group({
    user: ["", [Validators.required]],
    id_rol: ["", [Validators.required]]
  });

  CambioClaveForm = this.fb.group(
    {
      claveActual: ["", [Validators.required, Validators.minLength(6)]],
      nuevaClave: ["", [Validators.required, Validators.minLength(6)]],
      repetirClave: ["", [Validators.required, Validators.minLength(6)]],
    },
    { validators: this.checkPassword }
  );

  checkPassword(group: FormGroup): any {
    const pass = group.controls.nuevaClave?.value;
    const confirmarPass = group.controls.repetirClave?.value;
    return pass === confirmarPass ? null : { notSame: true };
  }

  cerrarModal() {
    this.modal.close();
    this.CambioClaveForm.reset();
  }

  ngOnInit() {
    this.getPerfil();
  }

  getPerfil() {
    let userId = localStorage.getItem("userId");
    this._usuarioService.getUsuario(userId).subscribe((result) => {
      this.perfilForm.controls.id_rol.setValue(result.rol);
      this.perfilForm.controls.user.setValue(result.user);
    });
  }

  cambiarEstado() {
    this.activar = !this.activar;
    this.guardarUsuario();
  }
  cancelar() {
    this.activar = true;
    this.getPerfil();
  }
  guardarUsuario() {
   
    const user = this.perfilForm.get("user").value;
    const UsuarioGuardar = {
      user: user,
    };

    this._usuarioService
      .editUsuario(Number(localStorage.getItem("userId")), UsuarioGuardar)
      .subscribe((result) => {
        this.getPerfil();
      localStorage.setItem('usuario', String(user));
      });
      
  }

  open(content): void {
    this.modal = this._modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      size: "sm",
      centered: true,
    });
    this.modal.result.then((result) => {});
  }
  
  cambiarClave() {
    const cambiar = {
      id: localStorage.getItem("userId"),
      clave: this.CambioClaveForm.get("claveActual").value,
      nueva: this.CambioClaveForm.get("nuevaClave").value,
    };
    this._usuarioService.cambiarContraseña(cambiar).subscribe((result)=>{
      this.cerrarModal();
      this._notificacion.showNotification("Contraseña actualizada","success")
    },
    (err) => {
      this._notificacion.mensajeError(err);
    })
  }
}
