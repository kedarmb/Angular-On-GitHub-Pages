import { Component, OnInit } from '@angular/core';
import {SpeechRecognitionService} from '../service/speech-recognition.service';

@Component({
  selector: 'app-speech-recognition',
  templateUrl: './speech-recognition.component.html',
  styleUrls: ['./speech-recognition.component.scss']
})
export class SpeechRecognitionComponent implements OnInit {

  showSearchButton: boolean;
  speechData: string;

  constructor(private speechRecognitionService: SpeechRecognitionService) {
    this.showSearchButton = false
    this.speechData = '';
  }

  ngOnInit() {
    console.log('hello')
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
              console.log(value);
            },
            // errror
            (err) => {
              console.log(err);
              if (err.error == 'no-speech') {
                console.log('--restatring service--');
                this.activateSpeechSearchMovie();
              }
            },
            // completion
            () => {
              this.showSearchButton = true;
              console.log('--complete--');
            //  this.activateSpeechSearchMovie();
            });
  }
}
