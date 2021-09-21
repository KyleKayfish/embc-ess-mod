import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  ClothingReferral,
  FoodGroceriesReferral,
  FoodRestaurantReferral,
  IncidentalsReferral,
  LodgingBilletingReferral,
  LodgingGroupReferral,
  LodgingHotelReferral,
  Referral,
  Support,
  TransportationOtherReferral,
  TransportationTaxiReferral
} from 'src/app/core/api/models';
import { EvacuationFileModel } from 'src/app/core/models/evacuation-file.model';

@Component({
  selector: 'app-ess-file-supports',
  templateUrl: './ess-file-supports.component.html',
  styleUrls: ['./ess-file-supports.component.scss']
})
export class EssFileSupportsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  supportList: Support[];
  supports = new MatTableDataSource([]);
  supports$: Observable<Support[]>;
  essFile: EvacuationFileModel;

  constructor(private router: Router, private cd: ChangeDetectorRef) {
    if (this.router.getCurrentNavigation() !== null) {
      if (this.router.getCurrentNavigation().extras.state !== undefined) {
        const state = this.router.getCurrentNavigation().extras.state as {
          file: EvacuationFileModel;
        };
        this.essFile = state.file;
        this.supportList = state.file.supports;
        console.log(state.file.supports);
      }
    }
  }

  ngOnInit(): void {
    this.supports = new MatTableDataSource(this.supportList);
    this.supports.paginator = this.paginator;
    this.supports$ = this.supports.connect();
  }

  ngAfterViewInit(): void {
    this.supports.paginator = this.paginator;
    this.cd.detectChanges();
  }

  getGroceryReferral(selectedSupport: Support): FoodGroceriesReferral {
    return selectedSupport as FoodGroceriesReferral;
  }

  getMealReferral(selectedSupport: Support): FoodRestaurantReferral {
    return selectedSupport as FoodRestaurantReferral;
  }

  getTaxiReferral(selectedSupport: Support): TransportationTaxiReferral {
    return selectedSupport as TransportationTaxiReferral;
  }

  getOtherReferral(selectedSupport: Support): TransportationOtherReferral {
    return selectedSupport as TransportationOtherReferral;
  }

  getHotelReferral(selectedSupport: Support): LodgingHotelReferral {
    return selectedSupport as LodgingHotelReferral;
  }

  getBilletingReferral(selectedSupport: Support): LodgingBilletingReferral {
    return selectedSupport as LodgingBilletingReferral;
  }

  getGroupReferral(selectedSupport: Support): LodgingGroupReferral {
    return selectedSupport as LodgingGroupReferral;
  }

  getIncidentalReferral(selectedSupport: Support): IncidentalsReferral {
    return selectedSupport as IncidentalsReferral;
  }

  getClothingReferral(selectedSupport: Support): ClothingReferral {
    return selectedSupport as ClothingReferral;
  }

  getReferral(selectedSupport: Support): Referral {
    return selectedSupport as Referral;
  }

  // getSupplierAddress(selectedSupport: Support): AddressModel {
  //   return referral?.supplierAddress as AddressModel;
  // }

  mapMemberName(memberId: string): string {
    const memberObject = this.essFile?.householdMembers.find((value) => {
      if (value?.id === memberId) {
        return value;
      }
    });
    return memberObject?.lastName + ',' + memberObject?.firstName;
  }
}
