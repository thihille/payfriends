/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IllustratorFriendComponent } from './illustrator-friend.component';

describe('IllustratorFriendComponent', () => {
  let component: IllustratorFriendComponent;
  let fixture: ComponentFixture<IllustratorFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IllustratorFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustratorFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
