import { __read } from 'tslib';
import { EventEmitter, isDevMode, NgZone, Directive, Input, Output, Host, NgModule } from '@angular/core';
import { fromEventPattern } from 'rxjs';
import { AgmMap, AgmCoreModule } from '@agm/core';
import { first } from 'rxjs/operators';

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

var AgmDrawingManagerTrigger = /** @class */ (function () {
    function AgmDrawingManagerTrigger(_agmMap) {
        this._agmMap = _agmMap;
    }
    AgmDrawingManagerTrigger.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._agmMap.mapReady.pipe(first()).subscribe(function (map) { return _this.drawingManager.setMap(map); });
    };
    AgmDrawingManagerTrigger.prototype.ngOnDestroy = function () {
        var _this = this;
        this._agmMap.mapReady.pipe(first()).subscribe(function () { return _this.drawingManager.setMap(null); });
    };
    AgmDrawingManagerTrigger.ctorParameters = function () { return [
        { type: AgmMap, decorators: [{ type: Host }] }
    ]; };
    AgmDrawingManagerTrigger.decorators = [
        { type: Directive, args: [{
                    selector: 'agm-map[agmDrawingManager]',
                    exportAs: 'matDrawingManagerTrigger',
                },] }
    ];
    AgmDrawingManagerTrigger.ctorParameters = function () { return [
        { type: AgmMap, decorators: [{ type: Host }] }
    ]; };
    AgmDrawingManagerTrigger.propDecorators = {
        drawingManager: [{ type: Input, args: ['agmDrawingManager',] }]
    };
    return AgmDrawingManagerTrigger;
}());

var AgmDrawingModule = /** @class */ (function () {
    function AgmDrawingModule() {
    }
    AgmDrawingModule.decorators = [
        { type: NgModule, args: [{
                    imports: [AgmCoreModule],
                    declarations: [AgmDrawingManager, AgmDrawingManagerTrigger],
                    exports: [AgmDrawingManager, AgmDrawingManagerTrigger],
                },] }
    ];
    return AgmDrawingModule;
}());

var OverlayType;
(function (OverlayType) {
    OverlayType["CIRCLE"] = "circle";
    OverlayType["MARKER"] = "marker";
    OverlayType["POLYGONE"] = "polygon";
    OverlayType["POLYLINE"] = "polyline";
    OverlayType["RECTANGE"] = "rectangle";
})(OverlayType || (OverlayType = {}));

/**
 * Generated bundle index. Do not edit.
 */

export { AgmDrawingManager, AgmDrawingManagerTrigger, AgmDrawingModule, OverlayType };
//# sourceMappingURL=agm-drawing.js.map
