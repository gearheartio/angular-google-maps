import { isPlatformServer } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { FitBoundsService } from '../services/fit-bounds';
import { GoogleMapsAPIWrapper } from '../services/google-maps-api-wrapper';
import { CircleManager } from '../services/managers/circle-manager';
import { InfoWindowManager } from '../services/managers/info-window-manager';
import { LayerManager } from '../services/managers/layer-manager';
import { MarkerManager } from '../services/managers/marker-manager';
import { PolygonManager } from '../services/managers/polygon-manager';
import { PolylineManager } from '../services/managers/polyline-manager';
import { RectangleManager } from '../services/managers/rectangle-manager';
import { DataLayerManager } from './../services/managers/data-layer-manager';
import { KmlLayerManager } from './../services/managers/kml-layer-manager';
/**
 * AgmMap renders a Google Map.
 * **Important note**: To be able see a map in the browser, you have to define a height for the
 * element `agm-map`.
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    agm-map {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *    </agm-map>
 *  `
 * })
 * ```
 */
var AgmMap = /** @class */ (function () {
    function AgmMap(_elem, _mapsWrapper, _platformId, _fitBoundsService, _zone) {
        this._elem = _elem;
        this._mapsWrapper = _mapsWrapper;
        this._platformId = _platformId;
        this._fitBoundsService = _fitBoundsService;
        this._zone = _zone;
        /**
         * The longitude that defines the center of the map.
         */
        this.longitude = 0;
        /**
         * The latitude that defines the center of the map.
         */
        this.latitude = 0;
        /**
         * The zoom level of the map. The default zoom level is 8.
         */
        this.zoom = 8;
        /**
         * Enables/disables if map is draggable.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = true;
        /**
         * Enables/disables zoom and center on double click. Enabled by default.
         */
        this.disableDoubleClickZoom = false;
        /**
         * Enables/disables all default UI of the Google map. Please note: When the map is created, this
         * value cannot get updated.
         */
        this.disableDefaultUI = false;
        /**
         * If false, disables scrollwheel zooming on the map. The scrollwheel is enabled by default.
         */
        this.scrollwheel = true;
        /**
         * If false, prevents the map from being controlled by the keyboard. Keyboard shortcuts are
         * enabled by default.
         */
        this.keyboardShortcuts = true;
        /**
         * Styles to apply to each of the default map types. Note that for Satellite/Hybrid and Terrain
         * modes, these styles will only apply to labels and geometry.
         */
        this.styles = [];
        /**
         * When true and the latitude and/or longitude values changes, the Google Maps panTo method is
         * used to
         * center the map. See: https://developers.google.com/maps/documentation/javascript/reference#Map
         */
        this.usePanning = false;
        /**
         * Sets the viewport to contain the given bounds.
         * If this option to `true`, the bounds get automatically computed from all elements that use the {@link AgmFitBounds} directive.
         */
        this.fitBounds = false;
        /**
         * The initial enabled/disabled state of the Scale control. This is disabled by default.
         */
        this.scaleControl = false;
        /**
         * The initial enabled/disabled state of the Map type control.
         */
        this.mapTypeControl = false;
        /**
         * The initial enabled/disabled state of the Pan control.
         */
        this.panControl = false;
        /**
         * The initial enabled/disabled state of the Rotate control.
         */
        this.rotateControl = false;
        /**
         * The initial enabled/disabled state of the Fullscreen control.
         */
        this.fullscreenControl = false;
        /**
         * The map mapTypeId. Defaults to 'roadmap'.
         */
        this.mapTypeId = 'roadmap';
        /**
         * When false, map icons are not clickable. A map icon represents a point of interest,
         * also known as a POI. By default map icons are clickable.
         */
        this.clickableIcons = true;
        /**
         * A map icon represents a point of interest, also known as a POI.
         * When map icons are clickable by default, an info window is displayed.
         * When this property is set to false, the info window will not be shown but the click event
         * will still fire
         */
        this.showDefaultInfoWindow = true;
        /**
         * This setting controls how gestures on the map are handled.
         * Allowed values:
         * - 'cooperative' (Two-finger touch gestures pan and zoom the map. One-finger touch gestures are not handled by the map.)
         * - 'greedy'      (All touch gestures pan or zoom the map.)
         * - 'none'        (The map cannot be panned or zoomed by user gestures.)
         * - 'auto'        [default] (Gesture handling is either cooperative or greedy, depending on whether the page is scrollable or not.
         */
        this.gestureHandling = 'auto';
        /**
         * Controls the automatic switching behavior for the angle of incidence of
         * the map. The only allowed values are 0 and 45. The value 0 causes the map
         * to always use a 0° overhead view regardless of the zoom level and
         * viewport. The value 45 causes the tilt angle to automatically switch to
         * 45 whenever 45° imagery is available for the current zoom level and
         * viewport, and switch back to 0 whenever 45° imagery is not available
         * (this is the default behavior). 45° imagery is only available for
         * satellite and hybrid map types, within some locations, and at some zoom
         * levels. Note: getTilt returns the current tilt angle, not the value
         * specified by this option. Because getTilt and this option refer to
         * different things, do not bind() the tilt property; doing so may yield
         * unpredictable effects. (Default of AGM is 0 (disabled). Enable it with value 45.)
         */
        this.tilt = 0;
        this._observableSubscriptions = [];
        /**
         * This event emitter gets emitted when the user clicks on the map (but not when they click on a
         * marker or infoWindow).
         */
        this.mapClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user right-clicks on the map (but not when they click
         * on a marker or infoWindow).
         */
        this.mapRightClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user double-clicks on the map (but not when they click
         * on a marker or infoWindow).
         */
        this.mapDblClick = new EventEmitter();
        /**
         * This event emitter is fired when the map center changes.
         */
        this.centerChange = new EventEmitter();
        /**
         * This event is fired when the viewport bounds have changed.
         */
        this.boundsChange = new EventEmitter();
        /**
         * This event is fired when the mapTypeId property changes.
         */
        this.mapTypeIdChange = new EventEmitter();
        /**
         * This event is fired when the map becomes idle after panning or zooming.
         */
        this.idle = new EventEmitter();
        /**
         * This event is fired when the zoom level has changed.
         */
        this.zoomChange = new EventEmitter();
        /**
         * This event is fired when the google map is fully initialized.
         * You get the google.maps.Map instance as a result of this EventEmitter.
         */
        this.mapReady = new EventEmitter();
        /**
         * This event is fired when the visible tiles have finished loading.
         */
        this.tilesLoaded = new EventEmitter();
    }
    /** @internal */
    AgmMap.prototype.ngOnInit = function () {
        if (isPlatformServer(this._platformId)) {
            // The code is running on the server, do nothing
            return;
        }
        // todo: this should be solved with a new component and a viewChild decorator
        var container = this._elem.nativeElement.querySelector('.agm-map-container-inner');
        this._initMapInstance(container);
    };
    AgmMap.prototype._initMapInstance = function (el) {
        var _this = this;
        this._mapsWrapper.createMap(el, {
            center: { lat: this.latitude || 0, lng: this.longitude || 0 },
            zoom: this.zoom,
            minZoom: this.minZoom,
            maxZoom: this.maxZoom,
            controlSize: this.controlSize,
            disableDefaultUI: this.disableDefaultUI,
            disableDoubleClickZoom: this.disableDoubleClickZoom,
            scrollwheel: this.scrollwheel,
            backgroundColor: this.backgroundColor,
            draggable: this.draggable,
            draggableCursor: this.draggableCursor,
            draggingCursor: this.draggingCursor,
            keyboardShortcuts: this.keyboardShortcuts,
            styles: this.styles,
            zoomControl: this.zoomControl,
            zoomControlOptions: this.zoomControlOptions,
            streetViewControl: this.streetViewControl,
            streetViewControlOptions: this.streetViewControlOptions,
            scaleControl: this.scaleControl,
            scaleControlOptions: this.scaleControlOptions,
            mapTypeControl: this.mapTypeControl,
            mapTypeControlOptions: this.mapTypeControlOptions,
            panControl: this.panControl,
            panControlOptions: this.panControlOptions,
            rotateControl: this.rotateControl,
            rotateControlOptions: this.rotateControlOptions,
            fullscreenControl: this.fullscreenControl,
            fullscreenControlOptions: this.fullscreenControlOptions,
            mapTypeId: this.mapTypeId,
            clickableIcons: this.clickableIcons,
            gestureHandling: this.gestureHandling,
            tilt: this.tilt,
            restriction: this.restriction,
        })
            .then(function () { return _this._mapsWrapper.getNativeMap(); })
            .then(function (map) { return _this.mapReady.emit(map); });
        // register event listeners
        this._handleMapCenterChange();
        this._handleMapZoomChange();
        this._handleMapMouseEvents();
        this._handleBoundsChange();
        this._handleMapTypeIdChange();
        this._handleTilesLoadedEvent();
        this._handleIdleEvent();
    };
    /** @internal */
    AgmMap.prototype.ngOnDestroy = function () {
        // unsubscribe all registered observable subscriptions
        this._observableSubscriptions.forEach(function (s) { return s.unsubscribe(); });
        // remove all listeners from the map instance
        this._mapsWrapper.clearInstanceListeners();
        if (this._fitBoundsSubscription) {
            this._fitBoundsSubscription.unsubscribe();
        }
    };
    /* @internal */
    AgmMap.prototype.ngOnChanges = function (changes) {
        this._updateMapOptionsChanges(changes);
        this._updatePosition(changes);
    };
    AgmMap.prototype._updateMapOptionsChanges = function (changes) {
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return AgmMap._mapOptionsAttributes.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
        this._mapsWrapper.setMapOptions(options);
    };
    /**
     * Triggers a resize event on the google map instance.
     * When recenter is true, the of the google map gets called with the current lat/lng values or fitBounds value to recenter the map.
     * Returns a promise that gets resolved after the event was triggered.
     */
    AgmMap.prototype.triggerResize = function (recenter) {
        var _this = this;
        if (recenter === void 0) { recenter = true; }
        // Note: When we would trigger the resize event and show the map in the same turn (which is a
        // common case for triggering a resize event), then the resize event would not
        // work (to show the map), so we trigger the event in a timeout.
        return new Promise(function (resolve) {
            setTimeout(function () {
                return _this._mapsWrapper.triggerMapEvent('resize').then(function () {
                    if (recenter) {
                        _this.fitBounds != null ? _this._fitBounds() : _this._setCenter();
                    }
                    resolve();
                });
            });
        });
    };
    AgmMap.prototype._updatePosition = function (changes) {
        if (changes['latitude'] == null && changes['longitude'] == null &&
            !changes['fitBounds']) {
            // no position update needed
            return;
        }
        // we prefer fitBounds in changes
        if ('fitBounds' in changes) {
            this._fitBounds();
            return;
        }
        if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
            return;
        }
        this._setCenter();
    };
    AgmMap.prototype._setCenter = function () {
        var newCenter = {
            lat: this.latitude,
            lng: this.longitude,
        };
        if (this.usePanning) {
            this._mapsWrapper.panTo(newCenter);
        }
        else {
            this._mapsWrapper.setCenter(newCenter);
        }
    };
    AgmMap.prototype._fitBounds = function () {
        switch (this.fitBounds) {
            case true:
                this._subscribeToFitBoundsUpdates();
                break;
            case false:
                if (this._fitBoundsSubscription) {
                    this._fitBoundsSubscription.unsubscribe();
                }
                break;
            default:
                this._updateBounds(this.fitBounds, this.fitBoundsPadding);
        }
    };
    AgmMap.prototype._subscribeToFitBoundsUpdates = function () {
        var _this = this;
        this._zone.runOutsideAngular(function () {
            _this._fitBoundsSubscription = _this._fitBoundsService.getBounds$().subscribe(function (b) {
                _this._zone.run(function () { return _this._updateBounds(b, _this.fitBoundsPadding); });
            });
        });
    };
    AgmMap.prototype._updateBounds = function (bounds, padding) {
        if (!bounds) {
            return;
        }
        if (this._isLatLngBoundsLiteral(bounds) && typeof google !== 'undefined' && google && google.maps && google.maps.LatLngBounds) {
            var newBounds = new google.maps.LatLngBounds();
            newBounds.union(bounds);
            bounds = newBounds;
        }
        if (this.usePanning) {
            this._mapsWrapper.panToBounds(bounds, padding);
            return;
        }
        this._mapsWrapper.fitBounds(bounds, padding);
    };
    AgmMap.prototype._isLatLngBoundsLiteral = function (bounds) {
        return bounds != null && bounds.extend === undefined;
    };
    AgmMap.prototype._handleMapCenterChange = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('center_changed').subscribe(function () {
            _this._mapsWrapper.getCenter().then(function (center) {
                _this.latitude = center.lat();
                _this.longitude = center.lng();
                _this.centerChange.emit({ lat: _this.latitude, lng: _this.longitude });
            });
        });
        this._observableSubscriptions.push(s);
    };
    AgmMap.prototype._handleBoundsChange = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('bounds_changed').subscribe(function () {
            _this._mapsWrapper.getBounds().then(function (bounds) { _this.boundsChange.emit(bounds); });
        });
        this._observableSubscriptions.push(s);
    };
    AgmMap.prototype._handleMapTypeIdChange = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('maptypeid_changed').subscribe(function () {
            _this._mapsWrapper.getMapTypeId().then(function (mapTypeId) { _this.mapTypeIdChange.emit(mapTypeId); });
        });
        this._observableSubscriptions.push(s);
    };
    AgmMap.prototype._handleMapZoomChange = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('zoom_changed').subscribe(function () {
            _this._mapsWrapper.getZoom().then(function (z) {
                _this.zoom = z;
                _this.zoomChange.emit(z);
            });
        });
        this._observableSubscriptions.push(s);
    };
    AgmMap.prototype._handleIdleEvent = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('idle').subscribe(function () { _this.idle.emit(void 0); });
        this._observableSubscriptions.push(s);
    };
    AgmMap.prototype._handleTilesLoadedEvent = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('tilesloaded').subscribe(function () { return _this.tilesLoaded.emit(void 0); });
        this._observableSubscriptions.push(s);
    };
    AgmMap.prototype._handleMapMouseEvents = function () {
        var _this = this;
        var events = [
            { name: 'click', emitter: this.mapClick },
            { name: 'rightclick', emitter: this.mapRightClick },
            { name: 'dblclick', emitter: this.mapDblClick },
        ];
        events.forEach(function (e) {
            var s = _this._mapsWrapper.subscribeToMapEvent(e.name).subscribe(function (event) {
                var value = {
                    coords: {
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng(),
                    },
                    placeId: event.placeId,
                };
                // the placeId will be undefined in case the event was not an IconMouseEvent (google types)
                if (value.placeId && !_this.showDefaultInfoWindow) {
                    event.stop();
                }
                e.emitter.emit(value);
            });
            _this._observableSubscriptions.push(s);
        });
    };
    /**
     * Map option attributes that can change over time
     */
    AgmMap._mapOptionsAttributes = [
        'disableDoubleClickZoom', 'scrollwheel', 'draggable', 'draggableCursor', 'draggingCursor',
        'keyboardShortcuts', 'zoomControl', 'zoomControlOptions', 'styles', 'streetViewControl',
        'streetViewControlOptions', 'zoom', 'mapTypeControl', 'mapTypeControlOptions', 'minZoom',
        'maxZoom', 'panControl', 'panControlOptions', 'rotateControl', 'rotateControlOptions',
        'fullscreenControl', 'fullscreenControlOptions', 'scaleControl', 'scaleControlOptions',
        'mapTypeId', 'clickableIcons', 'gestureHandling', 'tilt', 'restriction',
    ];
    AgmMap.ctorParameters = function () { return [
        { type: ElementRef },
        { type: GoogleMapsAPIWrapper },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: FitBoundsService },
        { type: NgZone }
    ]; };
    AgmMap.decorators = [
        { type: Component, args: [{
                    selector: 'agm-map',
                    providers: [
                        CircleManager,
                        DataLayerManager,
                        DataLayerManager,
                        FitBoundsService,
                        GoogleMapsAPIWrapper,
                        InfoWindowManager,
                        KmlLayerManager,
                        LayerManager,
                        MarkerManager,
                        PolygonManager,
                        PolylineManager,
                        RectangleManager,
                    ],
                    host: {
                        // todo: deprecated - we will remove it with the next version
                        '[class.sebm-google-map-container]': 'true',
                    },
                    template: "\n              <div class='agm-map-container-inner sebm-google-map-container-inner'></div>\n              <div class='agm-map-content'>\n                <ng-content></ng-content>\n              </div>\n  ",
                    styles: ["\n    .agm-map-container-inner {\n      width: inherit;\n      height: inherit;\n    }\n    .agm-map-content {\n      display:none;\n    }\n  "]
                },] }
    ];
    AgmMap.ctorParameters = function () { return [
        { type: ElementRef },
        { type: GoogleMapsAPIWrapper },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: FitBoundsService },
        { type: NgZone }
    ]; };
    AgmMap.propDecorators = {
        longitude: [{ type: Input }],
        latitude: [{ type: Input }],
        zoom: [{ type: Input }],
        minZoom: [{ type: Input }],
        maxZoom: [{ type: Input }],
        controlSize: [{ type: Input }],
        draggable: [{ type: Input, args: ['mapDraggable',] }],
        disableDoubleClickZoom: [{ type: Input }],
        disableDefaultUI: [{ type: Input }],
        scrollwheel: [{ type: Input }],
        backgroundColor: [{ type: Input }],
        draggableCursor: [{ type: Input }],
        draggingCursor: [{ type: Input }],
        keyboardShortcuts: [{ type: Input }],
        zoomControl: [{ type: Input }],
        zoomControlOptions: [{ type: Input }],
        styles: [{ type: Input }],
        usePanning: [{ type: Input }],
        streetViewControl: [{ type: Input }],
        streetViewControlOptions: [{ type: Input }],
        fitBounds: [{ type: Input }],
        fitBoundsPadding: [{ type: Input }],
        scaleControl: [{ type: Input }],
        scaleControlOptions: [{ type: Input }],
        mapTypeControl: [{ type: Input }],
        mapTypeControlOptions: [{ type: Input }],
        panControl: [{ type: Input }],
        panControlOptions: [{ type: Input }],
        rotateControl: [{ type: Input }],
        rotateControlOptions: [{ type: Input }],
        fullscreenControl: [{ type: Input }],
        fullscreenControlOptions: [{ type: Input }],
        mapTypeId: [{ type: Input }],
        clickableIcons: [{ type: Input }],
        showDefaultInfoWindow: [{ type: Input }],
        gestureHandling: [{ type: Input }],
        tilt: [{ type: Input }],
        restriction: [{ type: Input }],
        mapClick: [{ type: Output }],
        mapRightClick: [{ type: Output }],
        mapDblClick: [{ type: Output }],
        centerChange: [{ type: Output }],
        boundsChange: [{ type: Output }],
        mapTypeIdChange: [{ type: Output }],
        idle: [{ type: Output }],
        zoomChange: [{ type: Output }],
        mapReady: [{ type: Output }],
        tilesLoaded: [{ type: Output }]
    };
    return AgmMap;
}());
export { AgmMap };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9tYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTdKLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBTTNFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBSTNFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0g7SUE4VUUsZ0JBQ1UsS0FBaUIsRUFDakIsWUFBa0MsRUFDYixXQUFtQixFQUN0QyxpQkFBbUMsRUFDckMsS0FBYTtRQUpi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QUtOLE1BQU07dUJBS04sTUFBTTs2QkFLTixNQUFNOzJCQU1OLE1BQU07OEJBS04sTUFBTTs7SUFpUlQsYUFBQztDQUFBLEFBN2xCRCxJQTZsQkM7U0F6akJZLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc1BsYXRmb3JtU2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBOZ1pvbmUsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgUExBVEZPUk1fSUQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBNb3VzZUV2ZW50IH0gZnJvbSAnLi4vbWFwLXR5cGVzJztcbmltcG9ydCB7IEZpdEJvdW5kc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9maXQtYm91bmRzJztcbmltcG9ydCB7IEdvb2dsZU1hcHNBUElXcmFwcGVyIH0gZnJvbSAnLi4vc2VydmljZXMvZ29vZ2xlLW1hcHMtYXBpLXdyYXBwZXInO1xuaW1wb3J0IHtcbiAgRnVsbHNjcmVlbkNvbnRyb2xPcHRpb25zLCBMYXRMbmcsIExhdExuZ0JvdW5kcywgTGF0TG5nQm91bmRzTGl0ZXJhbCwgTGF0TG5nTGl0ZXJhbCxcbiAgTWFwUmVzdHJpY3Rpb24sIE1hcFR5cGVDb250cm9sT3B0aW9ucywgTWFwVHlwZUlkLCBNYXBUeXBlU3R5bGUsIFBhZGRpbmcsIFBhbkNvbnRyb2xPcHRpb25zLFxuICBSb3RhdGVDb250cm9sT3B0aW9ucywgU2NhbGVDb250cm9sT3B0aW9ucywgU3RyZWV0Vmlld0NvbnRyb2xPcHRpb25zLCBab29tQ29udHJvbE9wdGlvbnMsXG59IGZyb20gJy4uL3NlcnZpY2VzL2dvb2dsZS1tYXBzLXR5cGVzJztcbmltcG9ydCB7IENpcmNsZU1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9jaXJjbGUtbWFuYWdlcic7XG5pbXBvcnQgeyBJbmZvV2luZG93TWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL2luZm8td2luZG93LW1hbmFnZXInO1xuaW1wb3J0IHsgTGF5ZXJNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvbGF5ZXItbWFuYWdlcic7XG5pbXBvcnQgeyBNYXJrZXJNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvbWFya2VyLW1hbmFnZXInO1xuaW1wb3J0IHsgUG9seWdvbk1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9wb2x5Z29uLW1hbmFnZXInO1xuaW1wb3J0IHsgUG9seWxpbmVNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvcG9seWxpbmUtbWFuYWdlcic7XG5pbXBvcnQgeyBSZWN0YW5nbGVNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvcmVjdGFuZ2xlLW1hbmFnZXInO1xuaW1wb3J0IHsgRGF0YUxheWVyTWFuYWdlciB9IGZyb20gJy4vLi4vc2VydmljZXMvbWFuYWdlcnMvZGF0YS1sYXllci1tYW5hZ2VyJztcbmltcG9ydCB7IEttbExheWVyTWFuYWdlciB9IGZyb20gJy4vLi4vc2VydmljZXMvbWFuYWdlcnMva21sLWxheWVyLW1hbmFnZXInO1xuXG5kZWNsYXJlIHZhciBnb29nbGU6IGFueTtcblxuLyoqXG4gKiBBZ21NYXAgcmVuZGVycyBhIEdvb2dsZSBNYXAuXG4gKiAqKkltcG9ydGFudCBub3RlKio6IFRvIGJlIGFibGUgc2VlIGEgbWFwIGluIHRoZSBicm93c2VyLCB5b3UgaGF2ZSB0byBkZWZpbmUgYSBoZWlnaHQgZm9yIHRoZVxuICogZWxlbWVudCBgYWdtLW1hcGAuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICpcbiAqIEBDb21wb25lbnQoe1xuICogIHNlbGVjdG9yOiAnbXktbWFwLWNtcCcsXG4gKiAgc3R5bGVzOiBbYFxuICogICAgYWdtLW1hcCB7XG4gKiAgICAgIGhlaWdodDogMzAwcHg7XG4gKiAgICB9XG4gKiBgXSxcbiAqICB0ZW1wbGF0ZTogYFxuICogICAgPGFnbS1tYXAgW2xhdGl0dWRlXT1cImxhdFwiIFtsb25naXR1ZGVdPVwibG5nXCIgW3pvb21dPVwiem9vbVwiPlxuICogICAgPC9hZ20tbWFwPlxuICogIGBcbiAqIH0pXG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWdtLW1hcCcsXG4gIHByb3ZpZGVyczogW1xuICAgIENpcmNsZU1hbmFnZXIsXG4gICAgRGF0YUxheWVyTWFuYWdlcixcbiAgICBEYXRhTGF5ZXJNYW5hZ2VyLFxuICAgIEZpdEJvdW5kc1NlcnZpY2UsXG4gICAgR29vZ2xlTWFwc0FQSVdyYXBwZXIsXG4gICAgSW5mb1dpbmRvd01hbmFnZXIsXG4gICAgS21sTGF5ZXJNYW5hZ2VyLFxuICAgIExheWVyTWFuYWdlcixcbiAgICBNYXJrZXJNYW5hZ2VyLFxuICAgIFBvbHlnb25NYW5hZ2VyLFxuICAgIFBvbHlsaW5lTWFuYWdlcixcbiAgICBSZWN0YW5nbGVNYW5hZ2VyLFxuICBdLFxuICBob3N0OiB7XG4gICAgLy8gdG9kbzogZGVwcmVjYXRlZCAtIHdlIHdpbGwgcmVtb3ZlIGl0IHdpdGggdGhlIG5leHQgdmVyc2lvblxuICAgICdbY2xhc3Muc2VibS1nb29nbGUtbWFwLWNvbnRhaW5lcl0nOiAndHJ1ZScsXG4gIH0sXG4gIHN0eWxlczogW2BcbiAgICAuYWdtLW1hcC1jb250YWluZXItaW5uZXIge1xuICAgICAgd2lkdGg6IGluaGVyaXQ7XG4gICAgICBoZWlnaHQ6IGluaGVyaXQ7XG4gICAgfVxuICAgIC5hZ20tbWFwLWNvbnRlbnQge1xuICAgICAgZGlzcGxheTpub25lO1xuICAgIH1cbiAgYF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2FnbS1tYXAtY29udGFpbmVyLWlubmVyIHNlYm0tZ29vZ2xlLW1hcC1jb250YWluZXItaW5uZXInPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdhZ20tbWFwLWNvbnRlbnQnPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIEFnbU1hcCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogVGhlIGxvbmdpdHVkZSB0aGF0IGRlZmluZXMgdGhlIGNlbnRlciBvZiB0aGUgbWFwLlxuICAgKi9cbiAgQElucHV0KCkgbG9uZ2l0dWRlID0gMDtcblxuICAvKipcbiAgICogVGhlIGxhdGl0dWRlIHRoYXQgZGVmaW5lcyB0aGUgY2VudGVyIG9mIHRoZSBtYXAuXG4gICAqL1xuICBASW5wdXQoKSBsYXRpdHVkZSA9IDA7XG5cbiAgLyoqXG4gICAqIFRoZSB6b29tIGxldmVsIG9mIHRoZSBtYXAuIFRoZSBkZWZhdWx0IHpvb20gbGV2ZWwgaXMgOC5cbiAgICovXG4gIEBJbnB1dCgpIHpvb20gPSA4O1xuXG4gIC8qKlxuICAgKiBUaGUgbWluaW1hbCB6b29tIGxldmVsIG9mIHRoZSBtYXAgYWxsb3dlZC4gV2hlbiBub3QgcHJvdmlkZWQsIG5vIHJlc3RyaWN0aW9ucyB0byB0aGUgem9vbSBsZXZlbFxuICAgKiBhcmUgZW5mb3JjZWQuXG4gICAqL1xuICBASW5wdXQoKSBtaW5ab29tOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBtYXhpbWFsIHpvb20gbGV2ZWwgb2YgdGhlIG1hcCBhbGxvd2VkLiBXaGVuIG5vdCBwcm92aWRlZCwgbm8gcmVzdHJpY3Rpb25zIHRvIHRoZSB6b29tIGxldmVsXG4gICAqIGFyZSBlbmZvcmNlZC5cbiAgICovXG4gIEBJbnB1dCgpIG1heFpvb206IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGNvbnRyb2wgc2l6ZSBmb3IgdGhlIGRlZmF1bHQgbWFwIGNvbnRyb2xzLiBPbmx5IGdvdmVybnMgdGhlIGNvbnRyb2xzIG1hZGUgYnkgdGhlIE1hcHMgQVBJIGl0c2VsZlxuICAgKi9cbiAgQElucHV0KCkgY29udHJvbFNpemU6IG51bWJlcjtcblxuICAvKipcbiAgICogRW5hYmxlcy9kaXNhYmxlcyBpZiBtYXAgaXMgZHJhZ2dhYmxlLlxuICAgKi9cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ21hcERyYWdnYWJsZScpIGRyYWdnYWJsZSA9IHRydWU7XG5cbiAgLyoqXG4gICAqIEVuYWJsZXMvZGlzYWJsZXMgem9vbSBhbmQgY2VudGVyIG9uIGRvdWJsZSBjbGljay4gRW5hYmxlZCBieSBkZWZhdWx0LlxuICAgKi9cbiAgQElucHV0KCkgZGlzYWJsZURvdWJsZUNsaWNrWm9vbSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBFbmFibGVzL2Rpc2FibGVzIGFsbCBkZWZhdWx0IFVJIG9mIHRoZSBHb29nbGUgbWFwLiBQbGVhc2Ugbm90ZTogV2hlbiB0aGUgbWFwIGlzIGNyZWF0ZWQsIHRoaXNcbiAgICogdmFsdWUgY2Fubm90IGdldCB1cGRhdGVkLlxuICAgKi9cbiAgQElucHV0KCkgZGlzYWJsZURlZmF1bHRVSSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBJZiBmYWxzZSwgZGlzYWJsZXMgc2Nyb2xsd2hlZWwgem9vbWluZyBvbiB0aGUgbWFwLiBUaGUgc2Nyb2xsd2hlZWwgaXMgZW5hYmxlZCBieSBkZWZhdWx0LlxuICAgKi9cbiAgQElucHV0KCkgc2Nyb2xsd2hlZWwgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBDb2xvciB1c2VkIGZvciB0aGUgYmFja2dyb3VuZCBvZiB0aGUgTWFwIGRpdi4gVGhpcyBjb2xvciB3aWxsIGJlIHZpc2libGUgd2hlbiB0aWxlcyBoYXZlIG5vdFxuICAgKiB5ZXQgbG9hZGVkIGFzIHRoZSB1c2VyIHBhbnMuIFRoaXMgb3B0aW9uIGNhbiBvbmx5IGJlIHNldCB3aGVuIHRoZSBtYXAgaXMgaW5pdGlhbGl6ZWQuXG4gICAqL1xuICBASW5wdXQoKSBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIG5hbWUgb3IgdXJsIG9mIHRoZSBjdXJzb3IgdG8gZGlzcGxheSB3aGVuIG1vdXNpbmcgb3ZlciBhIGRyYWdnYWJsZSBtYXAuIFRoaXMgcHJvcGVydHkgdXNlc1xuICAgKiB0aGUgY3NzICAqIGN1cnNvciBhdHRyaWJ1dGUgdG8gY2hhbmdlIHRoZSBpY29uLiBBcyB3aXRoIHRoZSBjc3MgcHJvcGVydHksIHlvdSBtdXN0IHNwZWNpZnkgYXRcbiAgICogbGVhc3Qgb25lIGZhbGxiYWNrIGN1cnNvciB0aGF0IGlzIG5vdCBhIFVSTC4gRm9yIGV4YW1wbGU6XG4gICAqIFtkcmFnZ2FibGVDdXJzb3JdPVwiJ3VybChodHRwOi8vd3d3LmV4YW1wbGUuY29tL2ljb24ucG5nKSwgYXV0bzsnXCJcbiAgICovXG4gIEBJbnB1dCgpIGRyYWdnYWJsZUN1cnNvcjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvciB1cmwgb2YgdGhlIGN1cnNvciB0byBkaXNwbGF5IHdoZW4gdGhlIG1hcCBpcyBiZWluZyBkcmFnZ2VkLiBUaGlzIHByb3BlcnR5IHVzZXMgdGhlXG4gICAqIGNzcyBjdXJzb3IgYXR0cmlidXRlIHRvIGNoYW5nZSB0aGUgaWNvbi4gQXMgd2l0aCB0aGUgY3NzIHByb3BlcnR5LCB5b3UgbXVzdCBzcGVjaWZ5IGF0IGxlYXN0XG4gICAqIG9uZSBmYWxsYmFjayBjdXJzb3IgdGhhdCBpcyBub3QgYSBVUkwuIEZvciBleGFtcGxlOlxuICAgKiBbZHJhZ2dpbmdDdXJzb3JdPVwiJ3VybChodHRwOi8vd3d3LmV4YW1wbGUuY29tL2ljb24ucG5nKSwgYXV0bzsnXCJcbiAgICovXG4gIEBJbnB1dCgpIGRyYWdnaW5nQ3Vyc29yOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIElmIGZhbHNlLCBwcmV2ZW50cyB0aGUgbWFwIGZyb20gYmVpbmcgY29udHJvbGxlZCBieSB0aGUga2V5Ym9hcmQuIEtleWJvYXJkIHNob3J0Y3V0cyBhcmVcbiAgICogZW5hYmxlZCBieSBkZWZhdWx0LlxuICAgKi9cbiAgQElucHV0KCkga2V5Ym9hcmRTaG9ydGN1dHMgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgZW5hYmxlZC9kaXNhYmxlZCBzdGF0ZSBvZiB0aGUgWm9vbSBjb250cm9sLlxuICAgKi9cbiAgQElucHV0KCkgem9vbUNvbnRyb2w6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIE9wdGlvbnMgZm9yIHRoZSBab29tIGNvbnRyb2wuXG4gICAqL1xuICBASW5wdXQoKSB6b29tQ29udHJvbE9wdGlvbnM6IFpvb21Db250cm9sT3B0aW9ucztcblxuICAvKipcbiAgICogU3R5bGVzIHRvIGFwcGx5IHRvIGVhY2ggb2YgdGhlIGRlZmF1bHQgbWFwIHR5cGVzLiBOb3RlIHRoYXQgZm9yIFNhdGVsbGl0ZS9IeWJyaWQgYW5kIFRlcnJhaW5cbiAgICogbW9kZXMsIHRoZXNlIHN0eWxlcyB3aWxsIG9ubHkgYXBwbHkgdG8gbGFiZWxzIGFuZCBnZW9tZXRyeS5cbiAgICovXG4gIEBJbnB1dCgpIHN0eWxlczogTWFwVHlwZVN0eWxlW10gPSBbXTtcblxuICAvKipcbiAgICogV2hlbiB0cnVlIGFuZCB0aGUgbGF0aXR1ZGUgYW5kL29yIGxvbmdpdHVkZSB2YWx1ZXMgY2hhbmdlcywgdGhlIEdvb2dsZSBNYXBzIHBhblRvIG1ldGhvZCBpc1xuICAgKiB1c2VkIHRvXG4gICAqIGNlbnRlciB0aGUgbWFwLiBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9qYXZhc2NyaXB0L3JlZmVyZW5jZSNNYXBcbiAgICovXG4gIEBJbnB1dCgpIHVzZVBhbm5pbmcgPSBmYWxzZTtcblxuICAvKipcbiAgICogVGhlIGluaXRpYWwgZW5hYmxlZC9kaXNhYmxlZCBzdGF0ZSBvZiB0aGUgU3RyZWV0IFZpZXcgUGVnbWFuIGNvbnRyb2wuXG4gICAqIFRoaXMgY29udHJvbCBpcyBwYXJ0IG9mIHRoZSBkZWZhdWx0IFVJLCBhbmQgc2hvdWxkIGJlIHNldCB0byBmYWxzZSB3aGVuIGRpc3BsYXlpbmcgYSBtYXAgdHlwZVxuICAgKiBvbiB3aGljaCB0aGUgU3RyZWV0IFZpZXcgcm9hZCBvdmVybGF5IHNob3VsZCBub3QgYXBwZWFyIChlLmcuIGEgbm9uLUVhcnRoIG1hcCB0eXBlKS5cbiAgICovXG4gIEBJbnB1dCgpIHN0cmVldFZpZXdDb250cm9sOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBPcHRpb25zIGZvciB0aGUgU3RyZWV0IFZpZXcgY29udHJvbC5cbiAgICovXG4gIEBJbnB1dCgpIHN0cmVldFZpZXdDb250cm9sT3B0aW9uczogU3RyZWV0Vmlld0NvbnRyb2xPcHRpb25zO1xuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB2aWV3cG9ydCB0byBjb250YWluIHRoZSBnaXZlbiBib3VuZHMuXG4gICAqIElmIHRoaXMgb3B0aW9uIHRvIGB0cnVlYCwgdGhlIGJvdW5kcyBnZXQgYXV0b21hdGljYWxseSBjb21wdXRlZCBmcm9tIGFsbCBlbGVtZW50cyB0aGF0IHVzZSB0aGUge0BsaW5rIEFnbUZpdEJvdW5kc30gZGlyZWN0aXZlLlxuICAgKi9cbiAgQElucHV0KCkgZml0Qm91bmRzOiBMYXRMbmdCb3VuZHNMaXRlcmFsIHwgTGF0TG5nQm91bmRzIHwgYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBQYWRkaW5nIGFtb3VudCBmb3IgdGhlIGJvdW5kcy5cbiAgICovXG4gIEBJbnB1dCgpIGZpdEJvdW5kc1BhZGRpbmc6IG51bWJlciB8IFBhZGRpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBpbml0aWFsIGVuYWJsZWQvZGlzYWJsZWQgc3RhdGUgb2YgdGhlIFNjYWxlIGNvbnRyb2wuIFRoaXMgaXMgZGlzYWJsZWQgYnkgZGVmYXVsdC5cbiAgICovXG4gIEBJbnB1dCgpIHNjYWxlQ29udHJvbCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBPcHRpb25zIGZvciB0aGUgc2NhbGUgY29udHJvbC5cbiAgICovXG4gIEBJbnB1dCgpIHNjYWxlQ29udHJvbE9wdGlvbnM6IFNjYWxlQ29udHJvbE9wdGlvbnM7XG5cbiAgLyoqXG4gICAqIFRoZSBpbml0aWFsIGVuYWJsZWQvZGlzYWJsZWQgc3RhdGUgb2YgdGhlIE1hcCB0eXBlIGNvbnRyb2wuXG4gICAqL1xuICBASW5wdXQoKSBtYXBUeXBlQ29udHJvbCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBPcHRpb25zIGZvciB0aGUgTWFwIHR5cGUgY29udHJvbC5cbiAgICovXG4gIEBJbnB1dCgpIG1hcFR5cGVDb250cm9sT3B0aW9uczogTWFwVHlwZUNvbnRyb2xPcHRpb25zO1xuXG4gIC8qKlxuICAgKiBUaGUgaW5pdGlhbCBlbmFibGVkL2Rpc2FibGVkIHN0YXRlIG9mIHRoZSBQYW4gY29udHJvbC5cbiAgICovXG4gIEBJbnB1dCgpIHBhbkNvbnRyb2wgID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIE9wdGlvbnMgZm9yIHRoZSBQYW4gY29udHJvbC5cbiAgICovXG4gIEBJbnB1dCgpIHBhbkNvbnRyb2xPcHRpb25zOiBQYW5Db250cm9sT3B0aW9ucztcblxuICAvKipcbiAgICogVGhlIGluaXRpYWwgZW5hYmxlZC9kaXNhYmxlZCBzdGF0ZSBvZiB0aGUgUm90YXRlIGNvbnRyb2wuXG4gICAqL1xuICBASW5wdXQoKSByb3RhdGVDb250cm9sID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIE9wdGlvbnMgZm9yIHRoZSBSb3RhdGUgY29udHJvbC5cbiAgICovXG4gIEBJbnB1dCgpIHJvdGF0ZUNvbnRyb2xPcHRpb25zOiBSb3RhdGVDb250cm9sT3B0aW9ucztcblxuICAvKipcbiAgICogVGhlIGluaXRpYWwgZW5hYmxlZC9kaXNhYmxlZCBzdGF0ZSBvZiB0aGUgRnVsbHNjcmVlbiBjb250cm9sLlxuICAgKi9cbiAgQElucHV0KCkgZnVsbHNjcmVlbkNvbnRyb2wgID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIE9wdGlvbnMgZm9yIHRoZSBGdWxsc2NyZWVuIGNvbnRyb2wuXG4gICAqL1xuICBASW5wdXQoKSBmdWxsc2NyZWVuQ29udHJvbE9wdGlvbnM6IEZ1bGxzY3JlZW5Db250cm9sT3B0aW9ucztcblxuICAvKipcbiAgICogVGhlIG1hcCBtYXBUeXBlSWQuIERlZmF1bHRzIHRvICdyb2FkbWFwJy5cbiAgICovXG4gIEBJbnB1dCgpIG1hcFR5cGVJZDogJ3JvYWRtYXAnIHwgJ2h5YnJpZCcgfCAnc2F0ZWxsaXRlJyB8ICd0ZXJyYWluJyB8IHN0cmluZyA9ICdyb2FkbWFwJztcblxuICAvKipcbiAgICogV2hlbiBmYWxzZSwgbWFwIGljb25zIGFyZSBub3QgY2xpY2thYmxlLiBBIG1hcCBpY29uIHJlcHJlc2VudHMgYSBwb2ludCBvZiBpbnRlcmVzdCxcbiAgICogYWxzbyBrbm93biBhcyBhIFBPSS4gQnkgZGVmYXVsdCBtYXAgaWNvbnMgYXJlIGNsaWNrYWJsZS5cbiAgICovXG4gIEBJbnB1dCgpIGNsaWNrYWJsZUljb25zID0gdHJ1ZTtcblxuICAvKipcbiAgICogQSBtYXAgaWNvbiByZXByZXNlbnRzIGEgcG9pbnQgb2YgaW50ZXJlc3QsIGFsc28ga25vd24gYXMgYSBQT0kuXG4gICAqIFdoZW4gbWFwIGljb25zIGFyZSBjbGlja2FibGUgYnkgZGVmYXVsdCwgYW4gaW5mbyB3aW5kb3cgaXMgZGlzcGxheWVkLlxuICAgKiBXaGVuIHRoaXMgcHJvcGVydHkgaXMgc2V0IHRvIGZhbHNlLCB0aGUgaW5mbyB3aW5kb3cgd2lsbCBub3QgYmUgc2hvd24gYnV0IHRoZSBjbGljayBldmVudFxuICAgKiB3aWxsIHN0aWxsIGZpcmVcbiAgICovXG4gIEBJbnB1dCgpIHNob3dEZWZhdWx0SW5mb1dpbmRvdyA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoaXMgc2V0dGluZyBjb250cm9scyBob3cgZ2VzdHVyZXMgb24gdGhlIG1hcCBhcmUgaGFuZGxlZC5cbiAgICogQWxsb3dlZCB2YWx1ZXM6XG4gICAqIC0gJ2Nvb3BlcmF0aXZlJyAoVHdvLWZpbmdlciB0b3VjaCBnZXN0dXJlcyBwYW4gYW5kIHpvb20gdGhlIG1hcC4gT25lLWZpbmdlciB0b3VjaCBnZXN0dXJlcyBhcmUgbm90IGhhbmRsZWQgYnkgdGhlIG1hcC4pXG4gICAqIC0gJ2dyZWVkeScgICAgICAoQWxsIHRvdWNoIGdlc3R1cmVzIHBhbiBvciB6b29tIHRoZSBtYXAuKVxuICAgKiAtICdub25lJyAgICAgICAgKFRoZSBtYXAgY2Fubm90IGJlIHBhbm5lZCBvciB6b29tZWQgYnkgdXNlciBnZXN0dXJlcy4pXG4gICAqIC0gJ2F1dG8nICAgICAgICBbZGVmYXVsdF0gKEdlc3R1cmUgaGFuZGxpbmcgaXMgZWl0aGVyIGNvb3BlcmF0aXZlIG9yIGdyZWVkeSwgZGVwZW5kaW5nIG9uIHdoZXRoZXIgdGhlIHBhZ2UgaXMgc2Nyb2xsYWJsZSBvciBub3QuXG4gICAqL1xuICBASW5wdXQoKSBnZXN0dXJlSGFuZGxpbmc6ICdjb29wZXJhdGl2ZScgfCAnZ3JlZWR5JyB8ICdub25lJyB8ICdhdXRvJyA9ICdhdXRvJztcblxuICAgIC8qKlxuICAgICAqIENvbnRyb2xzIHRoZSBhdXRvbWF0aWMgc3dpdGNoaW5nIGJlaGF2aW9yIGZvciB0aGUgYW5nbGUgb2YgaW5jaWRlbmNlIG9mXG4gICAgICogdGhlIG1hcC4gVGhlIG9ubHkgYWxsb3dlZCB2YWx1ZXMgYXJlIDAgYW5kIDQ1LiBUaGUgdmFsdWUgMCBjYXVzZXMgdGhlIG1hcFxuICAgICAqIHRvIGFsd2F5cyB1c2UgYSAwwrAgb3ZlcmhlYWQgdmlldyByZWdhcmRsZXNzIG9mIHRoZSB6b29tIGxldmVsIGFuZFxuICAgICAqIHZpZXdwb3J0LiBUaGUgdmFsdWUgNDUgY2F1c2VzIHRoZSB0aWx0IGFuZ2xlIHRvIGF1dG9tYXRpY2FsbHkgc3dpdGNoIHRvXG4gICAgICogNDUgd2hlbmV2ZXIgNDXCsCBpbWFnZXJ5IGlzIGF2YWlsYWJsZSBmb3IgdGhlIGN1cnJlbnQgem9vbSBsZXZlbCBhbmRcbiAgICAgKiB2aWV3cG9ydCwgYW5kIHN3aXRjaCBiYWNrIHRvIDAgd2hlbmV2ZXIgNDXCsCBpbWFnZXJ5IGlzIG5vdCBhdmFpbGFibGVcbiAgICAgKiAodGhpcyBpcyB0aGUgZGVmYXVsdCBiZWhhdmlvcikuIDQ1wrAgaW1hZ2VyeSBpcyBvbmx5IGF2YWlsYWJsZSBmb3JcbiAgICAgKiBzYXRlbGxpdGUgYW5kIGh5YnJpZCBtYXAgdHlwZXMsIHdpdGhpbiBzb21lIGxvY2F0aW9ucywgYW5kIGF0IHNvbWUgem9vbVxuICAgICAqIGxldmVscy4gTm90ZTogZ2V0VGlsdCByZXR1cm5zIHRoZSBjdXJyZW50IHRpbHQgYW5nbGUsIG5vdCB0aGUgdmFsdWVcbiAgICAgKiBzcGVjaWZpZWQgYnkgdGhpcyBvcHRpb24uIEJlY2F1c2UgZ2V0VGlsdCBhbmQgdGhpcyBvcHRpb24gcmVmZXIgdG9cbiAgICAgKiBkaWZmZXJlbnQgdGhpbmdzLCBkbyBub3QgYmluZCgpIHRoZSB0aWx0IHByb3BlcnR5OyBkb2luZyBzbyBtYXkgeWllbGRcbiAgICAgKiB1bnByZWRpY3RhYmxlIGVmZmVjdHMuIChEZWZhdWx0IG9mIEFHTSBpcyAwIChkaXNhYmxlZCkuIEVuYWJsZSBpdCB3aXRoIHZhbHVlIDQ1LilcbiAgICAgKi9cbiAgQElucHV0KCkgdGlsdCA9IDA7XG5cbiAgLyoqXG4gICAqIE9wdGlvbnMgZm9yIHJlc3RyaWN0aW5nIHRoZSBib3VuZHMgb2YgdGhlIG1hcC5cbiAgICogVXNlciBjYW5ub3QgcGFuIG9yIHpvb20gYXdheSBmcm9tIHJlc3RyaWN0ZWQgYXJlYS5cbiAgICovXG4gIEBJbnB1dCgpIHJlc3RyaWN0aW9uOiBNYXBSZXN0cmljdGlvbjtcbiAgLyoqXG4gICAqIE1hcCBvcHRpb24gYXR0cmlidXRlcyB0aGF0IGNhbiBjaGFuZ2Ugb3ZlciB0aW1lXG4gICAqL1xuICBwcml2YXRlIHN0YXRpYyBfbWFwT3B0aW9uc0F0dHJpYnV0ZXM6IHN0cmluZ1tdID0gW1xuICAgICdkaXNhYmxlRG91YmxlQ2xpY2tab29tJywgJ3Njcm9sbHdoZWVsJywgJ2RyYWdnYWJsZScsICdkcmFnZ2FibGVDdXJzb3InLCAnZHJhZ2dpbmdDdXJzb3InLFxuICAgICdrZXlib2FyZFNob3J0Y3V0cycsICd6b29tQ29udHJvbCcsICd6b29tQ29udHJvbE9wdGlvbnMnLCAnc3R5bGVzJywgJ3N0cmVldFZpZXdDb250cm9sJyxcbiAgICAnc3RyZWV0Vmlld0NvbnRyb2xPcHRpb25zJywgJ3pvb20nLCAnbWFwVHlwZUNvbnRyb2wnLCAnbWFwVHlwZUNvbnRyb2xPcHRpb25zJywgJ21pblpvb20nLFxuICAgICdtYXhab29tJywgJ3BhbkNvbnRyb2wnLCAncGFuQ29udHJvbE9wdGlvbnMnLCAncm90YXRlQ29udHJvbCcsICdyb3RhdGVDb250cm9sT3B0aW9ucycsXG4gICAgJ2Z1bGxzY3JlZW5Db250cm9sJywgJ2Z1bGxzY3JlZW5Db250cm9sT3B0aW9ucycsICdzY2FsZUNvbnRyb2wnLCAnc2NhbGVDb250cm9sT3B0aW9ucycsXG4gICAgJ21hcFR5cGVJZCcsICdjbGlja2FibGVJY29ucycsICdnZXN0dXJlSGFuZGxpbmcnLCAndGlsdCcsICdyZXN0cmljdGlvbicsXG4gIF07XG5cbiAgcHJpdmF0ZSBfb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIHByaXZhdGUgX2ZpdEJvdW5kc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBtYXAgKGJ1dCBub3Qgd2hlbiB0aGV5IGNsaWNrIG9uIGFcbiAgICogbWFya2VyIG9yIGluZm9XaW5kb3cpLlxuICAgKi9cbiAgQE91dHB1dCgpIG1hcENsaWNrOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciByaWdodC1jbGlja3Mgb24gdGhlIG1hcCAoYnV0IG5vdCB3aGVuIHRoZXkgY2xpY2tcbiAgICogb24gYSBtYXJrZXIgb3IgaW5mb1dpbmRvdykuXG4gICAqL1xuICBAT3V0cHV0KCkgbWFwUmlnaHRDbGljazogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgZG91YmxlLWNsaWNrcyBvbiB0aGUgbWFwIChidXQgbm90IHdoZW4gdGhleSBjbGlja1xuICAgKiBvbiBhIG1hcmtlciBvciBpbmZvV2luZG93KS5cbiAgICovXG4gIEBPdXRwdXQoKSBtYXBEYmxDbGljazogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgaXMgZmlyZWQgd2hlbiB0aGUgbWFwIGNlbnRlciBjaGFuZ2VzLlxuICAgKi9cbiAgQE91dHB1dCgpIGNlbnRlckNoYW5nZTogRXZlbnRFbWl0dGVyPExhdExuZ0xpdGVyYWw+ID0gbmV3IEV2ZW50RW1pdHRlcjxMYXRMbmdMaXRlcmFsPigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHZpZXdwb3J0IGJvdW5kcyBoYXZlIGNoYW5nZWQuXG4gICAqL1xuICBAT3V0cHV0KCkgYm91bmRzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TGF0TG5nQm91bmRzPiA9IG5ldyBFdmVudEVtaXR0ZXI8TGF0TG5nQm91bmRzPigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIG1hcFR5cGVJZCBwcm9wZXJ0eSBjaGFuZ2VzLlxuICAgKi9cbiAgQE91dHB1dCgpIG1hcFR5cGVJZENoYW5nZTogRXZlbnRFbWl0dGVyPE1hcFR5cGVJZD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFR5cGVJZD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBtYXAgYmVjb21lcyBpZGxlIGFmdGVyIHBhbm5pbmcgb3Igem9vbWluZy5cbiAgICovXG4gIEBPdXRwdXQoKSBpZGxlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgem9vbSBsZXZlbCBoYXMgY2hhbmdlZC5cbiAgICovXG4gIEBPdXRwdXQoKSB6b29tQ2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIGdvb2dsZSBtYXAgaXMgZnVsbHkgaW5pdGlhbGl6ZWQuXG4gICAqIFlvdSBnZXQgdGhlIGdvb2dsZS5tYXBzLk1hcCBpbnN0YW5jZSBhcyBhIHJlc3VsdCBvZiB0aGlzIEV2ZW50RW1pdHRlci5cbiAgICovXG4gIEBPdXRwdXQoKSBtYXBSZWFkeTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB2aXNpYmxlIHRpbGVzIGhhdmUgZmluaXNoZWQgbG9hZGluZy5cbiAgICovXG4gIEBPdXRwdXQoKSB0aWxlc0xvYWRlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2VsZW06IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfbWFwc1dyYXBwZXI6IEdvb2dsZU1hcHNBUElXcmFwcGVyLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgX3BsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBwcm90ZWN0ZWQgX2ZpdEJvdW5kc1NlcnZpY2U6IEZpdEJvdW5kc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBfem9uZTogTmdab25lXG4gICkge31cblxuICAvKiogQGludGVybmFsICovXG4gIG5nT25Jbml0KCkge1xuICAgIGlmIChpc1BsYXRmb3JtU2VydmVyKHRoaXMuX3BsYXRmb3JtSWQpKSB7XG4gICAgICAvLyBUaGUgY29kZSBpcyBydW5uaW5nIG9uIHRoZSBzZXJ2ZXIsIGRvIG5vdGhpbmdcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gdG9kbzogdGhpcyBzaG91bGQgYmUgc29sdmVkIHdpdGggYSBuZXcgY29tcG9uZW50IGFuZCBhIHZpZXdDaGlsZCBkZWNvcmF0b3JcbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLl9lbGVtLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmFnbS1tYXAtY29udGFpbmVyLWlubmVyJyk7XG4gICAgdGhpcy5faW5pdE1hcEluc3RhbmNlKGNvbnRhaW5lcik7XG4gIH1cblxuICBwcml2YXRlIF9pbml0TWFwSW5zdGFuY2UoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5fbWFwc1dyYXBwZXIuY3JlYXRlTWFwKGVsLCB7XG4gICAgICBjZW50ZXI6IHtsYXQ6IHRoaXMubGF0aXR1ZGUgfHwgMCwgbG5nOiB0aGlzLmxvbmdpdHVkZSB8fCAwfSxcbiAgICAgIHpvb206IHRoaXMuem9vbSxcbiAgICAgIG1pblpvb206IHRoaXMubWluWm9vbSxcbiAgICAgIG1heFpvb206IHRoaXMubWF4Wm9vbSxcbiAgICAgIGNvbnRyb2xTaXplOiB0aGlzLmNvbnRyb2xTaXplLFxuICAgICAgZGlzYWJsZURlZmF1bHRVSTogdGhpcy5kaXNhYmxlRGVmYXVsdFVJLFxuICAgICAgZGlzYWJsZURvdWJsZUNsaWNrWm9vbTogdGhpcy5kaXNhYmxlRG91YmxlQ2xpY2tab29tLFxuICAgICAgc2Nyb2xsd2hlZWw6IHRoaXMuc2Nyb2xsd2hlZWwsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuYmFja2dyb3VuZENvbG9yLFxuICAgICAgZHJhZ2dhYmxlOiB0aGlzLmRyYWdnYWJsZSxcbiAgICAgIGRyYWdnYWJsZUN1cnNvcjogdGhpcy5kcmFnZ2FibGVDdXJzb3IsXG4gICAgICBkcmFnZ2luZ0N1cnNvcjogdGhpcy5kcmFnZ2luZ0N1cnNvcixcbiAgICAgIGtleWJvYXJkU2hvcnRjdXRzOiB0aGlzLmtleWJvYXJkU2hvcnRjdXRzLFxuICAgICAgc3R5bGVzOiB0aGlzLnN0eWxlcyxcbiAgICAgIHpvb21Db250cm9sOiB0aGlzLnpvb21Db250cm9sLFxuICAgICAgem9vbUNvbnRyb2xPcHRpb25zOiB0aGlzLnpvb21Db250cm9sT3B0aW9ucyxcbiAgICAgIHN0cmVldFZpZXdDb250cm9sOiB0aGlzLnN0cmVldFZpZXdDb250cm9sLFxuICAgICAgc3RyZWV0Vmlld0NvbnRyb2xPcHRpb25zOiB0aGlzLnN0cmVldFZpZXdDb250cm9sT3B0aW9ucyxcbiAgICAgIHNjYWxlQ29udHJvbDogdGhpcy5zY2FsZUNvbnRyb2wsXG4gICAgICBzY2FsZUNvbnRyb2xPcHRpb25zOiB0aGlzLnNjYWxlQ29udHJvbE9wdGlvbnMsXG4gICAgICBtYXBUeXBlQ29udHJvbDogdGhpcy5tYXBUeXBlQ29udHJvbCxcbiAgICAgIG1hcFR5cGVDb250cm9sT3B0aW9uczogdGhpcy5tYXBUeXBlQ29udHJvbE9wdGlvbnMsXG4gICAgICBwYW5Db250cm9sOiB0aGlzLnBhbkNvbnRyb2wsXG4gICAgICBwYW5Db250cm9sT3B0aW9uczogdGhpcy5wYW5Db250cm9sT3B0aW9ucyxcbiAgICAgIHJvdGF0ZUNvbnRyb2w6IHRoaXMucm90YXRlQ29udHJvbCxcbiAgICAgIHJvdGF0ZUNvbnRyb2xPcHRpb25zOiB0aGlzLnJvdGF0ZUNvbnRyb2xPcHRpb25zLFxuICAgICAgZnVsbHNjcmVlbkNvbnRyb2w6IHRoaXMuZnVsbHNjcmVlbkNvbnRyb2wsXG4gICAgICBmdWxsc2NyZWVuQ29udHJvbE9wdGlvbnM6IHRoaXMuZnVsbHNjcmVlbkNvbnRyb2xPcHRpb25zLFxuICAgICAgbWFwVHlwZUlkOiB0aGlzLm1hcFR5cGVJZCxcbiAgICAgIGNsaWNrYWJsZUljb25zOiB0aGlzLmNsaWNrYWJsZUljb25zLFxuICAgICAgZ2VzdHVyZUhhbmRsaW5nOiB0aGlzLmdlc3R1cmVIYW5kbGluZyxcbiAgICAgIHRpbHQ6IHRoaXMudGlsdCxcbiAgICAgIHJlc3RyaWN0aW9uOiB0aGlzLnJlc3RyaWN0aW9uLFxuICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB0aGlzLl9tYXBzV3JhcHBlci5nZXROYXRpdmVNYXAoKSlcbiAgICAgIC50aGVuKG1hcCA9PiB0aGlzLm1hcFJlYWR5LmVtaXQobWFwKSk7XG5cbiAgICAvLyByZWdpc3RlciBldmVudCBsaXN0ZW5lcnNcbiAgICB0aGlzLl9oYW5kbGVNYXBDZW50ZXJDaGFuZ2UoKTtcbiAgICB0aGlzLl9oYW5kbGVNYXBab29tQ2hhbmdlKCk7XG4gICAgdGhpcy5faGFuZGxlTWFwTW91c2VFdmVudHMoKTtcbiAgICB0aGlzLl9oYW5kbGVCb3VuZHNDaGFuZ2UoKTtcbiAgICB0aGlzLl9oYW5kbGVNYXBUeXBlSWRDaGFuZ2UoKTtcbiAgICB0aGlzLl9oYW5kbGVUaWxlc0xvYWRlZEV2ZW50KCk7XG4gICAgdGhpcy5faGFuZGxlSWRsZUV2ZW50KCk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCByZWdpc3RlcmVkIG9ic2VydmFibGUgc3Vic2NyaXB0aW9uc1xuICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLmZvckVhY2goKHMpID0+IHMudW5zdWJzY3JpYmUoKSk7XG5cbiAgICAvLyByZW1vdmUgYWxsIGxpc3RlbmVycyBmcm9tIHRoZSBtYXAgaW5zdGFuY2VcbiAgICB0aGlzLl9tYXBzV3JhcHBlci5jbGVhckluc3RhbmNlTGlzdGVuZXJzKCk7XG4gICAgaWYgKHRoaXMuX2ZpdEJvdW5kc1N1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fZml0Qm91bmRzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLyogQGludGVybmFsICovXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLl91cGRhdGVNYXBPcHRpb25zQ2hhbmdlcyhjaGFuZ2VzKTtcbiAgICB0aGlzLl91cGRhdGVQb3NpdGlvbihjaGFuZ2VzKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZU1hcE9wdGlvbnNDaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBsZXQgb3B0aW9uczoge1twcm9wTmFtZTogc3RyaW5nXTogYW55fSA9IHt9O1xuICAgIGxldCBvcHRpb25LZXlzID1cbiAgICAgIE9iamVjdC5rZXlzKGNoYW5nZXMpLmZpbHRlcihrID0+IEFnbU1hcC5fbWFwT3B0aW9uc0F0dHJpYnV0ZXMuaW5kZXhPZihrKSAhPT0gLTEpO1xuICAgIG9wdGlvbktleXMuZm9yRWFjaCgoaykgPT4geyBvcHRpb25zW2tdID0gY2hhbmdlc1trXS5jdXJyZW50VmFsdWU7IH0pO1xuICAgIHRoaXMuX21hcHNXcmFwcGVyLnNldE1hcE9wdGlvbnMob3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlcnMgYSByZXNpemUgZXZlbnQgb24gdGhlIGdvb2dsZSBtYXAgaW5zdGFuY2UuXG4gICAqIFdoZW4gcmVjZW50ZXIgaXMgdHJ1ZSwgdGhlIG9mIHRoZSBnb29nbGUgbWFwIGdldHMgY2FsbGVkIHdpdGggdGhlIGN1cnJlbnQgbGF0L2xuZyB2YWx1ZXMgb3IgZml0Qm91bmRzIHZhbHVlIHRvIHJlY2VudGVyIHRoZSBtYXAuXG4gICAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQgZ2V0cyByZXNvbHZlZCBhZnRlciB0aGUgZXZlbnQgd2FzIHRyaWdnZXJlZC5cbiAgICovXG4gIHRyaWdnZXJSZXNpemUocmVjZW50ZXI6IGJvb2xlYW4gPSB0cnVlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gTm90ZTogV2hlbiB3ZSB3b3VsZCB0cmlnZ2VyIHRoZSByZXNpemUgZXZlbnQgYW5kIHNob3cgdGhlIG1hcCBpbiB0aGUgc2FtZSB0dXJuICh3aGljaCBpcyBhXG4gICAgLy8gY29tbW9uIGNhc2UgZm9yIHRyaWdnZXJpbmcgYSByZXNpemUgZXZlbnQpLCB0aGVuIHRoZSByZXNpemUgZXZlbnQgd291bGQgbm90XG4gICAgLy8gd29yayAodG8gc2hvdyB0aGUgbWFwKSwgc28gd2UgdHJpZ2dlciB0aGUgZXZlbnQgaW4gYSB0aW1lb3V0LlxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXBzV3JhcHBlci50cmlnZ2VyTWFwRXZlbnQoJ3Jlc2l6ZScpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGlmIChyZWNlbnRlcikge1xuICAgICAgICAgICAgdGhpcy5maXRCb3VuZHMgIT0gbnVsbCA/IHRoaXMuX2ZpdEJvdW5kcygpIDogdGhpcy5fc2V0Q2VudGVyKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVBvc2l0aW9uKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlc1snbGF0aXR1ZGUnXSA9PSBudWxsICYmIGNoYW5nZXNbJ2xvbmdpdHVkZSddID09IG51bGwgJiZcbiAgICAgICAgIWNoYW5nZXNbJ2ZpdEJvdW5kcyddKSB7XG4gICAgICAvLyBubyBwb3NpdGlvbiB1cGRhdGUgbmVlZGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gd2UgcHJlZmVyIGZpdEJvdW5kcyBpbiBjaGFuZ2VzXG4gICAgaWYgKCdmaXRCb3VuZHMnIGluIGNoYW5nZXMpIHtcbiAgICAgIHRoaXMuX2ZpdEJvdW5kcygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdGhpcy5sYXRpdHVkZSAhPT0gJ251bWJlcicgfHwgdHlwZW9mIHRoaXMubG9uZ2l0dWRlICE9PSAnbnVtYmVyJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zZXRDZW50ZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldENlbnRlcigpIHtcbiAgICBsZXQgbmV3Q2VudGVyID0ge1xuICAgICAgbGF0OiB0aGlzLmxhdGl0dWRlLFxuICAgICAgbG5nOiB0aGlzLmxvbmdpdHVkZSxcbiAgICB9O1xuICAgIGlmICh0aGlzLnVzZVBhbm5pbmcpIHtcbiAgICAgIHRoaXMuX21hcHNXcmFwcGVyLnBhblRvKG5ld0NlbnRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX21hcHNXcmFwcGVyLnNldENlbnRlcihuZXdDZW50ZXIpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ZpdEJvdW5kcygpIHtcbiAgICBzd2l0Y2ggKHRoaXMuZml0Qm91bmRzKSB7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHRoaXMuX3N1YnNjcmliZVRvRml0Qm91bmRzVXBkYXRlcygpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIGlmICh0aGlzLl9maXRCb3VuZHNTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICB0aGlzLl9maXRCb3VuZHNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuX3VwZGF0ZUJvdW5kcyh0aGlzLmZpdEJvdW5kcywgdGhpcy5maXRCb3VuZHNQYWRkaW5nKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zdWJzY3JpYmVUb0ZpdEJvdW5kc1VwZGF0ZXMoKSB7XG4gICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLl9maXRCb3VuZHNTdWJzY3JpcHRpb24gPSB0aGlzLl9maXRCb3VuZHNTZXJ2aWNlLmdldEJvdW5kcyQoKS5zdWJzY3JpYmUoYiA9PiB7XG4gICAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IHRoaXMuX3VwZGF0ZUJvdW5kcyhiLCB0aGlzLmZpdEJvdW5kc1BhZGRpbmcpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF91cGRhdGVCb3VuZHMoYm91bmRzOiBMYXRMbmdCb3VuZHMgfCBMYXRMbmdCb3VuZHNMaXRlcmFsLCBwYWRkaW5nPzogbnVtYmVyIHwgUGFkZGluZykge1xuICAgIGlmICghYm91bmRzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9pc0xhdExuZ0JvdW5kc0xpdGVyYWwoYm91bmRzKSAmJiB0eXBlb2YgZ29vZ2xlICE9PSAndW5kZWZpbmVkJyAmJiBnb29nbGUgJiYgZ29vZ2xlLm1hcHMgJiYgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKSB7XG4gICAgICBjb25zdCBuZXdCb3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XG4gICAgICBuZXdCb3VuZHMudW5pb24oYm91bmRzKTtcbiAgICAgIGJvdW5kcyA9IG5ld0JvdW5kcztcbiAgICB9XG4gICAgaWYgKHRoaXMudXNlUGFubmluZykge1xuICAgICAgdGhpcy5fbWFwc1dyYXBwZXIucGFuVG9Cb3VuZHMoYm91bmRzLCBwYWRkaW5nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fbWFwc1dyYXBwZXIuZml0Qm91bmRzKGJvdW5kcywgcGFkZGluZyk7XG4gIH1cblxuICBwcml2YXRlIF9pc0xhdExuZ0JvdW5kc0xpdGVyYWwoYm91bmRzOiBMYXRMbmdCb3VuZHMgfCBMYXRMbmdCb3VuZHNMaXRlcmFsKTogYm91bmRzIGlzIExhdExuZ0JvdW5kc0xpdGVyYWwge1xuICAgIHJldHVybiBib3VuZHMgIT0gbnVsbCAmJiAoYm91bmRzIGFzIGFueSkuZXh0ZW5kID09PSB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVNYXBDZW50ZXJDaGFuZ2UoKSB7XG4gICAgY29uc3QgcyA9IHRoaXMuX21hcHNXcmFwcGVyLnN1YnNjcmliZVRvTWFwRXZlbnQ8dm9pZD4oJ2NlbnRlcl9jaGFuZ2VkJykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuX21hcHNXcmFwcGVyLmdldENlbnRlcigpLnRoZW4oKGNlbnRlcjogTGF0TG5nKSA9PiB7XG4gICAgICAgIHRoaXMubGF0aXR1ZGUgPSBjZW50ZXIubGF0KCk7XG4gICAgICAgIHRoaXMubG9uZ2l0dWRlID0gY2VudGVyLmxuZygpO1xuICAgICAgICB0aGlzLmNlbnRlckNoYW5nZS5lbWl0KHtsYXQ6IHRoaXMubGF0aXR1ZGUsIGxuZzogdGhpcy5sb25naXR1ZGV9IGFzIExhdExuZ0xpdGVyYWwpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUJvdW5kc0NoYW5nZSgpIHtcbiAgICBjb25zdCBzID0gdGhpcy5fbWFwc1dyYXBwZXIuc3Vic2NyaWJlVG9NYXBFdmVudDx2b2lkPignYm91bmRzX2NoYW5nZWQnKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5fbWFwc1dyYXBwZXIuZ2V0Qm91bmRzKCkudGhlbihcbiAgICAgICAgKGJvdW5kczogTGF0TG5nQm91bmRzKSA9PiB7IHRoaXMuYm91bmRzQ2hhbmdlLmVtaXQoYm91bmRzKTsgfSk7XG4gICAgfSk7XG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZU1hcFR5cGVJZENoYW5nZSgpIHtcbiAgICBjb25zdCBzID0gdGhpcy5fbWFwc1dyYXBwZXIuc3Vic2NyaWJlVG9NYXBFdmVudDx2b2lkPignbWFwdHlwZWlkX2NoYW5nZWQnKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5fbWFwc1dyYXBwZXIuZ2V0TWFwVHlwZUlkKCkudGhlbihcbiAgICAgICAgKG1hcFR5cGVJZDogTWFwVHlwZUlkKSA9PiB7IHRoaXMubWFwVHlwZUlkQ2hhbmdlLmVtaXQobWFwVHlwZUlkKTsgfSk7XG4gICAgfSk7XG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZU1hcFpvb21DaGFuZ2UoKSB7XG4gICAgY29uc3QgcyA9IHRoaXMuX21hcHNXcmFwcGVyLnN1YnNjcmliZVRvTWFwRXZlbnQ8dm9pZD4oJ3pvb21fY2hhbmdlZCcpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLl9tYXBzV3JhcHBlci5nZXRab29tKCkudGhlbigoejogbnVtYmVyKSA9PiB7XG4gICAgICAgIHRoaXMuem9vbSA9IHo7XG4gICAgICAgIHRoaXMuem9vbUNoYW5nZS5lbWl0KHopO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUlkbGVFdmVudCgpIHtcbiAgICBjb25zdCBzID0gdGhpcy5fbWFwc1dyYXBwZXIuc3Vic2NyaWJlVG9NYXBFdmVudDx2b2lkPignaWRsZScpLnN1YnNjcmliZShcbiAgICAgICgpID0+IHsgdGhpcy5pZGxlLmVtaXQodm9pZCAwKTsgfSk7XG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZVRpbGVzTG9hZGVkRXZlbnQoKSB7XG4gICAgY29uc3QgcyA9IHRoaXMuX21hcHNXcmFwcGVyLnN1YnNjcmliZVRvTWFwRXZlbnQ8dm9pZD4oJ3RpbGVzbG9hZGVkJykuc3Vic2NyaWJlKFxuICAgICAgKCkgPT4gdGhpcy50aWxlc0xvYWRlZC5lbWl0KHZvaWQgMCksXG4gICAgKTtcbiAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKHMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlTWFwTW91c2VFdmVudHMoKSB7XG4gICAgaW50ZXJmYWNlIEVtaXR0ZXIge1xuICAgICAgZW1pdCh2YWx1ZTogYW55KTogdm9pZDtcbiAgICB9XG5cbiAgICB0eXBlIEV2ZW50ID0geyBuYW1lOiBzdHJpbmcsIGVtaXR0ZXI6IEVtaXR0ZXIgfTtcblxuICAgIGNvbnN0IGV2ZW50czogRXZlbnRbXSA9IFtcbiAgICAgIHtuYW1lOiAnY2xpY2snLCBlbWl0dGVyOiB0aGlzLm1hcENsaWNrfSxcbiAgICAgIHtuYW1lOiAncmlnaHRjbGljaycsIGVtaXR0ZXI6IHRoaXMubWFwUmlnaHRDbGlja30sXG4gICAgICB7bmFtZTogJ2RibGNsaWNrJywgZW1pdHRlcjogdGhpcy5tYXBEYmxDbGlja30sXG4gICAgXTtcblxuICAgIGV2ZW50cy5mb3JFYWNoKChlOiBFdmVudCkgPT4ge1xuICAgICAgY29uc3QgcyA9IHRoaXMuX21hcHNXcmFwcGVyLnN1YnNjcmliZVRvTWFwRXZlbnQ8e2xhdExuZzogTGF0TG5nfT4oZS5uYW1lKS5zdWJzY3JpYmUoXG4gICAgICAgIChldmVudDoge2xhdExuZzogTGF0TG5nfSkgPT4ge1xuICAgICAgICAgIGxldCB2YWx1ZTogTW91c2VFdmVudCA9IHtcbiAgICAgICAgICAgIGNvb3Jkczoge1xuICAgICAgICAgICAgICBsYXQ6IGV2ZW50LmxhdExuZy5sYXQoKSxcbiAgICAgICAgICAgICAgbG5nOiBldmVudC5sYXRMbmcubG5nKCksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGxhY2VJZDogKGV2ZW50IGFzIHtsYXRMbmc6IExhdExuZywgcGxhY2VJZDogc3RyaW5nfSkucGxhY2VJZCxcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vIHRoZSBwbGFjZUlkIHdpbGwgYmUgdW5kZWZpbmVkIGluIGNhc2UgdGhlIGV2ZW50IHdhcyBub3QgYW4gSWNvbk1vdXNlRXZlbnQgKGdvb2dsZSB0eXBlcylcbiAgICAgICAgICBpZiAodmFsdWUucGxhY2VJZCAmJiAhdGhpcy5zaG93RGVmYXVsdEluZm9XaW5kb3cpIHtcbiAgICAgICAgICAgIChldmVudCBhcyBhbnkpLnN0b3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZS5lbWl0dGVyLmVtaXQodmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2gocyk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==