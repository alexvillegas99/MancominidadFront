import { Component, OnInit } from "@angular/core";
import { LocationStrategy, PlatformLocation, Location } from "@angular/common";
import { LegendItem, ChartType } from "../lbd/lbd-chart/lbd-chart.component";
import * as Chartist from "chartist";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  public emailChartType: ChartType;
  public emailChartData: any = null;
  public emailChartLegendItems: LegendItem[];

  public hoursChartType: ChartType;
  public hoursChartData: any;
  public hoursChartOptions: any;
  public hoursChartResponsive: any[];
  public hoursChartLegendItems: LegendItem[];

  public activityChartType: ChartType;
  public activityChartData: any;
  public activityChartOptions: any;
  public activityChartResponsive: any[];
  public activityChartLegendItems: LegendItem[];
  constructor(
    
  ) {}
  size = 0;
  ngOnChanges() {}
sociosMoraListado=[];
sociosSinMoraListado=[];
  public barChartDataInscritos = null;
  public barChartLabelsInscritos = [
    "Registros Validados",
    "Registros sin validar",
  ];

  ngOnInit() {
    this.emailChartType = ChartType.Pie;
    this.ActualizarDatos();

    this.emailChartLegendItems = [
      { title: "Placas entregadas", imageClass: "fa fa-circle text-info" },
      { title: "Placas sin entregar", imageClass: "fa fa-circle text-danger" },
    ];


    this.activityChartType = ChartType.Bar;
    this.activityChartData = {
      labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
      series: [
        [542, 443, 320, 542, 553]
      ],
    };
    this.activityChartOptions = {
      seriesBarDistance: 10,
      axisX: {
        showGrid: false,
      },
      height: "245px",
    };
    this.activityChartResponsive = [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            },
          },
        },
      ],
    ];
    this.activityChartLegendItems = [
      { title: "Tesla Model S", imageClass: "fa fa-circle text-info" },
      
    ];
  }
  socioConMora = 0;
  sociosSinMora = 0;
  ActualizarDatos() {
    this.socioConMora = 0;
    this.sociosSinMora = 0;
   
  setTimeout(() => {
this.llenarDatos();
  },500)
  }
  llenarDatos() {
    this.emailChartData = {
      labels: [this.sociosSinMora,  this.socioConMora],
      series: [this.sociosSinMora, this.socioConMora],
    };
  }
  
}
