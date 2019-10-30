import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {TrenchModalComponent} from '../modal/trench-modal/trench-modal.component';
import {CrewModalComponent} from '../modal/crew-modal/crew-modal.component';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, tap} from 'rxjs/operators';
import {NotifySubcontractorComponent} from '../modal/notify-subcontractor/notify-subcontractor.component';
import {CrewService} from '../service/crew.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TenderService} from '../service/tender.service';
import {Tender} from '../model/tender.model';
import {TenderItem} from '../model/tender-item.model';
import * as uuid from 'uuid';


@Component({
    selector: 'app-view-tender',
    templateUrl: './view-tender.component.html',
    styleUrls: ['./view-tender.component.scss']
})
export class ViewTenderComponent {

    accordion = {};

    crews = {}

    trench = {
        beading: {
            length: 0,
            height: 0,
            width: 0,
            boxVolume: 0,
            diameter: 0,
            pipeVolume: 0,
            density: 0,
            weight: 0
        },
        backfill: {
            height: 0,
            width: 0,
            length: 0,
            boxVolume: 0,
            density: 0,
            weight: 0
        }
    }

    tender: Tender = new Tender();
      sections = [{name: 'WATERMAIN'}, {name: 'RESOTRATION'}];
    model: any;
    searching = false;
    searchFailed = false;
    states = [];


    @ViewChild('instance', {static: true})
    instance: NgbTypeahead;

    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    constructor(private modalService: NgbModal, private crewService: CrewService,
                private activatedRoute: ActivatedRoute,
                private tenderService: TenderService, private router: Router) {
        this.activatedRoute.params.subscribe((params) => {
            this.tenderService.getTenderById(params.id).subscribe((tender) => {
                this.tender = JSON.parse(JSON.stringify(tender));
            })
        })
        this.crewService.getAll().subscribe((crews) => {
            crews.map((crew) => {
                this.crews[crew.name] = crew;
                this.states.push(crew.name);
            })
        })
    }


   /* trench(item) {
        const modalRef = this.modalService.open(TrenchModalComponent, {centered: true});
    }*/

    crew(item) {
        const modalRef = this.modalService.open(CrewModalComponent, {centered: true, size: 'lg'});
    }

    toggleCollapse(index) {
        this.accordion[index] = !this.accordion[index]
    }

    delete(item) {
        this.tender.items = this.tender.items.filter((v) => {
            if (v.id === item.id) {
                return false;
            } else {
                return true;
            }

        })
    }

    add() {
        const tenderItem = new TenderItem();
        tenderItem.id = uuid.v4();
        this.tender.items.unshift(tenderItem);
    }

    save() {
        if (this.tender.id) {
            this.tenderService.update(this.tender).subscribe(() => {
                this.tenderService.getTenderById(this.tender.id).subscribe((tender) => {
                    this.tender = tender;
                })
            })
        } else {
            this.tenderService.add(this.tender).subscribe(() => {
                this.tenderService.getTenderById(this.tender.id).subscribe((tender) => {
                    this.tender = tender;
                })
            })
        }

    }

    addSubitem(item) {
        item.subitems.unshift({name: '', unitPrice: 0, quantity: 0, totalPrice: 0});
    }

    deleteSubitem(item, index) {
        item.subitems.splice(index, 1);
    }

    public searchFunctionFactory(instance: any): (text: Observable<string>) => Observable<any[]> {


        const getCities = (text$: Observable<string>) => {

            const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
            const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !instance.isPopupOpen()));
            const inputFocus$ = this.focus$;

            return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
                map(term => (term === '' ? this.states
                    : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
            )
        }


        return getCities;
    }

    selectedItem(event, item) {
        item.equipments = this.crews[event.item] ? this.crews[event.item].equipments : [];
        item.labours = this.crews[event.item] ? this.crews[event.item].labours : [];
    }


    notify() {
        const modalRef = this.modalService.open(NotifySubcontractorComponent, {centered: true});
    }

    populateCrew(item) {
        this.crewService.getCrewByName(item.crew).subscribe((crew) => {
            if (crew) {
                item.equipments = crew.equipments;
                item.labours = crew.labours;
            }

        })
    }

    calculateTrench() {

        if (isNaN(this.trench.backfill.length)) {
            this.trench.backfill.length = 0;
        }
        if (isNaN(this.trench.backfill.height)) {
            this.trench.backfill.height = 0;
        }
        if (isNaN(this.trench.backfill.width)) {
           this.trench.backfill.width = 0;
        }
        if (isNaN(this.trench.backfill.density)) {
            this.trench.backfill.density = 0;
        }
        if (isNaN(this.trench.beading.width)) {
            this.trench.beading.width = 0;
        }

        if (isNaN(this.trench.beading.height)) {
            this.trench.beading.height = 0;
        }
        if (isNaN(this.trench.beading.length)) {
            this.trench.beading.length = 0;
        }

        if (isNaN(this.trench.beading.density)) {
            this.trench.beading.density = 0;
        }
        if (isNaN(this.trench.beading.diameter)) {
            this.trench.beading.diameter = 0;
        }

        this.trench.backfill.boxVolume = Math.floor((this.trench.backfill.length *
            this.trench.backfill.height *
            this.trench.backfill.width));
        this.trench.backfill.weight = Math.floor(this.trench.backfill.density * this.trench.backfill.boxVolume);
        this.trench.beading.boxVolume = Math.floor((this.trench.beading.length *
            this.trench.beading.height *
            this.trench.beading.width));
        this.trench.beading.pipeVolume = Math.floor((3.14 * (this.trench.beading.diameter / 2) * this.trench.beading.height));
        const remaningVolume = this.trench.beading.boxVolume - this.trench.beading.pipeVolume;
        this.trench.beading.weight = Math.floor(remaningVolume * this.trench.beading.density);


    }
    viewer(item) {
        this.router.navigateByUrl('/pdf-viewer/' + item.id);
    }
    addSection() {
        this.sections.push({name: 'Enter Section Name'});
    }
}
