import { Injectable } from '@angular/core';
import { OperationType } from '../constants/operation-type';
import { PaymentTemplatesService } from './template/payment-templates.service';
import { ITemplatesService } from './template/itemplates.service';
import { P2pTemplatesService } from './template/p2p-templates.service';
import { PaymentGroupsService } from './template/payment-groups.service';
import { P2pGroupsService } from './template/p2p-groups.service';
import { IGroupsService } from './template/igroups.service';

@Injectable({
    providedIn: 'root',
})
export class OperationTypeManagementService {
    constructor(
        private paymentTemplateService: PaymentTemplatesService,
        private p2pTemplatesService: P2pTemplatesService,
        private paymentGroupsService: PaymentGroupsService,
        private p2pGroupsService: P2pGroupsService
    ) {}

    findTemplateService(type: OperationType): ITemplatesService {
        switch (type) {
            case OperationType.Payment:
                return this.paymentTemplateService;
            case OperationType.PeerToPeer:
                return this.p2pTemplatesService;
            default:
                throw new Error(`Unknown type of operations: ${type}`);
        }
    }

    findGroupService(type: OperationType): IGroupsService {
        switch (type) {
            case OperationType.Payment:
                return this.paymentGroupsService;
            case OperationType.PeerToPeer:
                return this.p2pGroupsService;
            default:
                throw new Error(`Unknown type of operations: ${type}`);
        }
    }
}
