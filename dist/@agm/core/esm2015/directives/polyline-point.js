import { Directive, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { FitBoundsAccessor } from '../services/fit-bounds';
/**
 * AgmPolylinePoint represents one element of a polyline within a  {@link
 * AgmPolyline}
 */
export class AgmPolylinePoint {
    constructor() {
        /**
         * This event emitter gets emitted when the position of the point changed.
         */
        this.positionChanged = new EventEmitter();
    }
    ngOnChanges(changes) {
        if (changes['latitude'] || changes['longitude']) {
            const position = {
                lat: changes['latitude'] ? changes['latitude'].currentValue : this.latitude,
                lng: changes['longitude'] ? changes['longitude'].currentValue : this.longitude,
            };
            this.positionChanged.emit(position);
        }
    }
    /** @internal */
    getFitBoundsDetails$() {
        return this.positionChanged.pipe(startWith({ lat: this.latitude, lng: this.longitude }), map(position => ({ latLng: position })));
    }
}
AgmPolylinePoint.decorators = [
    { type: Directive, args: [{
                selector: 'agm-polyline-point',
                providers: [
                    { provide: FitBoundsAccessor, useExisting: forwardRef(() => AgmPolylinePoint) },
                ],
            },] }
];
AgmPolylinePoint.ctorParameters = () => [];
AgmPolylinePoint.propDecorators = {
    latitude: [{ type: Input }],
    longitude: [{ type: Input }],
    positionChanged: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWxpbmUtcG9pbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3BvbHlsaW5lLXBvaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUU3RyxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWhELE9BQU8sRUFBRSxpQkFBaUIsRUFBb0IsTUFBTSx3QkFBd0IsQ0FBQztBQUU3RTs7O0dBR0c7QUFPSCxNQUFNLE9BQU8sZ0JBQWdCO0lBZ0IzQjtRQUxBOztXQUVHO1FBQ08sb0JBQWUsR0FBZ0MsSUFBSSxZQUFZLEVBQWlCLENBQUM7SUFFNUUsQ0FBQztJQUVoQixXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQy9DLE1BQU0sUUFBUSxHQUFrQjtnQkFDOUIsR0FBRyxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVE7Z0JBQzNFLEdBQUcsRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTO2FBQzlELENBQUM7WUFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDckM7SUFDSCxDQUFDO0lBRUQsZ0JBQWdCO0lBQ2hCLG9CQUFvQjtRQUNsQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUM5QixTQUFTLENBQUMsRUFBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBQyxDQUFDLEVBQ3BELEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQyxDQUN0QyxDQUFDO0lBQ0osQ0FBQzs7O1lBeENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixTQUFTLEVBQUU7b0JBQ1QsRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFDO2lCQUM5RTthQUNGOzs7O3VCQUtFLEtBQUs7d0JBS0wsS0FBSzs4QkFLTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMYXRMbmdMaXRlcmFsIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9nb29nbGUtbWFwcy10eXBlcyc7XG5pbXBvcnQgeyBGaXRCb3VuZHNBY2Nlc3NvciwgRml0Qm91bmRzRGV0YWlscyB9IGZyb20gJy4uL3NlcnZpY2VzL2ZpdC1ib3VuZHMnO1xuXG4vKipcbiAqIEFnbVBvbHlsaW5lUG9pbnQgcmVwcmVzZW50cyBvbmUgZWxlbWVudCBvZiBhIHBvbHlsaW5lIHdpdGhpbiBhICB7QGxpbmtcbiAqIEFnbVBvbHlsaW5lfVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdhZ20tcG9seWxpbmUtcG9pbnQnLFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogRml0Qm91bmRzQWNjZXNzb3IsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEFnbVBvbHlsaW5lUG9pbnQpfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQWdtUG9seWxpbmVQb2ludCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgRml0Qm91bmRzQWNjZXNzb3Ige1xuICAvKipcbiAgICogVGhlIGxhdGl0dWRlIHBvc2l0aW9uIG9mIHRoZSBwb2ludC5cbiAgICovXG4gIEBJbnB1dCgpIHB1YmxpYyBsYXRpdHVkZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgbG9uZ2l0dWRlIHBvc2l0aW9uIG9mIHRoZSBwb2ludDtcbiAgICovXG4gIEBJbnB1dCgpIHB1YmxpYyBsb25naXR1ZGU6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSBwb3NpdGlvbiBvZiB0aGUgcG9pbnQgY2hhbmdlZC5cbiAgICovXG4gIEBPdXRwdXQoKSBwb3NpdGlvbkNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxMYXRMbmdMaXRlcmFsPiA9IG5ldyBFdmVudEVtaXR0ZXI8TGF0TG5nTGl0ZXJhbD4oKTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IGFueSB7XG4gICAgaWYgKGNoYW5nZXNbJ2xhdGl0dWRlJ10gfHwgY2hhbmdlc1snbG9uZ2l0dWRlJ10pIHtcbiAgICAgIGNvbnN0IHBvc2l0aW9uOiBMYXRMbmdMaXRlcmFsID0ge1xuICAgICAgICBsYXQ6IGNoYW5nZXNbJ2xhdGl0dWRlJ10gPyBjaGFuZ2VzWydsYXRpdHVkZSddLmN1cnJlbnRWYWx1ZSA6IHRoaXMubGF0aXR1ZGUsXG4gICAgICAgIGxuZzogY2hhbmdlc1snbG9uZ2l0dWRlJ10gPyBjaGFuZ2VzWydsb25naXR1ZGUnXS5jdXJyZW50VmFsdWUgOiB0aGlzLmxvbmdpdHVkZSxcbiAgICAgIH0gYXMgTGF0TG5nTGl0ZXJhbDtcbiAgICAgIHRoaXMucG9zaXRpb25DaGFuZ2VkLmVtaXQocG9zaXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgZ2V0Rml0Qm91bmRzRGV0YWlscyQoKTogT2JzZXJ2YWJsZTxGaXRCb3VuZHNEZXRhaWxzPiB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25DaGFuZ2VkLnBpcGUoXG4gICAgICBzdGFydFdpdGgoe2xhdDogdGhpcy5sYXRpdHVkZSwgbG5nOiB0aGlzLmxvbmdpdHVkZX0pLFxuICAgICAgbWFwKHBvc2l0aW9uID0+ICh7bGF0TG5nOiBwb3NpdGlvbn0pKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==