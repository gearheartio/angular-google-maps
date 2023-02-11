import { Directive, Input, Self } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FitBoundsAccessor, FitBoundsDetails, FitBoundsService } from '../services/fit-bounds';
/**
 * Adds the given directive to the auto fit bounds feature when the value is true.
 * To make it work with you custom AGM component, you also have to implement the {@link FitBoundsAccessor} abstract class.
 * @example
 * <agm-marker [agmFitBounds]="true"></agm-marker>
 */
var AgmFitBounds = /** @class */ (function () {
    function AgmFitBounds(_fitBoundsAccessor, _fitBoundsService) {
        this._fitBoundsAccessor = _fitBoundsAccessor;
        this._fitBoundsService = _fitBoundsService;
        /**
         * If the value is true, the element gets added to the bounds of the map.
         * Default: true.
         */
        this.agmFitBounds = true;
        this._destroyed$ = new Subject();
        this._latestFitBoundsDetails = null;
    }
    /**
     * @internal
     */
    AgmFitBounds.prototype.ngOnChanges = function () {
        this._updateBounds();
    };
    /**
     * @internal
     */
    AgmFitBounds.prototype.ngOnInit = function () {
        var _this = this;
        this._fitBoundsAccessor
            .getFitBoundsDetails$()
            .pipe(distinctUntilChanged(function (x, y) {
            return x.latLng.lat === y.latLng.lat && x.latLng.lng === y.latLng.lng;
        }), takeUntil(this._destroyed$))
            .subscribe(function (details) { return _this._updateBounds(details); });
    };
    /*
     Either the location changed, or visible status changed.
     Possible state changes are
     invisible -> visible
     visible -> invisible
     visible -> visible (new location)
    */
    AgmFitBounds.prototype._updateBounds = function (newFitBoundsDetails) {
        // either visibility will change, or location, so remove the old one anyway
        if (this._latestFitBoundsDetails) {
            this._fitBoundsService.removeFromBounds(this._latestFitBoundsDetails.latLng);
            // don't set latestFitBoundsDetails to null, because we can toggle visibility from
            // true -> false -> true, in which case we still need old value cached here
        }
        if (newFitBoundsDetails) {
            this._latestFitBoundsDetails = newFitBoundsDetails;
        }
        if (!this._latestFitBoundsDetails) {
            return;
        }
        if (this.agmFitBounds === true) {
            this._fitBoundsService.addToBounds(this._latestFitBoundsDetails.latLng);
        }
    };
    /**
     * @internal
     */
    AgmFitBounds.prototype.ngOnDestroy = function () {
        this._destroyed$.next();
        this._destroyed$.complete();
        if (this._latestFitBoundsDetails !== null) {
            this._fitBoundsService.removeFromBounds(this._latestFitBoundsDetails.latLng);
        }
    };
    AgmFitBounds.ctorParameters = function () { return [
        { type: FitBoundsAccessor, decorators: [{ type: Self }] },
        { type: FitBoundsService }
    ]; };
    AgmFitBounds.decorators = [
        { type: Directive, args: [{
                    selector: '[agmFitBounds]',
                },] }
    ];
    AgmFitBounds.ctorParameters = function () { return [
        { type: FitBoundsAccessor, decorators: [{ type: Self }] },
        { type: FitBoundsService }
    ]; };
    AgmFitBounds.propDecorators = {
        agmFitBounds: [{ type: Input }]
    };
    return AgmFitBounds;
}());
export { AgmFitBounds };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZml0LWJvdW5kcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvZml0LWJvdW5kcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBZ0MsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRS9GOzs7OztHQUtHO0FBQ0g7SUFhRSxzQkFDMkIsa0JBQXFDLEVBQzdDLGlCQUFtQztRQUQzQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQzdDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFYdEQ7OztXQUdHO1FBQ00saUJBQVksR0FBRyxJQUFJLENBQUM7UUFFckIsZ0JBQVcsR0FBa0IsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUNqRCw0QkFBdUIsR0FBNEIsSUFBSSxDQUFDO0lBSzdELENBQUM7SUFFSjs7T0FFRztJQUNILGtDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsK0JBQVEsR0FBUjtRQUFBLGlCQVdDO1FBVkMsSUFBSSxDQUFDLGtCQUFrQjthQUNwQixvQkFBb0IsRUFBRTthQUN0QixJQUFJLENBQ0gsb0JBQW9CLENBQ2xCLFVBQUMsQ0FBbUIsRUFBRSxDQUFtQjtZQUN2QyxPQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRztRQUE5RCxDQUE4RCxDQUNqRSxFQUNELFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQzVCO2FBQ0EsU0FBUyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7Ozs7O01BTUU7SUFDTSxvQ0FBYSxHQUFyQixVQUFzQixtQkFBc0M7UUFDMUQsMkVBQTJFO1FBQzNFLElBQUksSUFBSSxDQUFDLHVCQUF1QixFQUFFO1lBQ2hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0Usa0ZBQWtGO1lBQ2xGLDJFQUEyRTtTQUM1RTtRQUVELElBQUksbUJBQW1CLEVBQUU7WUFDdkIsSUFBSSxDQUFDLHVCQUF1QixHQUFHLG1CQUFtQixDQUFDO1NBQ3BEO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUNqQyxPQUFPO1NBQ1I7UUFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxFQUFFO1lBQzlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3pFO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsa0NBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QixJQUFJLElBQUksQ0FBQyx1QkFBdUIsS0FBSyxJQUFJLEVBQUU7WUFDekMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM5RTtJQUNILENBQUM7O2dCQTlEOEMsaUJBQWlCLHVCQUE3RCxJQUFJO2dCQUMrQixnQkFBZ0I7OztnQkFmdkQsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7aUJBQzNCOzs7Z0JBVlEsaUJBQWlCLHVCQXNCckIsSUFBSTtnQkF0QnFDLGdCQUFnQjs7OytCQWdCM0QsS0FBSzs7SUFxRVIsbUJBQUM7Q0FBQSxBQTdFRCxJQTZFQztTQTFFWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgRml0Qm91bmRzQWNjZXNzb3IsIEZpdEJvdW5kc0RldGFpbHMsIEZpdEJvdW5kc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9maXQtYm91bmRzJztcblxuLyoqXG4gKiBBZGRzIHRoZSBnaXZlbiBkaXJlY3RpdmUgdG8gdGhlIGF1dG8gZml0IGJvdW5kcyBmZWF0dXJlIHdoZW4gdGhlIHZhbHVlIGlzIHRydWUuXG4gKiBUbyBtYWtlIGl0IHdvcmsgd2l0aCB5b3UgY3VzdG9tIEFHTSBjb21wb25lbnQsIHlvdSBhbHNvIGhhdmUgdG8gaW1wbGVtZW50IHRoZSB7QGxpbmsgRml0Qm91bmRzQWNjZXNzb3J9IGFic3RyYWN0IGNsYXNzLlxuICogQGV4YW1wbGVcbiAqIDxhZ20tbWFya2VyIFthZ21GaXRCb3VuZHNdPVwidHJ1ZVwiPjwvYWdtLW1hcmtlcj5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FnbUZpdEJvdW5kc10nLFxufSlcbmV4cG9ydCBjbGFzcyBBZ21GaXRCb3VuZHMgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgLyoqXG4gICAqIElmIHRoZSB2YWx1ZSBpcyB0cnVlLCB0aGUgZWxlbWVudCBnZXRzIGFkZGVkIHRvIHRoZSBib3VuZHMgb2YgdGhlIG1hcC5cbiAgICogRGVmYXVsdDogdHJ1ZS5cbiAgICovXG4gIEBJbnB1dCgpIGFnbUZpdEJvdW5kcyA9IHRydWU7XG5cbiAgcHJpdmF0ZSBfZGVzdHJveWVkJDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgX2xhdGVzdEZpdEJvdW5kc0RldGFpbHM6IEZpdEJvdW5kc0RldGFpbHMgfCBudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAU2VsZigpIHByaXZhdGUgcmVhZG9ubHkgX2ZpdEJvdW5kc0FjY2Vzc29yOiBGaXRCb3VuZHNBY2Nlc3NvcixcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9maXRCb3VuZHNTZXJ2aWNlOiBGaXRCb3VuZHNTZXJ2aWNlLFxuICApIHt9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5fdXBkYXRlQm91bmRzKCk7XG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9maXRCb3VuZHNBY2Nlc3NvclxuICAgICAgLmdldEZpdEJvdW5kc0RldGFpbHMkKClcbiAgICAgIC5waXBlKFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZChcbiAgICAgICAgICAoeDogRml0Qm91bmRzRGV0YWlscywgeTogRml0Qm91bmRzRGV0YWlscykgPT5cbiAgICAgICAgICAgIHgubGF0TG5nLmxhdCA9PT0geS5sYXRMbmcubGF0ICYmIHgubGF0TG5nLmxuZyA9PT0geS5sYXRMbmcubG5nLFxuICAgICAgICApLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkJCksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKGRldGFpbHMgPT4gdGhpcy5fdXBkYXRlQm91bmRzKGRldGFpbHMpKTtcbiAgfVxuXG4gIC8qXG4gICBFaXRoZXIgdGhlIGxvY2F0aW9uIGNoYW5nZWQsIG9yIHZpc2libGUgc3RhdHVzIGNoYW5nZWQuXG4gICBQb3NzaWJsZSBzdGF0ZSBjaGFuZ2VzIGFyZVxuICAgaW52aXNpYmxlIC0+IHZpc2libGVcbiAgIHZpc2libGUgLT4gaW52aXNpYmxlXG4gICB2aXNpYmxlIC0+IHZpc2libGUgKG5ldyBsb2NhdGlvbilcbiAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlQm91bmRzKG5ld0ZpdEJvdW5kc0RldGFpbHM/OiBGaXRCb3VuZHNEZXRhaWxzKSB7XG4gICAgLy8gZWl0aGVyIHZpc2liaWxpdHkgd2lsbCBjaGFuZ2UsIG9yIGxvY2F0aW9uLCBzbyByZW1vdmUgdGhlIG9sZCBvbmUgYW55d2F5XG4gICAgaWYgKHRoaXMuX2xhdGVzdEZpdEJvdW5kc0RldGFpbHMpIHtcbiAgICAgIHRoaXMuX2ZpdEJvdW5kc1NlcnZpY2UucmVtb3ZlRnJvbUJvdW5kcyh0aGlzLl9sYXRlc3RGaXRCb3VuZHNEZXRhaWxzLmxhdExuZyk7XG4gICAgICAvLyBkb24ndCBzZXQgbGF0ZXN0Rml0Qm91bmRzRGV0YWlscyB0byBudWxsLCBiZWNhdXNlIHdlIGNhbiB0b2dnbGUgdmlzaWJpbGl0eSBmcm9tXG4gICAgICAvLyB0cnVlIC0+IGZhbHNlIC0+IHRydWUsIGluIHdoaWNoIGNhc2Ugd2Ugc3RpbGwgbmVlZCBvbGQgdmFsdWUgY2FjaGVkIGhlcmVcbiAgICB9XG5cbiAgICBpZiAobmV3Rml0Qm91bmRzRGV0YWlscykge1xuICAgICAgdGhpcy5fbGF0ZXN0Rml0Qm91bmRzRGV0YWlscyA9IG5ld0ZpdEJvdW5kc0RldGFpbHM7XG4gICAgfVxuICAgIGlmICghdGhpcy5fbGF0ZXN0Rml0Qm91bmRzRGV0YWlscykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5hZ21GaXRCb3VuZHMgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuX2ZpdEJvdW5kc1NlcnZpY2UuYWRkVG9Cb3VuZHModGhpcy5fbGF0ZXN0Rml0Qm91bmRzRGV0YWlscy5sYXRMbmcpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2Rlc3Ryb3llZCQubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3llZCQuY29tcGxldGUoKTtcbiAgICBpZiAodGhpcy5fbGF0ZXN0Rml0Qm91bmRzRGV0YWlscyAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fZml0Qm91bmRzU2VydmljZS5yZW1vdmVGcm9tQm91bmRzKHRoaXMuX2xhdGVzdEZpdEJvdW5kc0RldGFpbHMubGF0TG5nKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==