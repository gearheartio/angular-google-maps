(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@agm/core')) :
    typeof define === 'function' && define.amd ? define('@agm/snazzy-info-window', ['exports', '@angular/core', '@agm/core'], factory) :
    (global = global || self, factory((global.ngmaps = global.ngmaps || {}, global.ngmaps.snazzyInfoWindow = {}), global.ng.core, global.ngmaps.core));
}(this, (function (exports, core, core$1) { 'use strict';

    var AgmSnazzyInfoWindow = /** @class */ (function () {
        function AgmSnazzyInfoWindow(_marker, _wrapper, _manager, _loader) {
            this._marker = _marker;
            this._wrapper = _wrapper;
            this._manager = _manager;
            this._loader = _loader;
            /**
             * Changes the open status of the snazzy info window.
             */
            this.isOpen = false;
            /**
             * Emits when the open status changes.
             */
            this.isOpenChange = new core.EventEmitter();
            /**
             * Choose where you want the info window to be displayed, relative to the marker.
             */
            this.placement = 'top';
            /**
             * The max width in pixels of the info window.
             */
            this.maxWidth = 200;
            /**
             * The max height in pixels of the info window.
             */
            this.maxHeight = 200;
            /**
             * Determines if the info window will open when the marker is clicked.
             * An internal listener is added to the Google Maps click event which calls the open() method.
             */
            this.openOnMarkerClick = true;
            /**
             * Determines if the info window will close when the map is clicked. An internal listener is added to the Google Maps click event which calls the close() method.
             * This will not activate on the Google Maps drag event when the user is panning the map.
             */
            this.closeOnMapClick = true;
            /**
             * Determines if the info window will close when any other Snazzy Info Window is opened.
             */
            this.closeWhenOthersOpen = false;
            /**
             * Determines if the info window will show a close button.
             */
            this.showCloseButton = true;
            /**
             * Determines if the info window will be panned into view when opened.
             */
            this.panOnOpen = true;
            /**
             * Emits before the info window opens.
             */
            this.beforeOpen = new core.EventEmitter();
            /**
             * Emits before the info window closes.
             */
            this.afterClose = new core.EventEmitter();
            this._snazzyInfoWindowInitialized = null;
        }
        /**
         * @internal
         */
        AgmSnazzyInfoWindow.prototype.ngOnChanges = function (changes) {
            if (this._nativeSnazzyInfoWindow == null) {
                return;
            }
            if ('isOpen' in changes && this.isOpen) {
                this._openInfoWindow();
            }
            else if ('isOpen' in changes && !this.isOpen) {
                this._closeInfoWindow();
            }
            if (('latitude' in changes || 'longitude' in changes) && this._marker == null) {
                this._updatePosition();
            }
        };
        /**
         * @internal
         */
        AgmSnazzyInfoWindow.prototype.ngAfterViewInit = function () {
            var _this = this;
            var m = this._manager != null ? this._manager.getNativeMarker(this._marker) : null;
            this._snazzyInfoWindowInitialized = this._loader.load()
                .then(function () { return require('snazzy-info-window'); })
                .then(function (module) { return Promise.all([module, m, _this._wrapper.getNativeMap()]); })
                .then(function (elems) {
                var options = {
                    map: elems[2],
                    content: '',
                    placement: _this.placement,
                    maxWidth: _this.maxWidth,
                    maxHeight: _this.maxHeight,
                    backgroundColor: _this.backgroundColor,
                    padding: _this.padding,
                    border: _this.border,
                    borderRadius: _this.borderRadius,
                    fontColor: _this.fontColor,
                    pointer: _this.pointer,
                    shadow: _this.shadow,
                    closeOnMapClick: _this.closeOnMapClick,
                    openOnMarkerClick: _this.openOnMarkerClick,
                    closeWhenOthersOpen: _this.closeWhenOthersOpen,
                    showCloseButton: _this.showCloseButton,
                    panOnOpen: _this.panOnOpen,
                    wrapperClass: _this.wrapperClass,
                    callbacks: {
                        beforeOpen: function () {
                            _this._createViewContent();
                            _this.beforeOpen.emit();
                        },
                        afterOpen: function () {
                            _this.isOpenChange.emit(_this.openStatus());
                        },
                        afterClose: function () {
                            _this.afterClose.emit();
                            _this.isOpenChange.emit(_this.openStatus());
                        },
                    },
                };
                if (elems[1] != null) {
                    options.marker = elems[1];
                }
                else {
                    options.position = {
                        lat: _this.latitude,
                        lng: _this.longitude,
                    };
                }
                _this._nativeSnazzyInfoWindow = new elems[0](options);
            });
            this._snazzyInfoWindowInitialized.then(function () {
                if (_this.isOpen) {
                    _this._openInfoWindow();
                }
            });
        };
        AgmSnazzyInfoWindow.prototype._openInfoWindow = function () {
            var _this = this;
            this._snazzyInfoWindowInitialized.then(function () {
                _this._createViewContent();
                _this._nativeSnazzyInfoWindow.open();
            });
        };
        AgmSnazzyInfoWindow.prototype._closeInfoWindow = function () {
            var _this = this;
            this._snazzyInfoWindowInitialized.then(function () {
                _this._nativeSnazzyInfoWindow.close();
            });
        };
        AgmSnazzyInfoWindow.prototype._createViewContent = function () {
            if (this._viewContainerRef.length === 1) {
                return;
            }
            var evr = this._viewContainerRef.createEmbeddedView(this._templateRef);
            this._nativeSnazzyInfoWindow.setContent(this._outerWrapper.nativeElement);
            // we have to run this in a separate cycle.
            setTimeout(function () {
                evr.detectChanges();
            });
        };
        AgmSnazzyInfoWindow.prototype._updatePosition = function () {
            this._nativeSnazzyInfoWindow.setPosition({
                lat: this.latitude,
                lng: this.longitude,
            });
        };
        /**
         * Returns true when the Snazzy Info Window is initialized and open.
         */
        AgmSnazzyInfoWindow.prototype.openStatus = function () {
            return this._nativeSnazzyInfoWindow && this._nativeSnazzyInfoWindow.isOpen();
        };
        /**
         * @internal
         */
        AgmSnazzyInfoWindow.prototype.ngOnDestroy = function () {
            if (this._nativeSnazzyInfoWindow) {
                this._nativeSnazzyInfoWindow.destroy();
            }
        };
        AgmSnazzyInfoWindow.ctorParameters = function () { return [
            { type: core$1.AgmMarker, decorators: [{ type: core.Optional }, { type: core.Host }, { type: core.SkipSelf }] },
            { type: core$1.GoogleMapsAPIWrapper },
            { type: core$1.MarkerManager },
            { type: core$1.MapsAPILoader }
        ]; };
        AgmSnazzyInfoWindow.decorators = [
            { type: core.Component, args: [{
                        // tslint:disable-next-line:component-selector
                        selector: 'agm-snazzy-info-window',
                        template: '<div #outerWrapper><div #viewContainer></div></div><ng-content></ng-content>'
                    },] }
        ];
        AgmSnazzyInfoWindow.ctorParameters = function () { return [
            { type: core$1.AgmMarker, decorators: [{ type: core.Optional }, { type: core.Host }, { type: core.SkipSelf }] },
            { type: core$1.GoogleMapsAPIWrapper },
            { type: core$1.MarkerManager },
            { type: core$1.MapsAPILoader }
        ]; };
        AgmSnazzyInfoWindow.propDecorators = {
            latitude: [{ type: core.Input }],
            longitude: [{ type: core.Input }],
            isOpen: [{ type: core.Input }],
            isOpenChange: [{ type: core.Output }],
            placement: [{ type: core.Input }],
            maxWidth: [{ type: core.Input }],
            maxHeight: [{ type: core.Input }],
            backgroundColor: [{ type: core.Input }],
            padding: [{ type: core.Input }],
            border: [{ type: core.Input }],
            borderRadius: [{ type: core.Input }],
            fontColor: [{ type: core.Input }],
            fontSize: [{ type: core.Input }],
            pointer: [{ type: core.Input }],
            shadow: [{ type: core.Input }],
            openOnMarkerClick: [{ type: core.Input }],
            closeOnMapClick: [{ type: core.Input }],
            wrapperClass: [{ type: core.Input }],
            closeWhenOthersOpen: [{ type: core.Input }],
            showCloseButton: [{ type: core.Input }],
            panOnOpen: [{ type: core.Input }],
            beforeOpen: [{ type: core.Output }],
            afterClose: [{ type: core.Output }],
            _outerWrapper: [{ type: core.ViewChild, args: ['outerWrapper', { read: core.ElementRef, static: false },] }],
            _viewContainerRef: [{ type: core.ViewChild, args: ['viewContainer', { read: core.ViewContainerRef, static: false },] }],
            _templateRef: [{ type: core.ContentChild, args: [core.TemplateRef, { static: false },] }]
        };
        return AgmSnazzyInfoWindow;
    }());

    var AgmSnazzyInfoWindowModule = /** @class */ (function () {
        function AgmSnazzyInfoWindowModule() {
        }
        AgmSnazzyInfoWindowModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [AgmSnazzyInfoWindow],
                        exports: [AgmSnazzyInfoWindow],
                    },] }
        ];
        return AgmSnazzyInfoWindowModule;
    }());

    exports.AgmSnazzyInfoWindow = AgmSnazzyInfoWindow;
    exports.AgmSnazzyInfoWindowModule = AgmSnazzyInfoWindowModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=agm-snazzy-info-window.umd.js.map
