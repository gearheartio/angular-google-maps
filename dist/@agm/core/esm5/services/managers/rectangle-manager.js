import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
var RectangleManager = /** @class */ (function () {
    function RectangleManager(_apiWrapper, _zone) {
        this._apiWrapper = _apiWrapper;
        this._zone = _zone;
        this._rectangles = new Map();
    }
    RectangleManager.prototype.addRectangle = function (rectangle) {
        this._rectangles.set(rectangle, this._apiWrapper.createRectangle({
            bounds: {
                north: rectangle.north,
                east: rectangle.east,
                south: rectangle.south,
                west: rectangle.west,
            },
            clickable: rectangle.clickable,
            draggable: rectangle.draggable,
            editable: rectangle.editable,
            fillColor: rectangle.fillColor,
            fillOpacity: rectangle.fillOpacity,
            strokeColor: rectangle.strokeColor,
            strokeOpacity: rectangle.strokeOpacity,
            strokePosition: rectangle.strokePosition,
            strokeWeight: rectangle.strokeWeight,
            visible: rectangle.visible,
            zIndex: rectangle.zIndex,
        }));
    };
    /**
     * Removes the given rectangle from the map.
     */
    RectangleManager.prototype.removeRectangle = function (rectangle) {
        var _this = this;
        return this._rectangles.get(rectangle).then(function (r) {
            r.setMap(null);
            _this._rectangles.delete(rectangle);
        });
    };
    RectangleManager.prototype.setOptions = function (rectangle, options) {
        return this._rectangles.get(rectangle).then(function (r) { return r.setOptions(options); });
    };
    RectangleManager.prototype.getBounds = function (rectangle) {
        return this._rectangles.get(rectangle).then(function (r) { return r.getBounds(); });
    };
    RectangleManager.prototype.setBounds = function (rectangle) {
        return this._rectangles.get(rectangle).then(function (r) {
            return r.setBounds({
                north: rectangle.north,
                east: rectangle.east,
                south: rectangle.south,
                west: rectangle.west,
            });
        });
    };
    RectangleManager.prototype.setEditable = function (rectangle) {
        return this._rectangles.get(rectangle).then(function (r) {
            return r.setEditable(rectangle.editable);
        });
    };
    RectangleManager.prototype.setDraggable = function (rectangle) {
        return this._rectangles.get(rectangle).then(function (r) {
            return r.setDraggable(rectangle.draggable);
        });
    };
    RectangleManager.prototype.setVisible = function (rectangle) {
        return this._rectangles.get(rectangle).then(function (r) {
            return r.setVisible(rectangle.visible);
        });
    };
    RectangleManager.prototype.createEventObservable = function (eventName, rectangle) {
        var _this = this;
        return Observable.create(function (observer) {
            var listener = null;
            _this._rectangles.get(rectangle).then(function (r) {
                listener = r.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
            return function () {
                if (listener !== null) {
                    listener.remove();
                }
            };
        });
    };
    RectangleManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone }
    ]; };
    RectangleManager.decorators = [
        { type: Injectable }
    ];
    RectangleManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone }
    ]; };
    return RectangleManager;
}());
export { RectangleManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdGFuZ2xlLW1hbmFnZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9tYW5hZ2Vycy9yZWN0YW5nbGUtbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBRzVDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBR2xFO0lBS0UsMEJBQW9CLFdBQWlDLEVBQVUsS0FBYTtRQUF4RCxnQkFBVyxHQUFYLFdBQVcsQ0FBc0I7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBSHBFLGdCQUFXLEdBQ2YsSUFBSSxHQUFHLEVBQTZDLENBQUM7SUFFc0IsQ0FBQztJQUVoRix1Q0FBWSxHQUFaLFVBQWEsU0FBdUI7UUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDO1lBQy9ELE1BQU0sRUFBRTtnQkFDTixLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUs7Z0JBQ3RCLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSTtnQkFDcEIsS0FBSyxFQUFFLFNBQVMsQ0FBQyxLQUFLO2dCQUN0QixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUk7YUFDckI7WUFDRCxTQUFTLEVBQUUsU0FBUyxDQUFDLFNBQVM7WUFDOUIsU0FBUyxFQUFFLFNBQVMsQ0FBQyxTQUFTO1lBQzlCLFFBQVEsRUFBRSxTQUFTLENBQUMsUUFBUTtZQUM1QixTQUFTLEVBQUUsU0FBUyxDQUFDLFNBQVM7WUFDOUIsV0FBVyxFQUFFLFNBQVMsQ0FBQyxXQUFXO1lBQ2xDLFdBQVcsRUFBRSxTQUFTLENBQUMsV0FBVztZQUNsQyxhQUFhLEVBQUUsU0FBUyxDQUFDLGFBQWE7WUFDdEMsY0FB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SUFBSSxDQUFDLFVBQUMsQ0FBQztnQkFDckMsUUFBUSxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQUMsQ0FBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQWhCLENBQWdCLENBQUMsRUFBdEMsQ0FBc0MsQ0FBQyxDQUFDO1lBQ3hGLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTztnQkFDTCxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7b0JBQ3JCLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDbkI7WUFDSCxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O2dCQXBGZ0Msb0JBQW9CO2dCQUFpQixNQUFNOzs7Z0JBTDdFLFVBQVU7OztnQkFIRixvQkFBb0I7Z0JBTFIsTUFBTTs7SUFrRzNCLHVCQUFDO0NBQUEsQUExRkQsSUEwRkM7U0F6RlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEFnbVJlY3RhbmdsZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcmVjdGFuZ2xlJztcbmltcG9ydCB7IEdvb2dsZU1hcHNBUElXcmFwcGVyIH0gZnJvbSAnLi4vZ29vZ2xlLW1hcHMtYXBpLXdyYXBwZXInO1xuaW1wb3J0ICogYXMgbWFwVHlwZXMgZnJvbSAnLi4vZ29vZ2xlLW1hcHMtdHlwZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVjdGFuZ2xlTWFuYWdlciB7XG4gIHByaXZhdGUgX3JlY3RhbmdsZXM6IE1hcDxBZ21SZWN0YW5nbGUsIFByb21pc2U8bWFwVHlwZXMuUmVjdGFuZ2xlPj4gPVxuICAgICAgbmV3IE1hcDxBZ21SZWN0YW5nbGUsIFByb21pc2U8bWFwVHlwZXMuUmVjdGFuZ2xlPj4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9hcGlXcmFwcGVyOiBHb29nbGVNYXBzQVBJV3JhcHBlciwgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7fVxuXG4gIGFkZFJlY3RhbmdsZShyZWN0YW5nbGU6IEFnbVJlY3RhbmdsZSkge1xuICAgIHRoaXMuX3JlY3RhbmdsZXMuc2V0KHJlY3RhbmdsZSwgdGhpcy5fYXBpV3JhcHBlci5jcmVhdGVSZWN0YW5nbGUoe1xuICAgICAgYm91bmRzOiB7XG4gICAgICAgIG5vcnRoOiByZWN0YW5nbGUubm9ydGgsXG4gICAgICAgIGVhc3Q6IHJlY3RhbmdsZS5lYXN0LFxuICAgICAgICBzb3V0aDogcmVjdGFuZ2xlLnNvdXRoLFxuICAgICAgICB3ZXN0OiByZWN0YW5nbGUud2VzdCxcbiAgICAgIH0sXG4gICAgICBjbGlja2FibGU6IHJlY3RhbmdsZS5jbGlja2FibGUsXG4gICAgICBkcmFnZ2FibGU6IHJlY3RhbmdsZS5kcmFnZ2FibGUsXG4gICAgICBlZGl0YWJsZTogcmVjdGFuZ2xlLmVkaXRhYmxlLFxuICAgICAgZmlsbENvbG9yOiByZWN0YW5nbGUuZmlsbENvbG9yLFxuICAgICAgZmlsbE9wYWNpdHk6IHJlY3RhbmdsZS5maWxsT3BhY2l0eSxcbiAgICAgIHN0cm9rZUNvbG9yOiByZWN0YW5nbGUuc3Ryb2tlQ29sb3IsXG4gICAgICBzdHJva2VPcGFjaXR5OiByZWN0YW5nbGUuc3Ryb2tlT3BhY2l0eSxcbiAgICAgIHN0cm9rZVBvc2l0aW9uOiByZWN0YW5nbGUuc3Ryb2tlUG9zaXRpb24sXG4gICAgICBzdHJva2VXZWlnaHQ6IHJlY3RhbmdsZS5zdHJva2VXZWlnaHQsXG4gICAgICB2aXNpYmxlOiByZWN0YW5nbGUudmlzaWJsZSxcbiAgICAgIHpJbmRleDogcmVjdGFuZ2xlLnpJbmRleCxcbiAgICB9KSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgZ2l2ZW4gcmVjdGFuZ2xlIGZyb20gdGhlIG1hcC5cbiAgICovXG4gIHJlbW92ZVJlY3RhbmdsZShyZWN0YW5nbGU6IEFnbVJlY3RhbmdsZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9yZWN0YW5nbGVzLmdldChyZWN0YW5nbGUpLnRoZW4oKHIpID0+IHtcbiAgICAgIHIuc2V0TWFwKG51bGwpO1xuICAgICAgdGhpcy5fcmVjdGFuZ2xlcy5kZWxldGUocmVjdGFuZ2xlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldE9wdGlvbnMocmVjdGFuZ2xlOiBBZ21SZWN0YW5nbGUsIG9wdGlvbnM6IG1hcFR5cGVzLlJlY3RhbmdsZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVjdGFuZ2xlcy5nZXQocmVjdGFuZ2xlKS50aGVuKChyKSA9PiByLnNldE9wdGlvbnMob3B0aW9ucykpO1xuICB9XG5cbiAgZ2V0Qm91bmRzKHJlY3RhbmdsZTogQWdtUmVjdGFuZ2xlKTogUHJvbWlzZTxtYXBUeXBlcy5MYXRMbmdCb3VuZHM+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVjdGFuZ2xlcy5nZXQocmVjdGFuZ2xlKS50aGVuKChyKSA9PiByLmdldEJvdW5kcygpKTtcbiAgfVxuXG4gIHNldEJvdW5kcyhyZWN0YW5nbGU6IEFnbVJlY3RhbmdsZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9yZWN0YW5nbGVzLmdldChyZWN0YW5nbGUpLnRoZW4oKHIpID0+IHtcbiAgICAgIHJldHVybiByLnNldEJvdW5kcyh7XG4gICAgICAgIG5vcnRoOiByZWN0YW5nbGUubm9ydGgsXG4gICAgICAgIGVhc3Q6IHJlY3RhbmdsZS5lYXN0LFxuICAgICAgICBzb3V0aDogcmVjdGFuZ2xlLnNvdXRoLFxuICAgICAgICB3ZXN0OiByZWN0YW5nbGUud2VzdCxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0RWRpdGFibGUocmVjdGFuZ2xlOiBBZ21SZWN0YW5nbGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVjdGFuZ2xlcy5nZXQocmVjdGFuZ2xlKS50aGVuKChyKSA9PiB7XG4gICAgICByZXR1cm4gci5zZXRFZGl0YWJsZShyZWN0YW5nbGUuZWRpdGFibGUpO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0RHJhZ2dhYmxlKHJlY3RhbmdsZTogQWdtUmVjdGFuZ2xlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlY3RhbmdsZXMuZ2V0KHJlY3RhbmdsZSkudGhlbigocikgPT4ge1xuICAgICAgcmV0dXJuIHIuc2V0RHJhZ2dhYmxlKHJlY3RhbmdsZS5kcmFnZ2FibGUpO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0VmlzaWJsZShyZWN0YW5nbGU6IEFnbVJlY3RhbmdsZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9yZWN0YW5nbGVzLmdldChyZWN0YW5nbGUpLnRoZW4oKHIpID0+IHtcbiAgICAgIHJldHVybiByLnNldFZpc2libGUocmVjdGFuZ2xlLnZpc2libGUpO1xuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlRXZlbnRPYnNlcnZhYmxlPFQ+KGV2ZW50TmFtZTogc3RyaW5nLCByZWN0YW5nbGU6IEFnbVJlY3RhbmdsZSk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFQ+KSA9PiB7XG4gICAgICBsZXQgbGlzdGVuZXI6IG1hcFR5cGVzLk1hcHNFdmVudExpc3RlbmVyID0gbnVsbDtcbiAgICAgIHRoaXMuX3JlY3RhbmdsZXMuZ2V0KHJlY3RhbmdsZSkudGhlbigocikgPT4ge1xuICAgICAgICBsaXN0ZW5lciA9IHIuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCAoZTogVCkgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChlKSkpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmIChsaXN0ZW5lciAhPT0gbnVsbCkge1xuICAgICAgICAgIGxpc3RlbmVyLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG59XG4iXX0=