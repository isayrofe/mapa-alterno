import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LeafmapComponent } from './leafmap/leafmap.component';
import { MapaComponent } from './leafmap/mapa/mapa.component';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: '',
                component: LeafmapComponent,
                children: [
                    {
                        path: 'mapa',
                        component: MapaComponent
                    }
                ]
            }
        ]
    },
    
];
