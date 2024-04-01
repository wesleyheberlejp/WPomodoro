import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefasDiariasComponent } from './tarefas-diarias.component';

describe('TarefasDiariasComponent', () => {
  let component: TarefasDiariasComponent;
  let fixture: ComponentFixture<TarefasDiariasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarefasDiariasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TarefasDiariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
