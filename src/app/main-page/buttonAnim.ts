import {
    trigger,
    state,
    style,
    animate,
    transition
  } from '@angular/animations';

  export const Animation = {
     buttonAnim : trigger('isLoading', [
        state('true', style({
          transform: 'scale(0.5)',         
        })),
        state('false',   style({
          transform: 'scale(1)',
        })),
        transition('false => true', animate('1000ms ease-in')),
        transition('true => false', animate('100ms ease-out'))
      ]),
    hideAnim : trigger('hide',[
      state('false',style({
        opacity : 0,
      })),
        state('true',style({
          opacity : 1,
        })),
        transition('false => true', animate('0.5s ease-in')),
        transition('true => false', animate('0.5s ease-out'))
    ])
    
    };

  