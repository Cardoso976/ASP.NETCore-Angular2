import { ProgressService } from './../../services/progress.service';
import { PhotoService } from './../../services/photo.service';
import { ToastyService } from 'ng2-toasty';
import { VehicleService } from '../../services/vehicle.service';
import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild('fileInput') fileInput : any;
  vehicle: any;
  vehicleId: number = 0;
  photos: any[] = [];
  progress: any;

  constructor(
    private zone: NgZone,
    private route: ActivatedRoute, 
    private router: Router,
    private toasty: ToastyService,
    private progressService: ProgressService,
    private photoService: PhotoService,
    private vehicleService: VehicleService) { 

    route.params.subscribe(p => {
      this.vehicleId = +p['id'];
      if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate(['/vehicles']);
        return; 
      }
    });
  }

  ngOnInit() { 
    this.photoService.getPhotos(this.vehicleId)
      .subscribe(photos => this.photos = photos);

    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
        v => this.vehicle = v,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/vehicles']);
            return; 
          }
        });
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/vehicles']);
        });
    }
  }

  uploadPhoto() {
      this.progressService.startTracking()
        .subscribe((progress: any) => {          
          console.log(progress);
          this.zone.run(() => {
            this.progress = progress;
          });          
        },
        () => { this.progress = null; });
        
      var nativeElement: any = this.fileInput.nativeElement;
      var file = nativeElement.files[0];
      nativeElement.value = '';
      this.photoService.upload(this.vehicleId, file)
        .subscribe(photo => {
          this.photos.push(photo);
        },
      err => {
        if (typeof(window) !== 'undefined') {
          this.toasty.error({
              title: 'Error',
              msg: err.text(),
              showClose: true,
              timeout: 5000,
              theme: 'bootstrap' 
          });
      }
      });
  }
}
