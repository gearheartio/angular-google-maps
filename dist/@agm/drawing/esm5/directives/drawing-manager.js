import { __read } from "tslib";
import { Directive, EventEmitter, Input, isDevMode, NgZone, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { fromEventPattern } from 'rxjs';
var AgmDrawingManager = /** @class */ (function () {
    function AgmDrawingManager(_zone) {
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
    AgmDrawingManager.prototype.setMap = function (map) {
        if (!google.maps.drawing && isDevMode()) {
            console.error('Cannot use drawing manager if drawing library is not ' +
                'loaded. To fix, add libraries: [\'drawing\'] to the ' +
                'lazyMapsAPILoaderConfig you passed to AgmCoreModule.forRoot');
            return;
        }
        if (map && !this.drawingManager) {
            this.drawingManager = new google.maps.drawing.DrawingManager({
                map: map,
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
    };
    AgmDrawingManager.prototype.initEvents = function (drawingManager) {
        var _this = this;
        this.eventSubscriptions.push(this.createMvcObservable('circlecomplete', drawingManager)
            .subscribe(function (circle) { return _this._zone.run(function () { return _this.circleComplete.next(circle); }); }));
        this.eventSubscriptions.push(this.createMvcObservable('markercomplete', drawingManager)
            .subscribe(function (marker) { return _this._zone.run(function () { return _this.markerComplete.next(marker); }); }));
        this.eventSubscriptions.push(this.createMvcObservable('polygoncomplete', drawingManager)
            .subscribe(function (polygon) { return _this._zone.run(function () { return _this.polygonComplete.next(polygon); }); }));
        this.eventSubscriptions.push(this.createMvcObservable('polylinecomplete', drawingManager)
            .subscribe(function (polyline) { return _this._zone.run(function () { return _this.polylineComplete.next(polyline); }); }));
        this.eventSubscriptions.push(this.createMvcObservable('overlaycomplete', drawingManager)
            .subscribe(function (overlayevent) { return _this._zone.run(function () { return _this.overlayComplete.next(overlayevent); }); }));
        this.eventSubscriptions.push(this.createMvcObservable('rectanglecomplete', drawingManager)
            .subscribe(function (rectangle) { return _this._zone.run(function () { return _this.rectangleComplete.next(rectangle); }); }));
    };
    AgmDrawingManager.prototype.createMvcObservable = function (eventName, mvcObject) {
        return fromEventPattern(function (handler) { return mvcObject.addListener(eventName, function (event) { return handler.apply(null, [event]); }); }, function (_handler, evListener) { return evListener.remove(); });
    };
    AgmDrawingManager.prototype.ngOnChanges = function (changes) {
        if (!this.drawingManager) {
            return;
        }
        var options = Object.entries(changes)
            .map(function (_a) {
            var _b = __read(_a, 2), prop = _b[0], change = _b[1];
            return [prop, change.currentValue];
        })
            .reduce(function (obj, _a) {
            var _b = __read(_a, 2), propName = _b[0], propValue = _b[1];
            obj[propName] = propValue;
            return obj;
        }, {});
        this.drawingManager.setOptions(options);
    };
    AgmDrawingManager.prototype.ngOnDestroy = function () {
        this.eventSubscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
    };
    AgmDrawingManager.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    AgmDrawingManager.decorators = [
        { type: Directive, args: [{
                    selector: 'agm-drawing-manager',
                    exportAs: 'agmDrawingManager',
                },] }
    ];
    AgmDrawingManager.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
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
    return AgmDrawingManager;
}());
export { AgmDrawingManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2luZy1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9kcmF3aW5nLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9kcmF3aW5nLW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvSCxPQUFPLEVBQUUsZ0JBQWdCLEVBQTRCLE1BQU0sTUFBTSxDQUFDO0FBS2xFO0lBNkdFLDJCQUFvQixLQUFhO1FBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQW5DakM7O1dBRUc7UUFDTyxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFdEQ7O1dBRUc7UUFDTyxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFdEQ7OztXQUdHO1FBQ08sb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBd0IsQ0FBQztRQUVyRTs7V0FFRztRQUNPLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUV4RDs7V0FFRztRQUNPLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFZLENBQUM7UUFFMUQ7O1dBRUc7UUFDTyxzQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBYSxDQUFDO1FBRXBELHVCQUFrQixHQUFtQixFQUFFLENBQUM7SUFLaEQsQ0FBQztJQUVELGtDQUFNLEdBQU4sVUFBTyxHQUFjO1FBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxTQUFTLEVBQUUsRUFBRTtZQUN2QyxPQUFPLENBQUMsS0FBSyxDQUFDLHVEQUF1RDtnQkFDbkUsc0RBQXNEO2dCQUN0RCw2REFBNkQsQ0FBQyxDQUFDO1lBQ2pFLE9BQU87U0FDUjtRQUNELElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNB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LFFBQUEsRUFBRSxTQUFTLFFBQUE7WUFDckMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLFNBQVMsQ0FBQztZQUMxQixPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNQLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCx1Q0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxVQUFBLFlBQVksSUFBSSxPQUFBLFlBQVksQ0FBQyxXQUFXLEVBQUUsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO0lBQzlFLENBQUM7O2dCQWhGMEIsTUFBTTs7O2dCQTdHbEMsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLFFBQVEsRUFBRSxtQkFBbUI7aUJBQzlCOzs7Z0JBVG1ELE1BQU07OztpQ0FpQnZELEtBQUs7OEJBT0wsS0FBSzt3Q0FPTCxLQUFLO2dDQVNMLEtBQUs7Z0NBU0wsS0FBSztpQ0FTTCxLQUFLO2tDQVVMLEtBQUs7a0NBVUwsS0FBSztpQ0FLTCxNQUFNO2lDQUtOLE1BQU07a0NBTU4sTUFBTTtrQ0FLTixNQUFNO21DQUtOLE1BQU07b0NBS04sTUFBTTs7SUF3RlQsd0JBQUM7Q0FBQSxBQS9MRCxJQStMQztTQTNMWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaXJjbGUsIENpcmNsZU9wdGlvbnMsIEdvb2dsZU1hcCwgTWFwc0V2ZW50TGlzdGVuZXIsIE1hcmtlciwgTWFya2VyT3B0aW9ucywgTVZDT2JqZWN0LCBQb2x5Z29uLCBQb2x5Z29uT3B0aW9ucywgUG9seWxpbmUsIFBvbHlsaW5lT3B0aW9ucywgUmVjdGFuZ2xlLCBSZWN0YW5nbGVPcHRpb25zIH0gZnJvbSAnQGFnbS9jb3JlL3NlcnZpY2VzL2dvb2dsZS1tYXBzLXR5cGVzJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgaXNEZXZNb2RlLCBOZ1pvbmUsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudFBhdHRlcm4sIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRHJhd2luZ0NvbnRyb2xPcHRpb25zLCBPdmVybGF5Q29tcGxldGVFdmVudCwgT3ZlcmxheVR5cGUgfSBmcm9tICcuLi9nb29nbGUtZHJhd2luZy10eXBlcyc7XG5cbmRlY2xhcmUgdmFyIGdvb2dsZTogYW55O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdhZ20tZHJhd2luZy1tYW5hZ2VyJyxcbiAgZXhwb3J0QXM6ICdhZ21EcmF3aW5nTWFuYWdlcicsXG59KVxuZXhwb3J0IGNsYXNzIEFnbURyYXdpbmdNYW5hZ2VyIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3l7XG5cbiAgLyoqXG4gICAqIFRoZSBlbmFibGVkL2Rpc2FibGVkIHN0YXRlIG9mIHRoZSBkcmF3aW5nIGNvbnRyb2wuIERlZmF1bHRzIHRvIGB0cnVlYC5cbiAgICpcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICBASW5wdXQoKSBkcmF3aW5nQ29udHJvbDogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGhlIERyYXdpbmdNYW5hZ2VyJ3MgZHJhd2luZyBtb2RlLCB3aGljaCBkZWZpbmVzIHRoZSB0eXBlIG9mIG92ZXJsYXkgdG8gYmVcbiAgICogYWRkZWQgb24gdGhlIG1hcC4gQSBkcmF3aW5nIG1vZGUgb2YgbnVsbCBtZWFucyB0aGF0IHRoZSB1c2VyIGNhbiBpbnRlcmFjdFxuICAgKiB3aXRoIHRoZSBtYXAgYXMgbm9ybWFsLCBhbmQgY2xpY2tzIGRvIG5vdCBkcmF3IGFueXRoaW5nLlxuICAgKi9cbiAgQElucHV0KCkgZHJhd2luZ01vZGU6IE92ZXJsYXlUeXBlIHwgbnVsbDtcblxuICAvKipcbiAgICogVGhlIGRpc3BsYXkgb3B0aW9ucyBmb3IgdGhlIGRyYXdpbmcgY29udHJvbC5cbiAgICpcbiAgICogQHR5cGUge0RyYXdpbmdDb250cm9sT3B0aW9uc31cbiAgICovXG4gIEBJbnB1dCgpIGRyYXdpbmdDb250cm9sT3B0aW9uczogRHJhd2luZ0NvbnRyb2xPcHRpb25zO1xuXG4gIC8qKlxuICAgKiBPcHRpb25zIHRvIGFwcGx5IHRvIGFueSBuZXcgY2lyY2xlcyBjcmVhdGVkIHdpdGggdGhpcyBEcmF3aW5nTWFuYWdlci5cbiAgICogVGhlIGBjZW50ZXJgIGFuZCBgcmFkaXVzYCBwcm9wZXJ0aWVzIGFyZSBpZ25vcmVkLCBhbmQgdGhlIGBtYXBgIHByb3BlcnR5IG9mIGFcbiAgICogbmV3IGNpcmNsZSBpcyBhbHdheXMgc2V0IHRvIHRoZSBEcmF3aW5nTWFuYWdlcidzIG1hcC5cbiAgICpcbiAgICogQHR5cGUge0NpcmNsZU9wdGlvbnN9XG4gICAqL1xuICBASW5wdXQoKSBjaXJjbGVPcHRpb25zOiBDaXJjbGVPcHRpb25zO1xuXG4gIC8qKlxuICAgKiBPcHRpb25zIHRvIGFwcGx5IHRvIGFueSBuZXcgbWFya2VycyBjcmVhdGVkIHdpdGggdGhpcyBEcmF3aW5nTWFuYWdlci5cbiAgICogVGhlIGBwb3NpdGlvbmAgcHJvcGVydHkgaXMgaWdub3JlZCwgYW5kIHRoZSBgbWFwYCBwcm9wZXJ0eSBvZiBhIG5ldyBtYXJrZXJcbiAgICogaXMgYWx3YXlzIHNldCB0byB0aGUgRHJhd2luZ01hbmFnZXIncyBtYXAuXG4gICAqXG4gICAqIEB0eXBlIHtNYXJrZXJPcHRpb25zfVxuICAgKi9cbiAgQElucHV0KCkgbWFya2VyT3B0aW9uczogTWFya2VyT3B0aW9ucztcblxuICAvKipcbiAgICogT3B0aW9ucyB0byBhcHBseSB0byBhbnkgbmV3IHBvbHlnb25zIGNyZWF0ZWQgd2l0aCB0aGlzIERyYXdpbmdNYW5hZ2VyLlxuICAgKiBUaGUgYHBhdGhzYCBwcm9wZXJ0eSBpcyBpZ25vcmVkLCBhbmQgdGhlIG1hcCBwcm9wZXJ0eSBvZiBhIG5ldyBwb2x5Z29uIGlzXG4gICAqIGFsd2F5cyBzZXQgdG8gdGhlIERyYXdpbmdNYW5hZ2VyJ3MgbWFwLlxuICAgKlxuICAgKiBAdHlwZSB7UG9seWdvbk9wdGlvbnN9XG4gICAqL1xuICBASW5wdXQoKSBwb2x5Z29uT3B0aW9uczogUG9seWdvbk9wdGlvbnM7XG5cbiAgLyoqXG4gICAqIE9wdGlvbnMgdG8gYXBwbHkgdG8gYW55IG5ldyBwb2x5bGluZXMgY3JlYXRlZCB3aXRoIHRoaXMgRHJhd2luZ01hbmFnZXIuXG4gICAqIFRoZSBgcGF0aGAgcHJvcGVydHkgaXMgaWdub3JlZCwgYW5kIHRoZSBtYXAgcHJvcGVydHkgb2YgYSBuZXcgcG9seWxpbmUgaXNcbiAgICogYWx3YXlzIHNldCB0byB0aGUgRHJhd2luZ01hbmFnZXIncyBtYXAuXG4gICAqXG4gICAqIEB0eXBlIHtQb2x5bGluZU9wdGlvbnN9XG4gICAqIEBtZW1iZXJvZiBBZ21EcmF3aW5nTWFuYWdlclxuICAgKi9cbiAgQElucHV0KCkgcG9seWxpbmVPcHRpb25zOiBQb2x5bGluZU9wdGlvbnM7XG5cbiAgLyoqXG4gICAqIE9wdGlvbnMgdG8gYXBwbHkgdG8gYW55IG5ldyByZWN0YW5nbGVzIGNyZWF0ZWQgd2l0aCB0aGlzIERyYXdpbmdNYW5hZ2VyLlxuICAgKiBUaGUgYGJvdW5kc2AgcHJvcGVydHkgaXMgaWdub3JlZCwgYW5kIHRoZSBtYXAgcHJvcGVydHkgb2YgYSBuZXcgcmVjdGFuZ2xlXG4gICAqIGlzIGFsd2F5cyBzZXQgdG8gdGhlIERyYXdpbmdNYW5hZ2VyJ3MgbWFwLlxuICAgKlxuICAgKiBAdHlwZSB7UmVjdGFuZ2xlT3B0aW9uc31cbiAgICogQG1lbWJlcm9mIEFnbURyYXdpbmdNYW5hZ2VyXG4gICAqL1xuICBASW5wdXQoKSByZWN0YW5nZU9wdGlvbnM6IFJlY3RhbmdsZU9wdGlvbnM7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBoYXMgZmluaXNoZWQgZHJhd2luZyBhIGNpcmNsZS5cbiAgICovXG4gIEBPdXRwdXQoKSBjaXJjbGVDb21wbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q2lyY2xlPigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgaGFzIGZpbmlzaGVkIGRyYXdpbmcgYSBtYXJrZXIuXG4gICAqL1xuICBAT3V0cHV0KCkgbWFya2VyQ29tcGxldGUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcmtlcj4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIGhhcyBmaW5pc2hlZCBkcmF3aW5nIGFuIG92ZXJsYXkgb2YgYW55XG4gICAqIHR5cGUuXG4gICAqL1xuICBAT3V0cHV0KCkgb3ZlcmxheUNvbXBsZXRlID0gbmV3IEV2ZW50RW1pdHRlcjxPdmVybGF5Q29tcGxldGVFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIGhhcyBmaW5pc2hlZCBkcmF3aW5nIGEgcG9seWdvbi5cbiAgICovXG4gIEBPdXRwdXQoKSBwb2x5Z29uQ29tcGxldGUgPSBuZXcgRXZlbnRFbWl0dGVyPFBvbHlnb24+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBoYXMgZmluaXNoZWQgZHJhd2luZyBhIHBvbHlsaW5lLlxuICAgKi9cbiAgQE91dHB1dCgpIHBvbHlsaW5lQ29tcGxldGUgPSBuZXcgRXZlbnRFbWl0dGVyPFBvbHlsaW5lPigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgaGFzIGZpbmlzaGVkIGRyYXdpbmcgYSByZWN0YW5nbGUuXG4gICAqL1xuICBAT3V0cHV0KCkgcmVjdGFuZ2xlQ29tcGxldGUgPSBuZXcgRXZlbnRFbWl0dGVyPFJlY3RhbmdsZT4oKTtcblxuICBwcml2YXRlIGV2ZW50U3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBwcml2YXRlIGRyYXdpbmdNYW5hZ2VyOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfem9uZTogTmdab25lKSB7XG4gIH1cblxuICBzZXRNYXAobWFwOiBHb29nbGVNYXApIHtcbiAgICBpZiAoIWdvb2dsZS5tYXBzLmRyYXdpbmcgJiYgaXNEZXZNb2RlKCkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Nhbm5vdCB1c2UgZHJhd2luZyBtYW5hZ2VyIGlmIGRyYXdpbmcgbGlicmFyeSBpcyBub3QgJyArXG4gICAgICAgICdsb2FkZWQuIFRvIGZpeCwgYWRkIGxpYnJhcmllczogW1xcJ2RyYXdpbmdcXCddIHRvIHRoZSAnICtcbiAgICAgICAgJ2xhenlNYXBzQVBJTG9hZGVyQ29uZmlnIHlvdSBwYXNzZWQgdG8gQWdtQ29yZU1vZHVsZS5mb3JSb290Jyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChtYXAgJiYgIXRoaXMuZHJhd2luZ01hbmFnZXIpIHtcbiAgICAgIHRoaXMuZHJhd2luZ01hbmFnZXIgPSBuZXcgZ29vZ2xlLm1hcHMuZHJhd2luZy5EcmF3aW5nTWFuYWdlcih7XG4gICAgICAgICAgbWFwLFxuICAgICAgICAgIGNpcmNsZU9wdGlvbnM6IHRoaXMuY2lyY2xlT3B0aW9ucyxcbiAgICAgICAgICBtYXJrZXJPcHRpb25zOiB0aGlzLm1hcmtlck9wdGlvbnMsXG4gICAgICAgICAgcG9seWdvbk9wdGlvbnM6IHRoaXMucG9seWdvbk9wdGlvbnMsXG4gICAgICAgICAgcG9seWxpbmVPcHRpb25zOiB0aGlzLnBvbHlsaW5lT3B0aW9ucyxcbiAgICAgICAgICByZWN0YW5nZU9wdGlvbnM6IHRoaXMucmVjdGFuZ2VPcHRpb25zLFxuICAgICAgICAgIGRyYXdpbmdDb250cm9sOiB0aGlzLmRyYXdpbmdDb250cm9sLFxuICAgICAgICAgIGRyYXdpbmdDb250cm9sT3B0aW9uczogdGhpcy5kcmF3aW5nQ29udHJvbE9wdGlvbnMsXG4gICAgICAgICAgZHJhd2luZ01vZGU6IHRoaXMuZHJhd2luZ01vZGUsXG4gICAgICB9KTtcbiAgICAgIHRoaXMuaW5pdEV2ZW50cyh0aGlzLmRyYXdpbmdNYW5hZ2VyKTtcbiAgICB9IGVsc2UgaWYgKCFtYXAgJiYgdGhpcy5kcmF3aW5nTWFuYWdlcikge1xuICAgICAgdGhpcy5kcmF3aW5nTWFuYWdlci5zZXRNYXAobnVsbCk7XG4gICAgfVxuICAgIC8vIGVsc2UgZG8gbm90aGluZ1xuICB9XG5cbiAgaW5pdEV2ZW50cyhkcmF3aW5nTWFuYWdlcjogYW55KSB7XG4gICAgdGhpcy5ldmVudFN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuY3JlYXRlTXZjT2JzZXJ2YWJsZTxDaXJjbGU+KCdjaXJjbGVjb21wbGV0ZScsIGRyYXdpbmdNYW5hZ2VyKVxuICAgICAgLnN1YnNjcmliZShjaXJjbGUgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gdGhpcy5jaXJjbGVDb21wbGV0ZS5uZXh0KGNpcmNsZSkpKVxuICAgICk7XG4gICAgdGhpcy5ldmVudFN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuY3JlYXRlTXZjT2JzZXJ2YWJsZTxNYXJrZXI+KCdtYXJrZXJjb21wbGV0ZScsIGRyYXdpbmdNYW5hZ2VyKVxuICAgICAgLnN1YnNjcmliZShtYXJrZXIgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gdGhpcy5tYXJrZXJDb21wbGV0ZS5uZXh0KG1hcmtlcikpKVxuICAgICk7XG4gICAgdGhpcy5ldmVudFN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuY3JlYXRlTXZjT2JzZXJ2YWJsZTxQb2x5Z29uPigncG9seWdvbmNvbXBsZXRlJywgZHJhd2luZ01hbmFnZXIpXG4gICAgICAuc3Vic2NyaWJlKHBvbHlnb24gPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gdGhpcy5wb2x5Z29uQ29tcGxldGUubmV4dChwb2x5Z29uKSkpXG4gICAgKTtcbiAgICB0aGlzLmV2ZW50U3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5jcmVhdGVNdmNPYnNlcnZhYmxlPFBvbHlsaW5lPigncG9seWxpbmVjb21wbGV0ZScsIGRyYXdpbmdNYW5hZ2VyKVxuICAgICAgLnN1YnNjcmliZShwb2x5bGluZSA9PiB0aGlzLl96b25lLnJ1bigoKSA9PiB0aGlzLnBvbHlsaW5lQ29tcGxldGUubmV4dChwb2x5bGluZSkpKVxuICAgICk7XG4gICAgdGhpcy5ldmVudFN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuY3JlYXRlTXZjT2JzZXJ2YWJsZTxPdmVybGF5Q29tcGxldGVFdmVudD4oJ292ZXJsYXljb21wbGV0ZScsIGRyYXdpbmdNYW5hZ2VyKVxuICAgICAgLnN1YnNjcmliZShvdmVybGF5ZXZlbnQgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gdGhpcy5vdmVybGF5Q29tcGxldGUubmV4dChvdmVybGF5ZXZlbnQpKSlcbiAgICApO1xuICAgIHRoaXMuZXZlbnRTdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmNyZWF0ZU12Y09ic2VydmFibGU8UmVjdGFuZ2xlPigncmVjdGFuZ2xlY29tcGxldGUnLCBkcmF3aW5nTWFuYWdlcilcbiAgICAgIC5zdWJzY3JpYmUocmVjdGFuZ2xlID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IHRoaXMucmVjdGFuZ2xlQ29tcGxldGUubmV4dChyZWN0YW5nbGUpKSlcbiAgICApO1xuICB9XG5cbiAgY3JlYXRlTXZjT2JzZXJ2YWJsZTxFPihldmVudE5hbWU6IHN0cmluZywgbXZjT2JqZWN0OiBNVkNPYmplY3QpOiBPYnNlcnZhYmxlPEU+IHtcbiAgICByZXR1cm4gZnJvbUV2ZW50UGF0dGVybihcbiAgICAgIGhhbmRsZXIgPT4gbXZjT2JqZWN0LmFkZExpc3RlbmVyKGV2ZW50TmFtZSxcbiAgICAgICAgKGV2ZW50PzogRSkgPT4gaGFuZGxlci5hcHBseShudWxsLCBbZXZlbnRdKSksXG4gICAgICAoX2hhbmRsZXI6IEZ1bmN0aW9uLCBldkxpc3RlbmVyOiBNYXBzRXZlbnRMaXN0ZW5lcikgPT4gZXZMaXN0ZW5lci5yZW1vdmUoKVxuICAgICk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRyYXdpbmdNYW5hZ2VyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdC5lbnRyaWVzKGNoYW5nZXMpXG4gICAgLm1hcCgoW3Byb3AsIGNoYW5nZV0pID0+IFtwcm9wLCBjaGFuZ2UuY3VycmVudFZhbHVlXSlcbiAgICAucmVkdWNlKChvYmo6IGFueSwgW3Byb3BOYW1lLCBwcm9wVmFsdWVdKSA9PiB7XG4gICAgICBvYmpbcHJvcE5hbWVdID0gcHJvcFZhbHVlO1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9LCB7fSk7XG4gICAgdGhpcy5kcmF3aW5nTWFuYWdlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5ldmVudFN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWJzY3JpcHRpb24gPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbn1cbiJdfQ==