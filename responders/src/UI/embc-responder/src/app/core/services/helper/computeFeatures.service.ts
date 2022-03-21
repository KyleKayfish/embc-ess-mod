import { Injectable } from '@angular/core';
import { SupportSubCategory } from '../../api/models';
import {
  SelectedPathType,
  ETransferStatus,
  EtransferRequirementStatus,
  EtransferContent
} from '../../models/appBase.model';
import { EtransferFeaturesService } from './etransferfeatures.service';

@Injectable({
  providedIn: 'root'
})
export class ComputeFeaturesService {
  constructor(private featuresService: EtransferFeaturesService) {}

  execute() {
    this.computeEtransferStatus();
    this.computeEtransferEligibility();
    this.computeEtransferRequirementContent();
    // console.log(this.featuresService);
  }

  private computeEtransferEligibility() {
    this.featuresService.isRegistrantEtransferEligible =
      !this.featuresService?.selectedEvacueeInContext?.isMinor &&
      this.featuresService?.selectedEvacueeInContext?.authenticatedUser;
  }

  private computeEtransferStatus() {
    if (
      this.featuresService?.selectedUserPathway ===
        SelectedPathType.paperBased ||
      !this.featuresService.interacAllowed
    ) {
      this.featuresService.etransferStatus = ETransferStatus.unavailable;
    } else if (
      this.featuresService?.selectedSupport?.value ===
        SupportSubCategory.Lodging_Hotel ||
      this.featuresService?.selectedSupport?.value ===
        SupportSubCategory.Lodging_Billeting ||
      this.featuresService?.selectedSupport?.value ===
        SupportSubCategory.Lodging_Group ||
      this.featuresService?.selectedSupport?.value ===
        SupportSubCategory.Transportation_Other ||
      this.featuresService?.selectedSupport?.value ===
        SupportSubCategory.Transportation_Taxi
    ) {
      this.featuresService.etransferStatus = ETransferStatus.notAllowed;
    } else if (!this.featuresService?.isRegistrantEtransferEligible) {
      this.featuresService.etransferStatus = ETransferStatus.inEligible;
    } else {
      this.featuresService.etransferStatus = ETransferStatus.available;
    }
  }

  private computeEtransferRequirementContent() {
    const requirementContent: Array<EtransferRequirementStatus> =
      new Array<EtransferRequirementStatus>();

    for (const defaultVal of EtransferFeaturesService.etransferRequirementDefault) {
      if (defaultVal.statement === EtransferContent.isNotMinor) {
        requirementContent.push(
          Object.assign(new EtransferRequirementStatus(), {
            statement: EtransferContent.isNotMinor,
            status: !this.featuresService?.selectedEvacueeInContext?.isMinor
          })
        );
      } else if (defaultVal.statement === EtransferContent.bcServicesCard) {
        requirementContent.push(
          Object.assign(new EtransferRequirementStatus(), {
            statement: EtransferContent.bcServicesCard,
            status:
              this.featuresService?.selectedEvacueeInContext?.authenticatedUser
          })
        );
      } else {
        requirementContent.push(
          Object.assign(new EtransferRequirementStatus(), defaultVal)
        );
      }
    }
    this.featuresService.etransferRequirement = requirementContent;
  }
}
