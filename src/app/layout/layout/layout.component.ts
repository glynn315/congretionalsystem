import { Component } from '@angular/core';
import { NavigationComponent } from "../../shared/navigation/navigation.component";
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-layout',
  imports: [NavigationComponent, RouterOutlet,HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
