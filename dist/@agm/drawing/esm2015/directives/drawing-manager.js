import { Directive, EventEmitter, Input, isDevMode, NgZone, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { fromEventPattern } from 'rxjs';
export class AgmDrawingManager {
    constructor(_zone) {
        this._zone = _zone;
        /**
         * This event is fired when the user has finished drawing a circle.
         */
        this.circleComplete = new EventEmitter();
        /**
         * This event is fired when the user has finished drawing a marker.
         */
        this.markerComplete = new EventEmitter();
        /**
         * This event is fired when the user has finished drawing an overlay of any
         * type.
         */
        this.overlayComplete = new EventEmitter();
        /**
         * This event is fired when the user has finished drawing a polygon.
         */
        this.polygonComplete = new EventEmitter();
        /**
         * This event is fired when the user has finished drawing a polyline.
         */
        this.polylineComplete = new EventEmitter();
        /**
         * This event is fired when the user has finished drawing a rectangle.
         */
        this.rectangleComplete = new EventEmitter();
        this.eventSubscriptions = [];
    }
    setMap(map) {
        if (!google.maps.drawing && isDevMode()) {
            console.error('Cannot use drawing manager if drawing library is not ' +
                'loaded. To fix, add libraries: [\'drawing\'] to the ' +
                'lazyMapsAPILoaderConfig you passed to AgmCoreModule.forRoot');
            return;
        }
        if (map && !this.drawingManager) {
            this.drawingManager = new google.maps.drawing.DrawingManager({
                map,
                circleOptions: this.circleOptions,
                markerOptions: this.markerOptions,
                polygonOptions: this.polygonOptions,
                polylineOptions: this.polylineOptions,
                rectangeOptions: this.rectangeOptions,
                drawingControl: this.drawingControl,
                drawingControlOptions: this.drawingControlOptions,
                drawingMode: this.drawingMode,
            });
            this.initEvents(this.drawingManager);
        }
        else if (!map && this.drawingManager) {
            this.drawingManager.setMap(null);
        }
        // else do nothing
    }
    initEvents(drawingManager) {
        this.eventSubscriptions.push(this.createMvcObservable('circlecomplete', drawingManager)
            .subscribe(circle => this._zone.run(() => this.circleComplete.next(circle))));
        this.eventSubscriptions.push(this.createMvcObservable('markercomplete', drawingManager)
            .subscribe(marker => this._zone.run(() => this.markerComplete.next(marker))));
        this.eventSubscriptions.push(this.createMvcObservable('polygoncomplete', drawingManager)
            .subscribe(polygon => this._zone.run(() => this.polygonComplete.next(polygon))));
        this.eventSubscriptions.push(this.createMvcObservable('polylinecomplete', drawingManager)
            .subscribe(polyline => this._zone.run(() => this.polylineComplete.next(polyline))));
        this.eventSubscriptions.push(this.createMvcObservable('overlaycomplete', drawingManager)
            .subscribe(overlayevent => this._zone.run(() => this.overlayComplete.next(overlayevent))));
        this.eventSubscriptions.push(this.createMvcObservable('rectanglecomplete', drawingManager)
            .subscribe(rectangle => this._zone.run(() => this.rectangleComplete.next(rectangle))));
    }
    createMvcObservable(eventName, mvcObject) {
        return fromEventPattern(handler => mvcObject.addListener(eventName, (event) => handler.apply(null, [event])), (_handler, evListener) => evListener.remove());
    }
    ngOnChanges(changes) {
        if (!this.drawingManager) {
            return;
        }
        const options = Object.entries(changes)
            .map(([prop, change]) => [prop, change.currentValue])
            .reduce((obj, [propName, propValue]) => {
            obj[propName] = propValue;
            return obj;
        }, {});
        this.drawingManager.setOptions(options);
    }
    ngOnDestroy() {
        this.eventSubscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
AgmDrawingManager.ctorParameters = () => [
    { type: NgZone }
];
AgmDrawingManager.decorators = [
    { type: Directive, args: [{
                selector: 'agm-drawing-manager',
                exportAs: 'agmDrawingManager',
            },] }
];
AgmDrawingManager.ctorParameters = () => [
    { type: NgZone }
];
AgmDrawingManager.propDecorators = {
    drawingControl: [{ type: Input }],
    drawingMode: [{ type: Input }],
    drawingControlOptions: [{ type: Input }],
    circleOptions: [{ type: Input }],
    markerOptions: [{ type: Input }],
    polygonOptions: [{ type: Input }],
    polylineOptions: [{ type: Input }],
    rectangeOptions: [{ type: Input }],
    circleComplete: [{ type: Output }],
    markerComplete: [{ type: Output }],
    overlayComplete: [{ type: Output }],
    polygonComplete: [{ type: Output }],
    polylineComplete: [{ type: Output }],
    rectangleComplete: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2luZy1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9kcmF3aW5nLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9kcmF3aW5nLW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9ILE9BQU8sRUFBRSxnQkFBZ0IsRUFBNEIsTUFBTSxNQUFNLENBQUM7QUFTbEUsTUFBTSxPQUFPLGlCQUFpQjtJQXlHNUIsWUFBb0IsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUFuQ2pDOztXQUVHO1FBQ08sbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBRXREOztXQUVHO1FBQ08sbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBRXREOzs7V0FHRztRQUNPLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQXdCLENBQUM7UUFFckU7O1dBRUc7UUFDTyxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFFeEQ7O1dBRUc7UUFDTyxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBWSxDQUFDO1FBRTFEOztXQUVHO1FBQ08sc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQWEsQ0FBQztRQUVwRCx1QkFBa0IsR0FBbUIsRUFBRSxDQUFDO0lBS2hELENBQUM7SUFFRCxNQUFNLENBQUMsR0FBYztRQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksU0FBUyxFQUFFLEVBQUU7WUFDdkMsT0FBTyxDQUFDLEtBQUssQ0FBQyx1REFBdUQ7Z0JBQ25FLHNEQUFzRDtnQkFDdEQsNkRBQTZELENBQUMsQ0FBQztZQUNqRSxPQUFPO1NBQ1I7UUFDRCxJQUFJLEdBQUcsSUFBSSxDQUFDLElB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LFlBQVksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDOUUsQ0FBQzs7O1lBaEYwQixNQUFNOzs7WUE3R2xDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUUsbUJBQW1CO2FBQzlCOzs7WUFUbUQsTUFBTTs7OzZCQWlCdkQsS0FBSzswQkFPTCxLQUFLO29DQU9MLEtBQUs7NEJBU0wsS0FBSzs0QkFTTCxLQUFLOzZCQVNMLEtBQUs7OEJBVUwsS0FBSzs4QkFVTCxLQUFLOzZCQUtMLE1BQU07NkJBS04sTUFBTTs4QkFNTixNQUFNOzhCQUtOLE1BQU07K0JBS04sTUFBTTtnQ0FLTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2lyY2xlLCBDaXJjbGVPcHRpb25zLCBHb29nbGVNYXAsIE1hcHNFdmVudExpc3RlbmVyLCBNYXJrZXIsIE1hcmtlck9wdGlvbnMsIE1WQ09iamVjdCwgUG9seWdvbiwgUG9seWdvbk9wdGlvbnMsIFBvbHlsaW5lLCBQb2x5bGluZU9wdGlvbnMsIFJlY3RhbmdsZSwgUmVjdGFuZ2xlT3B0aW9ucyB9IGZyb20gJ0BhZ20vY29yZS9zZXJ2aWNlcy9nb29nbGUtbWFwcy10eXBlcyc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIGlzRGV2TW9kZSwgTmdab25lLCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnRQYXR0ZXJuLCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERyYXdpbmdDb250cm9sT3B0aW9ucywgT3ZlcmxheUNvbXBsZXRlRXZlbnQsIE92ZXJsYXlUeXBlIH0gZnJvbSAnLi4vZ29vZ2xlLWRyYXdpbmctdHlwZXMnO1xuXG5kZWNsYXJlIHZhciBnb29nbGU6IGFueTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYWdtLWRyYXdpbmctbWFuYWdlcicsXG4gIGV4cG9ydEFzOiAnYWdtRHJhd2luZ01hbmFnZXInLFxufSlcbmV4cG9ydCBjbGFzcyBBZ21EcmF3aW5nTWFuYWdlciBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95e1xuXG4gIC8qKlxuICAgKiBUaGUgZW5hYmxlZC9kaXNhYmxlZCBzdGF0ZSBvZiB0aGUgZHJhd2luZyBjb250cm9sLiBEZWZhdWx0cyB0byBgdHJ1ZWAuXG4gICAqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgQElucHV0KCkgZHJhd2luZ0NvbnRyb2w6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRoZSBEcmF3aW5nTWFuYWdlcidzIGRyYXdpbmcgbW9kZSwgd2hpY2ggZGVmaW5lcyB0aGUgdHlwZSBvZiBvdmVybGF5IHRvIGJlXG4gICAqIGFkZGVkIG9uIHRoZSBtYXAuIEEgZHJhd2luZyBtb2RlIG9mIG51bGwgbWVhbnMgdGhhdCB0aGUgdXNlciBjYW4gaW50ZXJhY3RcbiAgICogd2l0aCB0aGUgbWFwIGFzIG5vcm1hbCwgYW5kIGNsaWNrcyBkbyBub3QgZHJhdyBhbnl0aGluZy5cbiAgICovXG4gIEBJbnB1dCgpIGRyYXdpbmdNb2RlOiBPdmVybGF5VHlwZSB8IG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSBkaXNwbGF5IG9wdGlvbnMgZm9yIHRoZSBkcmF3aW5nIGNvbnRyb2wuXG4gICAqXG4gICAqIEB0eXBlIHtEcmF3aW5nQ29udHJvbE9wdGlvbnN9XG4gICAqL1xuICBASW5wdXQoKSBkcmF3aW5nQ29udHJvbE9wdGlvbnM6IERyYXdpbmdDb250cm9sT3B0aW9ucztcblxuICAvKipcbiAgICogT3B0aW9ucyB0byBhcHBseSB0byBhbnkgbmV3IGNpcmNsZXMgY3JlYXRlZCB3aXRoIHRoaXMgRHJhd2luZ01hbmFnZXIuXG4gICAqIFRoZSBgY2VudGVyYCBhbmQgYHJhZGl1c2AgcHJvcGVydGllcyBhcmUgaWdub3JlZCwgYW5kIHRoZSBgbWFwYCBwcm9wZXJ0eSBvZiBhXG4gICAqIG5ldyBjaXJjbGUgaXMgYWx3YXlzIHNldCB0byB0aGUgRHJhd2luZ01hbmFnZXIncyBtYXAuXG4gICAqXG4gICAqIEB0eXBlIHtDaXJjbGVPcHRpb25zfVxuICAgKi9cbiAgQElucHV0KCkgY2lyY2xlT3B0aW9uczogQ2lyY2xlT3B0aW9ucztcblxuICAvKipcbiAgICogT3B0aW9ucyB0byBhcHBseSB0byBhbnkgbmV3IG1hcmtlcnMgY3JlYXRlZCB3aXRoIHRoaXMgRHJhd2luZ01hbmFnZXIuXG4gICAqIFRoZSBgcG9zaXRpb25gIHByb3BlcnR5IGlzIGlnbm9yZWQsIGFuZCB0aGUgYG1hcGAgcHJvcGVydHkgb2YgYSBuZXcgbWFya2VyXG4gICAqIGlzIGFsd2F5cyBzZXQgdG8gdGhlIERyYXdpbmdNYW5hZ2VyJ3MgbWFwLlxuICAgKlxuICAgKiBAdHlwZSB7TWFya2VyT3B0aW9uc31cbiAgICovXG4gIEBJbnB1dCgpIG1hcmtlck9wdGlvbnM6IE1hcmtlck9wdGlvbnM7XG5cbiAgLyoqXG4gICAqIE9wdGlvbnMgdG8gYXBwbHkgdG8gYW55IG5ldyBwb2x5Z29ucyBjcmVhdGVkIHdpdGggdGhpcyBEcmF3aW5nTWFuYWdlci5cbiAgICogVGhlIGBwYXRoc2AgcHJvcGVydHkgaXMgaWdub3JlZCwgYW5kIHRoZSBtYXAgcHJvcGVydHkgb2YgYSBuZXcgcG9seWdvbiBpc1xuICAgKiBhbHdheXMgc2V0IHRvIHRoZSBEcmF3aW5nTWFuYWdlcidzIG1hcC5cbiAgICpcbiAgICogQHR5cGUge1BvbHlnb25PcHRpb25zfVxuICAgKi9cbiAgQElucHV0KCkgcG9seWdvbk9wdGlvbnM6IFBvbHlnb25PcHRpb25zO1xuXG4gIC8qKlxuICAgKiBPcHRpb25zIHRvIGFwcGx5IHRvIGFueSBuZXcgcG9seWxpbmVzIGNyZWF0ZWQgd2l0aCB0aGlzIERyYXdpbmdNYW5hZ2VyLlxuICAgKiBUaGUgYHBhdGhgIHByb3BlcnR5IGlzIGlnbm9yZWQsIGFuZCB0aGUgbWFwIHByb3BlcnR5IG9mIGEgbmV3IHBvbHlsaW5lIGlzXG4gICAqIGFsd2F5cyBzZXQgdG8gdGhlIERyYXdpbmdNYW5hZ2VyJ3MgbWFwLlxuICAgKlxuICAgKiBAdHlwZSB7UG9seWxpbmVPcHRpb25zfVxuICAgKiBAbWVtYmVyb2YgQWdtRHJhd2luZ01hbmFnZXJcbiAgICovXG4gIEBJbnB1dCgpIHBvbHlsaW5lT3B0aW9uczogUG9seWxpbmVPcHRpb25zO1xuXG4gIC8qKlxuICAgKiBPcHRpb25zIHRvIGFwcGx5IHRvIGFueSBuZXcgcmVjdGFuZ2xlcyBjcmVhdGVkIHdpdGggdGhpcyBEcmF3aW5nTWFuYWdlci5cbiAgICogVGhlIGBib3VuZHNgIHByb3BlcnR5IGlzIGlnbm9yZWQsIGFuZCB0aGUgbWFwIHByb3BlcnR5IG9mIGEgbmV3IHJlY3RhbmdsZVxuICAgKiBpcyBhbHdheXMgc2V0IHRvIHRoZSBEcmF3aW5nTWFuYWdlcidzIG1hcC5cbiAgICpcbiAgICogQHR5cGUge1JlY3RhbmdsZU9wdGlvbnN9XG4gICAqIEBtZW1iZXJvZiBBZ21EcmF3aW5nTWFuYWdlclxuICAgKi9cbiAgQElucHV0KCkgcmVjdGFuZ2VPcHRpb25zOiBSZWN0YW5nbGVPcHRpb25zO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgaGFzIGZpbmlzaGVkIGRyYXdpbmcgYSBjaXJjbGUuXG4gICAqL1xuICBAT3V0cHV0KCkgY2lyY2xlQ29tcGxldGUgPSBuZXcgRXZlbnRFbWl0dGVyPENpcmNsZT4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIGhhcyBmaW5pc2hlZCBkcmF3aW5nIGEgbWFya2VyLlxuICAgKi9cbiAgQE91dHB1dCgpIG1hcmtlckNvbXBsZXRlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXJrZXI+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBoYXMgZmluaXNoZWQgZHJhd2luZyBhbiBvdmVybGF5IG9mIGFueVxuICAgKiB0eXBlLlxuICAgKi9cbiAgQE91dHB1dCgpIG92ZXJsYXlDb21wbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8T3ZlcmxheUNvbXBsZXRlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBoYXMgZmluaXNoZWQgZHJhd2luZyBhIHBvbHlnb24uXG4gICAqL1xuICBAT3V0cHV0KCkgcG9seWdvbkNvbXBsZXRlID0gbmV3IEV2ZW50RW1pdHRlcjxQb2x5Z29uPigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgaGFzIGZpbmlzaGVkIGRyYXdpbmcgYSBwb2x5bGluZS5cbiAgICovXG4gIEBPdXRwdXQoKSBwb2x5bGluZUNvbXBsZXRlID0gbmV3IEV2ZW50RW1pdHRlcjxQb2x5bGluZT4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIGhhcyBmaW5pc2hlZCBkcmF3aW5nIGEgcmVjdGFuZ2xlLlxuICAgKi9cbiAgQE91dHB1dCgpIHJlY3RhbmdsZUNvbXBsZXRlID0gbmV3IEV2ZW50RW1pdHRlcjxSZWN0YW5nbGU+KCk7XG5cbiAgcHJpdmF0ZSBldmVudFN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgcHJpdmF0ZSBkcmF3aW5nTWFuYWdlcjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge1xuICB9XG5cbiAgc2V0TWFwKG1hcDogR29vZ2xlTWFwKSB7XG4gICAgaWYgKCFnb29nbGUubWFwcy5kcmF3aW5nICYmIGlzRGV2TW9kZSgpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdDYW5ub3QgdXNlIGRyYXdpbmcgbWFuYWdlciBpZiBkcmF3aW5nIGxpYnJhcnkgaXMgbm90ICcgK1xuICAgICAgICAnbG9hZGVkLiBUbyBmaXgsIGFkZCBsaWJyYXJpZXM6IFtcXCdkcmF3aW5nXFwnXSB0byB0aGUgJyArXG4gICAgICAgICdsYXp5TWFwc0FQSUxvYWRlckNvbmZpZyB5b3UgcGFzc2VkIHRvIEFnbUNvcmVNb2R1bGUuZm9yUm9vdCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAobWFwICYmICF0aGlzLmRyYXdpbmdNYW5hZ2VyKSB7XG4gICAgICB0aGlzLmRyYXdpbmdNYW5hZ2VyID0gbmV3IGdvb2dsZS5tYXBzLmRyYXdpbmcuRHJhd2luZ01hbmFnZXIoe1xuICAgICAgICAgIG1hcCxcbiAgICAgICAgICBjaXJjbGVPcHRpb25zOiB0aGlzLmNpcmNsZU9wdGlvbnMsXG4gICAgICAgICAgbWFya2VyT3B0aW9uczogdGhpcy5tYXJrZXJPcHRpb25zLFxuICAgICAgICAgIHBvbHlnb25PcHRpb25zOiB0aGlzLnBvbHlnb25PcHRpb25zLFxuICAgICAgICAgIHBvbHlsaW5lT3B0aW9uczogdGhpcy5wb2x5bGluZU9wdGlvbnMsXG4gICAgICAgICAgcmVjdGFuZ2VPcHRpb25zOiB0aGlzLnJlY3RhbmdlT3B0aW9ucyxcbiAgICAgICAgICBkcmF3aW5nQ29udHJvbDogdGhpcy5kcmF3aW5nQ29udHJvbCxcbiAgICAgICAgICBkcmF3aW5nQ29udHJvbE9wdGlvbnM6IHRoaXMuZHJhd2luZ0NvbnRyb2xPcHRpb25zLFxuICAgICAgICAgIGRyYXdpbmdNb2RlOiB0aGlzLmRyYXdpbmdNb2RlLFxuICAgICAgfSk7XG4gICAgICB0aGlzLmluaXRFdmVudHModGhpcy5kcmF3aW5nTWFuYWdlcik7XG4gICAgfSBlbHNlIGlmICghbWFwICYmIHRoaXMuZHJhd2luZ01hbmFnZXIpIHtcbiAgICAgIHRoaXMuZHJhd2luZ01hbmFnZXIuc2V0TWFwKG51bGwpO1xuICAgIH1cbiAgICAvLyBlbHNlIGRvIG5vdGhpbmdcbiAgfVxuXG4gIGluaXRFdmVudHMoZHJhd2luZ01hbmFnZXI6IGFueSkge1xuICAgIHRoaXMuZXZlbnRTdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmNyZWF0ZU12Y09ic2VydmFibGU8Q2lyY2xlPignY2lyY2xlY29tcGxldGUnLCBkcmF3aW5nTWFuYWdlcilcbiAgICAgIC5zdWJzY3JpYmUoY2lyY2xlID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IHRoaXMuY2lyY2xlQ29tcGxldGUubmV4dChjaXJjbGUpKSlcbiAgICApO1xuICAgIHRoaXMuZXZlbnRTdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmNyZWF0ZU12Y09ic2VydmFibGU8TWFya2VyPignbWFya2VyY29tcGxldGUnLCBkcmF3aW5nTWFuYWdlcilcbiAgICAgIC5zdWJzY3JpYmUobWFya2VyID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IHRoaXMubWFya2VyQ29tcGxldGUubmV4dChtYXJrZXIpKSlcbiAgICApO1xuICAgIHRoaXMuZXZlbnRTdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmNyZWF0ZU12Y09ic2VydmFibGU8UG9seWdvbj4oJ3BvbHlnb25jb21wbGV0ZScsIGRyYXdpbmdNYW5hZ2VyKVxuICAgICAgLnN1YnNjcmliZShwb2x5Z29uID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IHRoaXMucG9seWdvbkNvbXBsZXRlLm5leHQocG9seWdvbikpKVxuICAgICk7XG4gICAgdGhpcy5ldmVudFN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuY3JlYXRlTXZjT2JzZXJ2YWJsZTxQb2x5bGluZT4oJ3BvbHlsaW5lY29tcGxldGUnLCBkcmF3aW5nTWFuYWdlcilcbiAgICAgIC5zdWJzY3JpYmUocG9seWxpbmUgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gdGhpcy5wb2x5bGluZUNvbXBsZXRlLm5leHQocG9seWxpbmUpKSlcbiAgICApO1xuICAgIHRoaXMuZXZlbnRTdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmNyZWF0ZU12Y09ic2VydmFibGU8T3ZlcmxheUNvbXBsZXRlRXZlbnQ+KCdvdmVybGF5Y29tcGxldGUnLCBkcmF3aW5nTWFuYWdlcilcbiAgICAgIC5zdWJzY3JpYmUob3ZlcmxheWV2ZW50ID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IHRoaXMub3ZlcmxheUNvbXBsZXRlLm5leHQob3ZlcmxheWV2ZW50KSkpXG4gICAgKTtcbiAgICB0aGlzLmV2ZW50U3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5jcmVhdGVNdmNPYnNlcnZhYmxlPFJlY3RhbmdsZT4oJ3JlY3RhbmdsZWNvbXBsZXRlJywgZHJhd2luZ01hbmFnZXIpXG4gICAgICAuc3Vic2NyaWJlKHJlY3RhbmdsZSA9PiB0aGlzLl96b25lLnJ1bigoKSA9PiB0aGlzLnJlY3RhbmdsZUNvbXBsZXRlLm5leHQocmVjdGFuZ2xlKSkpXG4gICAgKTtcbiAgfVxuXG4gIGNyZWF0ZU12Y09ic2VydmFibGU8RT4oZXZlbnROYW1lOiBzdHJpbmcsIG12Y09iamVjdDogTVZDT2JqZWN0KTogT2JzZXJ2YWJsZTxFPiB7XG4gICAgcmV0dXJuIGZyb21FdmVudFBhdHRlcm4oXG4gICAgICBoYW5kbGVyID0+IG12Y09iamVjdC5hZGRMaXN0ZW5lcihldmVudE5hbWUsXG4gICAgICAgIChldmVudD86IEUpID0+IGhhbmRsZXIuYXBwbHkobnVsbCwgW2V2ZW50XSkpLFxuICAgICAgKF9oYW5kbGVyOiBGdW5jdGlvbiwgZXZMaXN0ZW5lcjogTWFwc0V2ZW50TGlzdGVuZXIpID0+IGV2TGlzdGVuZXIucmVtb3ZlKClcbiAgICApO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kcmF3aW5nTWFuYWdlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG9wdGlvbnMgPSBPYmplY3QuZW50cmllcyhjaGFuZ2VzKVxuICAgIC5tYXAoKFtwcm9wLCBjaGFuZ2VdKSA9PiBbcHJvcCwgY2hhbmdlLmN1cnJlbnRWYWx1ZV0pXG4gICAgLnJlZHVjZSgob2JqOiBhbnksIFtwcm9wTmFtZSwgcHJvcFZhbHVlXSkgPT4ge1xuICAgICAgb2JqW3Byb3BOYW1lXSA9IHByb3BWYWx1ZTtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfSwge30pO1xuICAgIHRoaXMuZHJhd2luZ01hbmFnZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZXZlbnRTdWJzY3JpcHRpb25zLmZvckVhY2goc3Vic2NyaXB0aW9uID0+IHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG59XG4iXX0=