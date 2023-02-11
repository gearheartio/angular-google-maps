import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
var CircleManager = /** @class */ (function () {
    function CircleManager(_apiWrapper, _zone) {
        this._apiWrapper = _apiWrapper;
        this._zone = _zone;
        this._circles = new Map();
    }
    CircleManager.prototype.addCircle = function (circle) {
        this._circles.set(circle, this._apiWrapper.createCircle({
            center: { lat: circle.latitude, lng: circle.longitude },
            clickable: circle.clickable,
            draggable: circle.draggable,
            editable: circle.editable,
            fillColor: circle.fillColor,
            fillOpacity: circle.fillOpacity,
            radius: circle.radius,
            strokeColor: circle.strokeColor,
            strokeOpacity: circle.strokeOpacity,
            strokePosition: circle.strokePosition,
            strokeWeight: circle.strokeWeight,
            visible: circle.visible,
            zIndex: circle.zIndex,
        }));
    };
    /**
     * Removes the given circle from the map.
     */
    CircleManager.prototype.removeCircle = function (circle) {
        var _this = this;
        return this._circles.get(circle).then(function (c) {
            c.setMap(null);
            _this._circles.delete(circle);
        });
    };
    CircleManager.prototype.setOptions = function (circle, options) {
        return this._circles.get(circle).then(function (c) {
            if (typeof options.strokePosition === 'string') {
                options.strokePosition = google.maps.StrokePosition[options.strokePosition];
            }
            c.setOptions(options);
        });
    };
    CircleManager.prototype.getBounds = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.getBounds(); });
    };
    CircleManager.prototype.getCenter = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.getCenter(); });
    };
    CircleManager.prototype.getRadius = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.getRadius(); });
    };
    CircleManager.prototype.setCenter = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setCenter({ lat: circle.latitude, lng: circle.longitude }); });
    };
    CircleManager.prototype.setEditable = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setEditable(circle.editable); });
    };
    CircleManager.prototype.setDraggable = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setDraggable(circle.draggable); });
    };
    CircleManager.prototype.setVisible = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setVisible(circle.visible); });
    };
    CircleManager.prototype.setRadius = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setRadius(circle.radius); });
    };
    CircleManager.prototype.getNativeCircle = function (circle) {
        return this._circles.get(circle);
    };
    CircleManager.prototype.createEventObservable = function (eventName, circle) {
        var _this = this;
        return new Observable(function (observer) {
            var listener = null;
            _this._circles.get(circle).then(function (c) {
                listener = c.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
            return function () {
                if (listener !== null) {
                    listener.remove();
                }
            };
        });
    };
    CircleManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone }
    ]; };
    CircleManager.decorators = [
        { type: Injectable }
    ];
    CircleManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone }
    ]; };
    return CircleManager;
}());
export { CircleManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY2xlLW1hbmFnZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9tYW5hZ2Vycy9jaXJjbGUtbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBRzVDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBS2xFO0lBS0UsdUJBQW9CLFdBQWlDLEVBQVUsS0FBYTtRQUF4RCxnQkFBVyxHQUFYLFdBQVcsQ0FBc0I7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBSHBFLGFBQVEsR0FDWixJQUFJLEdBQUcsRUFBdUMsQ0FBQztJQUU0QixDQUFDO0lBRWhGLGlDQUFTLEdBQVQsVUFBVSxNQUFpQjtRQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUM7WUFDdEQsTUFBTSxFQUFFLEVBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUM7WUFDckQsU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUFTO1lBQzNCLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUztZQUMzQixRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVE7WUFDekIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUFTO1lBQzNCLFdBQVcsRUFBRSxNQUFNLENBQUMsV0FBVztZQUMvQixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07WUFDckIsV0FBVyxFQUFFLE1BQU0sQ0FBQyxXQUFXO1lBQy9CLGFBQWEsRUFBRSxNQUFNLENBQUMsYUFBYTtZQUNuQyxjQUFjLEVBQUUsTUFBTSxDQUFDLGNBQWM7WUFDckMsWUFBWSxFQUFFLE1BQU0s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QUFNLEVBQUUsQ0FBQztpQkFDbkI7WUFDSCxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O2dCQXpGZ0Msb0JBQW9CO2dCQUFpQixNQUFNOzs7Z0JBTDdFLFVBQVU7OztnQkFMRixvQkFBb0I7Z0JBTFIsTUFBTTs7SUF5RzNCLG9CQUFDO0NBQUEsQUEvRkQsSUErRkM7U0E5RlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBZ21DaXJjbGUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2NpcmNsZSc7XG5pbXBvcnQgeyBHb29nbGVNYXBzQVBJV3JhcHBlciB9IGZyb20gJy4uL2dvb2dsZS1tYXBzLWFwaS13cmFwcGVyJztcbmltcG9ydCAqIGFzIG1hcFR5cGVzIGZyb20gJy4uL2dvb2dsZS1tYXBzLXR5cGVzJztcblxuZGVjbGFyZSB2YXIgZ29vZ2xlOiBhbnk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDaXJjbGVNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBfY2lyY2xlczogTWFwPEFnbUNpcmNsZSwgUHJvbWlzZTxtYXBUeXBlcy5DaXJjbGU+PiA9XG4gICAgICBuZXcgTWFwPEFnbUNpcmNsZSwgUHJvbWlzZTxtYXBUeXBlcy5DaXJjbGU+PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2FwaVdyYXBwZXI6IEdvb2dsZU1hcHNBUElXcmFwcGVyLCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHt9XG5cbiAgYWRkQ2lyY2xlKGNpcmNsZTogQWdtQ2lyY2xlKSB7XG4gICAgdGhpcy5fY2lyY2xlcy5zZXQoY2lyY2xlLCB0aGlzLl9hcGlXcmFwcGVyLmNyZWF0ZUNpcmNsZSh7XG4gICAgICBjZW50ZXI6IHtsYXQ6IGNpcmNsZS5sYXRpdHVkZSwgbG5nOiBjaXJjbGUubG9uZ2l0dWRlfSxcbiAgICAgIGNsaWNrYWJsZTogY2lyY2xlLmNsaWNrYWJsZSxcbiAgICAgIGRyYWdnYWJsZTogY2lyY2xlLmRyYWdnYWJsZSxcbiAgICAgIGVkaXRhYmxlOiBjaXJjbGUuZWRpdGFibGUsXG4gICAgICBmaWxsQ29sb3I6IGNpcmNsZS5maWxsQ29sb3IsXG4gICAgICBmaWxsT3BhY2l0eTogY2lyY2xlLmZpbGxPcGFjaXR5LFxuICAgICAgcmFkaXVzOiBjaXJjbGUucmFkaXVzLFxuICAgICAgc3Ryb2tlQ29sb3I6IGNpcmNsZS5zdHJva2VDb2xvcixcbiAgICAgIHN0cm9rZU9wYWNpdHk6IGNpcmNsZS5zdHJva2VPcGFjaXR5LFxuICAgICAgc3Ryb2tlUG9zaXRpb246IGNpcmNsZS5zdHJva2VQb3NpdGlvbixcbiAgICAgIHN0cm9rZVdlaWdodDogY2lyY2xlLnN0cm9rZVdlaWdodCxcbiAgICAgIHZpc2libGU6IGNpcmNsZS52aXNpYmxlLFxuICAgICAgekluZGV4OiBjaXJjbGUuekluZGV4LFxuICAgIH0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBnaXZlbiBjaXJjbGUgZnJvbSB0aGUgbWFwLlxuICAgKi9cbiAgcmVtb3ZlQ2lyY2xlKGNpcmNsZTogQWdtQ2lyY2xlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NpcmNsZXMuZ2V0KGNpcmNsZSkudGhlbigoYykgPT4ge1xuICAgICAgYy5zZXRNYXAobnVsbCk7XG4gICAgICB0aGlzLl9jaXJjbGVzLmRlbGV0ZShjaXJjbGUpO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0T3B0aW9ucyhjaXJjbGU6IEFnbUNpcmNsZSwgb3B0aW9uczogbWFwVHlwZXMuQ2lyY2xlT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9jaXJjbGVzLmdldChjaXJjbGUpLnRoZW4oKGMpID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5zdHJva2VQb3NpdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgb3B0aW9ucy5zdHJva2VQb3NpdGlvbiA9IGdvb2dsZS5tYXBzLlN0cm9rZVBvc2l0aW9uW29wdGlvbnMuc3Ryb2tlUG9zaXRpb25dO1xuICAgICAgfVxuICAgICAgYy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Qm91bmRzKGNpcmNsZTogQWdtQ2lyY2xlKTogUHJvbWlzZTxtYXBUeXBlcy5MYXRMbmdCb3VuZHM+IHtcbiAgICByZXR1cm4gdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKS50aGVuKChjKSA9PiBjLmdldEJvdW5kcygpKTtcbiAgfVxuXG4gIGdldENlbnRlcihjaXJjbGU6IEFnbUNpcmNsZSk6IFByb21pc2U8bWFwVHlwZXMuTGF0TG5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NpcmNsZXMuZ2V0KGNpcmNsZSkudGhlbigoYykgPT4gYy5nZXRDZW50ZXIoKSk7XG4gIH1cblxuICBnZXRSYWRpdXMoY2lyY2xlOiBBZ21DaXJjbGUpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9jaXJjbGVzLmdldChjaXJjbGUpLnRoZW4oKGMpID0+IGMuZ2V0UmFkaXVzKCkpO1xuICB9XG5cbiAgc2V0Q2VudGVyKGNpcmNsZTogQWdtQ2lyY2xlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NpcmNsZXMuZ2V0KGNpcmNsZSkudGhlbihcbiAgICAgICAgKGMpID0+IHsgcmV0dXJuIGMuc2V0Q2VudGVyKHtsYXQ6IGNpcmNsZS5sYXRpdHVkZSwgbG5nOiBjaXJjbGUubG9uZ2l0dWRlfSk7IH0pO1xuICB9XG5cbiAgc2V0RWRpdGFibGUoY2lyY2xlOiBBZ21DaXJjbGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKS50aGVuKChjKSA9PiB7IHJldHVybiBjLnNldEVkaXRhYmxlKGNpcmNsZS5lZGl0YWJsZSk7IH0pO1xuICB9XG5cbiAgc2V0RHJhZ2dhYmxlKGNpcmNsZTogQWdtQ2lyY2xlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NpcmNsZXMuZ2V0KGNpcmNsZSkudGhlbigoYykgPT4geyByZXR1cm4gYy5zZXREcmFnZ2FibGUoY2lyY2xlLmRyYWdnYWJsZSk7IH0pO1xuICB9XG5cbiAgc2V0VmlzaWJsZShjaXJjbGU6IEFnbUNpcmNsZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9jaXJjbGVzLmdldChjaXJjbGUpLnRoZW4oKGMpID0+IHsgcmV0dXJuIGMuc2V0VmlzaWJsZShjaXJjbGUudmlzaWJsZSk7IH0pO1xuICB9XG5cbiAgc2V0UmFkaXVzKGNpcmNsZTogQWdtQ2lyY2xlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NpcmNsZXMuZ2V0KGNpcmNsZSkudGhlbigoYykgPT4geyByZXR1cm4gYy5zZXRSYWRpdXMoY2lyY2xlLnJhZGl1cyk7IH0pO1xuICB9XG5cbiAgZ2V0TmF0aXZlQ2lyY2xlKGNpcmNsZTogQWdtQ2lyY2xlKTogUHJvbWlzZTxtYXBUeXBlcy5DaXJjbGU+IHtcbiAgICByZXR1cm4gdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKTtcbiAgfVxuXG4gIGNyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxUPihldmVudE5hbWU6IHN0cmluZywgY2lyY2xlOiBBZ21DaXJjbGUpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxUPikgPT4ge1xuICAgICAgbGV0IGxpc3RlbmVyOiBtYXBUeXBlcy5NYXBzRXZlbnRMaXN0ZW5lciA9IG51bGw7XG4gICAgICB0aGlzLl9jaXJjbGVzLmdldChjaXJjbGUpLnRoZW4oKGMpID0+IHtcbiAgICAgICAgbGlzdGVuZXIgPSBjLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgKGU6IFQpID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IG9ic2VydmVyLm5leHQoZSkpKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAobGlzdGVuZXIgIT09IG51bGwpIHtcbiAgICAgICAgICBsaXN0ZW5lci5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxufVxuIl19