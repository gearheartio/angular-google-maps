import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { PolygonManager } from '../services/managers/polygon-manager';
/**
 * AgmPolygon renders a polygon on a {@link AgmMap}
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
 *      <agm-polygon [paths]="paths">
 *      </agm-polygon>
 *    </agm-map>
 *  `
 * })
 * export class MyMapCmp {
 *   lat: number = 0;
 *   lng: number = 0;
 *   zoom: number = 10;
 *   paths: Array<LatLngLiteral> = [
 *     { lat: 0,  lng: 10 },
 *     { lat: 0,  lng: 20 },
 *     { lat: 10, lng: 20 },
 *     { lat: 10, lng: 10 },
 *     { lat: 0,  lng: 10 }
 *   ]
 *   // Nesting paths will create a hole where they overlap;
 *   nestedPaths: Array<Array<LatLngLiteral>> = [[
 *     { lat: 0,  lng: 10 },
 *     { lat: 0,  lng: 20 },
 *     { lat: 10, lng: 20 },
 *     { lat: 10, lng: 10 },
 *     { lat: 0,  lng: 10 }
 *   ], [
 *     { lat: 0, lng: 15 },
 *     { lat: 0, lng: 20 },
 *     { lat: 5, lng: 20 },
 *     { lat: 5, lng: 15 },
 *     { lat: 0, lng: 15 }
 *   ]]
 * }
 * ```
 */
var AgmPolygon = /** @class */ (function () {
    function AgmPolygon(_polygonManager) {
        this._polygonManager = _polygonManager;
        /**
         * Indicates whether this Polygon handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this shape over the map. The geodesic
         * property defines the mode of dragging. Defaults to false.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = false;
        /**
         * If set to true, the user can edit this shape by dragging the control
         * points shown at the vertices and on each segment. Defaults to false.
         */
        this.editable = false;
        /**
         * When true, edges of the polygon are interpreted as geodesic and will
         * follow the curvature of the Earth. When false, edges of the polygon are
         * rendered as straight lines in screen space. Note that the shape of a
         * geodesic polygon may appear to change when dragged, as the dimensions
         * are maintained relative to the surface of the earth. Defaults to false.
         */
        this.geodesic = false;
        /**
         * The ordered sequence of coordinates that designates a closed loop.
         * Unlike polylines, a polygon may consist of one or more paths.
         *  As a result, the paths property may specify one or more arrays of
         * LatLng coordinates. Paths are closed automatically; do not repeat the
         * first vertex of the path as the last vertex. Simple polygons may be
         * defined using a single array of LatLngs. More complex polygons may
         * specify an array of arrays. Any simple arrays are converted into Arrays.
         * Inserting or removing LatLngs from the Array will automatically update
         * the polygon on the map.
         */
        this.paths = [];
        /**
         * This event is fired when the DOM click event is fired on the Polygon.
         */
        this.polyClick = new EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on the Polygon.
         */
        this.polyDblClick = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the polygon.
         */
        this.polyDrag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the polygon.
         */
        this.polyDragEnd = new EventEmitter();
        /**
         * This event is fired when the user starts dragging the polygon.
         */
        this.polyDragStart = new EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the Polygon.
         */
        this.polyMouseDown = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the Polygon.
         */
        this.polyMouseMove = new EventEmitter();
        /**
         * This event is fired on Polygon mouseout.
         */
        this.polyMouseOut = new EventEmitter();
        /**
         * This event is fired on Polygon mouseover.
         */
        this.polyMouseOver = new EventEmitter();
        /**
         * This event is fired whe the DOM mouseup event is fired on the Polygon
         */
        this.polyMouseUp = new EventEmitter();
        /**
         * This event is fired when the Polygon is right-clicked on.
         */
        this.polyRightClick = new EventEmitter();
        /**
         * This event is fired after Polygon first path changes.
         */
        this.polyPathsChange = new EventEmitter();
        this._polygonAddedToManager = false;
        this._subscriptions = [];
    }
    /** @internal */
    AgmPolygon.prototype.ngAfterContentInit = function () {
        if (!this._polygonAddedToManager) {
            this._init();
        }
    };
    AgmPolygon.prototype.ngOnChanges = function (changes) {
        if (!this._polygonAddedToManager) {
            this._init();
            return;
        }
        this._polygonManager.setPolygonOptions(this, this._updatePolygonOptions(changes));
    };
    AgmPolygon.prototype._init = function () {
        this._polygonManager.addPolygon(this);
        this._polygonAddedToManager = true;
        this._addEventListeners();
    };
    AgmPolygon.prototype._addEventListeners = function () {
        var _this = this;
        var handlers = [
            { name: 'click', handler: function (ev) { return _this.polyClick.emit(ev); } },
            { name: 'dblclick', handler: function (ev) { return _this.polyDblClick.emit(ev); } },
            { name: 'drag', handler: function (ev) { return _this.polyDrag.emit(ev); } },
            { name: 'dragend', handler: function (ev) { return _this.polyDragEnd.emit(ev); } },
            { name: 'dragstart', handler: function (ev) { return _this.polyDragStart.emit(ev); } },
            { name: 'mousedown', handler: function (ev) { return _this.polyMouseDown.emit(ev); } },
            { name: 'mousemove', handler: function (ev) { return _this.polyMouseMove.emit(ev); } },
            { name: 'mouseout', handler: function (ev) { return _this.polyMouseOut.emit(ev); } },
            { name: 'mouseover', handler: function (ev) { return _this.polyMouseOver.emit(ev); } },
            { name: 'mouseup', handler: function (ev) { return _this.polyMouseUp.emit(ev); } },
            { name: 'rightclick', handler: function (ev) { return _this.polyRightClick.emit(ev); } },
        ];
        handlers.forEach(function (obj) {
            var os = _this._polygonManager.createEventObservable(obj.name, _this).subscribe(obj.handler);
            _this._subscriptions.push(os);
        });
        this._polygonManager.createPathEventObservable(this)
            .then(function (paths$) {
            var os = paths$.subscribe(function (pathEvent) { return _this.polyPathsChange.emit(pathEvent); });
            _this._subscriptions.push(os);
        });
    };
    AgmPolygon.prototype._updatePolygonOptions = function (changes) {
        return Object.keys(changes)
            .filter(function (k) { return AgmPolygon._polygonOptionsAttributes.indexOf(k) !== -1; })
            .reduce(function (obj, k) {
            obj[k] = changes[k].currentValue;
            return obj;
        }, {});
    };
    /** @internal */
    AgmPolygon.prototype.id = function () { return this._id; };
    /** @internal */
    AgmPolygon.prototype.ngOnDestroy = function () {
        this._polygonManager.deletePolygon(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    AgmPolygon.prototype.getPath = function () {
        return this._polygonManager.getPath(this);
    };
    AgmPolygon.prototype.getPaths = function () {
        return this._polygonManager.getPaths(this);
    };
    AgmPolygon._polygonOptionsAttributes = [
        'clickable', 'draggable', 'editable', 'fillColor', 'fillOpacity', 'geodesic', 'icon', 'map',
        'paths', 'strokeColor', 'strokeOpacity', 'strokeWeight', 'visible', 'zIndex', 'draggable',
        'editable', 'visible',
    ];
    AgmPolygon.ctorParameters = function () { return [
        { type: PolygonManager }
    ]; };
    AgmPolygon.decorators = [
        { type: Directive, args: [{
                    selector: 'agm-polygon',
                },] }
    ];
    AgmPolygon.ctorParameters = function () { return [
        { type: PolygonManager }
    ]; };
    AgmPolygon.propDecorators = {
        clickable: [{ type: Input }],
        draggable: [{ type: Input, args: ['polyDraggable',] }],
        editable: [{ type: Input }],
        fillColor: [{ type: Input }],
        fillOpacity: [{ type: Input }],
        geodesic: [{ type: Input }],
        paths: [{ type: Input }],
        strokeColor: [{ type: Input }],
        strokeOpacity: [{ type: Input }],
        strokeWeight: [{ type: Input }],
        visible: [{ type: Input }],
        zIndex: [{ type: Input }],
        polyClick: [{ type: Output }],
        polyDblClick: [{ type: Output }],
        polyDrag: [{ type: Output }],
        polyDragEnd: [{ type: Output }],
        polyDragStart: [{ type: Output }],
        polyMouseDown: [{ type: Output }],
        polyMouseMove: [{ type: Output }],
        polyMouseOut: [{ type: Output }],
        polyMouseOver: [{ type: Output }],
        polyMouseUp: [{ type: Output }],
        polyRightClick: [{ type: Output }],
        polyPathsChange: [{ type: Output }]
    };
    return AgmPolygon;
}());
export { AgmPolygon };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWdvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvcG9seWdvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQW9CLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUF3QixNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBSTlILE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUd0RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0RHO0FBQ0g7SUF1SkUsb0JBQW9CLGVBQStCO1FBQS9CLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQW5KbkQ7O1dBRUc7UUFDTSxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBRTFCOzs7V0FHRztRQUNILDJDQUEyQztRQUNuQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRTFDOzs7V0FHRztRQUNNLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFhMUI7Ozs7OztXQU1HO1FBQ00sYUFBUSxHQUFHLEtBQUssQ0FBQztRQUUxQjs7Ozs7Ozs7OztXQVVHO1FBQ00sVUFBSyxHQUF5RSxFQUFFLENBQUM7UUE0QjFGOztXQUVHO1FBQ08sY0FBUyxHQUFpQyxJQUFJLFlBQVksRUFBa0IsQ0FBQztRQUV2Rjs7V0FFRztRQUNPLGlCQUFZLEdBQWlDLElBQUksWUFBWSxFQUFrQixDQUFDO1FBRTFGOztXQUVHO1FBQ08sYUFBUSxHQUE2QixJQUFJLFlBQVksRUFBYyxDQUFDO1FBRTlFOztXQUVHO1FBQ08sZ0JBQVcsR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUVqRjs7V0FFRztRQUNPLGtCQUFhLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7UUFFbkY7O1dBRUc7UUFDTyxrQkFBYSxHQUFpQyxJQUFJLFlBQVksRUFBa0IsQ0FBQztRQUUzRjs7V0FFRztRQUNPLGtCQUFhLEdBQWlDLElBQUksWUFBWSxF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LEVBQUUsUUFBUSxFQUFFLFdBQVc7UUFDekYsVUFBVSxFQUFFLFNBQVM7S0FDdEIsQ0FBQzs7Z0JBTW1DLGNBQWM7OztnQkF2SnBELFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtpQkFDeEI7OztnQkF0RFEsY0FBYzs7OzRCQTJEcEIsS0FBSzs0QkFPTCxLQUFLLFNBQUMsZUFBZTsyQkFNckIsS0FBSzs0QkFNTCxLQUFLOzhCQUtMLEtBQUs7MkJBU0wsS0FBSzt3QkFhTCxLQUFLOzhCQU1MLEtBQUs7Z0NBS0wsS0FBSzsrQkFLTCxLQUFLOzBCQUtMLEtBQUs7eUJBS0wsS0FBSzs0QkFLTCxNQUFNOytCQUtOLE1BQU07MkJBS04sTUFBTTs4QkFLTixNQUFNO2dDQUtOLE1BQU07Z0NBS04sTUFBTTtnQ0FLTixNQUFNOytCQUtOLE1BQU07Z0NBS04sTUFBTTs4QkFLTixNQUFNO2lDQUtOLE1BQU07a0NBS04sTUFBTTs7SUF3RlQsaUJBQUM7Q0FBQSxBQW5PRCxJQW1PQztTQWhPWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTGF0TG5nLCBMYXRMbmdMaXRlcmFsLCBQb2x5Z29uT3B0aW9ucywgUG9seU1vdXNlRXZlbnQgfSBmcm9tICcuLi9zZXJ2aWNlcy9nb29nbGUtbWFwcy10eXBlcyc7XG5pbXBvcnQgeyBQb2x5Z29uTWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL3BvbHlnb24tbWFuYWdlcic7XG5pbXBvcnQgeyBNdmNFdmVudFR5cGUgfSBmcm9tICcuLi91dGlscy9tdmNhcnJheS11dGlscyc7XG5cbi8qKlxuICogQWdtUG9seWdvbiByZW5kZXJzIGEgcG9seWdvbiBvbiBhIHtAbGluayBBZ21NYXB9XG4gKlxuICogIyMjIEV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICpcbiAqIEBDb21wb25lbnQoe1xuICogIHNlbGVjdG9yOiAnbXktbWFwLWNtcCcsXG4gKiAgc3R5bGVzOiBbYFxuICogICAgYWdtLW1hcCB7XG4gKiAgICAgIGhlaWdodDogMzAwcHg7XG4gKiAgICB9XG4gKiBgXSxcbiAqICB0ZW1wbGF0ZTogYFxuICogICAgPGFnbS1tYXAgW2xhdGl0dWRlXT1cImxhdFwiIFtsb25naXR1ZGVdPVwibG5nXCIgW3pvb21dPVwiem9vbVwiPlxuICogICAgICA8YWdtLXBvbHlnb24gW3BhdGhzXT1cInBhdGhzXCI+XG4gKiAgICAgIDwvYWdtLXBvbHlnb24+XG4gKiAgICA8L2FnbS1tYXA+XG4gKiAgYFxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBNeU1hcENtcCB7XG4gKiAgIGxhdDogbnVtYmVyID0gMDtcbiAqICAgbG5nOiBudW1iZXIgPSAwO1xuICogICB6b29tOiBudW1iZXIgPSAxMDtcbiAqICAgcGF0aHM6IEFycmF5PExhdExuZ0xpdGVyYWw+ID0gW1xuICogICAgIHsgbGF0OiAwLCAgbG5nOiAxMCB9LFxuICogICAgIHsgbGF0OiAwLCAgbG5nOiAyMCB9LFxuICogICAgIHsgbGF0OiAxMCwgbG5nOiAyMCB9LFxuICogICAgIHsgbGF0OiAxMCwgbG5nOiAxMCB9LFxuICogICAgIHsgbGF0OiAwLCAgbG5nOiAxMCB9XG4gKiAgIF1cbiAqICAgLy8gTmVzdGluZyBwYXRocyB3aWxsIGNyZWF0ZSBhIGhvbGUgd2hlcmUgdGhleSBvdmVybGFwO1xuICogICBuZXN0ZWRQYXRoczogQXJyYXk8QXJyYXk8TGF0TG5nTGl0ZXJhbD4+ID0gW1tcbiAqICAgICB7IGxhdDogMCwgIGxuZzogMTAgfSxcbiAqICAgICB7IGxhdDogMCwgIGxuZzogMjAgfSxcbiAqICAgICB7IGxhdDogMTAsIGxuZzogMjAgfSxcbiAqICAgICB7IGxhdDogMTAsIGxuZzogMTAgfSxcbiAqICAgICB7IGxhdDogMCwgIGxuZzogMTAgfVxuICogICBdLCBbXG4gKiAgICAgeyBsYXQ6IDAsIGxuZzogMTUgfSxcbiAqICAgICB7IGxhdDogMCwgbG5nOiAyMCB9LFxuICogICAgIHsgbGF0OiA1LCBsbmc6IDIwIH0sXG4gKiAgICAgeyBsYXQ6IDUsIGxuZzogMTUgfSxcbiAqICAgICB7IGxhdDogMCwgbG5nOiAxNSB9XG4gKiAgIF1dXG4gKiB9XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYWdtLXBvbHlnb24nLFxufSlcbmV4cG9ydCBjbGFzcyBBZ21Qb2x5Z29uIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMsIEFmdGVyQ29udGVudEluaXQge1xuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhpcyBQb2x5Z29uIGhhbmRsZXMgbW91c2UgZXZlbnRzLiBEZWZhdWx0cyB0byB0cnVlLlxuICAgKi9cbiAgQElucHV0KCkgY2xpY2thYmxlID0gdHJ1ZTtcblxuICAvKipcbiAgICogSWYgc2V0IHRvIHRydWUsIHRoZSB1c2VyIGNhbiBkcmFnIHRoaXMgc2hhcGUgb3ZlciB0aGUgbWFwLiBUaGUgZ2VvZGVzaWNcbiAgICogcHJvcGVydHkgZGVmaW5lcyB0aGUgbW9kZSBvZiBkcmFnZ2luZy4gRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgncG9seURyYWdnYWJsZScpIGRyYWdnYWJsZSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIHVzZXIgY2FuIGVkaXQgdGhpcyBzaGFwZSBieSBkcmFnZ2luZyB0aGUgY29udHJvbFxuICAgKiBwb2ludHMgc2hvd24gYXQgdGhlIHZlcnRpY2VzIGFuZCBvbiBlYWNoIHNlZ21lbnQuIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgKi9cbiAgQElucHV0KCkgZWRpdGFibGUgPSBmYWxzZTtcblxuICAvKipcbiAgICogVGhlIGZpbGwgY29sb3IuIEFsbCBDU1MzIGNvbG9ycyBhcmUgc3VwcG9ydGVkIGV4Y2VwdCBmb3IgZXh0ZW5kZWRcbiAgICogbmFtZWQgY29sb3JzLlxuICAgKi9cbiAgQElucHV0KCkgZmlsbENvbG9yOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBmaWxsIG9wYWNpdHkgYmV0d2VlbiAwLjAgYW5kIDEuMFxuICAgKi9cbiAgQElucHV0KCkgZmlsbE9wYWNpdHk6IG51bWJlcjtcblxuICAvKipcbiAgICogV2hlbiB0cnVlLCBlZGdlcyBvZiB0aGUgcG9seWdvbiBhcmUgaW50ZXJwcmV0ZWQgYXMgZ2VvZGVzaWMgYW5kIHdpbGxcbiAgICogZm9sbG93IHRoZSBjdXJ2YXR1cmUgb2YgdGhlIEVhcnRoLiBXaGVuIGZhbHNlLCBlZGdlcyBvZiB0aGUgcG9seWdvbiBhcmVcbiAgICogcmVuZGVyZWQgYXMgc3RyYWlnaHQgbGluZXMgaW4gc2NyZWVuIHNwYWNlLiBOb3RlIHRoYXQgdGhlIHNoYXBlIG9mIGFcbiAgICogZ2VvZGVzaWMgcG9seWdvbiBtYXkgYXBwZWFyIHRvIGNoYW5nZSB3aGVuIGRyYWdnZWQsIGFzIHRoZSBkaW1lbnNpb25zXG4gICAqIGFyZSBtYWludGFpbmVkIHJlbGF0aXZlIHRvIHRoZSBzdXJmYWNlIG9mIHRoZSBlYXJ0aC4gRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAqL1xuICBASW5wdXQoKSBnZW9kZXNpYyA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBUaGUgb3JkZXJlZCBzZXF1ZW5jZSBvZiBjb29yZGluYXRlcyB0aGF0IGRlc2lnbmF0ZXMgYSBjbG9zZWQgbG9vcC5cbiAgICogVW5saWtlIHBvbHlsaW5lcywgYSBwb2x5Z29uIG1heSBjb25zaXN0IG9mIG9uZSBvciBtb3JlIHBhdGhzLlxuICAgKiAgQXMgYSByZXN1bHQsIHRoZSBwYXRocyBwcm9wZXJ0eSBtYXkgc3BlY2lmeSBvbmUgb3IgbW9yZSBhcnJheXMgb2ZcbiAgICogTGF0TG5nIGNvb3JkaW5hdGVzLiBQYXRocyBhcmUgY2xvc2VkIGF1dG9tYXRpY2FsbHk7IGRvIG5vdCByZXBlYXQgdGhlXG4gICAqIGZpcnN0IHZlcnRleCBvZiB0aGUgcGF0aCBhcyB0aGUgbGFzdCB2ZXJ0ZXguIFNpbXBsZSBwb2x5Z29ucyBtYXkgYmVcbiAgICogZGVmaW5lZCB1c2luZyBhIHNpbmdsZSBhcnJheSBvZiBMYXRMbmdzLiBNb3JlIGNvbXBsZXggcG9seWdvbnMgbWF5XG4gICAqIHNwZWNpZnkgYW4gYXJyYXkgb2YgYXJyYXlzLiBBbnkgc2ltcGxlIGFycmF5cyBhcmUgY29udmVydGVkIGludG8gQXJyYXlzLlxuICAgKiBJbnNlcnRpbmcgb3IgcmVtb3ZpbmcgTGF0TG5ncyBmcm9tIHRoZSBBcnJheSB3aWxsIGF1dG9tYXRpY2FsbHkgdXBkYXRlXG4gICAqIHRoZSBwb2x5Z29uIG9uIHRoZSBtYXAuXG4gICAqL1xuICBASW5wdXQoKSBwYXRoczogQXJyYXk8TGF0TG5nIHwgTGF0TG5nTGl0ZXJhbD4gfCBBcnJheTxBcnJheTxMYXRMbmcgfCBMYXRMbmdMaXRlcmFsPj4gPSBbXTtcblxuICAvKipcbiAgICogVGhlIHN0cm9rZSBjb2xvci4gQWxsIENTUzMgY29sb3JzIGFyZSBzdXBwb3J0ZWQgZXhjZXB0IGZvciBleHRlbmRlZFxuICAgKiBuYW1lZCBjb2xvcnMuXG4gICAqL1xuICBASW5wdXQoKSBzdHJva2VDb2xvcjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgc3Ryb2tlIG9wYWNpdHkgYmV0d2VlbiAwLjAgYW5kIDEuMFxuICAgKi9cbiAgQElucHV0KCkgc3Ryb2tlT3BhY2l0eTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgc3Ryb2tlIHdpZHRoIGluIHBpeGVscy5cbiAgICovXG4gIEBJbnB1dCgpIHN0cm9rZVdlaWdodDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoaXMgcG9seWdvbiBpcyB2aXNpYmxlIG9uIHRoZSBtYXAuIERlZmF1bHRzIHRvIHRydWUuXG4gICAqL1xuICBASW5wdXQoKSB2aXNpYmxlOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUaGUgekluZGV4IGNvbXBhcmVkIHRvIG90aGVyIHBvbHlzLlxuICAgKi9cbiAgQElucHV0KCkgekluZGV4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIGNsaWNrIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5Z29uLlxuICAgKi9cbiAgQE91dHB1dCgpIHBvbHlDbGljazogRXZlbnRFbWl0dGVyPFBvbHlNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIGRibGNsaWNrIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5Z29uLlxuICAgKi9cbiAgQE91dHB1dCgpIHBvbHlEYmxDbGljazogRXZlbnRFbWl0dGVyPFBvbHlNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgcmVwZWF0ZWRseSBmaXJlZCB3aGlsZSB0aGUgdXNlciBkcmFncyB0aGUgcG9seWdvbi5cbiAgICovXG4gIEBPdXRwdXQoKSBwb2x5RHJhZzogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RvcHMgZHJhZ2dpbmcgdGhlIHBvbHlnb24uXG4gICAqL1xuICBAT3V0cHV0KCkgcG9seURyYWdFbmQ6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIHN0YXJ0cyBkcmFnZ2luZyB0aGUgcG9seWdvbi5cbiAgICovXG4gIEBPdXRwdXQoKSBwb2x5RHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlZG93biBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWdvbi5cbiAgICovXG4gIEBPdXRwdXQoKSBwb2x5TW91c2VEb3duOiBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vtb3ZlIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5Z29uLlxuICAgKi9cbiAgQE91dHB1dCgpIHBvbHlNb3VzZU1vdmU6IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFBvbHlNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIFBvbHlnb24gbW91c2VvdXQuXG4gICAqL1xuICBAT3V0cHV0KCkgcG9seU1vdXNlT3V0OiBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCBvbiBQb2x5Z29uIG1vdXNlb3Zlci5cbiAgICovXG4gIEBPdXRwdXQoKSBwb2x5TW91c2VPdmVyOiBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGUgdGhlIERPTSBtb3VzZXVwIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5Z29uXG4gICAqL1xuICBAT3V0cHV0KCkgcG9seU1vdXNlVXA6IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFBvbHlNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIFBvbHlnb24gaXMgcmlnaHQtY2xpY2tlZCBvbi5cbiAgICovXG4gIEBPdXRwdXQoKSBwb2x5UmlnaHRDbGljazogRXZlbnRFbWl0dGVyPFBvbHlNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgYWZ0ZXIgUG9seWdvbiBmaXJzdCBwYXRoIGNoYW5nZXMuXG4gICAqL1xuICBAT3V0cHV0KCkgcG9seVBhdGhzQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxQb2x5Z29uUGF0aEV2ZW50PGFueT4+KCk7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX3BvbHlnb25PcHRpb25zQXR0cmlidXRlczogQXJyYXk8c3RyaW5nPiA9IFtcbiAgICAnY2xpY2thYmxlJywgJ2RyYWdnYWJsZScsICdlZGl0YWJsZScsICdmaWxsQ29sb3InLCAnZmlsbE9wYWNpdHknLCAnZ2VvZGVzaWMnLCAnaWNvbicsICdtYXAnLFxuICAgICdwYXRocycsICdzdHJva2VDb2xvcicsICdzdHJva2VPcGFjaXR5JywgJ3N0cm9rZVdlaWdodCcsICd2aXNpYmxlJywgJ3pJbmRleCcsICdkcmFnZ2FibGUnLFxuICAgICdlZGl0YWJsZScsICd2aXNpYmxlJyxcbiAgXTtcblxuICBwcml2YXRlIF9pZDogc3RyaW5nO1xuICBwcml2YXRlIF9wb2x5Z29uQWRkZWRUb01hbmFnZXIgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wb2x5Z29uTWFuYWdlcjogUG9seWdvbk1hbmFnZXIpIHsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIGlmICghdGhpcy5fcG9seWdvbkFkZGVkVG9NYW5hZ2VyKSB7XG4gICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IGFueSB7XG4gICAgaWYgKCF0aGlzLl9wb2x5Z29uQWRkZWRUb01hbmFnZXIpIHtcbiAgICAgIHRoaXMuX2luaXQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9wb2x5Z29uTWFuYWdlci5zZXRQb2x5Z29uT3B0aW9ucyh0aGlzLCB0aGlzLl91cGRhdGVQb2x5Z29uT3B0aW9ucyhjaGFuZ2VzKSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0KCkge1xuICAgIHRoaXMuX3BvbHlnb25NYW5hZ2VyLmFkZFBvbHlnb24odGhpcyk7XG4gICAgdGhpcy5fcG9seWdvbkFkZGVkVG9NYW5hZ2VyID0gdHJ1ZTtcbiAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgY29uc3QgaGFuZGxlcnMgPSBbXG4gICAgICB7IG5hbWU6ICdjbGljaycsIGhhbmRsZXI6IChldjogUG9seU1vdXNlRXZlbnQpID0+IHRoaXMucG9seUNsaWNrLmVtaXQoZXYpIH0sXG4gICAgICB7IG5hbWU6ICdkYmxjbGljaycsIGhhbmRsZXI6IChldjogUG9seU1vdXNlRXZlbnQpID0+IHRoaXMucG9seURibENsaWNrLmVtaXQoZXYpIH0sXG4gICAgICB7IG5hbWU6ICdkcmFnJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLnBvbHlEcmFnLmVtaXQoZXYpIH0sXG4gICAgICB7IG5hbWU6ICdkcmFnZW5kJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLnBvbHlEcmFnRW5kLmVtaXQoZXYpIH0sXG4gICAgICB7IG5hbWU6ICdkcmFnc3RhcnQnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMucG9seURyYWdTdGFydC5lbWl0KGV2KSB9LFxuICAgICAgeyBuYW1lOiAnbW91c2Vkb3duJywgaGFuZGxlcjogKGV2OiBQb2x5TW91c2VFdmVudCkgPT4gdGhpcy5wb2x5TW91c2VEb3duLmVtaXQoZXYpIH0sXG4gICAgICB7IG5hbWU6ICdtb3VzZW1vdmUnLCBoYW5kbGVyOiAoZXY6IFBvbHlNb3VzZUV2ZW50KSA9PiB0aGlzLnBvbHlNb3VzZU1vdmUuZW1pdChldikgfSxcbiAgICAgIHsgbmFtZTogJ21vdXNlb3V0JywgaGFuZGxlcjogKGV2OiBQb2x5TW91c2VFdmVudCkgPT4gdGhpcy5wb2x5TW91c2VPdXQuZW1pdChldikgfSxcbiAgICAgIHsgbmFtZTogJ21vdXNlb3ZlcicsIGhhbmRsZXI6IChldjogUG9seU1vdXNlRXZlbnQpID0+IHRoaXMucG9seU1vdXNlT3Zlci5lbWl0KGV2KSB9LFxuICAgICAgeyBuYW1lOiAnbW91c2V1cCcsIGhhbmRsZXI6IChldjogUG9seU1vdXNlRXZlbnQpID0+IHRoaXMucG9seU1vdXNlVXAuZW1pdChldikgfSxcbiAgICAgIHsgbmFtZTogJ3JpZ2h0Y2xpY2snLCBoYW5kbGVyOiAoZXY6IFBvbHlNb3VzZUV2ZW50KSA9PiB0aGlzLnBvbHlSaWdodENsaWNrLmVtaXQoZXYpIH0sXG4gICAgXTtcbiAgICBoYW5kbGVycy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgIGNvbnN0IG9zID0gdGhpcy5fcG9seWdvbk1hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlKG9iai5uYW1lLCB0aGlzKS5zdWJzY3JpYmUob2JqLmhhbmRsZXIpO1xuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKG9zKTtcbiAgICB9KTtcblxuICAgIHRoaXMuX3BvbHlnb25NYW5hZ2VyLmNyZWF0ZVBhdGhFdmVudE9ic2VydmFibGUodGhpcylcbiAgICAudGhlbihwYXRocyQgPT4ge1xuICAgICAgY29uc3Qgb3MgPSBwYXRocyQuc3Vic2NyaWJlKHBhdGhFdmVudCA9PiB0aGlzLnBvbHlQYXRoc0NoYW5nZS5lbWl0KHBhdGhFdmVudCkpO1xuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKG9zKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVBvbHlnb25PcHRpb25zKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiBQb2x5Z29uT3B0aW9ucyB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGNoYW5nZXMpXG4gICAgICAuZmlsdGVyKGsgPT4gQWdtUG9seWdvbi5fcG9seWdvbk9wdGlvbnNBdHRyaWJ1dGVzLmluZGV4T2YoaykgIT09IC0xKVxuICAgICAgLnJlZHVjZSgob2JqOiBhbnksIGs6IHN0cmluZykgPT4ge1xuICAgICAgICBvYmpba10gPSBjaGFuZ2VzW2tdLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH0sIHt9KTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2lkOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9wb2x5Z29uTWFuYWdlci5kZWxldGVQb2x5Z29uKHRoaXMpO1xuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCByZWdpc3RlcmVkIG9ic2VydmFibGUgc3Vic2NyaXB0aW9uc1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuZm9yRWFjaCgocykgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIGdldFBhdGgoKTogUHJvbWlzZTxBcnJheTxMYXRMbmc+PiB7XG4gICAgcmV0dXJuIHRoaXMuX3BvbHlnb25NYW5hZ2VyLmdldFBhdGgodGhpcyk7XG4gIH1cblxuICBnZXRQYXRocygpOiBQcm9taXNlPEFycmF5PEFycmF5PExhdExuZz4+PiB7XG4gICAgcmV0dXJuIHRoaXMuX3BvbHlnb25NYW5hZ2VyLmdldFBhdGhzKHRoaXMpO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUG9seWdvblBhdGhFdmVudDxUIGV4dGVuZHMgKExhdExuZyB8IEFycmF5PExhdExuZz4pPiB7XG4gIG5ld0FycjogTGF0TG5nW11bXTtcbiAgZXZlbnROYW1lOiBNdmNFdmVudFR5cGU7XG4gIGluZGV4OiBudW1iZXI7XG4gIHByZXZpb3VzPzogVDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYXRoQ29sbGVjdGlvbkNoYW5nZVBvbHlnb25QYXRoRXZlbnQgZXh0ZW5kcyBQb2x5Z29uUGF0aEV2ZW50IDxBcnJheTxMYXRMbmc+Pntcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYXRoQ2hhbmdlUG9seWdvblBhdGhFdmVudCBleHRlbmRzIFBvbHlnb25QYXRoRXZlbnQ8TGF0TG5nPiB7XG4gIHBhdGhJbmRleDogbnVtYmVyO1xufVxuIl19