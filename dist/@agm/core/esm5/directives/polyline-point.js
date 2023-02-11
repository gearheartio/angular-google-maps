import { Directive, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { FitBoundsAccessor } from '../services/fit-bounds';
/**
 * AgmPolylinePoint represents one element of a polyline within a  {@link
 * AgmPolyline}
 */
var AgmPolylinePoint = /** @class */ (function () {
    function AgmPolylinePoint() {
        /**
         * This event emitter gets emitted when the position of the point changed.
         */
        this.positionChanged = new EventEmitter();
    }
    AgmPolylinePoint.prototype.ngOnChanges = function (changes) {
        if (changes['latitude'] || changes['longitude']) {
            var position = {
                lat: changes['latitude'] ? changes['latitude'].currentValue : this.latitude,
                lng: changes['longitude'] ? changes['longitude'].currentValue : this.longitude,
            };
            this.positionChanged.emit(position);
        }
    };
    /** @internal */
    AgmPolylinePoint.prototype.getFitBoundsDetails$ = function () {
        return this.positionChanged.pipe(startWith({ lat: this.latitude, lng: this.longitude }), map(function (position) { return ({ latLng: position }); }));
    };
    AgmPolylinePoint.decorators = [
        { type: Directive, args: [{
                    selector: 'agm-polyline-point',
                    providers: [
                        { provide: FitBoundsAccessor, useExisting: forwardRef(function () { return AgmPolylinePoint; }) },
                    ],
                },] }
    ];
    AgmPolylinePoint.ctorParameters = function () { return []; };
    AgmPolylinePoint.propDecorators = {
        latitude: [{ type: Input }],
        longitude: [{ type: Input }],
        positionChanged: [{ type: Output }]
    };
    return AgmPolylinePoint;
}());
export { AgmPolylinePoint };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWxpbmUtcG9pbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3BvbHlsaW5lLXBvaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUU3RyxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWhELE9BQU8sRUFBRSxpQkFBaUIsRUFBb0IsTUFBTSx3QkFBd0IsQ0FBQztBQUU3RTs7O0dBR0c7QUFDSDtJQXNCRTtRQUxBOztXQUVHO1FBQ08sb0JBQWUsR0FBZ0MsSUFBSSxZQUFZLEVBQWlCLENBQUM7SUFFNUUsQ0FBQztJQUVoQixzQ0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQy9DLElBQU0sUUFBUSxHQUFrQjtnQkFDOUIsR0FBRyxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVE7Z0JBQzNFLEdBQUcsRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTO2FBQzlELENBQUM7WUFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDckM7SUFDSCxDQUFDO0lBRUQsZ0JBQWdCO0lBQ2hCLCtDQUFvQixHQUFwQjtRQUNFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQzlCLFNBQVMsQ0FBQyxFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFDLENBQUMsRUFDcEQsR0FBRyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsQ0FBQyxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUMsQ0FBQyxFQUFwQixDQUFvQixDQUFDLENBQ3RDLENBQUM7SUFDSixDQUFDOztnQkF4Q0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFNBQVMsRUFBRTt3QkFDVCxFQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxnQkFBZ0IsRUFBaEIsQ0FBZ0IsQ0FBQyxFQUFDO3FCQUM5RTtpQkFDRjs7OzsyQkFLRSxLQUFLOzRCQUtMLEtBQUs7a0NBS0wsTUFBTTs7SUFxQlQsdUJBQUM7Q0FBQSxBQXpDRCxJQXlDQztTQW5DWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExhdExuZ0xpdGVyYWwgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL2dvb2dsZS1tYXBzLXR5cGVzJztcbmltcG9ydCB7IEZpdEJvdW5kc0FjY2Vzc29yLCBGaXRCb3VuZHNEZXRhaWxzIH0gZnJvbSAnLi4vc2VydmljZXMvZml0LWJvdW5kcyc7XG5cbi8qKlxuICogQWdtUG9seWxpbmVQb2ludCByZXByZXNlbnRzIG9uZSBlbGVtZW50IG9mIGEgcG9seWxpbmUgd2l0aGluIGEgIHtAbGlua1xuICogQWdtUG9seWxpbmV9XG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2FnbS1wb2x5bGluZS1wb2ludCcsXG4gIHByb3ZpZGVyczogW1xuICAgIHtwcm92aWRlOiBGaXRCb3VuZHNBY2Nlc3NvciwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQWdtUG9seWxpbmVQb2ludCl9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBZ21Qb2x5bGluZVBvaW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBGaXRCb3VuZHNBY2Nlc3NvciB7XG4gIC8qKlxuICAgKiBUaGUgbGF0aXR1ZGUgcG9zaXRpb24gb2YgdGhlIHBvaW50LlxuICAgKi9cbiAgQElucHV0KCkgcHVibGljIGxhdGl0dWRlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBsb25naXR1ZGUgcG9zaXRpb24gb2YgdGhlIHBvaW50O1xuICAgKi9cbiAgQElucHV0KCkgcHVibGljIGxvbmdpdHVkZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHBvc2l0aW9uIG9mIHRoZSBwb2ludCBjaGFuZ2VkLlxuICAgKi9cbiAgQE91dHB1dCgpIHBvc2l0aW9uQ2hhbmdlZDogRXZlbnRFbWl0dGVyPExhdExuZ0xpdGVyYWw+ID0gbmV3IEV2ZW50RW1pdHRlcjxMYXRMbmdMaXRlcmFsPigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogYW55IHtcbiAgICBpZiAoY2hhbmdlc1snbGF0aXR1ZGUnXSB8fCBjaGFuZ2VzWydsb25naXR1ZGUnXSkge1xuICAgICAgY29uc3QgcG9zaXRpb246IExhdExuZ0xpdGVyYWwgPSB7XG4gICAgICAgIGxhdDogY2hhbmdlc1snbGF0aXR1ZGUnXSA/IGNoYW5nZXNbJ2xhdGl0dWRlJ10uY3VycmVudFZhbHVlIDogdGhpcy5sYXRpdHVkZSxcbiAgICAgICAgbG5nOiBjaGFuZ2VzWydsb25naXR1ZGUnXSA/IGNoYW5nZXNbJ2xvbmdpdHVkZSddLmN1cnJlbnRWYWx1ZSA6IHRoaXMubG9uZ2l0dWRlLFxuICAgICAgfSBhcyBMYXRMbmdMaXRlcmFsO1xuICAgICAgdGhpcy5wb3NpdGlvbkNoYW5nZWQuZW1pdChwb3NpdGlvbik7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBnZXRGaXRCb3VuZHNEZXRhaWxzJCgpOiBPYnNlcnZhYmxlPEZpdEJvdW5kc0RldGFpbHM+IHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbkNoYW5nZWQucGlwZShcbiAgICAgIHN0YXJ0V2l0aCh7bGF0OiB0aGlzLmxhdGl0dWRlLCBsbmc6IHRoaXMubG9uZ2l0dWRlfSksXG4gICAgICBtYXAocG9zaXRpb24gPT4gKHtsYXRMbmc6IHBvc2l0aW9ufSkpXG4gICAgKTtcbiAgfVxufVxuIl19