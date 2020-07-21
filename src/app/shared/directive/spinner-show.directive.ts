import { SpinnerService } from '@shared/service/spinner.service';
import { Directive, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appSpinnerShown]'
})
export class SpinnerShowDirective implements OnInit, OnDestroy {

  private sub$: Subscription;

  constructor(
    private spinnerService: SpinnerService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  public ngOnInit(): void {
    this.sub$ = this.spinnerService.status$.subscribe(
      isLoading => this.render(isLoading)
    );
  }

  public ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  private render(isLoading: boolean): void {
    if (isLoading) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
