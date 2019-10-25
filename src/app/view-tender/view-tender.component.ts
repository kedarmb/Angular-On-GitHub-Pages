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
                console.log('******************************', tender);
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


    trench(item) {
        const modalRef = this.modalService.open(TrenchModalComponent, {centered: true});
    }

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

    calculateVolume(item) {

        if (isNaN(item.trench.length)) {
            item.trench.length = 0;
        }
        if (isNaN(item.trench.height)) {
            item.trench.length = 0;
        }
        if (isNaN(item.trench.width)) {
            item.trench.length = 0;
        }
        if (isNaN(item.trench.diameter)) {
            item.trench.length = 0;
        }
        item.trench.cubeVolume = (item.trench.length * item.trench.height * item.trench.width).toFixed(2);
        item.trench.pipeVolume = (3.14 * (item.trench.diameter / 2) * item.trench.height).toFixed(2);
        item.trench.remaningVolume = (item.trench.cubeVolume - item.trench.pipeVolume).toFixed(2);

    }
    viewer(item) {
        this.router.navigateByUrl('/pdf-viewer/' + item.id);
    }
    addSection() {
        this.sections.push({name: 'Enter Section Name'});
    }
}
