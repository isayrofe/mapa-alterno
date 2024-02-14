import {ChangeDetectorRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Component } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-leafmap',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    RouterModule
  ],
  templateUrl: './leafmap.component.html',
  styleUrl: './leafmap.component.css'
})
export class LeafmapComponent {
mobileQuery: MediaQueryList;
isHandset$: any;
isMenuOpen = true;
events: string[] = [];
opened: boolean = true;

private _mobileQueryListener: () => void;
constructor(private changeDetectorRef: ChangeDetectorRef, private mediaMatcher: MediaMatcher, private breakpointObserver: BreakpointObserver) {
  this.mobileQuery = this.mediaMatcher.matchMedia('(max-width: 600px)');
  this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
  this.mobileQuery.addListener(this._mobileQueryListener);

}
ngOnDestroy(): void {
  this.mobileQuery.removeListener(this._mobileQueryListener);
}
ngOnInit() {
  this.breakpointObserver.observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait])
  .subscribe(result => {
    if (result.matches) {
      this.isMenuOpen = false; // Cerrar el menú en dispositivos móviles
    } else {
      this.isMenuOpen = true; // Mantener el menú abierto en otros dispositivos
    }
  });

}

}
