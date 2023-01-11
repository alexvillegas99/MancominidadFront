import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PlacaService } from 'app/services/placa.service';
import { info } from 'console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  placaForm = this.fb.group({
    placa: ['' ,[Validators.required]]
  })
  constructor(
    private fb:FormBuilder,
    private _placaService:PlacaService
  ) {
    
  }

  ngOnInit(): void {
  
  }
  
  consulta(){
    console.log(this.placaForm.value)
    this._placaService.buscarPlacaConsulta(this.placaForm.value).subscribe((result)=>{
      console.log(result)
      let titulo="";
      let texto="";
      if(result.length===0){
        titulo="Placa no encontrada";
        texto="Estimado usuario, su placa aún no se encuentra registrada";
      }else if(!result[0].estado){
        titulo="Placa en espera";
        texto=`Requisitos para retirar la placa: Cedula original y matricula del propietario vehículo`;
      }else{
        titulo="Placa retirada";
        texto="Estimado usuario, su placa fue retirada";
      }
      Swal.fire({
        title: titulo,
        text:texto,
        icon:'info',
        confirmButtonText: "Aceptar",
      })
    })

    
  }
 
}
