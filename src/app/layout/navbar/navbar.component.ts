import { SpeechRecognitionService } from '../../shared/core/service/speech-recognition.service';
import { SearchSubscriberService } from '../../shared/core/service/search-subscriber.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html', 
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    private listTitles: any[];
    location: Location;
      mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;


    showSearchButton: boolean;
    speechData: string;
    enableNavigation = false;

    constructor(location: Location,  private element: ElementRef,
                private router: Router, private searchSubscriberService: SearchSubscriberService,
                private speechRecognitionService: SpeechRecognitionService) {
      this.location = location;
          this.sidebarVisible = false;
        this.showSearchButton = false
        this.speechData = '';
    }

    ngOnInit() {
      this.listTitles = ROUTES.filter(listTitle => listTitle);
      console.log('list titles are : ', this.listTitles);
      //
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
      this.router.events.subscribe((event) => {
        this.sidebarClose();
         const $layer: any = document.getElementsByClassName('close-layer')[0];
         if ($layer) {
           $layer.remove();
           this.mobile_menu_visible = 0;
         }
     });
    }
    logout(){
        this.router.navigateByUrl('/login');
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function() {
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    }    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    }    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        const $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        const $layer = document.createElement('div');
        if (this.mobile_menu_visible === 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function() {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function() {
                $toggle.classList.add('toggled');
            }, 430);


            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function() {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function() { // asign a function
              body.classList.remove('nav-open');
              this.mobile_menu_visible = 0;
              $layer.classList.remove('visible');
              setTimeout(function() {
                  $layer.remove();
                  $toggle.classList.remove('toggled');
              }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    }
    getTitle() {
      let titlee = this.location.prepareExternalUrl(this.location.path());
      if (titlee.charAt(0) === '#') {
          titlee = titlee.slice( 1 );
      }

      for (let item = 0; item < this.listTitles.length; item++) {
          if (this.listTitles[item].path === titlee) {
              return this.listTitles[item].title;
          }
      }
    //   return 'Dashboard';
      return '';
    }





    ngOnDestroy() {
        this.speechRecognitionService.DestroySpeechObject();
    }

    stopSpeech() {
        this.showSearchButton = false;
        this.speechRecognitionService.DestroySpeechObject();
    }

    activateSpeechSearchMovie(): void {
        this.showSearchButton = true;
        this.speechRecognitionService.record()
            .subscribe(
                // listener
                (value) => {
                    this.speechData += ' ' + value;

                     if (this.enableNavigation) {
                    this.navigate(value);
                     }
                    console.log(value);
                },
                // errror
                (err) => {
                    console.log(err);
                    if (err.error == 'no-speech') {
                        console.log('--restatring service--');
                        //this.activateSpeechSearchMovie();
                    }
                },
                // completion
                () => {
                    this.showSearchButton = false;
                    console.log('--complete--');
                    //  this.activateSpeechSearchMovie();
                });
    }

    navigate(value) {
        if (value && value.toLowerCase().indexOf('dashboard') !== -1) {
            console.log('dashboard');
            this.router.navigateByUrl('dashboard');
        } else  if (value && value.toLowerCase().indexOf('analytics') !== -1) {
            console.log('analytics');
            this.router.navigateByUrl('analytics');
        } else  if (value && (value.toLowerCase().indexOf('organisation') !== -1 || value.toLowerCase().indexOf('organization') !== -1)) {
            console.log('organization');
            this.router.navigateByUrl('organization');
        } else  if (value && value.toLowerCase().indexOf('user') !== -1) {
            console.log('user');
            this.router.navigateByUrl('user');
        } else  if (value && value.toLowerCase().indexOf('crew') !== -1) {
            console.log('crew');
            this.router.navigateByUrl('crew');
        } else  if (value && value.toLowerCase().indexOf('tender') !== -1) {
            console.log('tender');
            this.router.navigateByUrl('tender');
        }
    }
    search() {
        this.searchSubscriberService.set(this.speechData);
    }
}




// import {
//     animate,
//     state,
//     style,
//     transition,
//     trigger
//   } from '@angular/animations';

//   import { AfterViewInit, Component,  OnInit, HostBinding } from '@angular/core';
//   import { fromEvent } from 'rxjs';
//   import {
//     distinctUntilChanged,
//     filter,
//     map,
//     pairwise,
//     share,
//     throttleTime
//   } from 'rxjs/operators';

  
// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html', 
//   styleUrls: ['./navbar.component.scss']
// })
// export class NavbarComponent implements ngAfterViewInit {
//     private isVisible = true;

//   @HostBinding('@toggle')
//   get toggle(): VisibilityState {
//     return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden;
//   }

//   ngAfterViewInit() {
//     const scroll$ = fromEvent(window, 'scroll').pipe(
//       throttleTime(10),
//       map(() => window.pageYOffset),
//       pairwise(),
//       map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
//       distinctUntilChanged(),
//       share()
//     );

//     const goingUp$ = scroll$.pipe(
//       filter(direction => direction === Direction.Up)
//     );

//     const goingDown$ = scroll$.pipe(
//       filter(direction => direction === Direction.Down)
//     );

//     goingUp$.subscribe(() => (this.isVisible = true));
//     goingDown$.subscribe(() => (this.isVisible = false));
//   }
// }