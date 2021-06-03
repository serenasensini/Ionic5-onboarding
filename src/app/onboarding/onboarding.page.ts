import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {Router} from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  constructor(public storage: NativeStorage, public router: Router) {
    this.storage.getItem('skipped').then((val) => {
      console.log('skipped:');
      console.log(val);
      if (val){
        this.router.navigate(['/home']);
      }
    }, reason => {
      console.log(reason);
    });
  }

  ngOnInit() {
  }

  next() {
    this.slides.slideNext();
  }

  skip() {
    this.storage.setItem('skipped', true).then(() => {
      this.router.navigate(['/home']);
    }, reason => {
      console.log(reason);
      this.router.navigate(['/home']);
    });
  }
}
