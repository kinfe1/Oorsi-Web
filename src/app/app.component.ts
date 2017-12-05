import { Component , ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './css/vendor/bs/bootstrap.min.css',
    './css/vendor/socicon.min.css',
    './css/my_theme.css',
    './css/vendor/font-awesome/css/font-awesome.min.css'
  ],
   encapsulation: ViewEncapsulation.None
})
export class AppComponent {
}

