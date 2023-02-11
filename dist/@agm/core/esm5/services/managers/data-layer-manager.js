import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMapsAPIWrapper } from './../google-maps-api-wrapper';
/**
 * Manages all Data Layers for a Google Map instance.
 */
var DataLayerManager = /** @class */ (function () {
    function DataLayerManager(_wrapper, _zone) {
        this._wrapper = _wrapper;
        this._zone = _zone;
        this._layers = new Map();
    }
    /**
     * Adds a new Data Layer to the map.
     */
    DataLayerManager.prototype.addDataLayer = function (layer) {
        var _this = this;
        var newLayer = this._wrapper.createDataLayer({
            style: layer.style,
        })
            .then(function (d) {
            if (layer.geoJson) {
                _this.getDataFeatures(d, layer.geoJson).then(function (features) { return d.features = features; });
            }
            return d;
        });
        this._layers.set(layer, newLayer);
    };
    DataLayerManager.prototype.deleteDataLayer = function (layer) {
        var _this = this;
        this._layers.get(layer).then(function (l) {
            l.setMap(null);
            _this._layers.delete(layer);
        });
    };
    DataLayerManager.prototype.updateGeoJson = function (layer, geoJson) {
        var _this = this;
        this._layers.get(layer).then(function (l) {
            l.forEach(function (feature) {
                l.remove(feature);
                var index = l.features.indexOf(feature, 0);
                if (index > -1) {
                    l.features.splice(index, 1);
                }
            });
            _this.getDataFeatures(l, geoJson).then(function (features) { return l.features = features; });
        });
    };
    DataLayerManager.prototype.setDataOptions = function (layer, options) {
        this._layers.get(layer).then(function (l) {
            l.setControlPosition(options.controlPosition);
            l.setControls(options.controls);
            l.setDrawingMode(options.drawingMode);
            l.setStyle(options.style);
        });
    };
    /**
     * Creates a Google Maps event listener for the given DataLayer as an Observable
     */
    DataLayerManager.prototype.createEventObservable = function (eventName, layer) {
        var _this = this;
        return new Observable(function (observer) {
            _this._layers.get(layer).then(function (d) {
                d.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    /**
     * Extract features from a geoJson using google.maps Data Class
     * @param d : google.maps.Data class instance
     * @param geoJson : url or geojson object
     */
    DataLayerManager.prototype.getDataFeatures = function (d, geoJson) {
        return new Promise(function (resolve, reject) {
            if (typeof geoJson === 'object') {
                try {
                    var features = d.addGeoJson(geoJson);
                    resolve(features);
                }
                catch (e) {
                    reject(e);
                }
            }
            else if (typeof geoJson === 'string') {
                d.loadGeoJson(geoJson, null, resolve);
            }
            else {
                reject("Impossible to extract features from geoJson: wrong argument type");
            }
        });
    };
    DataLayerManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone }
    ]; };
    DataLayerManager.decorators = [
        { type: Injectable }
    ];
    DataLayerManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone }
    ]; };
    return DataLayerManager;
}());
export { DataLayerManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1sYXllci1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsic2VydmljZXMvbWFuYWdlcnMvZGF0YS1sYXllci1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFHNUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFHcEU7O0dBRUc7QUFDSDtJQUtFLDBCQUFvQixRQUE4QixFQUFVLEtBQWE7UUFBckQsYUFBUSxHQUFSLFFBQVEsQ0FBc0I7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBSGpFLFlBQU8sR0FDZixJQUFJLEdBQUcsRUFBK0IsQ0FBQztJQUVzQyxDQUFDO0lBRTlFOztPQUVHO0lBQ0gsdUNBQVksR0FBWixVQUFhLEtBQW1CO1FBQWhDLGlCQVdDO1FBVkMsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUM7WUFDN0MsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO1NBQ0osQ0FBQzthQUNoQixJQUFJLENBQUMsVUFBQSxDQUFDO1lBQ0wsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO2dCQUNqQixLQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsQ0FBQyxDQUFDLFFBQVEsR0FBRyxRQUFRLEVBQXJCLENBQXFCLENBQUMsQ0FBQzthQUNoRjtZQUNELE9BQU8sQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELDBDQUFlLEdB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QUFDO2lCQUNYO2FBQ0Y7aUJBQU0sSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7Z0JBQ3RDLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQzthQUN2QztpQkFBTTtnQkFDTCxNQUFNLENBQUMsa0VBQWtFLENBQUMsQ0FBQzthQUM1RTtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Z0JBaEY2QixvQkFBb0I7Z0JBQWlCLE1BQU07OztnQkFMMUUsVUFBVTs7O2dCQU5GLG9CQUFvQjtnQkFKUixNQUFNOztJQWdHM0IsdUJBQUM7Q0FBQSxBQXRGRCxJQXNGQztTQXJGWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEFnbURhdGFMYXllciB9IGZyb20gJy4vLi4vLi4vZGlyZWN0aXZlcy9kYXRhLWxheWVyJztcbmltcG9ydCB7IEdvb2dsZU1hcHNBUElXcmFwcGVyIH0gZnJvbSAnLi8uLi9nb29nbGUtbWFwcy1hcGktd3JhcHBlcic7XG5pbXBvcnQgeyBEYXRhLCBEYXRhT3B0aW9ucywgRmVhdHVyZSB9IGZyb20gJy4vLi4vZ29vZ2xlLW1hcHMtdHlwZXMnO1xuXG4vKipcbiAqIE1hbmFnZXMgYWxsIERhdGEgTGF5ZXJzIGZvciBhIEdvb2dsZSBNYXAgaW5zdGFuY2UuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRhTGF5ZXJNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBfbGF5ZXJzOiBNYXA8QWdtRGF0YUxheWVyLCBQcm9taXNlPERhdGE+PiA9XG4gIG5ldyBNYXA8QWdtRGF0YUxheWVyLCBQcm9taXNlPERhdGE+PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3dyYXBwZXI6IEdvb2dsZU1hcHNBUElXcmFwcGVyLCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHsgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbmV3IERhdGEgTGF5ZXIgdG8gdGhlIG1hcC5cbiAgICovXG4gIGFkZERhdGFMYXllcihsYXllcjogQWdtRGF0YUxheWVyKSB7XG4gICAgY29uc3QgbmV3TGF5ZXIgPSB0aGlzLl93cmFwcGVyLmNyZWF0ZURhdGFMYXllcih7XG4gICAgICBzdHlsZTogbGF5ZXIuc3R5bGUsXG4gICAgfSBhcyBEYXRhT3B0aW9ucylcbiAgICAudGhlbihkID0+IHtcbiAgICAgIGlmIChsYXllci5nZW9Kc29uKSB7XG4gICAgICAgIHRoaXMuZ2V0RGF0YUZlYXR1cmVzKGQsIGxheWVyLmdlb0pzb24pLnRoZW4oZmVhdHVyZXMgPT4gZC5mZWF0dXJlcyA9IGZlYXR1cmVzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkO1xuICAgIH0pO1xuICAgIHRoaXMuX2xheWVycy5zZXQobGF5ZXIsIG5ld0xheWVyKTtcbiAgfVxuXG4gIGRlbGV0ZURhdGFMYXllcihsYXllcjogQWdtRGF0YUxheWVyKSB7XG4gICAgdGhpcy5fbGF5ZXJzLmdldChsYXllcikudGhlbihsID0+IHtcbiAgICAgIGwuc2V0TWFwKG51bGwpO1xuICAgICAgdGhpcy5fbGF5ZXJzLmRlbGV0ZShsYXllcik7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVHZW9Kc29uKGxheWVyOiBBZ21EYXRhTGF5ZXIsIGdlb0pzb246IE9iamVjdCB8IHN0cmluZykge1xuICAgIHRoaXMuX2xheWVycy5nZXQobGF5ZXIpLnRoZW4obCA9PiB7XG4gICAgICBsLmZvckVhY2goZnVuY3Rpb24gKGZlYXR1cmU6IEZlYXR1cmUpIHtcbiAgICAgICAgbC5yZW1vdmUoZmVhdHVyZSk7XG5cbiAgICAgICAgdmFyIGluZGV4ID0gbC5mZWF0dXJlcy5pbmRleE9mKGZlYXR1cmUsIDApO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgIGwuZmVhdHVyZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLmdldERhdGFGZWF0dXJlcyhsLCBnZW9Kc29uKS50aGVuKGZlYXR1cmVzID0+IGwuZmVhdHVyZXMgPSBmZWF0dXJlcyk7XG4gICAgfSk7XG4gIH1cblxuICBzZXREYXRhT3B0aW9ucyhsYXllcjogQWdtRGF0YUxheWVyLCBvcHRpb25zOiBEYXRhT3B0aW9ucylcbiAge1xuICAgIHRoaXMuX2xheWVycy5nZXQobGF5ZXIpLnRoZW4obCA9PiB7XG4gICAgICBsLnNldENvbnRyb2xQb3NpdGlvbihvcHRpb25zLmNvbnRyb2xQb3NpdGlvbik7XG4gICAgICBsLnNldENvbnRyb2xzKG9wdGlvbnMuY29udHJvbHMpO1xuICAgICAgbC5zZXREcmF3aW5nTW9kZShvcHRpb25zLmRyYXdpbmdNb2RlKTtcbiAgICAgIGwuc2V0U3R5bGUob3B0aW9ucy5zdHlsZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIEdvb2dsZSBNYXBzIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgZ2l2ZW4gRGF0YUxheWVyIGFzIGFuIE9ic2VydmFibGVcbiAgICovXG4gIGNyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxUPihldmVudE5hbWU6IHN0cmluZywgbGF5ZXI6IEFnbURhdGFMYXllcik6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFQ+KSA9PiB7XG4gICAgICB0aGlzLl9sYXllcnMuZ2V0KGxheWVyKS50aGVuKChkOiBEYXRhKSA9PiB7XG4gICAgICAgIGQuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCAoZTogVCkgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChlKSkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRXh0cmFjdCBmZWF0dXJlcyBmcm9tIGEgZ2VvSnNvbiB1c2luZyBnb29nbGUubWFwcyBEYXRhIENsYXNzXG4gICAqIEBwYXJhbSBkIDogZ29vZ2xlLm1hcHMuRGF0YSBjbGFzcyBpbnN0YW5jZVxuICAgKiBAcGFyYW0gZ2VvSnNvbiA6IHVybCBvciBnZW9qc29uIG9iamVjdFxuICAgKi9cbiAgZ2V0RGF0YUZlYXR1cmVzKGQ6IERhdGEsIGdlb0pzb246IE9iamVjdCB8IHN0cmluZyk6IFByb21pc2U8RmVhdHVyZVtdPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPEZlYXR1cmVbXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGdlb0pzb24gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGZlYXR1cmVzID0gZC5hZGRHZW9Kc29uKGdlb0pzb24pO1xuICAgICAgICAgICAgcmVzb2x2ZShmZWF0dXJlcyk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZ2VvSnNvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBkLmxvYWRHZW9Kc29uKGdlb0pzb24sIG51bGwsIHJlc29sdmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChgSW1wb3NzaWJsZSB0byBleHRyYWN0IGZlYXR1cmVzIGZyb20gZ2VvSnNvbjogd3JvbmcgYXJndW1lbnQgdHlwZWApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxufVxuIl19