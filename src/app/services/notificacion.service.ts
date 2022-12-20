import { Injectable } from "@angular/core";
declare var $: any;
@Injectable({
  providedIn: "root",
})
export class NotificacionService {
  constructor() {}

  mensajeError(err) {
    console.log(err.error.message);
    this.showNotification(err.error.message, "danger");
  }
  showNotification(message, color) {
    let icon;
    color === "success" ? (icon = "pe-7s-check") : "";
    color === "danger" ? (icon = "pe-7s-close") : "";
    color === "warning" ? (icon = "pe-7s-attention") : "";
    color === "info" ? (icon = "pe-7s-info") : "";
    $.notify(
      {
        icon: icon,
        message: message,
      },
      {
        type: color,
        timer: 1000,
        placement: {
          from: "top",
          align: "right",
        },
      }
    );
  }
}
